# Build Cache Reference

## Host Build Cache

For Node monorepos, avoid forcing frontend production bundling on every local runtime build.

Recommended pattern:

1. Build non-frontend workspaces first.
2. Hash frontend inputs.
3. Skip frontend build if the hash is unchanged and `dist/index.html` exists.
4. Allow forced rebuild with an environment variable such as `LOCAL_FORCE_UI_BUILD=true`.

Hash inputs should include:

- Root manifest and lockfile.
- Workspace config such as `pnpm-workspace.yaml`.
- Frontend package source, config, public assets, and index HTML.
- Shared packages imported by the frontend.
- Adapter/client packages imported by the frontend.

Hash inputs should exclude:

- `node_modules`
- `dist`
- `.vite`
- coverage output
- logs
- `*.tsbuildinfo`
- local runtime data

## Docker Layer Cache

If frontend and backend are in one Dockerfile, do not place `COPY . .` before frontend build. That invalidates frontend bundling whenever any backend file changes.

Prefer:

```dockerfile
FROM deps AS build

FROM build AS ui-build
COPY tsconfig.base.json tsconfig.json ./
COPY ui/ ui/
COPY packages/shared/ packages/shared/
RUN pnpm --filter @scope/ui build

FROM build AS app-build
COPY . .
COPY --from=ui-build /app/ui/dist /app/ui/dist
RUN pnpm --filter @scope/server build
```

Adapt copied package paths to the actual frontend import graph. If the frontend imports shared workspace packages directly, those packages must be copied into the UI layer.

## Existing Task Runners

If the repo already uses Turborepo, Nx, Bazel, Pants, Gradle build cache, or Make targets:

- Prefer the existing cache system over adding a parallel cache.
- Fix cache keys and task dependencies instead of wrapping everything.
- Still keep a lifecycle manager so humans have one entrypoint.

## Verification

After adding build caching:

- Run a first build to populate cache.
- Run a second build without source changes and confirm the frontend step is skipped or cached.
- Touch a frontend source file and confirm the frontend step reruns.
- Touch a backend-only file and confirm frontend bundling stays cached.
