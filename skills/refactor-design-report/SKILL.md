---
name: refactor-design-report
description: Produce a professional, code-grounded refactor or implementation design report from identified technical problems, product gaps, review findings, architecture concerns, or frontend-backend contract issues. Use when Codex is asked to turn bugs, missing protections, design gaps, API/UI mismatches, or desired behavior changes into a detailed backend/frontend/系统改造方案, persistent design document, implementation plan, test matrix, rollout plan, or acceptance criteria.
---

# Refactor Design Report

## Purpose

Create a durable engineering report that turns concrete problems into an executable design. Ground the report in the current code and contracts first, then describe the target model, backend changes, frontend changes, validation strategy, implementation order, and acceptance criteria.

## Workflow

1. Normalize the request.
   - Extract the concrete issues, desired behavior, affected user flows, and any stated constraints.
   - Separate current defects from desired future capabilities.
   - If the user says to persist the result, write a focused design document in the appropriate docs location; otherwise provide the report in the reply.

2. Locate the real implementation.
   - Find entry points before designing: API definitions, handlers, service methods, data models, workflow runners, frontend request builders, UI components, tests, and docs.
   - Prefer real call paths over keyword-level guesses.
   - Identify what is already implemented, what is only documented, and what is missing.

3. Define the target semantics.
   - Name the core concepts and states precisely.
   - State invariant rules as hard requirements, not suggestions.
   - Resolve ambiguous user-facing terms into exact technical meanings.
   - Decide which behavior belongs in backend hard validation, frontend guidance, workflow preflight, and tests.

4. Design the backend.
   - Cover API/proto/schema changes, storage changes, service validation, workflow/runtime changes, error types, idempotency, locking, and retry behavior.
   - Put hard safety rules in backend paths that cannot be bypassed by the UI.
   - Include both precheck-time and execution-time validation when state can change between submit and execution.

5. Design the frontend.
   - Cover UI state, available actions, disabled states, warnings, confirmations, request shape, response handling, and stale precheck protection.
   - Ensure user wording matches the actual backend semantics.
   - Prevent users from selecting impossible or unsafe combinations; still rely on backend validation as final authority.

6. Define verification.
   - Include unit tests for pure rules.
   - Include service/integration tests for API behavior.
   - Include frontend tests for UI gating and user guidance.
   - Include E2E matrix cases for the highest-risk flows.

7. Provide implementation order.
   - Sequence changes from contracts and data model through backend, frontend, generation, tests, and rollout.
   - Call out generated code, migrations, docs, and compatibility choices explicitly.

## Report Format

Use this structure unless the user asks for a different format:

```markdown
# <Short Design Title>

## Scope

Briefly state the problems being solved and the explicit constraints.

## Current State

Describe the current implementation with concrete evidence. Include file references when working in a local repository.

## Target Semantics

Define terms, invariants, state transitions, and user-visible meanings.

## Data Model And Contracts

Describe API, schema, storage, event, or protocol changes. Include example payloads when helpful.

## Backend Design

Describe validation rules, service flow, workflow/runtime changes, errors, locking, retries, and persistence.

## Frontend Design

Describe UI controls, dynamic options, copy, warnings, confirmations, request building, and response handling.

## Workflow / Runtime

Describe job phases, command generation, preflight checks, async behavior, and failure handling.

## Compatibility And Rollout

State whether backward compatibility is required. If not, say what can be deleted or replaced.

## Test Plan

List backend unit tests, service/API tests, frontend tests, and E2E matrix.

## Implementation Order

Give numbered steps that an engineer can execute.

## Acceptance Criteria

List observable conditions that must be true when the work is complete.

## Open Questions

Only include questions that block implementation or materially change the design.
```

## Review Rules

- Lead with findings and decisions, not background.
- Do not invent product-specific facts. If a fact must come from code, inspect the code.
- Distinguish confirmed evidence from inference.
- Prefer backend hard validation for safety, frontend guidance for ergonomics, and workflow preflight for race-prone runtime state.
- Do not hide known gaps. Label them as current gaps, target behavior, or out of scope.
- Use concrete error names, request fields, state names, and test names when designing implementation details.
- Avoid vague advice such as "add checks" or "improve UI"; specify where the check lives, what it reads, what it rejects, and how the user sees it.

## Output Quality Bar

The report is complete when another engineer can implement from it without reconstructing the reasoning. It should include:

- The exact current problem.
- The exact target behavior.
- Backend enforcement points.
- Frontend user guidance and blocking behavior.
- Contract and persistence changes.
- Runtime race protections.
- Tests that prove the behavior.
- Clear acceptance criteria.
