# Review scope

- Input material:
- Review target:
- Checked code areas:
- Not checked:

# Overall assessment

- One short paragraph stating whether the document and implementation are aligned.
- Mention the highest-risk gap first.

# Findings

- `Critical | High | Medium | Low` Title
  Problem:
  Impact:
  Evidence:
  Fix direction:

# Contract check

- Frontend request shape:
- Backend handler / DTO shape:
- Response consumption:
- Confirmed mismatches:
- Unconfirmed assumptions:

# TODO / stub / fake implementation check

- Confirmed placeholders:
- Empty or inert success paths:
- Risk created by unfinished logic:

# Refactor suggestions

- Suggest the smallest architecture-consistent remediation path first.
- Prefer changes that remove ambiguity between document, API contract, and runtime behavior.

# Open questions

- Only include questions that block certainty or require code outside the current repo.
