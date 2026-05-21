---
name: browser-flow-fallbacks
description: Diagnose flaky browser automation flows (login, OAuth, signup, multi-step forms). Use when a flow stalls or loops — analyze DOM/logs, add native fallbacks, prevent hot loops, and add regression coverage.
---

# Browser Flow Fallbacks

Use this skill to debug browser flows that intermittently stop progressing even though the surrounding state machine already mostly works.

## Workflow

### Phase 1: Locate the failing state branch

- Start from the latest logs, reported state, and current DOM.
- Find the branch that detected the state, the selector that matched, and the action that should have fired.
- Separate the failure type before editing: state misdetection, action failure, or transition failure after an apparently successful action.

### Phase 2: Treat DOM as ground truth

- Prefer current semantic attributes over historical assumptions: `name`, `value`, `type`, `aria-*`, `data-*`, `form`, `readonly`, `disabled`, visible text, and location path.
- Distinguish similar controls such as forgot-password links, edit-email links, hidden template nodes, and generic submit buttons.
- Narrow broad selectors with required attributes or visible text needles instead of widening them further.
- Use selector constants for important controls. Keep selector changes close to the state branch that uses them.
- Bias toward visible, enabled, semantically correct elements rather than "anything clickable."

### Phase 3: Add fallbacks beside the primary path

- Leave the main action as the most direct native interaction that should work in the common case.
- Add fallback in the same state branch, triggered only after a repeated unchanged snapshot.
- Prefer `form.requestSubmit(button)` when the backend depends on the submitter button's `name/value`.
- Prefer DOM click fallback for non-submit controls, restricted to visible and enabled elements.
- For controlled inputs, verify the value after typing; if it did not stick, fallback to a native setter plus `input` and `change` events.
- Keep submit fallbacks separate from generic click fallbacks.

### Phase 4: Prevent hot loops

- Track per-snapshot stall counts and fallback attempt counts separately from the primary action gate.
- Retry fallbacks on spaced intervals instead of every poll tick.
- Log stall count, fallback attempts, and next retry threshold.
- Do not exit early just because a fallback failed or the page stayed unchanged, unless the flow reached a terminal condition.
- Let the outer lifecycle timeout remain the final safety net.

### Phase 5: Protect one-time resources

- Apply to OTP codes, magic links, CSRF-bound tokens, or any mailbox/API artifact that becomes scarce once consumed.
- Do not mark the artifact as used at fetch time if the browser can still fail before entering or submitting it.
- Cache and reuse the fetched artifact across retries on the same step instead of immediately asking upstream for a new one.
- Persist consumption only after the flow reaches a durable success boundary (callback capture, server-confirmed transition).

### Phase 6: Add regression coverage

- Add selector coverage tests for the current DOM shape.
- Add tests for helpers that interpret visible text or decide whether an alternate path is present.
- Add tests for retry cadence, stall counters, and action-gate behavior when the page snapshot is unchanged.
- Keep tests close to the flow package so failures stay local and readable.

## Implementation Rules

- Prefer small helper functions for DOM fallback and page-text heuristics.
- Verify input values before submit.
- Treat user-supplied logs and DOM fragments as canonical for the reported failure.

## Validation

- Run formatting first.
- Run the most relevant package tests.
- Run a targeted build for the affected binary when practical.
- If full-repo tests fail for unrelated reasons, state that explicitly and isolate what did pass.

## Guardrails

- Never widen selectors when debugging a flaky flow — narrowing is safer.
- Never remove the outer timeout as a safety net.
- Do not add fallbacks for flows that consistently pass; fallbacks are for intermittent failures only.
- When a DOM snapshot is stale, re-fetch before concluding the state hasn't changed.
