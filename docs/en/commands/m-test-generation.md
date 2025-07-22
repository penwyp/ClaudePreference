# Command: m:test-generation - Automated Test Generation Workflow

## Overview

The `m:test-generation` is an intelligent test generation tool that automatically creates unit, integration, and end-to-end tests. The command analyzes code coverage, identifies testing gaps, and generates comprehensive test cases to ensure code quality and stability.

## Usage

```bash
/m:test-generation [type] [target] [coverage]
```

## Parameter Details

- `type` (optional): The type of test.
  - `unit` - Unit tests
  - `integration` - Integration tests
  - `e2e` - End-to-end tests
  - `all` - All types of tests
- `target` (optional): The test target.
  - **File Path**: `src/auth`, `components/`
  - **Component Name**: `UserService`, `LoginComponent`
  - **Functional Module**: `auth`, `payment`, `user-flow`
- `coverage` (optional): The coverage target.
  - **Percentage**: `90%`, `85%`, `100%`
  - **Default**: `80%`

## Usage Examples

### Default Test Generation
```bash
/m:test-generation
```
**Expected Outcome**:
- Analyzes recently modified files.
- Generates unit tests.
- Aims for 80% coverage.
- Identifies testing gaps.

### Unit Test Generation
```bash
/m:test-generation unit src/auth 90%
```
**Expected Outcome**:
- Generates unit tests for the `src/auth` directory.
- Aims for 90% coverage.
- Creates test files and cases.
- Runs tests to verify functionality.

### Integration Test Generation
```bash
/m:test-generation integration api
```
**Expected Outcome**:
- Generates integration tests for the API module.
- Tests interactions between components.
- Verifies workflows.
- Creates test data and environments.

### End-to-End Test Generation
```bash
/m:test-generation e2e user-flow
```
**Expected Outcome**:
- Generates end-to-end tests for user flows.
- Simulates real user actions.
- Verifies complete business processes.
- Creates test scenarios and data.

### Comprehensive Test Generation
```bash
/m:test-generation all components 85%
```
**Expected Outcome**:
- Generates all types of tests for all components.
- Aims for 85% coverage.
- Creates a test suite.
- Establishes a testing infrastructure.

## Workflow

### 1. Code Coverage Analysis
- **Current Coverage**: Analyzes the coverage of existing tests.
- **Gap Identification**: Identifies untested functions and code paths.
- **Risk Assessment**: Assesses the risk level of uncovered code.
- **Priority Ranking**: Ranks testing needs by importance.

### 2. Unit Test Generation
- **Function Analysis**: Analyzes the input and output of each function.
- **Boundary Testing**: Creates test cases for boundary conditions.
- **Exception Testing**: Generates tests for exception cases.
- **Mock Creation**: Creates necessary mock objects.

### 3. Integration Test Creation
- **Component Interaction**: Tests interactions between modules.
- **Data Flow Testing**: Verifies the flow of data between components.
- **Workflow Validation**: Tests complete business processes.
- **Configuration Testing**: Verifies behavior under different configurations.

### 4. End-to-End Test Construction
- **User Scenarios**: Simulates real user actions.
- **Browser Testing**: Cross-browser compatibility testing.
- **Performance Testing**: Tests system performance and response time.
- **Regression Testing**: Ensures new features do not break existing functionality.

### 5. Test Suite Execution
- **Parallel Execution**: Optimizes test execution time.
- **Result Analysis**: Analyzes test results and failure reasons.
- **Report Generation**: Generates detailed test reports.
- **Coverage Verification**: Verifies if the target coverage is met.

## Detailed Test Types

### Unit Tests
**Characteristics**:
- Tests a single function or method.
- Executes quickly.
- Isolates dependencies.
- High coverage.

**Generated Content**:
```javascript
// Example: UserService.test.js
describe('UserService', () => {
  describe('validateEmail', () => {
    it('should return true for valid email', () => {
      const result = UserService.validateEmail('test@example.com');
      expect(result).toBe(true);
    });

    it('should return false for invalid email', () => {
      const result = UserService.validateEmail('invalid-email');
      expect(result).toBe(false);
    });

    it('should handle null input', () => {
      const result = UserService.validateEmail(null);
      expect(result).toBe(false);
    });
  });
});
```

### Integration Tests
**Characteristics**:
- Tests interactions between modules.
- Verifies data flow.
- Tests API endpoints.
- Checks configurations.

**Generated Content**:
```javascript
// Example: AuthIntegration.test.js
describe('Authentication Integration', () => {
  it('should complete full login flow', async () => {
    const loginData = { email: 'test@example.com', password: 'password' };
    const response = await request(app)
      .post('/api/auth/login')
      .send(loginData);
    
    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined();
  });
});
```

### End-to-End (E2E) Tests
**Characteristics**:
- Simulates real user behavior.
- Cross-browser testing.
- Complete business processes.
- Performance validation.

**Generated Content**:
```javascript
// Example: UserFlow.e2e.js
describe('User Registration Flow', () => {
  it('should allow user to register and login', async () => {
    await page.goto('/register');
    await page.fill('[data-testid="email"]', 'test@example.com');
    await page.fill('[data-testid="password"]', 'password123');
    await page.click('[data-testid="submit"]');
    
    await expect(page).toHaveURL('/dashboard');
  });
});
```

## Expected Outcomes

### Test Generation Report
```
🧪 Test Generation Report
Generated At: 2025-01-15 14:30:00
Target: src/auth directory
Test Type: Unit Test
Coverage Target: 90%

📊 Coverage Analysis
  - Current Coverage: 65%
  - Target Coverage: 90%
  - Improvement Needed: 25%
  - Uncovered Functions: 12

🔧 Generated Test Files
  1. UserService.test.js (15 test cases)
  2. AuthMiddleware.test.js (8 test cases)
  3. PasswordValidator.test.js (12 test cases)
  4. TokenManager.test.js (10 test cases)

✅ Test Execution Results
  - Total Tests: 45
  - Passed: 42
  - Failed: 3
  - Skipped: 0
  - Execution Time: 2.3s

📈 Coverage Achieved
  - Line Coverage: 92%
  - Function Coverage: 89%
  - Branch Coverage: 87%
  - Statement Coverage: 91%

🚨 Issues to Address
  1. Inadequate coverage for exception handling in AuthMiddleware.validateToken()
  2. Missing boundary condition tests in PasswordValidator.checkComplexity()
  3. Concurrency scenarios not tested in TokenManager.refreshToken()
```

### Test File Structure
```
tests/
├── unit/
│   ├── services/
│   │   ├── UserService.test.js
│   │   └── AuthService.test.js
│   ├── utils/
│   │   └── PasswordValidator.test.js
│   └── middleware/
│       └── AuthMiddleware.test.js
├── integration/
│   ├── api/
│   │   ├── authRoutes.test.js
│   │   └── userRoutes.test.js
│   └── database/
│       └── userRepository.test.js
└── e2e/
    ├── userFlow.test.js
    └── authFlow.test.js
```

## Test Framework Support

### JavaScript/TypeScript
- **Jest**: Unit and integration testing.
- **Mocha + Chai**: Flexible testing framework.
- **Playwright**: End-to-end testing.
- **Cypress**: Modern end-to-end testing.

### Python
- **pytest**: Full-featured testing framework.
- **unittest**: Standard library testing framework.
- **Selenium**: Web automation testing.
- **FastAPI TestClient**: API testing.

### Java
- **JUnit**: Standard unit testing framework.
- **TestNG**: Flexible testing framework.
- **Mockito**: Mock object framework.
- **Spring Boot Test**: Integration testing.

### Go
- **go test**: Built-in testing framework.
- **Testify**: Enhanced testing library.
- **Ginkgo**: BDD testing framework.
- **GoConvey**: Web UI testing.

## Best Practices

### 1. Test Design Principles
- **FIRST**: Fast, Independent, Repeatable, Self-Validating, Timely.
- **AAA Pattern**: Arrange, Act, Assert.
- **Single Responsibility**: Each test should validate a single behavior.
- **Descriptive Naming**: Test names should clearly describe the behavior being tested.

### 2. Test Data Management
- **Isolate Test Data**: Each test should use independent data.
- **Clean Up Data**: Clean up test data after tests.
- **Factory Pattern**: Use factory methods to create test data.
- **Mocking Strategy**: Use mock objects appropriately.

### 3. Test Maintenance
- **Regular Refactoring**: Maintain the quality of test code.
- **Parallel Execution**: Optimize test execution time.
- **Failure Analysis**: Quickly locate and fix failing tests.
- **Coverage Monitoring**: Continuously monitor test coverage.

## Error Handling

### Common Issues
- **Test Failure**: Analyze the cause of failure and fix it.
- **Insufficient Coverage**: Identify uncovered code paths.
- **Slow Execution**: Optimize test performance.
- **Environment Dependencies**: Resolve issues with the test environment.

### Troubleshooting
```
❌ Test Generation Failed
Reason: Unable to parse code structure.
Solution: Check code syntax and import statements.

⚠️ Coverage Below Target
Reason: Complex logic branches not fully covered.
Solution: Add tests for boundary conditions and exceptions.

🐛 Unstable Tests
Reason: Asynchronous operations and time dependencies.
Solution: Use mocks and fixed times.
```

## Related Commands

- [`m:tdd-planner`](m-tdd-planner.md) - TDD Planning
- [`m:review-code`](m-review-code.md) - Code Review
- [`m:bug-fix`](m-bug-fix.md) - Bug Fix
- [`m:security-scan`](m-security-scan.md) - Security Testing
