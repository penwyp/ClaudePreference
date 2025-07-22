# Command: m:commit-push - Smart Commit and Push Workflow

## Overview

The `m:commit-push` is an automated Git commit and push workflow that intelligently generates messages compliant with Conventional Commits specifications. This command simplifies the code submission process, ensuring a consistent and readable commit history.

## Usage

```bash
/m:commit-push [message]
```

## Parameter Details

- `message` (optional): A custom commit message.
  - If not provided, the system will automatically generate a descriptive commit message based on the changes.
  - Supports Conventional Commits format (e.g., feat:, fix:, chore:, perf:).

## Usage Examples

### Automatically Generate Commit Message
```bash
/m:commit-push
```
**Expected Outcome**:
- Analyzes the current changes.
- Generates a message that complies with Conventional Commits specifications.
- Executes the commit and push operations.

### Custom Commit Message
```bash
/m:commit-push "feat: add user authentication system"
```
**Expected Outcome**:
- Commits with the provided message.
- Pushes to the remote repository.
- Displays the commit hash and push status.

### Fix-Type Commit
```bash
/m:commit-push "fix: resolve memory leak in data processing"
```
**Expected Outcome**:
- Creates a fix-type commit.
- Automatically marks it as a bug fix.
- Pushes to the remote repository.

## Workflow

### 1. Stage Changes
- Executes `git add .` to stage all changes.
- Checks for files that need to be committed.
- Excludes files listed in `.gitignore`.

### 2. Generate Commit Message
If no message is provided, the system will:
- Analyze the staged changes.
- Identify the type of change (e.g., new feature, fix, refactor).
- Generate a message compliant with Conventional Commits specifications.

### 3. Create Commit
- Creates a commit with the generated or provided message.
- Verifies that the commit was successful.
- Displays the commit hash.

### 4. Push to Remote
- Pushes to the remote repository of the current branch.
- Handles push conflicts.
- Displays the push result.

## Conventional Commit Types

| Type     | Description              | Example                                  |
|----------|--------------------------|------------------------------------------|
| `feat`   | A new feature            | `feat: add user login functionality`     |
| `fix`    | A bug fix                | `fix: resolve login timeout issue`       |
| `docs`   | Documentation changes    | `docs: update API documentation`         |
| `style`  | Code formatting          | `style: fix code formatting`             |
| `refactor`| Code refactoring         | `refactor: optimize data processing`     |
| `test`   | Test-related changes     | `test: add unit tests for auth module`   |
| `chore`  | Build/tool changes       | `chore: update dependencies`             |
| `perf`   | Performance improvements | `perf: improve query performance`        |

## Expected Outcomes

### Successful Execution
```
✅ 5 files staged
✅ Commit created successfully: feat: add user authentication (abc123f)
✅ Pushed to origin/main successfully
```

### Automatic Message Generation Example
```
Based on change analysis, generated commit message:
"feat: implement user dashboard with real-time updates"

Commit Details:
- New File: src/components/Dashboard.tsx
- Modified File: src/api/userService.ts
- Test File: tests/Dashboard.test.tsx
```

## Error Handling

### Common Error Scenarios

#### No Changes to Commit
```bash
/m:commit-push
```
**Result**:
```
⚠️ No changes detected to commit
Please make code changes before committing
```

#### Push Conflict
```bash
/m:commit-push "fix: resolve issue"
```
**Result**:
```
❌ Push failed: Remote repository has new commits
Recommendation: Run git pull to merge remote changes first
```

#### Incorrect Commit Message Format
```bash
/m:commit-push "bad message format"
```
**Result**:
```
⚠️ Commit message does not follow Conventional Commits specification
Recommended format: type: description
Example: feat: add new feature
```

## Best Practices

### 1. Pre-Commit Checks
- Ensure the code compiles successfully.
- Run relevant tests.
- Check code quality.

### 2. Message Writing
- Use the Conventional Commits format.
- Describe "what was done" rather than "how it was done."
- Keep it concise and clear.

### 3. Commit Frequency
- Make small, frequent commits.
- Each commit should address a single issue.
- Avoid mixing different types of changes.

### 4. Branch Management
- Work on feature branches.
- Push to the remote repository regularly.
- Keep branches in sync.

## Configuration Options

You can customize behavior through Git configuration:

```bash
# Set a default commit message format
git config --global commit.template ~/.gitmessage

# Configure push behavior
git config --global push.default current

# Enable automatic line ending conversion
git config --global core.autocrlf true
```

## Integration with Other Commands

### Development Workflow
```bash
/m:task-planner requirements.md    # Plan tasks
# Develop...
/m:test-generation unit src/       # Generate tests
/m:commit-push                     # Commit changes
```

### Fix Workflow
```bash
/m:bug-fix #123                    # Fix a bug
/m:commit-push "fix: resolve issue #123"
```

## Related Commands

- [m:bug-fix`](m-bug-fix.md) - Bug Fix Workflow
- [m:review-code`](m-review-code.md) - Code Review
- [m:merge-branch`](m-merge-branch.md) - Branch Merging
- [m:branch-prune`](m-branch-prune.md) - Branch Pruning
