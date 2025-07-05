# Automated Project Hygiene Workflow

**Cleanup Scope:** $ARGUMENTS

If no scope is specified, a comprehensive cleanup of the entire project is performed by default.
Supported scopes: `code`, `dependencies`, `structure`, `artifacts`, `config`, `all`.
Example: "dependencies code"

## Commands:

1. **Dead Code Elimination** - Analyze the codebase to identify and safely remove unused functions, classes, variables, and imports.

2. **Dependency Pruning & Update** - Scan dependency files (e.g., `package.json`, `go.mod`) to find and remove unused packages and suggest updates for outdated ones.

3. **Codebase Formatting & Linting** - Apply standard formatters and linters across the project to enforce consistent coding style.

4. **Structural Reorganization** - Analyze and reorganize files and directories based on best practices to improve project clarity and maintainability.

5. **Artifact & Cache Clearing** - Delete temporary build artifacts, logs, and cache files to reduce project size and avoid conflicts.