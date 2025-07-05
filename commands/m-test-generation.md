# Test Generation Workflow

**Test type and target:** $ARGUMENTS

If no parameters specified, generate unit tests for recently modified files by default.
Format: [test-type] [target] [coverage-goal]
Examples: "unit src/auth 90%", "integration api", "e2e user-flow", "all components"

## Commands:

1. **Analyze code coverage** - Identify untested functions and code paths in specified target

2. **Generate unit tests** - Create comprehensive test cases for individual components

3. **Create integration tests** - Build tests for component interactions and workflows

4. **Run test suite** - Execute all tests and verify functionality

5. **Update test documentation** - Record test coverage and testing strategies