# Multi-Agent Development Workflow: Research-Driven Dev-Review Cycles

**Target:** $ARGUMENTS (Default: previous discussion results or current requirements)
**Scope:** Deploy three specialized agents with MCP tools for optimal development

## Agent Architecture

### Agent O (Orchestrator)
**Role:** Strategic planning, architecture decisions, and workflow coordination

**Key Responsibilities:**
- Parse requirements using **sequential-thinking** for complex analysis
- Research optimal architecture patterns:
  - Use **context7** for framework evaluation and best practices
  - Use **web_search** (append "2025" for latest practices) for current solutions
  - Apply **zen:consensus** for critical technical decisions
- Create evidence-based development plans
- Coordinate Developer and Reviewer with research-backed guidance
- Ensure 100% functional requirements, 70% non-functional requirements
- Verify final build success before completion

**MCP Tool Usage:**
```
Phase 1 (Requirements Analysis):
- sequential-thinking: Break down complex requirements
- web_search "best practices [tech stack] 2025": Current standards

Phase 2 (Architecture Planning):
- context7: Evaluate framework options
- web_search "[problem domain] architecture patterns 2025"
- Document rationale for all technical choices
```

### Agent D (Developer)
**Role:** Implementation with research-informed coding practices

**Key Responsibilities:**
- **CRITICAL**: Every function must be completely implemented
- **FORBIDDEN**: No TODO, FIXME, HACK, XXX, stub, or placeholder code
- Research before implementing complex features:
  - Use **web_search** for implementation patterns
  - Apply **sequential-thinking** for algorithm design
- Each commit must compile and run successfully
- Implement with production-ready quality

**Implementation Standards:**
- Zero tolerance for incomplete code
- Security-first implementation
- Proper error handling in all paths
- Clean, maintainable code structure

### Agent R (Reviewer)
**Role:** Comprehensive validation with external benchmarking

**Review Priorities (in order):**

1. **Code Completeness (BLOCKING)**
   - Scan for ANY incomplete markers: TODO, FIXME, pass, stub, ...
   - Verify all functions have implementations
   - Check all error paths are handled
   - Use pattern: `grep -r "TODO\|FIXME\|XXX\|HACK\|pass\|\.\.\.|\bstub\b"`

2. **Critical Issues (BLOCKING)**
   - Security: Use **web_search "[language] security vulnerabilities 2025"**
   - Concurrency: Check race conditions, deadlocks
   - Resource management: Memory leaks, unclosed resources
   - Authentication/Authorization gaps

3. **Architecture Quality**
   - Use **context7** to verify framework usage
   - Compare against industry best practices
   - Assess scalability and maintainability

4. **Requirements Coverage**
   - Map features to requirements
   - Verify 100% functional coverage
   - Assess non-functional achievements

**MCP Tool Usage:**
```
- web_search "OWASP top 10 2025": Security validation
- context7: Framework-specific best practices
- sequential-thinking: Systematic code analysis
```

## Enhanced Workflow

### 1. Research-Driven Planning (Agent O)
```yaml
Input: Requirements
Actions:
  1. Use sequential-thinking to decompose requirements
  2. Research optimal solutions:
     - web_search "[domain] best architecture 2025"
     - context7 for framework selection
  3. Create evidence-based plan with justifications
Output: Detailed plan with research backing
```

### 2. Informed Development Cycle
```yaml
Orchestrator → Developer:
  - Task specification
  - Recommended patterns from research
  - Architecture constraints

Developer Actions:
  - Research complex implementations via web_search
  - Implement complete solution (no placeholders)
  - Self-verify completeness before submission

Developer → Orchestrator:
  - Complete implementation
  - No TODO/stub code
  - Build verification passed
```

### 3. Comprehensive Review
```yaml
Orchestrator → Reviewer:
  - Code for review
  - Architecture context
  - Research references

Reviewer Actions:
  1. Completeness check (grep patterns)
  2. Security audit (OWASP reference)
  3. Architecture compliance (context7)
  4. Requirements mapping

Reviewer → Orchestrator:
  - Detailed findings
  - External validation results
  - Accept/Reject decision
```

### 4. Decision Matrix
| Completeness | Critical Issues | Functional | Non-Functional | Decision |
|-------------|-----------------|------------|----------------|----------|
| < 100% | - | - | - | REJECT: Fix incomplete code |
| 100% | Yes | - | - | REJECT: Fix critical issues |
| 100% | No | < 100% | - | REJECT: Complete features |
| 100% | No | 100% | < 70% | WARN: Consider improvements |
| 100% | No | 100% | ≥ 70% | APPROVE |

### 5. Iteration Management
- Maximum cycles: 5 (configurable)
- Track rejection reasons for learning
- If max cycles exceeded:
  - Generate `docs/todo/max-cycle-summary-<timestamp>.md`
  - Include accomplished work and remaining tasks

## Communication Protocol

### Status Messages
```json
{
  "agent": "O|D|R",
  "phase": "planning|implementing|reviewing",
  "mcp_tools_used": ["tool_name"],
  "research_findings": ["key insights"],
  "decision_rationale": "explanation"
}
```

### Review Output Format
```json
{
  "completeness": {
    "status": "PASS|FAIL",
    "incomplete_items": [
      {
        "file": "path/file.ext",
        "line": 42,
        "issue": "empty function|TODO|stub",
        "severity": "BLOCKING"
      }
    ]
  },
  "critical_issues": {
    "security": ["SQL injection risk in UserService"],
    "concurrency": ["Race condition in payment processing"],
    "performance": ["N+1 query in data fetching"]
  },
  "architecture_assessment": {
    "follows_best_practices": true|false,
    "deviations": ["explanation"],
    "recommendations": ["improvement suggestions"]
  },
  "requirements_coverage": {
    "functional": 95,
    "non_functional": 72,
    "missing_features": ["feature list"]
  },
  "mcp_validation": {
    "security_check": "OWASP 2025 compliant",
    "framework_usage": "Follows React 19 patterns"
  },
  "decision": "APPROVED|REJECTED",
  "action_items": ["specific next steps"]
}
```

## Final Deliverables

### Success Criteria
- ✅ 100% complete code (no placeholders)
- ✅ Zero critical security/concurrency issues
- ✅ 100% functional requirements
- ✅ ≥70% non-functional requirements
- ✅ Build/compilation success
- ✅ Research-backed architecture decisions

### Summary Report
```json
{
  "project_stats": {
    "working_directory": "path",
    "total_cycles": 3,
    "mcp_tools_used": {
      "web_search": 12,
      "context7": 5,
      "sequential_thinking": 8
    },
    "architecture_decisions": [
      {
        "decision": "Use Next.js 14",
        "rationale": "Based on web_search results...",
        "alternatives_considered": ["Remix", "Nuxt"]
      }
    ]
  },
  "code_quality": {
    "completeness": "100%",
    "security_issues": 0,
    "test_coverage": "report if available"
  },
  "requirements_fulfillment": {
    "functional": "100%",
    "non_functional": "85%",
    "performance": "meets targets",
    "scalability": "supports 10k users"
  }
}
```

## Configuration

```yaml
max_cycles: 5
timeout_minutes: 60
mcp_tools:
  enabled: ["web_search", "context7", "sequential_thinking", "zen:consensus"]
  web_search_suffix: "2025"  # Always append for current info
strict_mode:
  no_incomplete_code: true
  require_security_check: true
  min_functional_coverage: 100
  min_non_functional_coverage: 70
```

## Execution Guidelines

1. **Start**: Orchestrator analyzes requirements with MCP tools
2. **Research**: Gather best practices before coding
3. **Implement**: Developer writes complete code
4. **Verify**: Reviewer checks against external standards
5. **Iterate**: Use research to guide improvements
6. **Complete**: Deliver with full documentation

**Remember**: Quality through research, completeness through discipline