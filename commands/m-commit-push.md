# .claude/commands/commit-push.md
Commit and push changes.

Commit message: $ARGUMENTS

If no commit message is provided:
- Generate a descriptive commit message based on the changes
- Use conventional commit format (feat:, fix:, chore:, perf:, etc.)

1. Stage all changes with git add
2. Commit with appropriate message
3. Do not add "Co-Authored-By" or "Generated with [Claude Code]"
4. Push to remote repository