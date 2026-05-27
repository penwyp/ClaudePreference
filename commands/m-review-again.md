# Review Again: Multi-Round Review & Fix Loop

**Review rounds:** $ARGUMENTS (Default: 2)

Repeatedly review working-tree changes and apply fixes, iterating until clean or rounds exhausted.

## Commands:

1. **Parse rounds** — Extract round count N from $ARGUMENTS. Default to 2 if empty or invalid.

2. **Loop N rounds** — For each round:
   - **Review diff** — Check correctness bugs, simplifications, security issues, dead code.
   - **Apply fixes** — Edit files directly to resolve findings.
   - **Early exit** — If no issues found this round, stop. Don't pad to reach N.

3. **Summarize** — Report rounds executed, fixes per round, and reason for early exit if applicable.
