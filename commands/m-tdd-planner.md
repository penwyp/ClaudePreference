# TDD Plan Workflow: Generate Test-First Development Plan

**Target:** $ARGUMENTS (Default: requirement document(s) in the default project location)

**Scope:** Analyze requirements and generate comprehensive TDD implementation plan

## Execution Steps

1. **Requirements Analysis**
   - Parse target documents and extract testable requirements
   - Identify behavioral specifications and acceptance criteria
   - Document ambiguous requirements for clarification

2. **Test Strategy Design**
   - Define test pyramid structure (Unit, Integration, E2E)
   - Select appropriate testing frameworks and tools
   - Outline test infrastructure and environment setup

3. **TDD Task Decomposition**
   - Break down features into Red → Green → Refactor cycles
   - Create specific test scenarios for each requirement
   - Sequence tasks based on dependency relationships

4. **Task Dependency Mapping**
   - Identify prerequisite relationships between test tasks
   - Establish logical order for TDD implementation
   - Plan for parallel test development opportunities

5. **Plan Visualization**
   - Generate Mermaid diagram showing task flow and dependencies
   - Illustrate Red-Green-Refactor cycles visually
   - Highlight critical testing milestones

6. **Generate TDD Plan Report**
   - Compile structured JSON output with all components
   - Validate completeness of test coverage strategy

## Output Format

**Return a JSON object** with the following structure:

```json
{
  "testStrategy": "string - Overall testing approach, frameworks, and infrastructure description",
  "tasks": [
    {
      "id": "string",
      "description": "string - Specific Red/Green/Refactor step description",
      "type": "red|green|refactor|setup|integration",
      "status": "pending|in-progress|completed",
      "dependencies": ["task_id_1", "task_id_2"],
      "testLevel": "unit|integration|e2e"
    }
  ],
  "diagram": "string - Mermaid diagram code showing task dependencies and TDD flow",
  "clarifications": [
    "string - Questions about ambiguous requirements or testing approach"
  ]
}
```

### JSON Field Specifications

#### `testStrategy`
Comprehensive description including:
- Test pyramid distribution and rationale
- Selected testing frameworks and justification
- Test environment and infrastructure requirements
- Coverage targets and quality gates

#### `tasks`
Array of TDD cycle tasks with:
- **Red tasks**: Writing failing tests for specific requirements
- **Green tasks**: Implementing minimal code to pass tests
- **Refactor tasks**: Improving code while maintaining test coverage
- **Setup tasks**: Infrastructure and framework configuration
- **Integration tasks**: Cross-component testing scenarios

#### `diagram`
Mermaid diagram illustrating:
- Sequential Red-Green-Refactor cycles
- Task dependencies and prerequisites
- Parallel development opportunities
- Testing milestone checkpoints

#### `clarifications`
Questions addressing:
- Ambiguous functional requirements
- Missing acceptance criteria
- Unclear testing scope or boundaries
- Framework selection considerations

## Final Output

Return the complete JSON object as specified above.
No additional markdown files are generated for this workflow.