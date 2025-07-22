# Command: m:orchestrated-dev - Multi-Agent Development Workflow: A Research-Driven & Template-Based System

## Overview

The `m:orchestrated-dev` is an advanced multi-agent collaborative development workflow that deploys three specialized agents (Orchestrator, Developer, Reviewer) governed by a template-based orchestration system to ensure quality, consistency, and adaptability in software development. This command implements a research-driven development-review cycle suitable for complex development tasks that require high-quality code and architectural decisions.

## Usage

```bash
/m:orchestrated-dev [target]
```

## Parameter Details

- `target` (optional): The target requirements document or project scope.
  - **Default**: Previous discussion results or current requirements.
  - **Supported Formats**: Markdown files, requirements documents, project descriptions.

## Agent Architecture

### Agent O (Orchestrator & Prompt Generator)
**Role**: Strategic planning, workflow coordination, and dynamic prompt assembly.

**Key Responsibilities**:
- **Parse Requirements**: Decompose high-level goals into actionable tasks using `sequential-thinking`.
- **Initiate Research**: Launch research cycles to determine optimal architecture and technology stacks.
- **Synthesize Findings**: Analyze research from multiple sources (`web_search`, `context7`) to form a reasoned, evidence-based technical plan.
- **Manage State**: Track the development progress, review feedback, and iteration count.
- **Assemble & Dispatch Prompts**: Act as the **Prompt Generator**. Populate templates from the `Prompt Template Library` with dynamic context to create specific, actionable instructions for other agents.
- **Final Verification**: Verify the final build's success and ensure all success criteria are met before completion.

### Agent D (Developer)
**Role**: High-quality, research-informed code implementation.

**Key Responsibilities**:
- **Execute from Context**: Work exclusively from the contextual prompt provided by Agent O.
- **Maintain Consistency**: When modifying existing files, first understand and then mimic the file's code conventions, style, and existing patterns. Use existing libraries and utilities where appropriate.
- **Implement Completely**: **CRITICAL:** Every function must have a complete, production-ready implementation.
- **FORBIDDEN**: No `TODO`, `FIXME`, `HACK`, `XXX`, `pass`, `stub`, or any other form of placeholder code.
- **Pre-Implementation Research**: For complex features or algorithms, use `web_search` to find optimal implementation patterns as guided by Agent O.
- **Ensure Quality**: Each code submission must compile, run, and pass all local verification checks.

### Agent R (Reviewer)
**Role**: Comprehensive validation against objective standards and context.

**Key Responsibilities**:
- **Holistic Review**: Assess code for completeness, security, performance, architectural compliance, and **consistency with the existing codebase**.
- **Provide Actionable Feedback**: When identifying issues, provide concrete suggestions, code snippets, or clear guidance for remediation where feasible. This is crucial for accelerating the iteration cycle.
- **External Benchmarking**: Use tools like `web_search` to validate against external standards (e.g., OWASP Top 10) and `context7` to check framework-specific best practices.
- **Generate Report**: Complete the standardized `Review Output Format` with clear findings and a final decision.

## Usage Examples

### Basic Usage
```bash
/m:orchestrated-dev
```
**Expected Outcome**: Analyzes current project requirements and initiates the three-agent collaborative development process.

### Specifying a Requirements Document
```bash
/m:orchestrated-dev requirements.md
```
**Expected Outcome**: Performs requirements analysis and development planning based on the `requirements.md` file.

### Complex Project Development
```bash
/m:orchestrated-dev "Implement user authentication system"
```
**Expected Outcome**: Initiates a complete design, development, and review process for the user authentication system.

## System Configuration

```yaml
max_cycles: 5
timeout_minutes: 90
strict_mode:
  no_incomplete_code: true
  require_security_check: true
  min_functional_coverage_percent: 100
  min_non_functional_coverage_percent: 70
mcp_tools:
  enabled: ["web_search", "context7", "sequential_thinking"]
  # Principle: Prioritize recent information for time-sensitive queries.
  # The Orchestrator should dynamically append the current year (e.g., 2025) when appropriate.
  web_search_year: "dynamic"
```

## Enhanced Workflow

### Phase 1: Research & Planning (Agent O)
- O parses the initial requirements.
- O populates and executes the `Initial_Research` template to generate a technical plan.

### Phase 2: Development Cycle (Agent D)
- O breaks down the plan into a specific task.
- O generates a contextual prompt for D using the `Orchestrator_to_Developer` template.
- D implements the code and submits it upon successful local verification.

### Phase 3: Comprehensive Review (Agent R)
- O receives the code from D.
- O generates a review task for R using the `Orchestrator_to_Reviewer` template, providing both the code and the original context.
- R performs the review and returns a structured JSON report.

### Phase 4: Iteration or Completion
- O parses the review report.
- **If REJECTED**: O extracts the actionable feedback, creates a new development task, and returns to Phase 2.
- **If APPROVED**: O proceeds to final verification and completion.
- **If max_cycles exceeded**: O halts the process and generates the `max-cycle-summary` document.

## Decision Matrix

| Completeness | Critical Issues | Functional | Non-Functional | Decision |
|--------------|-----------------|------------|----------------|----------|
| < 100%       | -               | -          | -              | REJECT: Fix incomplete code |
| 100%         | Yes             | -          | -              | REJECT: Fix critical issues |
| 100%         | No              | < 100%     | -              | REJECT: Complete features |
| 100%         | No              | 100%       | < 70%          | WARN: Consider improvements |
| 100%         | No              | 100%       | ≥ 70%          | APPROVE  |

## Prompt Template Library

The system uses standardized, reusable instruction templates that Agent O dynamically populates:

### Template Types:
1. **Initial_Research**: For researching and proposing technical architecture
2. **Orchestrator_to_Developer**: For providing development context and standards
3. **Orchestrator_to_Reviewer**: For comprehensive code review instructions

## Communication & Data Formats

### Review Output Format (JSON)
```json
{
  "decision": "APPROVED | REJECTED",
  "summary": {
    "completeness_status": "PASS | FAIL",
    "critical_issues_found": true | false,
    "functional_coverage_percent": 100,
    "non_functional_coverage_percent": 85
  },
  "findings": [
    {
      "file": "path/to/file.ext",
      "line": 42,
      "severity": "BLOCKING | WARNING",
      "issue": "Description of the issue",
      "suggestion": "Concrete advice for fixing the issue"
    }
  ],
  "mcp_validation": {
    "security_check": "Passed (OWASP 2025 compliant)",
    "framework_usage": "Follows React 19 best practices"
  }
}
```

## Expected Outcomes

### Success Criteria
- ✅ **100% Code Completeness**: No placeholders, stubs, or `TODO`s
- ✅ **Zero Critical Issues**: No blocking security, concurrency, or resource-related bugs
- ✅ **100% Functional Coverage**: All specified features are implemented
- ✅ **≥70% Non-Functional Coverage**: Meets specified performance, scalability, etc., targets
- ✅ **Build Success**: Final code compiles and passes all integration checks
- ✅ **Evidence-Based Architecture**: All major technical decisions are backed by research

### Summary Report (JSON)
```json
{
  "project_stats": {
    "total_cycles": 3,
    "mcp_tools_used": { "web_search": 12, "context7": 5, "sequential_thinking": 8 },
    "architecture_decisions": [
      {
        "decision": "Use Next.js 14",
        "rationale": "Based on research indicating superior performance and SEO capabilities for this use case.",
        "alternatives_considered": ["Remix", "Astro"]
      }
    ]
  },
  "code_quality": {
    "completeness": "100%",
    "final_security_issues": 0
  },
  "requirements_fulfillment": {
    "functional": "100%",
    "non_functional": "85%"
  }
}
```

## Best Practices

1. **Before Starting**: Ensure the requirements document is clear and complete.
2. **Research First**: Gather best practices before coding.
3. **Quality First**: Ensure quality through research and completeness through discipline.
4. **Iterate and Improve**: Use research to guide improvements.
5. **Deliver Completely**: Provide full documentation.

## Troubleshooting

### Common Issues
- **Max cycles exceeded**: Check the complexity of requirements; consider breaking down the task.
- **Build failure**: Ensure all dependencies are correctly installed.
- **Review failure**: Check for code completeness and critical issues.

### Error Handling
If the maximum number of cycles is exceeded, the system will generate a `docs/todo/max-cycle-summary-<timestamp>.md` file containing completed work and remaining tasks.

## Related Commands

- [m:task-planner`](m-task-planner.md) - Task Planning
- [m:review-code`](m-review-code.md) - Code Review
- [m:security-scan`](m-security-scan.md) - Security Scan
- [m:test-generation`](m-test-generation.md) - Test Generation
