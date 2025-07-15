# Auto Merge Workflow: Analyze, Merge, Resolve, Test, Commit

**Merge target:** `$BRANCH_NAME`

> ⚠️ **If no branch is specified, abort immediately with error:**
> `Error: No branch specified. Please provide a valid target branch for merge.`

Supported inputs: branch name (`feature/login-api`), pull request number (`#456`), or git URL.

## Commands:

1. **Analyze merge feasibility**

   * Fetch latest `main` and target branch.
   * Detect merge conflicts and list affected files.
   * Assess potential risk areas (e.g., core logic, config files).

2. **Merge branches with conflict resolution**

   * Automatically merge the branches.
   * For each conflict:

     * Prefer `main` for stability.
     * Merge `feature` logic if it adds functionality or fixes.
     * Avoid overwriting configs or key functions blindly.
     * Use semantic understanding to combine logic reasonably.

3. **Resolve and clean up conflicts**

   * Remove conflict markers.
   * Ensure all merged code is syntactically correct and logically complete.
   * Keep imports, function signatures, and references intact.

4. **Build and test verification**

   * **Ensure full compilation success. Abort if build fails.**
   * Run automated tests to catch regressions.
   * No unverified merge is allowed to proceed.

5. **Finalize commit**

   * Complete the merge with a clean commit message.
   * Do not push or report. Only prepare for further review or next step.