---
name: explain
description: Analyze a code snippet, file path, symbol name, or the current conversation context against the local repository and explain what it does in the project. Use when the user asks to explain code, understand a file or module's role, clarify how a function/class/config participates in the architecture, or wants important parameters, flags, callbacks, dependencies, and return values highlighted instead of only a line-by-line paraphrase.
---

# Explain

Explain the target in repository context, not in isolation. Always connect the local code to the surrounding call chain, owning module, upstream inputs, downstream effects, and user-visible responsibility.

Prefer evidence from the codebase. If a claim depends on inference, label it clearly as inference.

## Input Decision

1. Classify the input: code snippet → locate symbols in repo; file path → read file and expand to callers/callees; symbol name or implicit target → search repo for best match.
2. Resolve ambiguity before explaining. If multiple matches, explain the best match and mention the ambiguity briefly.
3. Keep scope aligned: a single-function question does not need a subsystem tour.

## Analysis Workflow

1. Read the target artifact.
2. Expand one layer outward.
   - Check who imports it, who calls it, what it calls, which config or env values feed it, and what outputs or side effects it produces.
3. Place it in project structure.
   - Identify whether it is an entry point, adapter, domain service, data model, UI component, CLI command, tool handler, scheduler job, test helper, or glue code.
4. Extract the important parameters.
   - Prioritize constructor params, function args, config fields, env vars, callback hooks, flags, discriminators, and return objects.
5. Explain why those parameters matter.
   - State what each important parameter controls, where it comes from, typical values, and what behavior changes when it is absent or changed.
6. Summarize the role.
   - End with the target's responsibility in one sentence that a new contributor can keep in their head.

## What To Explain

- The target's direct responsibility.
- Why it exists in this project.
- Where it sits in the call path or module graph.
- What invokes it and what it invokes.
- What data it consumes and produces.
- Which parameters are key and which are incidental.
- What would break or change if a key parameter changed.
- Whether it is framework boilerplate, business logic, integration glue, or cross-cutting infrastructure.

## Parameter Priority

When explaining parameters, focus on the ones that alter behavior or architecture:

- Branch selectors such as `type`, `mode`, `kind`, `provider`, `platform`, `strategy`.
- Lifecycle and control flags such as `enabled`, `background`, `stream`, `retry`, `timeout`, `strict`, `dry_run`.
- Dependency injection points such as `client`, `session`, `registry`, `store`, `callbacks`.
- External integration inputs such as API keys, endpoints, model names, file paths, and environment variables.
- User-facing filters and identifiers such as `id`, `name`, `slug`, `query`, `task_id`, `session_id`.
- Return values and mutated state when they determine what the next layer can do.

Do not spend most of the answer on trivial parameters such as obvious booleans, loop variables, or one-off temporary names unless they are central to correctness.

## Output Shape

Adapt the depth to the request, but prefer this structure:

1. Start with a short summary of what the target does in the project.
2. Explain its place in the surrounding architecture or flow.
3. Highlight the important parameters in a dedicated section or paragraph.
4. Add concise file or symbol references when they strengthen the explanation.
5. If useful, finish with "read this next" suggestions for the adjacent files or functions.

## Evidence Rules

- Prefer concrete repository evidence over generic language-level explanations.
- Distinguish observed behavior from inferred intent.
- If the provided snippet is partial, say what is confirmed by the snippet and what required repo lookup.
- If the target is generated code or framework glue, say so directly and shift focus to the real integration points.
- If the code is not found locally, explain based on the snippet or context and state that the project-level role could not be fully verified.

## Example Triggers

- "解释这段代码在项目里是干嘛的"
- "看看 `tools/mcp_tool.py` 的作用"
- "这个函数为什么要传 `session_id`"
- "这个配置项 `background_process_notifications` 会影响什么"
- "我没贴代码，结合我们刚才聊的 gateway 流程解释一下"

## Pitfalls

- Do not answer with a pure line-by-line translation while ignoring project role.
- Do not explain every parameter equally; rank them by behavioral impact.
- Do not assume a file is important just because it is large.
- Do not treat tests as the source of truth when production code is available.
- Do not overstate certainty when the user only provided a fragment.
