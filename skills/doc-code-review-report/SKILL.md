---
name: doc-code-review-report
description: Review text input or documents against the local codebase and produce a structured review report with findings and refactor suggestions. Use when the user provides requirements, design notes, API docs, Markdown analysis, PR text, or other written material and asks for a full review covering logic flaws, bugs, frontend-backend contract mismatches, TODOs, empty or fake implementations, missing behavior, or inconsistencies between the text and the code.
---

# Doc Code Review Report

## Overview

Review the user's text or document as a claim source, then verify those claims against the real codebase.
Produce an evidence-backed review report, not a summary, and separate confirmed issues from inference.

Read [references/report-template.md](./references/report-template.md) only when you need a ready-made report scaffold.

## Workflow

1. Normalize the review input.
- Accept plain text, Markdown, notes, PR descriptions, API docs, or design documents.
- Extract concrete claims: intended behavior, request flow, data fields, state changes, error handling, and unfinished work markers.
- If the input is broad, narrow it to the specific flow, module, or interface under review.

2. Locate the implementation before judging it.
- Find the real entry points first: routes, pages, handlers, services, schedulers, workers, repositories, generated clients, OpenAPI specs, or protocol types.
- Prefer concrete call paths over keyword-level guesses.
- If the document describes a frontend flow, trace both UI state transitions and backend requests.

3. Verify behavior claim by claim.
- Check whether the implemented logic matches the stated requirement or document claim.
- Distinguish:
  - documented but not implemented
  - implemented but undocumented
  - implemented differently from the document
  - behavior cannot be confirmed from current code

4. Review for correctness and bug risk.
- Look for broken conditions, missing branches, invalid assumptions, stale state, race windows, missing null or empty handling, unchecked errors, and inconsistent data transformations.
- Treat "works on happy path only" as a real finding when failure branches are absent or contradicted by the input document.

5. Cross-check frontend and backend contracts when the flow crosses layers.
- Confirm method, path, path params, query params, body fields, enum values, response fields, and error shapes.
- Compare frontend request builders, generated API clients, backend handlers, service DTOs, protocol definitions, and local OpenAPI or schema files.
- Flag mismatches such as renamed fields, optional-vs-required drift, type drift, enum drift, and response shape assumptions unsupported by backend code.

6. Inspect unfinished or fake code paths.
- Search for `TODO`, `FIXME`, `HACK`, `unimplemented`, `panic`, placeholder branches, dummy return values, feature flags that permanently short-circuit logic, or test doubles leaking into production paths.
- Also inspect "empty success" implementations: functions that return `Ok`, `true`, empty arrays, empty structs, or stub messages without real side effects.

7. Write the review report as reviewer findings first.
- Order findings by severity and user impact.
- Include file references for each confirmed finding.
- Separate evidence from inference and list open questions only when they block certainty.
- End with concrete refactor or remediation suggestions instead of vague advice.

## Review Dimensions

- `逻辑问题`: The code path does not satisfy the described business rule, state machine, or control flow.
- `BUG风险`: The implementation can panic, silently fail, corrupt state, skip validation, or produce incorrect data.
- `前后端接口不一致`: The client and server disagree on contract shape, endpoint usage, or state assumptions.
- `TODO/空实现/假实现`: The code advertises completion but contains placeholders, inert branches, or no-op behavior.
- `文档与代码不一致`: The provided text claims behavior that the code does not implement, or omits behavior the code already has.

## Evidence Rules

- Prefer direct evidence from source code, generated clients, schema files, and route definitions.
- Do not claim an interface mismatch unless both sides were checked.
- Do not treat naming differences alone as bugs unless they affect data flow or runtime behavior.
- When the document is ambiguous, say so and downgrade certainty instead of filling gaps with assumptions.
- If a missing implementation may live outside the current repository, state that boundary explicitly.

## Output Format

Use concise sections in this order:

- `Review scope`
- `Overall assessment`
- `Findings`
- `Contract check`
- `TODO / stub / fake implementation check`
- `Refactor suggestions`
- `Open questions`

For `Findings`, use one flat bullet per issue and keep this shape:

- Severity label: `Critical`, `High`, `Medium`, or `Low`
- Problem statement
- Why it is wrong or risky
- Evidence with file references
- Suggested fix direction

If no confirmed findings exist, say that explicitly and still report residual risk or unchecked areas.

## Practical Search Pattern

1. Read the user text and extract the key claims or promised behavior.
2. Find the owning module and real execution path in code.
3. Trace request and response shapes across boundaries.
4. Search for unfinished markers and fake return paths in the relevant scope.
5. Write findings first, then remediation guidance.

## Guardrails

- Do not stop at summarizing the document.
- Do not trust comments or docs over executable code without saying so.
- Do not list style nits unless the user explicitly asks for style review.
- Do not dilute the report with low-signal observations when higher-risk issues exist.
- Do not merge multiple independent problems into one bullet; keep each finding atomic.
