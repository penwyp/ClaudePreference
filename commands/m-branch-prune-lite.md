# Git Branch Management and Test/Merge Workflow List (no test version)

## Parameters

- `target_branch` (optional): The name of a specific worktree/branch to prune.

## Commands:

1. **Analyze each branch individually** - Review commit differences and document improvements

2. **Clean up merged branches** - Delete branches already merged into main

3. **Prune specific worktree and branch** - If a `target_branch` is provided, remove its associated worktree and then delete the branch.

4. **Execute sequential merge operations** - Merge remaining branches in order and resolve conflicts