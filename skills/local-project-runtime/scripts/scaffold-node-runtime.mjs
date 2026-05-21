#!/usr/bin/env node

import { chmodSync, existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { basename, dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const LOCAL_PORT_MIN = 3_100;
const LOCAL_PORT_MAX = 30_000;
const LOCAL_PORT_STEP = 100;

function usage() {
  console.log(`Usage:
  node ${relative(process.cwd(), fileURLToPath(import.meta.url))} [options]

Options:
  --service <name>              Compose service name (default: app)
  --default-port <port>         Host port override (default: reuse existing control port, else random [30-300]*100 excluding 3000)
  --container-port <port>       Container port (default: default-port)
  --health-path <path|none>     HTTP health path (default: /health)
  --frontend-dir <dir>          Frontend directory to hash/build (auto-detects common dirs)
  --frontend-package <name>     Workspace package name for frontend filter
  --shared-dirs <a,b,c>         Extra dirs whose changes invalidate frontend cache
  --build-cmd <command>         Host build command when no cache wrapper is generated
  --test-cmd <command>          Host test command
  --backend-build-cmd <command> Command run before cached frontend build for non-pnpm repos
  --force                       Overwrite generated files

Creates:
  deploy/local/docker-compose.yml
  deploy/local/.env.example
  deploy/local/runtime/control.sh
  deploy/local/README.md
  scripts/build-local-runtime.mjs when a frontend package is detected
`);
}

function parseArgs(argv) {
  const args = {};
  for (let i = 0; i < argv.length; i += 1) {
    const raw = argv[i];
    if (!raw.startsWith("--")) continue;
    const eq = raw.indexOf("=");
    if (eq !== -1) {
      args[raw.slice(2, eq)] = raw.slice(eq + 1);
      continue;
    }
    const key = raw.slice(2);
    const next = argv[i + 1];
    if (!next || next.startsWith("--")) {
      args[key] = true;
    } else {
      args[key] = next;
      i += 1;
    }
  }
  return args;
}

function readJson(path) {
  if (!existsSync(path)) return null;
  return JSON.parse(readFileSync(path, "utf8"));
}

function detectPackageManager(root, pkg) {
  if (typeof pkg?.packageManager === "string") {
    const name = pkg.packageManager.split("@")[0];
    if (name === "pnpm" || name === "npm" || name === "yarn") return name;
  }
  if (existsSync(join(root, "pnpm-lock.yaml"))) return "pnpm";
  if (existsSync(join(root, "yarn.lock"))) return "yarn";
  return "npm";
}

function runPrefix(manager) {
  if (manager === "pnpm") return "pnpm";
  if (manager === "yarn") return "yarn";
  return "npm";
}

function hasScript(pkg, name) {
  return Boolean(pkg?.scripts && Object.prototype.hasOwnProperty.call(pkg.scripts, name));
}

function defaultBuildCommand(manager, pkg) {
  return hasScript(pkg, "build") ? `${runPrefix(manager)} run build` : "echo 'no build script configured'";
}

function defaultTestCommand(manager, pkg) {
  if (hasScript(pkg, "test")) return manager === "yarn" ? "yarn test" : `${runPrefix(manager)} test`;
  if (hasScript(pkg, "test:run")) return `${runPrefix(manager)} run test:run`;
  return "echo 'no test script configured'";
}

function slugify(input) {
  return input.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "app";
}

function parseEnvPort(contents) {
  const rows = [];
  for (const line of contents.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const match = trimmed.match(/^([A-Za-z_][A-Za-z0-9_]*)=(\d+)$/);
    if (!match) continue;
    const key = match[1];
    const value = Number(match[2]);
    if (!Number.isInteger(value) || value < 1 || value > 65_535) continue;
    rows.push({ key, value });
  }

  const preferred = [
    "APP_PORT",
    "WEB_PORT",
    "API_PORT",
    "SERVER_PORT",
    "FRONTEND_PORT",
    "LOCAL_PORT",
    "PORT",
  ];

  for (const key of preferred) {
    const row = rows.find((entry) => entry.key === key);
    if (row) return row.value;
  }

  const fallback = rows.find((entry) => entry.key.endsWith("_PORT") && entry.key !== "CONTAINER_PORT");
  return fallback?.value ?? null;
}

function detectExistingControlPort(root) {
  if (!existsSync(join(root, "deploy/local/runtime/control.sh"))) return null;

  for (const envPath of [join(root, "deploy/local/.env"), join(root, "deploy/local/.env.example")]) {
    if (!existsSync(envPath)) continue;
    const port = parseEnvPort(readFileSync(envPath, "utf8"));
    if (port !== null) return port;
  }

  return null;
}

function isPortFree(port) {
  const result = spawnSync("lsof", [`-tiTCP:${port}`, "-sTCP:LISTEN"], {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "ignore"],
  });
  if (result.error) return true;
  return result.status !== 0 || result.stdout.trim().length === 0;
}

function shuffledRuntimePorts() {
  const ports = [];
  for (let port = LOCAL_PORT_MIN; port <= LOCAL_PORT_MAX; port += LOCAL_PORT_STEP) {
    ports.push(port);
  }

  for (let i = ports.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [ports[i], ports[j]] = [ports[j], ports[i]];
  }

  return ports;
}

function allocateRuntimePort(root) {
  const existingPort = detectExistingControlPort(root);
  if (existingPort !== null) return existingPort;

  for (const port of shuffledRuntimePorts()) {
    if (isPortFree(port)) return port;
  }

  throw new Error(`No available local runtime port found in ${LOCAL_PORT_MIN}-${LOCAL_PORT_MAX}.`);
}

function detectFrontendDir(root) {
  const candidates = ["ui", "frontend", "client", "web", "app", "apps/web", "packages/ui"];
  for (const candidate of candidates) {
    const pkg = readJson(join(root, candidate, "package.json"));
    if (!pkg || !hasScript(pkg, "build")) continue;
    const deps = { ...(pkg.dependencies ?? {}), ...(pkg.devDependencies ?? {}) };
    if (deps.vite || deps.react || deps.next || deps["@vitejs/plugin-react"]) return candidate;
  }
  return null;
}

function isPnpmWorkspace(root) {
  return existsSync(join(root, "pnpm-workspace.yaml"));
}

function ensureDir(path) {
  mkdirSync(path, { recursive: true });
}

function writeFile(path, contents, force) {
  if (existsSync(path) && !force) {
    console.log(`skip existing: ${relative(process.cwd(), path)}`);
    return false;
  }
  ensureDir(dirname(path));
  writeFileSync(path, contents, "utf8");
  console.log(`wrote: ${relative(process.cwd(), path)}`);
  return true;
}

function appendDockerignore(root) {
  const path = join(root, ".dockerignore");
  const existing = existsSync(path) ? readFileSync(path, "utf8") : "";
  const entries = [
    "node_modules",
    "**/node_modules",
    "coverage",
    "data",
    "deploy/local/data",
    "tmp",
    "**/dist",
    "**/*.tsbuildinfo",
    "**/.vite",
    "*.log",
  ];
  const missing = entries.filter((entry) => !existing.split(/\r?\n/).includes(entry));
  if (missing.length === 0) return;
  const next = `${existing}${existing.endsWith("\n") || existing.length === 0 ? "" : "\n"}${missing.join("\n")}\n`;
  writeFileSync(path, next, "utf8");
  console.log(`updated: ${relative(process.cwd(), path)}`);
}

function shellString(value) {
  return JSON.stringify(String(value));
}

function makeControlSh(opts) {
  return `#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR=$(cd -- "$(dirname -- "\${BASH_SOURCE[0]}")" && pwd)
LOCAL_DIR=$(cd -- "$SCRIPT_DIR/.." && pwd)
REPO_ROOT=$(cd -- "$SCRIPT_DIR/../../.." && pwd)

SERVICE_NAME=${shellString(opts.serviceName)}
COMPOSE_FILE="$LOCAL_DIR/docker-compose.yml"
ENV_FILE="$LOCAL_DIR/.env"
ENV_EXAMPLE_FILE="$LOCAL_DIR/.env.example"
DEFAULT_PORT=${shellString(opts.defaultPort)}
DEFAULT_CONTAINER_PORT=${shellString(opts.containerPort)}
DEFAULT_HEALTH_PATH=${shellString(opts.healthPath)}
DEFAULT_BUILD_CMD=${shellString(opts.buildCommand)}
DEFAULT_TEST_CMD=${shellString(opts.testCommand)}
LOCAL_PORT_MIN=3100
LOCAL_PORT_MAX=30000
LOCAL_PORT_STEP=100
HEALTH_PROBE_ATTEMPTS=\${HEALTH_PROBE_ATTEMPTS:-30}
HEALTH_PROBE_INTERVAL_SECONDS=\${HEALTH_PROBE_INTERVAL_SECONDS:-2}

usage() {
  cat <<'EOF'
Usage: ./control.sh <command>

Commands:
  init      Create local .env if missing
  deps      Install project dependencies
  build     Run the configured local build
  test      Run the configured local test command
  image     Build the local Docker image
  start     Start local Compose services
  apply     Rebuild image and force-recreate services
  restart   Restart services, or start them if absent
  stop      Stop local Compose services
  status    Show Compose status and HTTP health
  logs      Tail service logs
  ps        Show Compose containers
  clean     Stop services and remove local Compose data
  doctor    Print local runtime diagnostics
EOF
}

require_docker_compose() {
  command -v docker >/dev/null 2>&1 || { echo "docker not found" >&2; exit 1; }
  docker info >/dev/null 2>&1 || { echo "docker daemon is not running" >&2; exit 1; }
  docker compose version >/dev/null 2>&1 || { echo "docker compose not available" >&2; exit 1; }
}

require_package_manager() {
  command -v ${opts.packageManager} >/dev/null 2>&1 || { echo "${opts.packageManager} not found" >&2; exit 1; }
}

ensure_env_file() {
  if [[ -f "$ENV_FILE" ]]; then return; fi
  if [[ -f "$ENV_EXAMPLE_FILE" ]]; then
    cp "$ENV_EXAMPLE_FILE" "$ENV_FILE"
  else
    cat > "$ENV_FILE" <<EOF
APP_PORT=$DEFAULT_PORT
CONTAINER_PORT=$DEFAULT_CONTAINER_PORT
APP_PUBLIC_URL=http://localhost:$DEFAULT_PORT
HEALTH_PATH=$DEFAULT_HEALTH_PATH
EOF
  fi
  echo "initialized local env: $ENV_FILE"
}

env_value() {
  local key=$1
  local default_value=\${2:-}
  if [[ ! -f "$ENV_FILE" ]]; then printf '%s' "$default_value"; return; fi
  local value
  value=$(awk -F= -v key="$key" '$1 == key { print substr($0, length(key) + 2); exit }' "$ENV_FILE")
  if [[ -n "\${value:-}" ]]; then printf '%s' "$value"; else printf '%s' "$default_value"; fi
}

set_env_value() {
  local key=$1
  local value=$2
  local tmp
  tmp=$(mktemp "\${ENV_FILE}.tmp.XXXXXX")
  if grep -q "^\${key}=" "$ENV_FILE"; then
    awk -v key="$key" -v value="$value" -F= '$1 == key { print key "=" value; next } { print }' "$ENV_FILE" > "$tmp"
  else
    cp "$ENV_FILE" "$tmp"
    printf '%s=%s\\n' "$key" "$value" >> "$tmp"
  fi
  mv "$tmp" "$ENV_FILE"
}

app_port() { env_value "APP_PORT" "$DEFAULT_PORT"; }
container_port() { env_value "CONTAINER_PORT" "$DEFAULT_CONTAINER_PORT"; }
app_url() { printf 'http://127.0.0.1:%s' "$(app_port)"; }
health_path() { env_value "HEALTH_PATH" "$DEFAULT_HEALTH_PATH"; }

health_url() {
  local path
  path=$(health_path)
  if [[ -z "$path" || "$path" == "none" ]]; then printf ''; return; fi
  [[ "$path" == /* ]] || path="/$path"
  printf '%s%s' "$(app_url)" "$path"
}

listener_pid_for_port() {
  local port=$1
  lsof -tiTCP:"$port" -sTCP:LISTEN 2>/dev/null | head -n 1
}

find_free_port() {
  local total_slots
  total_slots=$(( (LOCAL_PORT_MAX - LOCAL_PORT_MIN) / LOCAL_PORT_STEP + 1 ))
  local start_slot
  start_slot=$(( RANDOM % total_slots ))
  local offset=0
  while [[ "$offset" -lt "$total_slots" ]]; do
    local slot=$(( (start_slot + offset) % total_slots ))
    local candidate=$(( LOCAL_PORT_MIN + slot * LOCAL_PORT_STEP ))
    if [[ -z "$(listener_pid_for_port "$candidate")" ]]; then printf '%s' "$candidate"; return 0; fi
    offset=$((offset + 1))
  done
  return 1
}

compose_cmd() {
  docker compose --env-file "$ENV_FILE" -f "$COMPOSE_FILE" "$@"
}

service_container_id() {
  compose_cmd ps -q "$SERVICE_NAME" 2>/dev/null | head -n 1
}

service_running() {
  local container_id
  container_id=$(service_container_id)
  [[ -n "\${container_id:-}" ]] && [[ "$(docker inspect --format '{{.State.Running}}' "$container_id" 2>/dev/null)" == "true" ]]
}

ensure_available_port() {
  if service_running; then return; fi
  local port
  port=$(app_port)
  if [[ -z "$(listener_pid_for_port "$port")" ]]; then return; fi
  local next_port
  next_port=$(find_free_port) || { echo "start failed: no available runtime port found in $LOCAL_PORT_MIN-$LOCAL_PORT_MAX" >&2; exit 1; }
  set_env_value "APP_PORT" "$next_port"
  set_env_value "APP_PUBLIC_URL" "http://localhost:$next_port"
  echo "auto-selected local port: $next_port"
}

wait_for_health() {
  local url
  url=$(health_url)
  if [[ -z "$url" ]]; then echo "health check skipped"; return 0; fi
  local attempt=1
  while [[ "$attempt" -le "$HEALTH_PROBE_ATTEMPTS" ]]; do
    if curl -fsS "$url" >/dev/null 2>&1; then echo "healthy: $url"; return 0; fi
    sleep "$HEALTH_PROBE_INTERVAL_SECONDS"
    attempt=$((attempt + 1))
  done
  echo "health check failed: $url" >&2
  compose_cmd logs --tail=80 "$SERVICE_NAME" >&2 || true
  return 1
}

run_host_command() {
  local command=$1
  (cd "$REPO_ROOT" && /bin/sh -lc "$command")
}

cmd=\${1:-}
case "$cmd" in
  init)
    ensure_env_file
    ;;
  deps)
    require_package_manager
    run_host_command ${shellString(opts.installCommand)}
    ;;
  build)
    require_package_manager
    run_host_command "\${LOCAL_BUILD_CMD:-$DEFAULT_BUILD_CMD}"
    ;;
  test)
    require_package_manager
    run_host_command "\${LOCAL_TEST_CMD:-$DEFAULT_TEST_CMD}"
    ;;
  image)
    ensure_env_file
    require_docker_compose
    compose_cmd build "$SERVICE_NAME"
    ;;
  start)
    ensure_env_file
    require_docker_compose
    ensure_available_port
    compose_cmd up -d --build "$SERVICE_NAME"
    wait_for_health
    echo "open: $(app_url)"
    ;;
  apply)
    ensure_env_file
    require_docker_compose
    ensure_available_port
    compose_cmd up -d --build --force-recreate "$SERVICE_NAME"
    wait_for_health
    echo "open: $(app_url)"
    ;;
  restart)
    ensure_env_file
    require_docker_compose
    ensure_available_port
    if [[ -z "$(service_container_id)" ]]; then
      echo "no existing local container; starting service instead"
      compose_cmd up -d --build "$SERVICE_NAME"
    else
      compose_cmd restart "$SERVICE_NAME"
    fi
    wait_for_health
    echo "open: $(app_url)"
    ;;
  stop)
    ensure_env_file
    require_docker_compose
    compose_cmd down
    ;;
  status)
    ensure_env_file
    require_docker_compose
    compose_cmd ps
    url=$(health_url)
    if [[ -z "$url" ]]; then
      echo "health: skipped"
    elif curl -fsS "$url" >/dev/null 2>&1; then
      echo "health: ok ($url)"
    else
      echo "health: unavailable ($url)"
    fi
    ;;
  logs)
    ensure_env_file
    require_docker_compose
    compose_cmd logs -f "$SERVICE_NAME"
    ;;
  ps)
    ensure_env_file
    require_docker_compose
    compose_cmd ps
    ;;
  clean)
    ensure_env_file
    require_docker_compose
    compose_cmd down --volumes --remove-orphans
    rm -rf "$LOCAL_DIR/data"
    ;;
  doctor)
    ensure_env_file
    echo "repo: $REPO_ROOT"
    echo "env: $ENV_FILE"
    echo "service: $SERVICE_NAME"
    echo "url: $(app_url)"
    echo "health: $(health_url)"
    command -v ${opts.packageManager} >/dev/null 2>&1 && ${opts.packageManager} --version || true
    docker --version 2>/dev/null || true
    docker compose version 2>/dev/null || true
    compose_cmd config --quiet && echo "compose: ok"
    ;;
  ""|-h|--help|help)
    usage
    ;;
  *)
    usage >&2
    exit 1
    ;;
esac
`;
}

function makeCompose(opts) {
  return `name: ${opts.projectSlug}-local

services:
  ${opts.serviceName}:
    build:
      context: ../..
      dockerfile: \${DOCKERFILE:-Dockerfile}
    ports:
      - "\${APP_PORT:-${opts.defaultPort}}:\${CONTAINER_PORT:-${opts.containerPort}}"
    environment:
      HOST: "\${HOST:-0.0.0.0}"
      PORT: "\${CONTAINER_PORT:-${opts.containerPort}}"
      NODE_ENV: "\${NODE_ENV:-production}"
      APP_PUBLIC_URL: "\${APP_PUBLIC_URL:-http://localhost:\${APP_PORT:-${opts.defaultPort}}}"
      PUBLIC_URL: "\${APP_PUBLIC_URL:-http://localhost:\${APP_PORT:-${opts.defaultPort}}}"
`;
}

function makeEnvExample(opts) {
  return `APP_PORT=${opts.defaultPort}
CONTAINER_PORT=${opts.containerPort}
APP_PUBLIC_URL=http://localhost:${opts.defaultPort}
HEALTH_PATH=${opts.healthPath}
# DOCKERFILE=Dockerfile
# Add project-specific local environment values here.
`;
}

function makeReadme(opts) {
  return `# Local Runtime

This directory contains a local Docker Compose runtime and lifecycle wrapper for this project.

## Start

\`\`\`sh
./deploy/local/runtime/control.sh start
\`\`\`

## Apply Code Changes

\`\`\`sh
./deploy/local/runtime/control.sh apply
\`\`\`

\`apply\` rebuilds the image and force-recreates the service. \`restart\` only restarts an existing container; if no container exists, it starts one.

## Build And Test

\`\`\`sh
./deploy/local/runtime/control.sh deps
./deploy/local/runtime/control.sh build
./deploy/local/runtime/control.sh test
\`\`\`

Build command: \`${opts.buildCommand}\`
Test command: \`${opts.testCommand}\`

## Operations

\`\`\`sh
./deploy/local/runtime/control.sh status
./deploy/local/runtime/control.sh logs
./deploy/local/runtime/control.sh doctor
./deploy/local/runtime/control.sh stop
./deploy/local/runtime/control.sh clean
\`\`\`

Local config is in \`deploy/local/.env\`. Runtime data belongs under \`deploy/local/data/\`.
`;
}

function jsArray(values) {
  return `[${values.map((value) => JSON.stringify(value)).join(", ")}]`;
}

function makeBuildCacheScript(opts) {
  const frontendDir = opts.frontendDir;
  const frontendPackage = opts.frontendPackage;
  const inputPaths = [
    ".npmrc",
    "package.json",
    "pnpm-lock.yaml",
    "package-lock.json",
    "yarn.lock",
    "pnpm-workspace.yaml",
    "tsconfig.base.json",
    "tsconfig.json",
    frontendDir,
    ...opts.sharedDirs,
  ];

  const preBuildArgs =
    opts.packageManager === "pnpm" && frontendPackage && opts.isPnpmWorkspace
      ? ["--filter", `!${frontendPackage}`, "--recursive", "build"]
      : null;

  const frontendArgs =
    opts.packageManager === "pnpm" && frontendPackage
      ? ["--filter", frontendPackage, "build"]
      : opts.packageManager === "pnpm"
        ? ["--dir", frontendDir, "build"]
        : opts.packageManager === "npm"
          ? ["--prefix", frontendDir, "run", "build"]
          : ["--cwd", frontendDir, "build"];

  return `#!/usr/bin/env node

import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, "..");
const cacheDir = join(repoRoot, "node_modules", ".cache", "local-runtime");
const uiCacheFile = join(cacheDir, "frontend-build.sha256");
const frontendDistIndex = join(repoRoot, ${JSON.stringify(frontendDir)}, "dist", "index.html");
const forceFrontendBuild = process.env.LOCAL_FORCE_UI_BUILD === "true" || process.env.LOCAL_FORCE_FRONTEND_BUILD === "true" || process.argv.includes("--force-ui");

const manager = ${JSON.stringify(opts.packageManager)};
const preBuildArgs = ${preBuildArgs ? jsArray(preBuildArgs) : "null"};
const frontendBuildArgs = ${jsArray(frontendArgs)};
const inputPaths = ${jsArray(inputPaths)};

const ignoredNames = new Set([".git", ".pnpm-store", "coverage", "dist", "node_modules", "storybook-static", ".vite"]);
const ignoredSuffixes = [".log", ".tsbuildinfo"];

function run(args) {
  if (!args) return;
  const result = spawnSync(manager, args, { cwd: repoRoot, stdio: "inherit", shell: process.platform === "win32" });
  if (result.error) throw result.error;
  if (result.status !== 0) process.exit(result.status ?? 1);
}

function shouldIgnore(name) {
  return ignoredNames.has(name) || ignoredSuffixes.some((suffix) => name.endsWith(suffix));
}

function collectFiles(path) {
  const absolutePath = join(repoRoot, path);
  if (!existsSync(absolutePath)) return [];
  const entry = statSync(absolutePath);
  if (entry.isFile()) return [absolutePath];
  if (!entry.isDirectory()) return [];
  const files = [];
  for (const name of readdirSync(absolutePath)) {
    if (shouldIgnore(name)) continue;
    files.push(...collectFiles(join(path, name)));
  }
  return files;
}

function hashInputs() {
  const hash = createHash("sha256");
  const files = inputPaths.flatMap(collectFiles).sort((a, b) => a.localeCompare(b));
  for (const file of files) {
    hash.update(relative(repoRoot, file));
    hash.update("\\0");
    hash.update(readFileSync(file));
    hash.update("\\0");
  }
  return hash.digest("hex");
}

function readCachedHash() {
  if (!existsSync(uiCacheFile)) return null;
  return readFileSync(uiCacheFile, "utf8").trim() || null;
}

function writeCachedHash(hash) {
  mkdirSync(cacheDir, { recursive: true });
  writeFileSync(uiCacheFile, \`\${hash}\\n\`);
}

if (preBuildArgs) {
  run(preBuildArgs);
} else if (${JSON.stringify(opts.backendBuildCommand)} !== "") {
  const result = spawnSync("/bin/sh", ["-lc", ${JSON.stringify(opts.backendBuildCommand)}], { cwd: repoRoot, stdio: "inherit" });
  if (result.status !== 0) process.exit(result.status ?? 1);
}

const nextHash = hashInputs();
const previousHash = readCachedHash();

if (!forceFrontendBuild && existsSync(frontendDistIndex) && previousHash === nextHash) {
  console.log("frontend build: skipped; input hash unchanged");
} else {
  run(frontendBuildArgs);
  writeCachedHash(nextHash);
}
`;
}

const args = parseArgs(process.argv.slice(2));
if (args.help || args.h) {
  usage();
  process.exit(0);
}

const repoRoot = process.cwd();
const rootPkg = readJson(join(repoRoot, "package.json")) ?? {};
const packageManager = args["package-manager"] || detectPackageManager(repoRoot, rootPkg);
const projectSlug = slugify(args.name || basename(repoRoot));
const serviceName = slugify(args.service || "app");
const defaultPort = String(args["default-port"] || args.port || allocateRuntimePort(repoRoot));
const containerPort = String(args["container-port"] || defaultPort);
const healthPath = String(args["health-path"] || "/health");
const force = Boolean(args.force);
const frontendDir = args["frontend-dir"] || detectFrontendDir(repoRoot);
const frontendPkg = frontendDir ? readJson(join(repoRoot, frontendDir, "package.json")) : null;
const frontendPackage = args["frontend-package"] || frontendPkg?.name || "";
const sharedDirs = String(args["shared-dirs"] || "packages/shared,shared,libs/shared")
  .split(",")
  .map((entry) => entry.trim())
  .filter((entry) => entry.length > 0 && existsSync(join(repoRoot, entry)));
const backendBuildCommand = String(args["backend-build-cmd"] || "");
const canGenerateCache = Boolean(frontendDir && existsSync(join(repoRoot, frontendDir)));
const buildCommand = String(args["build-cmd"] || (canGenerateCache ? "node scripts/build-local-runtime.mjs" : defaultBuildCommand(packageManager, rootPkg)));
const testCommand = String(args["test-cmd"] || defaultTestCommand(packageManager, rootPkg));
const installCommand = packageManager === "pnpm"
  ? "pnpm install --frozen-lockfile"
  : packageManager === "yarn"
    ? "yarn install --frozen-lockfile"
    : "npm ci";

const opts = {
  repoRoot,
  packageManager,
  projectSlug,
  serviceName,
  defaultPort,
  containerPort,
  healthPath,
  buildCommand,
  testCommand,
  installCommand,
  frontendDir,
  frontendPackage,
  sharedDirs,
  backendBuildCommand,
  isPnpmWorkspace: isPnpmWorkspace(repoRoot),
};

writeFile(join(repoRoot, "deploy/local/docker-compose.yml"), makeCompose(opts), force);
writeFile(join(repoRoot, "deploy/local/.env.example"), makeEnvExample(opts), force);
const controlPath = join(repoRoot, "deploy/local/runtime/control.sh");
writeFile(controlPath, makeControlSh(opts), force);
chmodSync(controlPath, 0o755);
writeFile(join(repoRoot, "deploy/local/README.md"), makeReadme(opts), force);

if (canGenerateCache) {
  writeFile(join(repoRoot, "scripts/build-local-runtime.mjs"), makeBuildCacheScript(opts), force);
} else {
  console.log("frontend not detected; skipped scripts/build-local-runtime.mjs");
}

appendDockerignore(repoRoot);

console.log("");
console.log("Next checks:");
console.log("  bash -n deploy/local/runtime/control.sh");
console.log("  docker compose --env-file deploy/local/.env.example -f deploy/local/docker-compose.yml config --quiet");
console.log("  ./deploy/local/runtime/control.sh init");
console.log("  ./deploy/local/runtime/control.sh doctor");
