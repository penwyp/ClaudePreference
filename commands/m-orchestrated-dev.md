# Multi-Agent Development Workflow: Orchestrated Dev-Review Cycles

**Target:** $ARGUMENTS (Default: previous discussion results or current requirements)

**Scope:** Deploy three specialized agents for coordinated development and review cycles in current directory

## Agent Architecture

### Agent O (Orchestrator)
- **Role:** Workflow coordination and strategic decision making
- **Responsibilities:**
  - Parse requirements and create development plan using **sequential-thinking** for complex analysis
  - Use **context7** for technology selection and framework evaluation
  - Leverage **web_search** for current best practices and solution research
  - Coordinate between Developer and Reviewer agents
  - Make final decisions on review acceptance with evidence-based reasoning
  - Manage development workflow and iteration cycles
  - Verify project builds successfully before final completion

### Agent D (Developer)
- **Role:** Code implementation and iteration
- **Responsibilities:**
  - Implement features based on requirements and architectural decisions
  - Address review feedback and make corrections
  - Maintain code quality during iterations
  - Commit incremental progress with clear messages
  - Focus on execution rather than architectural decision-making

### Agent R (Reviewer)
- **Role:** Code quality assessment and comprehensive feedback
- **Responsibilities:**
  - Conduct thorough code reviews using **sequential-thinking** for systematic analysis
  - Use **context7** to verify framework usage and best practices compliance
  - Leverage **web_search** for security vulnerability checks and performance benchmarks
  - Provide specific, actionable feedback with external validation
  - Verify requirements compliance against industry standards
  - Include basic build verification as part of code review when applicable
  - Approve or reject implementation iterations with detailed reasoning

## Execution Steps

1. **Environment Verification**
   - Verify current working directory is ready for development
   - Check Git status and ensure clean starting state
   - Confirm all three agents have access to shared workspace

2. **Strategic Planning (Agent O)**
   - Use **sequential-thinking** to break down complex requirements systematically
   - Leverage **context7** for framework and library selection research
   - Apply **web_search** to validate technology choices against current best practices
   - Extract clear development requirements with evidence-based decisions
   - Create comprehensive development plan with architectural justifications

3. **Development Cycle (Agent D)**
   - Implement features according to specifications in current directory
   - Write tests and documentation as needed
   - Commit changes with descriptive messages
   - Signal completion to Orchestrator

4. **Comprehensive Review with Build Verification (Agent R)**
   - Use **sequential-thinking** for systematic multi-dimensional code analysis
   - Leverage **context7** to verify framework usage patterns and API compliance
   - Apply **web_search** for security vulnerability scanning and performance benchmarking
   - Attempt project compilation/build to verify technical correctness
   - Check functionality, quality, and requirements compliance against industry standards
   - Generate evidence-backed feedback with external validation and specific improvement points
   - Include build status and any compilation errors in review feedback
   - Provide approval or rejection decision with detailed technical reasoning

5. **Evidence-Based Decision Making (Agent O)**
   - Use **sequential-thinking** to evaluate review results against acceptance criteria
   - Apply **web_search** to research solutions for identified issues
   - Leverage external validation for technical decisions
   - If approved: proceed to finalization with documented rationale
   - If rejected: coordinate next development iteration with research-backed guidance
   - Track progress and maintain cycle momentum with data-driven insights

6. **Cycle Repetition**
   - Repeat steps 3-5 until Agent R approves the implementation
   - Maintain clear communication between all agents
   - Document decisions and iteration rationale

7. **Finalization**
   - **Verify project builds successfully (if applicable)**
   - **If build fails: coordinate fix with Agent D and retry**
   - Validate final implementation state
   - Generate completion report with cycle summary
   - Ensure all changes are committed and workspace is clean

## Workspace Management

### Current Directory Usage
- All three agents work in the current working directory
- Shared access to all files and Git operations
- User is responsible for directory setup and branch management
- Agents coordinate through file system and Git state

### Collaboration Requirements
- Clean Git working directory at start (recommended)
- All agents respect existing file structure
- Coordinated commit strategy to avoid conflicts
- Clear communication through commit messages and status updates

## Agent Communication Protocol

### Enhanced Agent Workflow

### Enhanced Development Phase
```
Agent O → Agent D: 
  - Requirements + Research-backed Development Plan
  - Technology selections with context7 validation
  - Architectural decisions with sequential-thinking analysis
  
Agent D → Agent O: 
  - Implementation Complete + Change Summary
  - Self-review results using zen:codereview
  - Implementation rationale and trade-offs
```

### Enhanced Review Phase
```
Agent O → Agent R: 
  - Review Request + Context + Research Background
  - Technology choice justifications and external validation
  
Agent R → Agent O: 
  - Comprehensive Review Results using multiple analysis tools
  - Evidence-backed feedback with external benchmarks
  - Security and performance assessments with web validation
```

### Decision Points
- **Approval**: Agent R accepts → Agent O finalizes
- **Rejection**: Agent R rejects → Agent O coordinates next iteration
- **Max Iterations**: Configurable limit to prevent infinite loops

## Output Format

### Cycle Summary Report
```json
{
  "working_directory": "string - current directory path",
  "git_branch": "string - active branch name",
  "iterations": [
    {
      "cycle": "number",
      "developer_commits": ["commit_hash_1", "commit_hash_2"],
      "review_feedback": "string - detailed review comments",
      "decision": "approved|rejected",
      "reasoning": "string - decision rationale"
    }
  ],
  "final_build_status": "success|failure|not_applicable",
  "final_status": "completed|failed|timeout",
  "total_cycles": "number",
  "completion_time": "string - timestamp"
}
```

### Agent Interaction Log
- Timestamped communication between agents
- Decision rationale and feedback history
- Code change tracking and review evolution

## Configuration Options

### Iteration Limits
- **max_cycles**: Maximum development-review iterations (default: 5)
- **timeout**: Maximum workflow duration (default: 60 minutes)

### Quality Gates & Research Integration
- **technology_validation**: Use context7 to verify framework and library choices
- **security_research**: Apply web_search for vulnerability scanning and security best practices
- **performance_benchmarking**: Leverage external data for performance standards
- **architecture_analysis**: Use sequential-thinking for systematic design evaluation
- **consensus_building**: Apply zen:consensus for complex technical decisions

## Final Output

Return structured report containing:
- Current working directory and Git branch status
- Complete iteration history with decisions
- Final code status and approval details
- Build verification status (when applicable)
- Recommendations for future improvements