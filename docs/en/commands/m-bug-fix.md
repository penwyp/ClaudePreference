# m-bug-fix - Comprehensive Bug Fix Workflow

## Overview

`m-bug-fix` is a comprehensive workflow for analyzing, reproducing, identifying, fixing, and verifying bugs. The command supports various bug source input formats, including issue numbers, error text, screenshots, log files, or bug descriptions, enabling a systematic approach to resolving issues in the codebase.

## Usage

```bash
/m-bug-fix [source]
```

## Parameter Details

- `source` (optional): Information about the bug source.
  - **Default Behavior**: Analyzes recent error logs and failed tests.
  - **Supported Formats**:
    - **Issue Number**: `#123`
    - **Error Text**: `"NullPointerException in login"`
    - **Screenshot/Image**: `screenshot.png`
    - **Log File**: `logs/error.log`
    - **Bug Description**: `"User login times out"`

## Usage Examples

### Fix Based on Issue Number
```bash
/m-bug-fix #123
```
**Expected Outcome**:
- Fetches issue details from platforms like GitHub/GitLab.
- Analyzes the issue description and reproduction steps.
- Pinpoints the relevant code area.
- Implements a fix.

### Fix Based on Error Text
```bash
/m-bug-fix "NullPointerException in UserService.login()"
```
**Expected Outcome**:
- Parses the error message.
- Navigates to the `UserService.login()` method.
- Analyzes the cause of the null pointer exception.
- Implements null checks and handling.

### Fix Based on Screenshot
```bash
/m-bug-fix screenshot.png
```
**Expected Outcome**:
- Analyzes error information from the screenshot.
- Identifies UI anomalies or error messages.
- Locates the relevant frontend/backend code.
- Fixes the display issue.

### Fix Based on Log File
```bash
/m-bug-fix logs/error.log
```
**Expected Outcome**:
- Parses the content of the log file.
- Identifies error patterns and stack traces.
- Pinpoints the root cause of the problem.
- Fixes the underlying issue.

### Default Analysis Mode
```bash
/m-bug-fix
```
**Expected Outcome**:
- Scans recent error logs.
- Checks failed test cases.
- Identifies potential issues.
- Provides fix recommendations.

## Workflow

### 1. Analyze Bug Source
- **Parse Input**: Analyzes the provided issue, image, text, or logs.
- **Contextual Research**: Uses `context7` to search for relevant documentation and solutions.
- **Categorize Issue**: Determines the bug type (e.g., logic error, performance issue, UI anomaly).

### 2. Reproduce the Issue
- **Setup Environment**: Prepares the testing environment.
- **Create Test Case**: Writes a test case to consistently reproduce the bug.
- **Verify Consistency**: Ensures the bug can be reproduced reliably.

### 3. Identify Root Cause
- **Code Tracing**: Traces the code execution path.
- **Stack Analysis**: Analyzes the call stack and error location.
- **Dependency Check**: Examines related dependencies and configurations.
- **Data Flow Analysis**: Tracks the flow of data through the system.

### 4. Implement Fix
- **Targeted Solution**: Applies a fix with minimal side effects.
- **Code Review**: Ensures the fix does not introduce new problems.
- **Best Practices**: Follows project coding standards.
- **Update Documentation**: Records the fix process and rationale.

### 5. Verify Fix and Test
- **Unit Testing**: Verifies the specific functionality of the fix.
- **Integration Testing**: Ensures the overall system functions correctly.
- **Regression Testing**: Verifies that no new issues have been introduced.
- **Performance Testing**: Checks the impact of the fix on performance.

## Handling Different Bug Types

### NullPointerException
```bash
/m-bug-fix "NullPointerException in payment processing"
```
**Process**:
1. Locate where the null pointer occurs.
2. Analyze data flow and object lifecycle.
3. Add null checks.
4. Implement defensive programming.

### Memory Leak
```bash
/m-bug-fix "Memory leak in data processing service"
```
**Process**:
1. Use memory analysis tools.
2. Identify unreleased resources.
3. Add appropriate cleanup code.
4. Implement resource management best practices.

### Concurrency Issue
```bash
/m-bug-fix "Race condition in user session management"
```
**Process**:
1. Analyze concurrent access patterns.
2. Identify the race condition.
3. Implement synchronization mechanisms.
4. Add thread-safety checks.

### Performance Issue
```bash
/m-bug-fix "Query timeout in user dashboard"
```
**Process**:
1. Analyze query performance.
2. Identify bottlenecks.
3. Optimize query logic.
4. Add caching mechanisms.

## Expected Outcomes

### Successful Fix Output
```
🔍 Bug analysis complete
  - Issue Type: NullPointerException
  - Impact Scope: UserService.login()
  - Root Cause: Missing input parameter validation

🔧 Fix implemented
  - Added parameter null check
  - Implemented exception handling
  - Updated relevant documentation

✅ Verification passed
  - Unit Tests: 15/15 passed
  - Integration Tests: 8/8 passed
  - Regression Tests: No new issues

📋 Fix Summary
  - Fixed File: src/services/UserService.java
  - Test File: tests/UserServiceTest.java
  - Commit Message: "fix: add null check in UserService.login()"
```

### Issue Analysis Report
```
📊 Bug Analysis Report
  - Issue ID: #123
  - Severity: High
  - Affected Users: Logged-in users
  - Reproducibility: 100%
  - Fix Time: 2 hours

🔍 Root Cause Analysis
  - Direct Cause: Input parameter not validated
  - Root Cause: Lack of defensive programming
  - Preventive Measure: Add an input validation framework

🛠️ Fix Plan
  - Short-term: Add null checks
  - Long-term: Implement global input validation
  - Monitoring: Add exception monitoring
```

## Error Handling

### Unable to Reproduce
```
⚠️ Unable to reproduce issue
Possible reasons:
- Different environment configuration
- Data state has changed
- Time-dependent issue
Recommendation: Collect more context information
```

### Fix Verification Failed
```
❌ Fix verification failed
- 3/15 unit tests failed
- Regression issue detected
Recommendation: Roll back the fix and re-analyze
```

## Best Practices

### 1. Issue Analysis
- Collect complete error information.
- Document reproduction steps.
- Analyze the scope of impact.
- Determine priority.

### 2. Fix Implementation
- Minimize the scope of changes.
- Follow coding standards.
- Add appropriate tests.
- Document the reason for the fix.

### 3. Test Verification
- Write targeted tests.
- Perform regression testing.
- Verify performance impact.
- Check boundary cases.

### 4. Documentation
- Document the analysis process.
- Document the fix plan.
- Update relevant documentation.
- Share lessons learned.

## Tool Integration

### Debugging Tools
- Debugger integration
- Log analysis tools
- Performance profilers
- Memory leak detectors

### Testing Tools
- Unit testing frameworks
- Integration testing tools
- Load testing tools
- Automated testing

## Related Commands

- [`m-test-generation`](m-test-generation.md) - Generate test cases
- [`m-review-code`](m-review-code.md) - Code review
- [`m-security-scan`](m-security-scan.md) - Security scan
- [`m-commit-push`](m-commit-push.md) - Commit fix
