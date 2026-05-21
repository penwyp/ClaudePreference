---
name: local-project-runtime
description: Diagnose and stabilize local project setup after clone or checkout. Use when a repo needs repeatable build/start/test/lifecycle workflows, Docker Compose management, port selection, or build caching.
---

# Local Project Runtime

Use this skill to turn an unknown repository into a locally manageable project with predictable build, start, test, logs, health, and cleanup commands.

## Core Workflow

1. Inspect first:
   - Read root docs and manifests: `README*`, `AGENTS.md`, `package.json`, lockfiles, `Dockerfile`, Compose files, Makefile, task runner configs, CI workflows.
   - Identify the package manager, runtime, service entrypoint, frontend directories, backend directories, DB/external dependencies, default ports, and health endpoints.
   - Check current worktree state before editing.

2. Reproduce narrowly:
   - Run the smallest relevant command for the reported failure.
   - Capture the exact failing phase: dependency install, typecheck/compile, frontend bundle, Docker image build, container boot, health probe, migration, or test runner.
   - Prefer targeted checks before repo-wide verification.

3. Fix architecture, not symptoms:
   - Keep build/start/test contracts in one local runtime surface, normally `deploy/local/`.
   - Avoid one-off shell notes that cannot be rerun.
   - Make generated scripts explicit, idempotent, and safe when services are absent.

4. Add or repair a lifecycle manager:
   - Required commands: `init`, `deps`, `build`, `test`, `image`, `start`, `apply`, `restart`, `stop`, `status`, `logs`, `ps`, `clean`, `doctor`.
   - `start` creates services and waits for health.
   - `apply` rebuilds the image and force-recreates the service.
   - `restart` restarts an existing container; if none exists, it must start instead of doing an empty restart.
   - `status` must show Compose state and HTTP health.
   - `clean` must stop services and remove local runtime data only.

5. Add build acceleration where justified:
   - For Node/monorepos, add a local build wrapper that hashes frontend inputs and skips frontend production bundling when unchanged.
   - Preserve correctness by hashing lockfiles, frontend source/config/public assets, and shared packages imported by the frontend.
   - For Docker, split frontend build into its own layer before backend/application `COPY . .` so backend-only changes reuse frontend layers.
   - Update `.dockerignore` to exclude local build artifacts and caches.

6. Add port and health decisions:
   - Keep host port in `deploy/local/.env`; generate it from `.env.example` or defaults.
   - For a new lifecycle manager, do not default to port 3000. Allocate a random free host port from `[30-300] * 100` while excluding `3000`, effectively `3100, 3200, ... 30000`.
   - If `deploy/local/runtime/control.sh` already exists and `deploy/local/.env` or `.env.example` already contains a host port, keep that port and do not allocate a new one.
   - If the configured host port is occupied and the project service is not already running, auto-select another free port from the same `[30-300] * 100` pool and update public URL.
   - Probe health with a bounded retry loop and print recent service logs on failure.
   - Use concrete URLs in handoff.

7. Verify end to end:
   - Syntax-check generated scripts.
   - Validate Compose config.
   - Run first build and a second build to prove cache behavior if caching was added.
   - Start or apply the service and verify HTTP health.
   - Run relevant tests or report why tests were not run.

## Bundled Resources

- For lifecycle script semantics and command contracts, read `references/lifecycle-manager.md`.
- For frontend compile speed, task caching, Docker layer caching, and invalidation rules, read `references/build-cache.md`.
- For build/start/test failure triage patterns, read `references/diagnostics.md`.
- For Node/PNPM/NPM/Yarn projects, run or adapt:

```sh
node skills/local-project-runtime/scripts/scaffold-node-runtime.mjs --help
```

The scaffold script is a starting point, not a substitute for repo inspection. Review generated files before final handoff and adjust commands, ports, health paths, service names, and Dockerfile behavior to match the project.
