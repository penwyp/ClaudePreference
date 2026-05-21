# Lifecycle Manager Reference

## File Layout

Prefer this structure unless the repo already has an equivalent convention:

```text
deploy/local/
├── docker-compose.yml
├── .env.example
├── README.md
└── runtime/
    └── control.sh
```

Keep runtime data under `deploy/local/data/` or another clearly local path ignored by git.

## Required Commands

- `init`: create `deploy/local/.env` if missing.
- `deps`: install workspace dependencies if missing or stale enough to block work.
- `build`: run the local build contract; use the cached wrapper if present.
- `test`: run the local test contract.
- `image`: build the Compose image without starting it.
- `start`: create/start the Compose service with `up -d --build`, then wait for health.
- `apply`: rebuild and force-recreate the service with `up -d --build --force-recreate`, then wait for health.
- `restart`: if the service container exists, restart it; if it does not exist, start it.
- `stop`: stop/down services without deleting data.
- `status`: show Compose state and HTTP health result.
- `logs`: tail service logs.
- `ps`: show Compose containers.
- `clean`: down services with volumes/remove-orphans and remove only local runtime data.
- `doctor`: print local tool versions, selected ports, env file path, Compose config validity, and likely next command.

## Port Policy

Use a single host port key such as `APP_PORT` or project-specific `<NAME>_PORT`.

Rules:

- Do not default new projects to port `3000`.
- For a newly generated local runtime, allocate a random free host port from `[30-300] * 100` while excluding `3000`, effectively one of `3100, 3200, ... 30000`.
- If `deploy/local/runtime/control.sh` already exists and `deploy/local/.env` or `deploy/local/.env.example` already contains a host port, preserve that port and do not allocate a new one.
- Do not hard-code a busy host port.
- If the service is already running, keep its configured port stable.
- If the service is not running and the configured port is occupied, choose another free port from the same non-3000 `[30-300] * 100` pool and update both the port and public URL in `.env`.
- Print the final URL after `start`, `apply`, and `restart`.

## Health Policy

Use bounded retries:

- Default attempts: 30
- Default interval: 2 seconds
- On failure, print the exact health URL and recent service logs.
- If the app has no reliable HTTP health endpoint, make health checks explicitly skippable with `HEALTH_PATH=none`; do not silently ignore failed health probes.

## Restart Semantics

`docker compose restart <service>` does not create a missing container. A robust `restart` command must check for an existing container first and use `up -d --build <service>` when none exists.

## Handoff

Always explain:

- The local URL.
- Which command applies code changes to the running container.
- Which command only restarts an existing container.
- Which command clears local runtime state.
