# m:review-code - Comprehensive Code Review Workflow

## Overview

The `m:review-code` is a comprehensive code review tool that provides in-depth analysis of code quality, architectural assessment, and security checks. The command generates detailed bilingual reports covering functional completeness, critical bugs, code smells, third-party library optimization suggestions, and test coverage evaluation.

## Usage

```bash
/m:review-code [target] [depth] [focus]
```

## Parameter Details

- `target` (optional): The review target.
  - **Default**: Latest commits of the current branch.
  - **Supports**: File paths, directories, branches, PR numbers.
  - **Examples**: `src/auth`, `PR#123`, `feature-branch`.
- `depth` (optional): The depth of the review.
  - `quick` - Quick review (basic checks).
  - `standard` - Standard review (comprehensive analysis).
  - `deep` - Deep review (detailed analysis).
- `focus` (optional): The focus of the review.
  - `security` - Security review.
  - `performance` - Performance review.
  - `architecture` - Architecture review.
  - `quality` - Code quality review.

## Usage Examples

### Standard Code Review
```bash
/m:review-code
```
**Expected Outcome**:
- Reviews the latest commits of the current branch.
- Performs a standard-depth analysis.
- Generates a comprehensive review report.
- Covers all review dimensions.

### Deep Security Review
```bash
/m:review-code src/auth deep security
```
**Expected Outcome**:
- Deeply reviews the authentication module.
- Focuses on security issues.
- Identifies potential security vulnerabilities.
- Provides security improvement suggestions.

### Quick PR Review
```bash
/m:review-code PR#123 quick
```
**Expected Outcome**:
- Quickly reviews the Pull Request.
- Performs basic quality checks.
- Provides quick feedback and suggestions.
- Highlights critical issues.

### Performance Review
```bash
/m:review-code components standard performance
```
**Expected Outcome**:
- Reviews component performance.
- Identifies performance bottlenecks.
- Provides optimization suggestions.
- Analyzes resource usage.

### Architecture Review
```bash
/m:review-code src/core deep architecture
```
**Expected Outcome**:
- In-depth architecture analysis.
- Evaluates design patterns.
- Checks architectural consistency.
- Provides refactoring suggestions.

## Workflow

### 1. Architecture & Pattern Analysis
- **Repository Pattern Review**: Checks service layers and migration strategies.
- **System Design Assessment**: Evaluates architectural decisions and structural changes.
- **Design Pattern Identification**: Identifies and evaluates the design patterns used.
- **Dependency Analysis**: Analyzes dependencies between modules.

### 2. Security & Multi-tenancy Validation
- **Authentication/Authorization Check**: Validates authentication and authorization mechanisms.
- **Tenant Isolation**: Checks isolation in multi-tenant environments.
- **Vulnerability Identification**: Identifies potential security risks.
- **Access Control**: Validates the implementation of access control.

### 3. Functional Completeness Verification
- **Requirements Implementation**: Ensures all requirements are correctly implemented.
- **Edge Cases**: Validates handling of edge cases and exceptions.
- **Input Validation**: Checks the completeness of input validation.
- **Error Handling**: Assesses the robustness of error handling.

### 4. Code Quality Assessment
- **Code Smells**: Identifies anti-patterns and design issues.
- **Duplicated Code**: Detects code duplication and redundancy.
- **Complexity Analysis**: Evaluates code complexity and maintainability.
- **Runtime Issues**: Detects potential runtime problems.

### 5. Test Coverage Evaluation
- **Coverage Analysis**: Evaluates unit and integration test coverage.
- **Test Quality**: Checks the quality and effectiveness of tests.
- **Missing Tests**: Identifies gaps in test coverage.
- **Edge Case Coverage**: Validates test coverage for edge cases.

### 6. Third-party Library Optimization Suggestions
- **Library Alternatives**: Suggests better third-party libraries.
- **Integration Assessment**: Evaluates the risks and benefits of library integration.
- **Version Upgrades**: Recommends library version upgrades.
- **Security Assessment**: Evaluates the security of third-party libraries.

### 7. Bilingual Report Generation
- **Structured Report**: Generates a structured Markdown report.
- **Bilingual Support**: Provides a report in both English and Chinese.
- **File Saving**: Saves the report to the `docs/workspaces/` directory.
- **Timestamping**: Adds a timestamp for tracking.

## Detailed Review Dimensions

### Functional Completeness
**Checks**:
- Requirements implementation status.
- Edge case handling.
- Exception handling.
- Input validation completeness.

**Criteria**:
- All functional requirements are implemented.
- Edge cases are handled correctly.
- Exceptions are handled appropriately.
- Input validation covers all input points.

### Critical Bugs
**Checks**:
- Potential crashes and exceptions.
- Security vulnerabilities.
- Performance bottlenecks.
- Resource leaks.

**Risk Levels**:
- **High**: May cause system crashes or data leaks.
- **Medium**: Affects normal functionality.
- **Low**: Affects user experience.

### Code Smells
**Checks**:
- Use of anti-patterns.
- Code duplication.
- Overly complex logic.
- Maintainability issues.

**Common Issues**:
- Long methods and large classes.
- Duplicated code.
- High coupling.
- Lack of abstraction.

### Third-party Opportunities
**Evaluation**:
- Library replacement suggestions.
- Integration benefit assessment.
- Risk analysis.
- Version upgrade recommendations.

**Considerations**:
- Functional completeness.
- Performance impact.
- Security.
- Maintenance activity.

## Expected Outcome

### Code Review Report
```markdown
# Code Review Report - Auth Module
Review Time: 2025-01-15 14:30:00
Target: src/auth
Depth: Deep Review
Focus: Security

## Executive Summary
- Overall Score: B+ (82/100)
- Key Issues: 3 high-risk, 5 medium-risk
- Priority: Immediately fix high-risk issues
- Estimated Fix Time: 2-3 days

## Functional Completeness
✅ **Overall Assessment**: Good (85%)

### Implemented Features
- User registration and login
- Password reset functionality
- Session management
- Permission validation

### Issues Found
1. **Medium Risk**: Password reset function lacks frequency limiting.
   - Location: `src/auth/passwordReset.js:45`
   - Impact: Could be used for spamming.
   - Suggestion: Add a rate-limiting mechanism.

2. **Low Risk**: Login failure limit is too lenient.
   - Location: `src/auth/login.js:32`
   - Impact: Brute-force attack risk.
   - Suggestion: Lower the failure threshold.

## Critical Bugs
🚨 **Found 3 high-risk issues**

### High-Risk Issues
1. **SQL Injection Risk**
   - Location: `src/auth/userService.js:78`
   - Code: `query = "SELECT * FROM users WHERE email = '" + email + "'"`
   - Risk: Database information leakage.
   - Fix: Use parameterized queries.

2. **Hardcoded Secret Key**
   - Location: `src/auth/jwtService.js:12`
   - Code: `const SECRET_KEY = "hardcoded_secret_123"`
   - Risk: Tokens can be arbitrarily forged.
   - Fix: Use environment variables.

3. **Unvalidated Redirect**
   - Location: `src/auth/authController.js:156`
   - Code: `res.redirect(req.query.returnUrl)`
   - Risk: Open redirect attack.
   - Fix: Validate redirect URL against a whitelist.

### Medium-Risk Issues
1. **Session Fixation Vulnerability** (src/auth/sessionManager.js:34)
2. **Logging of Sensitive Information** (src/auth/logger.js:67)
3. **Missing CSRF Protection** (src/auth/middleware.js:23)

## Code Smells
⚠️ **Multiple design issues found**

### Key Issues
1. **Long Method**: `validateUserCredentials()` method is too long (120 lines).
2. **Duplicated Code**: Input validation logic is duplicated in multiple files.
3. **High Coupling**: AuthController directly depends on database operations.
4. **Lack of Abstraction**: Similar validation logic is not abstracted into a common interface.

### Improvement Suggestions
1. Split the long method into smaller methods.
2. Create a common utility class for input validation.
3. Introduce the repository pattern to decouple data access.
4. Create a validation interface and implementation classes.

## Third-party Opportunities
📦 **Library Optimization Suggestions**

### Recommended Replacements
1. **Custom JWT implementation → jsonwebtoken**
   - Benefit: More secure implementation, better maintenance.
   - Risk: Requires migration of existing code.
   - Priority: High.

2. **Custom password hashing → bcrypt**
   - Benefit: Industry standard, better security.
   - Risk: Performance impact needs evaluation.
   - Priority: High.

3. **Custom validation → joi**
   - Benefit: Better validation features, less code.
   - Risk: Learning curve.
   - Priority: Medium.

## Test Coverage
📊 **Coverage Analysis**

### Current Status
- Line Coverage: 68%
- Function Coverage: 72%
- Branch Coverage: 45%
- Statement Coverage: 69%

### Key Gaps
1. **Error Handling Paths**: Insufficient testing for exception cases.
2. **Edge Cases**: Missing tests for input boundary values.
3. **Integration Tests**: Insufficient testing of interactions between modules.
4. **Security Tests**: Missing tests for security-related features.

### Improvement Suggestions
1. Add test cases for exception handling.
2. Add tests for boundary values and extreme cases.
3. Create an integration test suite.
4. Add security tests.

## Actionables
🎯 **Prioritized Fix Plan**

### Immediate Fixes (High Priority)
1. Fix SQL injection vulnerability.
2. Remove hardcoded secret key.
3. Fix open redirect issue.
4. Add parameterized queries.

### Short-Term Improvements (Medium Priority)
1. Implement session management improvements.
2. Add CSRF protection.
3. Improve security of logging.
4. Refactor the long method.

### Long-Term Planning (Low Priority)
1. Introduce third-party libraries.
2. Improve test coverage.
3. Architectural refactoring.
4. Performance optimization.

## Summary
The module is mostly complete in terms of functionality but has some serious security issues that need immediate attention. It is recommended to prioritize fixing the high-risk security issues, then gradually improve code quality and test coverage.
```

## Best Practices

### 1. Review Preparation
- **Understand the Code**: Fully understand the business logic and technical architecture.
- **Check Against Requirements**: Review functionality against the requirements document.
- **Analyze History**: Analyze code change history and issue patterns.
- **Prepare Tools**: Prepare necessary analysis tools and checklists.

### 2. Review Execution
- **Systematic Approach**: Follow a defined process for the review.
- **Multi-dimensional Check**: Review from multiple perspectives, including functionality, security, and performance.
- **Gather Evidence**: Collect specific code examples and evidence of issues.
- **Provide Specific Suggestions**: Offer concrete fix suggestions and implementation plans.

### 3. Report Writing
- **Clear Structure**: Use a standard report structure.
- **Clear Priorities**: Clearly indicate the priority of issues.
- **Actionable Suggestions**: Provide actionable improvement suggestions.
- **Tracking Mechanism**: Establish a mechanism for tracking and verifying issues.

## Related Commands

- [m:security-scan`](m-security-scan.md) - Security Scan
- [m:test-generation`](m-test-generation.md) - Test Generation
- [m:debate-code`](m-debate-code.md) - Code Debate
- [m:project-cleanup`](m-project-cleanup.md) - Project Cleanup
