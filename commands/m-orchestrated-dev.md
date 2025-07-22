# Multi-Agent Development Workflow: Direct Communication & Template-Based System

**Target:** `$ARGUMENTS` (Default: previous discussion results or current requirements)
**Scope:** Three specialized agents with direct inter-agent communication for coordinated development cycles.

-----

## 1. Agent Architecture

### Agent O (Orchestrator)
**Primary Role:** Central coordinator and strategic decision maker

**Core Capabilities:**
- **Deep Thinking:** Decompose complex requirements into executable tasks
- **Research Integration:** Synthesize findings from web_search and context7 tools
- **Template Processing:** Dynamically populate and dispatch task templates to other agents
- **State Management:** Maintain workflow state and iteration tracking
- **Decision Authority:** Make final approval decisions based on review feedback

**Communication Protocol:**
- **Receives:** Initial requirements from system/user
- **Sends to D:** Populated development task templates with research-backed specifications
- **Sends to R:** Review requests with full context and validation criteria
- **Receives from D:** Implementation completion status and artifacts
- **Receives from R:** Structured review reports with approval/rejection decisions

### Agent D (Developer)
**Primary Role:** Implementation specialist focused on complete, production-ready code

**Core Capabilities:**
- **Context-Driven Development:** Execute based on orchestrator's specifications
- **Pattern Recognition:** Analyze and maintain existing codebase conventions
- **Complete Implementation:** Produce fully functional code without placeholders
- **Quality Assurance:** Ensure all code compiles and passes local tests

**Communication Protocol:**
- **Receives from O:** Development tasks with architectural constraints and requirements
- **Executes:** Implementation in current working directory
- **Sends to O:** Completion notification with code artifacts and self-validation results

**Critical Constraints:**
- **FORBIDDEN:** `TODO`, `FIXME`, `HACK`, `XXX`, `pass`, `stub`, empty implementations
- **REQUIRED:** Every function/method must be complete and functional

### Agent R (Reviewer)
**Primary Role:** Quality gatekeeper and compliance validator

**Core Capabilities:**
- **Multi-Dimensional Analysis:** Code completeness, security, performance, architecture
- **External Validation:** Benchmark against industry standards (OWASP, best practices)
- **Actionable Feedback:** Provide specific fixes and code suggestions
- **Framework Compliance:** Verify adherence to chosen technology patterns

**Communication Protocol:**
- **Receives from O:** Review requests with code location and validation criteria
- **Analyzes:** Code against multiple quality dimensions
- **Sends to O:** Structured JSON reports with APPROVED/REJECTED decision

-----

## 2. Direct Communication Templates

### Template: `Initial_Research` (O executes internally)
```
AGENT O INTERNAL PROCESS:

Given requirements: {{REQUIREMENTS_SUMMARY}}

Execute research protocol:
1. web_search "[domain] architecture patterns 2025" → Identify 2-3 suitable patterns
2. context7 analyze [candidate frameworks] → Deep framework evaluation
3. sequential_thinking decompose complexity → Break down into implementable components
4. Synthesize findings → Create evidence-based technical plan

Output: Technical architecture decision document
```

### Template: `Development_Assignment` (O → D)
```
TO: Agent D
FROM: Agent O
TYPE: Development Task

You are the Developer. Implement the following based on researched architecture:

**Goal:** {{HIGH_LEVEL_GOAL}}
**Task:** {{TASK_DESCRIPTION}}
**Architecture Decisions:** {{ARCHITECTURE_CONSTRAINTS}}

**Mandatory Standards:**
- Analyze existing code patterns BEFORE implementation
- Complete all functions (NO placeholders allowed)
- Ensure compilation and test success
- Follow security guidelines from architecture

**Research Support:**
- For unfamiliar patterns: web_search "[pattern] implementation examples 2025"
- For complex algorithms: Use sequential_thinking for breakdown

**Expected Delivery:**
- Complete source code in current directory
- Confirmation of successful build/test
```

### Template: `Review_Request` (O → R)
```
TO: Agent R
FROM: Agent O
TYPE: Code Review Request

Conduct comprehensive review of implemented code.

**Code Location:** {{CODE_FOR_REVIEW}}
**Original Requirements:** {{TASK_CONTEXT_FOR_REVIEW}}

**Review Protocol (Priority Order):**
1. BLOCKING - Completeness scan for TODO/stub/empty implementations
2. BLOCKING - Security validation against "OWASP 2025" standards
3. CRITICAL - Architecture compliance and pattern consistency
4. IMPORTANT - Code quality, maintainability, performance

**Validation Tools:**
- web_search for current security vulnerabilities
- context7 for framework best practices
- sequential_thinking for systematic analysis

**Required Output:**
- JSON report with APPROVED/REJECTED decision
- Specific fix suggestions for each issue found
```

-----

## 3. Workflow Execution Flow

### Stage 1: Orchestrator Initialization
```
Agent O receives $ARGUMENTS
↓
O executes Initial_Research template internally
↓
O generates Technical Architecture Plan with evidence
```

### Stage 2: Development Cycle
```
O creates Development_Assignment from template
↓
O sends assignment directly to Agent D
↓
D implements in current directory (no placeholders)
↓
D validates locally and sends completion to O
```

### Stage 3: Review Process
```
O creates Review_Request from template
↓
O sends request directly to Agent R with full context
↓
R executes comprehensive analysis using tools
↓
R sends structured JSON report to O
```

### Stage 4: Decision & Iteration
```
O evaluates R's report
↓
IF APPROVED → Proceed to completion
IF REJECTED → Create new D assignment with R's feedback
IF max_cycles → Generate summary and halt
```

-----

## 4. Inter-Agent Communication Protocol

### Message Format (Direct Communication)
```python
# Pseudo-code for agent communication
class AgentMessage:
    sender: AgentID
    recipient: AgentID
    message_type: TaskType
    payload: Dict
    context: Dict
    timestamp: DateTime
```

### Communication Rules
1. **Direct Addressing:** Agents communicate directly by name/role
2. **Context Preservation:** Each message includes full context
3. **No Shared State:** Agents maintain independence
4. **Synchronous Responses:** Agents wait for task completion
5. **Template-Based:** All communications use predefined templates

-----

## 5. Review Output Format (R → O)

```json
{
  "decision": "APPROVED | REJECTED",
  "timestamp": "2025-01-XX T00:00:00Z",
  "summary": {
    "completeness_check": "PASS | FAIL",
    "security_validation": "PASS | FAIL", 
    "architecture_compliance": "PASS | FAIL",
    "code_quality_score": 85
  },
  "blocking_issues": [
    {
      "file": "src/api/handler.js",
      "line": 45,
      "issue": "SQL injection vulnerability detected",
      "fix": "Replace string concatenation with parameterized query:\n`db.query('SELECT * FROM users WHERE id = ?', [userId])`"
    }
  ],
  "suggestions": [
    {
      "file": "src/utils/logger.js",
      "type": "performance",
      "suggestion": "Consider using winston for structured logging"
    }
  ],
  "validation_sources": {
    "security": "OWASP Top 10 2025",
    "framework": "React 19 best practices via context7"
  }
}
```

-----

## 6. Execution Configuration

```yaml
workflow_config:
  max_iterations: 5
  working_directory: "./"
  
  agent_tools:
    orchestrator: [web_search, context7, sequential_thinking]
    developer: [web_search, sequential_thinking]
    reviewer: [web_search, context7, sequential_thinking]
  
  quality_gates:
    code_completeness: 100%  # No placeholders
    functional_coverage: 100%
    security_compliance: required
    
  research_protocol:
    prioritize_year: 2025  # For time-sensitive searches
    evidence_required: true
```

-----

## 7. Success Criteria & Final Output

### Project Success Metrics
- ✅ Zero incomplete implementations (no TODOs)
- ✅ All security validations passed
- ✅ Architecture compliance verified
- ✅ Build and tests successful
- ✅ Review approved within max_iterations

### Final Summary Report
```json
{
  "workflow_summary": {
    "total_iterations": 3,
    "agents_involved": ["orchestrator", "developer", "reviewer"],
    "research_queries_executed": 15,
    "architecture_decision": "Next.js 14 with TypeScript",
    "final_status": "COMPLETED"
  },
  "quality_metrics": {
    "code_completeness": "100%",
    "security_issues": 0,
    "test_coverage": "92%"
  },
  "artifacts": {
    "source_code": "./src/",
    "documentation": "./docs/",
    "architecture_decisions": "./decisions/adr-001.md"
  }
}
```