# Diagnostics Reference

## Build Failures

Classify before fixing:

- Missing dependencies: package manager install, lockfile mismatch, workspace link issue.
- Type errors: contract mismatch across shared/server/ui packages.
- Bundler errors: missing config, alias, environment define, static asset, or workspace package source.
- Docker build errors: missing copied files, stale `.dockerignore`, invalid layer order, missing system packages.
- Migration/codegen errors: generated files or DB schema out of sync.

Fix the root contract and rerun the smallest failing command.

## Startup Failures

Check in order:

1. Is there a container or process at all?
2. Is the host port available and mapped to the expected container port?
3. Does the app bind to `0.0.0.0` inside Docker?
4. Does the app require env/secrets/config not present in local `.env`?
5. Did migrations or DB initialization fail?
6. Is the health path correct?
7. Are logs showing a crash loop after successful container creation?

Common fixes:

- Make `restart` create the service when no container exists.
- Auto-select a free port when the configured host port is occupied.
- Set container `HOST=0.0.0.0`.
- Persist local data in a local ignored directory.
- Print recent logs on health failure.

## Test Failures

Separate:

- Test runner cannot start.
- Unit tests fail deterministically.
- Integration tests need services.
- Browser/E2E tests need a running app.
- Flaky external dependency failures.

Use the lifecycle manager to start dependencies before integration/browser tests. Report skipped browser or external tests explicitly when not relevant or not runnable.

## Final Verification Shape

For a local runtime fix, a strong handoff usually includes:

- Script syntax check.
- Compose config validation.
- Build result, including cache-hit proof if caching was added.
- Service status and health URL.
- Test result or clear reason not run.
