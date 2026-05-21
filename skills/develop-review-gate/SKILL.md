---
name: develop-review-gate
description: '适用于这类请求：直接在当前 checkout 完成开发、固定做两轮自我 review/refactor、先把最终 review 结果给人类确认、确认后再继续改动、提交或进入下一步。用户可能会说："先开发再自审两轮"、"先 review 两次再给我确认"、"不要开 worktree，直接改"、"先输出 review 结论不要继续"、"做完先停在 gate"。'
---

# Develop Review Gate

## Workflow

1. Confirm scope and current workspace state.
- Work in the current checkout instead of creating a worktree.
- Inspect the repository and any existing local changes before editing.
- If the worktree is already dirty, preserve unrelated user changes and limit edits to the task scope.

2. Implement the requested change in the current checkout.
- Explore the relevant code before editing.
- Finish the feasible scope instead of stopping at a partial patch.
- Keep architecture consistent with the project; do not use temporary patch-style fixes unless the change is truly a local no-risk micro-fix.

3. Run self-review pass 1.
- Inspect the diff as a reviewer instead of as the original author.
- Look for correctness bugs, regressions, missing tests, naming issues, leaky abstractions, and unnecessary complexity.
- Apply the fixes that are clearly actionable.
- Run the most relevant tests, lint, or build checks for the changed area.

4. Run self-review pass 2.
- Re-inspect the updated diff with the same reviewer mindset.
- Focus on issues left after the first pass: edge cases, maintainability, API consistency, error handling, and test quality.
- Apply the second-pass fixes that materially improve the result.
- Re-run the most relevant verification after the refactor.

5. Produce the approval gate output and pause.
- Report the final review findings first. If no blocking findings remain, say that explicitly.
- Summarize what changed, what was refactored during both self-review passes, what verification ran, and what did not run.
- Include the current branch, touched files, and working tree status when relevant.
- Call out residual risks or open questions.
- End in a waiting state such as: `Awaiting human confirmation: continue coding, request more changes, commit, or proceed with the next step.`
- Do not continue into extra scope, commit, or destructive cleanup unless the human explicitly confirms.

## Review Output

Use concise sections in this order:
- `Self-review findings`
- `Change summary`
- `Refactors applied`
- `Verification`
- `Residual risks`
- `Awaiting confirmation`

Include file references when calling out findings or material changes.

## After Confirmation

### Continue Coding

- Keep using the same checkout.
- Repeat the implement -> review pass 1 -> review pass 2 -> approval gate cycle.
- Preserve any unrelated user changes already present in the worktree.

### Commit Or Next Step

- Re-check `git status` before committing or taking the requested next step.
- Commit only when the human explicitly asks for it.
- If verification is stale after follow-up edits, run the most relevant checks again before committing or proceeding.

## Guardrails

- Always run two self-review passes for this workflow unless the human explicitly asks to shorten it.
- Never hide failed verification. Report the failure and stop for direction.
- Never overwrite or revert unrelated user changes in the current checkout.
- Never claim the branch is ready without describing what was verified and what was not.
- Never continue past the approval gate without explicit human confirmation.
