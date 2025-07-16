# Command: m-branch-prune

## Description

The `m-branch-prune` command is a powerful tool for cleaning up local branches in your Git repository. It extends the functionality of `m-branch-prune-lite` by not only listing merged local branches but also providing an interactive way to delete them.

This command helps you maintain a tidy local repository by streamlining the process of identifying and removing obsolete branches.

## How to Use

To use this command, run the following in your terminal:

```bash
m-branch-prune
```

The command will first display a list of local branches that have been merged into the current HEAD. It will then prompt you to confirm the deletion of each branch, allowing you to selectively prune your local repository.
