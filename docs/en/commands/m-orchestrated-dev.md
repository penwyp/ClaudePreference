# m-orchestrated-dev - Multi-Agent Collaborative Development Workflow

## Overview

`m-orchestrated-dev` is an advanced multi-agent collaborative development workflow that deploys three specialized agents (Orchestrator, Developer, Reviewer) to implement a research-driven development-review cycle. This command is suitable for complex development tasks that require high-quality code and architectural decisions.

## Usage

```bash
/m-orchestrated-dev [target]
```

## Parameter Details

- `target` (optional): The target requirements document or project scope.
  - **Default**: Previous discussion results or current requirements.
  - **Supported Formats**: Markdown files, requirements documents, project descriptions.

## Agent Architecture

### Agent O (Orchestrator)
**Role**: Strategic planning, architecture decisions, and workflow coordination.

**Key Responsibilities**:
- Use `sequential-thinking` for complex requirements analysis.
- Research optimal architecture patterns:
  - Use `context7` for framework evaluation and best practices research.
  - Use `web_search` (append "2025") to get the latest solutions.
  - Apply `zen:consensus` for critical technical decisions.
- Create evidence-based development plans.
- Coordinate the work of the Developer and Reviewer.
- Ensure 100% coverage of functional requirements and 70% of non-functional requirements.

### Agent D (Developer)
**Role**: Research-based implementation and coding practices.

**Key Responsibilities**:
- **Critical Requirement**: Every function must be fully implemented.
- **Forbidden**: No TODO, FIXME, HACK, XXX, stub, or placeholder code is allowed.
- Research before implementing complex features.
- Each commit must compile and run successfully.
- Implement with production-ready quality.

### Agent R (Reviewer)
**Role**: Comprehensive validation through external benchmarks.

**Review Priorities** (in order):
1. **Code Completeness Check** (Blocking)
2. **Critical Issues Check** (Blocking)
3. **Architecture Quality Assessment**
4. **Requirements Coverage Verification**

## Usage Examples

### Basic Usage
```bash
/m-orchestrated-dev
```
**Expected Outcome**: Analyzes current project requirements and initiates the three-agent collaborative development process.

### Specifying a Requirements Document
```bash
/m-orchestrated-dev requirements.md
```
**Expected Outcome**: Performs requirements analysis and development planning based on the `requirements.md` file.

### Complex Project Development
```bash
/m-orchestrated-dev "Implement user authentication system"
```
**Expected Outcome**: Initiates a complete design, development, and review process for the user authentication system.

## Workflow

### 1. Research-Driven Planning (Agent O)
- **Input**: Requirements document.
- **Actions**:
  1. Use `sequential-thinking` to decompose requirements.
  2. Research optimal solutions.
  3. Create an evidence-based plan.
- **Output**: A detailed, research-supported plan.

### 2. Informed Development Cycle
- **Orchestrator → Developer**: Task specifications, recommended patterns, architecture constraints.
- **Developer Actions**: Research complex implementations, implement a complete solution, self-verify.
- **Developer → Orchestrator**: Complete implementation, no placeholder code, build verification passed.

### 3. Comprehensive Review
- **Orchestrator → Reviewer**: Code, architecture context, research references.
- **Reviewer Actions**: Completeness check, security audit, architecture compliance, requirements mapping.
- **Reviewer → Orchestrator**: Detailed findings, external validation results, accept/reject decision.

## Decision Matrix

| Completeness | Critical Issues | Functional | Non-Functional | Decision |
|--------------|-----------------|------------|----------------|----------|
| < 100%       | -               | -          | -              | REJECT: Fix incomplete code |
| 100%         | Yes             | -          | -              | REJECT: Fix critical issues |
| 100%         | No              | < 100%     | -              | REJECT: Complete features |
| 100%         | No              | 100%       | < 70%          | WARN: Consider improvements |
| 100%         | No              | 100%       | ≥ 70%          | APPROVE  |

## Expected Outcomes

### Success Criteria
- ✅ 100% complete code (no placeholders)
- ✅ Zero critical security/concurrency issues
- ✅ 100% functional requirements coverage
- ✅ ≥70% non-functional requirements coverage
- ✅ Successful build/compilation
- ✅ Research-backed architecture decisions

### Output Files
- Project statistics report
- Code quality assessment
- Requirements fulfillment status
- Architecture decision log

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

- [`m-task-planner`](m-task-planner.md) - Task Planning
- [`m-review-code`](m-review-code.md) - Code Review
- [`m-security-scan`](m-security-scan.md) - Security Scan
- [`m-test-generation`](m-test-generation.md) - Test Generation
