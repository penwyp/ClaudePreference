# m-tdd-planner - Test-Driven Development Planning Workflow

## Overview

`m-tdd-planner` is a specialized Test-Driven Development (TDD) planning tool that analyzes requirements and generates a comprehensive TDD implementation plan. The command uses a structured JSON output format to provide detailed Red-Green-Refactor cycle planning, test strategy design, and task dependency mapping.

## Usage

```bash
/m-tdd-planner [target]
```

## Parameter Details

- `target` (optional): The target requirements document.
  - **Default**: Requirements documents in the project's default location.
  - **Supported Formats**: Markdown files, requirements documents, project descriptions.
  - **Examples**: `requirements.md`, `specs/user-auth.md`, `"User authentication system"`.

## Usage Examples

### Plan Based on Requirements Document
```bash
/m-tdd-planner requirements.md
```
**Expected Outcome**:
- Parses testable requirements from the document.
- Generates a complete TDD implementation plan.
- Creates Red-Green-Refactor cycle tasks.
- Outputs the plan in a structured JSON format.

### Plan Based on Project Description
```bash
/m-tdd-planner "User authentication and permission management system"
```
**Expected Outcome**:
- Analyzes functional requirements from the description.
- Designs a test strategy and framework selection.
- Creates a TDD task sequence.
- Generates a dependency diagram.

### Default Auto-Discovery
```bash
/m-tdd-planner
```
**Expected Outcome**:
- Automatically discovers requirements documents in the project.
- Analyzes the existing code structure.
- Generates a supplementary TDD plan.
- Plans the testing infrastructure.

## Workflow

### 1. Requirements Analysis
- **Document Parsing**: Extracts testable requirements and acceptance criteria.
- **Behavioral Specifications**: Identifies behavioral specifications and acceptance standards.
- **Ambiguity Identification**: Records ambiguous requirements for clarification.
- **Priority Assessment**: Assesses test priority based on business value.

### 2. Test Strategy Design
- **Test Pyramid**: Defines the structure for unit, integration, and end-to-end tests.
- **Framework Selection**: Chooses appropriate testing frameworks and tools.
- **Infrastructure**: Outlines the test infrastructure and environment setup.
- **Coverage Targets**: Sets test coverage goals and quality gates.

### 3. TDD Task Decomposition
- **Red-Green-Refactor**: Decomposes features into TDD cycles.
- **Test Scenarios**: Creates specific test scenarios for each requirement.
- **Task Sequencing**: Sequences tasks based on dependencies.
- **Parallel Opportunities**: Plans for parallel test development opportunities.

### 4. Task Dependency Mapping
- **Prerequisites**: Identifies prerequisite relationships between tasks.
- **Logical Order**: Establishes a logical order for TDD implementation.
- **Parallel Development**: Plans for parallel test development opportunities.
- **Milestones**: Sets testing milestones and checkpoints.

### 5. Plan Visualization
- **Dependency Diagram**: Generates a Mermaid diagram to show task flow and dependencies.
- **TDD Cycles**: Visually represents the Red-Green-Refactor cycles.
- **Critical Path**: Highlights critical testing milestones.
- **Timeline**: Displays the TDD implementation timeline.

### 6. JSON Report Generation
- **Structured Output**: Compiles all components into a JSON object.
- **Completeness Validation**: Validates the completeness of the test coverage strategy.
- **Machine-Readable**: Provides a machine-readable format.
- **Integration-Friendly**: Facilitates integration with other tools.

## TDD Task Types

### Red Phase Tasks
**Characteristics**: Writing failing tests.
- Create test cases based on requirements.
- Verify that the tests indeed fail.
- Clearly define expected behavior.
- Ensure test readability.

### Green Phase Tasks
**Characteristics**: Implementing minimal code to make tests pass.
- Write the simplest implementation.
- Focus on making the tests pass.
- Avoid over-engineering.
- Keep the code concise.

### Refactor Phase Tasks
**Characteristics**: Improving code while keeping tests passing.
- Eliminate code duplication.
- Improve code readability.
- Optimize performance.
- Improve design.

### Setup Phase Tasks
**Characteristics**: Infrastructure and framework configuration.
- Test environment setup.
- Framework configuration.
- Toolchain setup.
- CI/CD integration.

### Integration Phase Tasks
**Characteristics**: Cross-component test scenarios.
- Interaction tests between components.
- End-to-end process validation.
- System integration tests.
- Performance and load tests.

## Expected Outcomes

### JSON Output Format
```json
{
  "testStrategy": "Adopt the test pyramid approach: 70% unit tests, 20% integration tests, 10% end-to-end tests. Use Jest as the main testing framework, with Supertest for API testing and Playwright for E2E testing. The test environment is containerized with Docker and supports automated execution via CI/CD. Coverage targets: 90% line coverage, 85% branch coverage.",
  
  "tasks": [
    {
      "id": "setup_001",
      "description": "Configure Jest testing framework and basic test environment",
      "type": "setup",
      "status": "pending",
      "dependencies": [],
      "testLevel": "unit"
    },
    {
      "id": "red_001",
      "description": "Write failing test for user registration functionality",
      "type": "red",
      "status": "pending",
      "dependencies": ["setup_001"],
      "testLevel": "unit"
    },
    {
      "id": "green_001",
      "description": "Implement user registration functionality to make the test pass",
      "type": "green",
      "status": "pending",
      "dependencies": ["red_001"],
      "testLevel": "unit"
    },
    {
      "id": "refactor_001",
      "description": "Refactor user registration code for readability",
      "type": "refactor",
      "status": "pending",
      "dependencies": ["green_001"],
      "testLevel": "unit"
    },
    {
      "id": "red_002",
      "description": "Write failing test for user login functionality",
      "type": "red",
      "status": "pending",
      "dependencies": ["refactor_001"],
      "testLevel": "unit"
    },
    {
      "id": "green_002",
      "description": "Implement user login functionality to make the test pass",
      "type": "green",
      "status": "pending",
      "dependencies": ["red_002"],
      "testLevel": "unit"
    },
    {
      "id": "integration_001",
      "description": "Create integration test for user authentication flow",
      "type": "integration",
      "status": "pending",
      "dependencies": ["green_002"],
      "testLevel": "integration"
    }
  ],
  
  "diagram": "```mermaid\nflowchart TD\n    A[setup_001: Configure test environment] --> B[red_001: Failing test for user registration]\n    B --> C[green_001: Implement registration feature]\n    C --> D[refactor_001: Refactor registration code]\n    D --> E[red_002: Failing test for user login]\n    E --> F[green_002: Implement login feature]\n    F --> G[integration_001: Integration test for auth flow]\n    \n    style A fill:#f9f,stroke:#333,stroke-width:2px\n    style B fill:#faa,stroke:#333,stroke-width:2px\n    style C fill:#afa,stroke:#333,stroke-width:2px\n    style D fill:#aaf,stroke:#333,stroke-width:2px\n    style E fill:#faa,stroke:#333,stroke-width:2px\n    style F fill:#afa,stroke:#333,stroke-width:2px\n    style G fill:#ffa,stroke:#333,stroke-width:2px\n```",
  
  "clarifications": [
    "What are the specific rules for password complexity?",
    "Is third-party authentication (e.g., OAuth) required?",
    "What is the session timeout duration?",
    "Is a user permission system required?",
    "What are the database configuration requirements for the test environment?"
  ]
}
```

### Detailed Test Strategy
```json
{
  "testStrategy": {
    "pyramid": {
      "unit": "70% - Fast feedback, testing individual functions and components",
      "integration": "20% - Verifying interactions between components",
      "e2e": "10% - Verifying complete user flows"
    },
    "frameworks": {
      "unit": "Jest - Feature-rich testing framework",
      "integration": "Supertest - Dedicated library for API testing",
      "e2e": "Playwright - Modern end-to-end testing framework"
    },
    "infrastructure": {
      "containerization": "Docker - Consistent testing environment",
      "ci_cd": "GitHub Actions - Automated test execution",
      "database": "Dedicated database instance for testing"
    },
    "coverage": {
      "line": "90%",
      "branch": "85%",
      "function": "95%"
    }
  }
}
```

## TDD Best Practices

### 1. Red Phase Best Practices
- **Test First**: Write tests before writing code.
- **Minimal Test**: Test only one behavior at a time.
- **Confirm Failure**: Ensure the test actually fails.
- **Clear Assertions**: Use descriptive assertion messages.

### 2. Green Phase Best Practices
- **Simplest Implementation**: Use the simplest method to make the test pass.
- **Avoid Over-engineering**: Do not over-engineer at this stage.
- **Iterate Quickly**: Implement quickly, then refactor later.
- **Stay Focused**: Focus only on the currently failing test.

### 3. Refactor Phase Best Practices
- **Keep Tests Passing**: Tests must always pass during refactoring.
- **Small Refactors**: Make small, safe refactors.
- **Eliminate Duplication**: Identify and eliminate code duplication.
- **Improve Readability**: Improve variable names and function structures.

### 4. Test Quality Assurance
- **Independence**: Each test should run independently.
- **Repeatability**: Test results should be repeatable.
- **Fast Execution**: Unit tests should execute quickly.
- **Easy Maintenance**: Test code should be easy to understand and maintain.

## Framework Support

### JavaScript/TypeScript
- **Jest**: Feature-rich testing framework.
- **Vitest**: Modern and fast testing framework.
- **Mocha + Chai**: Flexible testing combination.
- **Playwright**: End-to-end testing.

### Python
- **pytest**: Powerful testing framework.
- **unittest**: Standard library testing framework.
- **hypothesis**: Property-based testing.
- **tox**: Test environment management.

### Java
- **JUnit 5**: Modern Java testing framework.
- **TestNG**: Feature-rich testing framework.
- **Mockito**: Mock object framework.
- **AssertJ**: Fluent assertion library.

### Go
- **go test**: Built-in testing framework.
- **Testify**: Enhanced testing library.
- **Ginkgo**: BDD-style testing framework.
- **GoMock**: Mock generation tool.

## Integration Tools

### CI/CD Integration
- **GitHub Actions**: Automated test execution.
- **Jenkins**: Continuous integration support.
- **GitLab CI**: Built-in CI/CD functionality.
- **CircleCI**: Cloud-based continuous integration.

### Coverage Tools
- **Istanbul**: JavaScript coverage.
- **Coverage.py**: Python coverage.
- **JaCoCo**: Java coverage.
- **go tool cover**: Go coverage.

## Related Commands

- [`m-test-generation`](m-test-generation.md) - Test Generation Tool
- [`m-task-planner`](m-task-planner.md) - Task Planning
- [`m-review-code`](m-review-code.md) - Code Review
- [`m-orchestrated-dev`](m-orchestrated-dev.md) - Collaborative Development
