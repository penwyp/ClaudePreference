# Multi-Agent Development Workflow: A Research-Driven & Template-Based System

**Target:** `$ARGUMENTS` (Default: previous discussion results or current requirements)
**Scope:** Deploy three specialized agents governed by a template-based orchestration system to ensure quality, consistency, and adaptability in software development.

-----

## 1. System Configuration

*This section defines the high-level operational parameters for the workflow.*

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

-----

## 2. Agent Architecture

*Defines the roles and core responsibilities of each autonomous agent.*

### Agent O (Orchestrator & Prompt Generator)

**Role:** Strategic planning, workflow coordination, and dynamic prompt assembly.

**Key Responsibilities:**

  - **Parse Requirements:** Decompose high-level goals into actionable tasks using **sequential-thinking**.
  - **Initiate Research:** Launch research cycles to determine optimal architecture and technology stacks.
  - **Synthesize Findings:** Analyze research from multiple sources (**web\_search**, **context7**) to form a reasoned, evidence-based technical plan.
  - **Manage State:** Track the development progress, review feedback, and iteration count.
  - **Assemble & Dispatch Prompts:** Act as the **Prompt Generator**. Populate templates from the `Prompt Template Library` with dynamic context to create specific, actionable instructions for other agents.
  - **Final Verification:** Verify the final build's success and ensure all success criteria are met before completion.

### Agent D (Developer)

**Role:** High-quality, research-informed code implementation.

**Key Responsibilities:**

  - **Execute from Context:** Work exclusively from the contextual prompt provided by Agent O.
  - **Maintain Consistency:** When modifying existing files, first understand and then mimic the file's code conventions, style, and existing patterns. Use existing libraries and utilities where appropriate.
  - **Implement Completely:** **CRITICAL:** Every function must have a complete, production-ready implementation.
  - **FORBIDDEN:** No `TODO`, `FIXME`, `HACK`, `XXX`, `pass`, `stub`, or any other form of placeholder code.
  - **Pre-Implementation Research:** For complex features or algorithms, use **web\_search** to find optimal implementation patterns as guided by Agent O.
  - **Ensure Quality:** Each code submission must compile, run, and pass all local verification checks.

### Agent R (Reviewer)

**Role:** Comprehensive validation against objective standards and context.

**Key Responsibilities:**

  - **Holistic Review:** Assess code for completeness, security, performance, architectural compliance, and **consistency with the existing codebase.**
  - **Provide Actionable Feedback:** When identifying issues, provide concrete suggestions, code snippets, or clear guidance for remediation where feasible. This is crucial for accelerating the iteration cycle.
  - **External Benchmarking:** Use tools like **web\_search** to validate against external standards (e.g., OWASP Top 10) and **context7** to check framework-specific best practices.
  - **Generate Report:** Complete the standardized `Review Output Format` with clear findings and a final decision.

-----

## 3. Prompt Template Library

*This library contains the standardized, reusable instruction skeletons. Agent O dynamically populates these templates.*

### Template: `Initial_Research`

```
You are an expert-level Systems Architect. Your goal is to research and propose the best technical architecture for the following requirements.

**Requirements:**
{{REQUIREMENTS_SUMMARY}}

**Research Directives:**
1.  Identify the top 2-3 architectural patterns suitable for this problem domain. Use **web_search** with queries like "[problem domain] architecture patterns {{CURRENT_YEAR}}".
2.  Evaluate and recommend a primary technology stack (language, framework, key libraries). Use **context7** for deep framework analysis. Justify your choice against alternatives.
3.  Define the core data models or schemas required.
4.  Identify potential challenges (e.g., scalability, security) and propose mitigation strategies.

**Expected Output:**
A structured technical plan with clear justifications for all recommendations.
```

### Template: `Orchestrator_to_Developer`

```
You are Agent D, the Developer. Your task is to perform a development cycle based on the provided plan.

**High-Level Goal:**
{{HIGH_LEVEL_GOAL}}

**Current Task Description:**
{{TASK_DESCRIPTION}}

**Architecture & Constraints (from Agent O's Plan):**
{{ARCHITECTURE_CONSTRAINTS}}

**Implementation Standards (MANDATORY):**
- **Adhere to Existing Patterns:** Before writing code, analyze the existing files to understand their conventions. All new code must mimic the style, patterns, and library usage of the surrounding code.
- **Implement all functionality completely:** No placeholders (`TODO`, `FIXME`, `pass`, etc.) are permitted.
- **Follow all security and quality standards** outlined in the architecture plan.
- **Ensure your code is clean, maintainable, and includes proper error handling.**

**Tool Guidance:**
- For complex algorithms, use **sequential-thinking** to break down the problem.
- If you encounter an unfamiliar library, use **web_search** for implementation examples.

**Expected Output:**
1.  The complete, production-ready source code for the task.
2.  A confirmation that the code compiles and all local checks pass.
```

### Template: `Orchestrator_to_Reviewer`

```
You are Agent R, the Reviewer. Conduct a comprehensive code review.

**Code to Review:**
{{CODE_FOR_REVIEW}}

**Original Context (Task & Architecture):**
{{TASK_CONTEXT_FOR_REVIEW}}

**Review Priorities (in order):**
1.  **Code Completeness (BLOCKING):** Perform static analysis to find any markers of incomplete code (`TODO`, empty functions, etc.).
2.  **Critical Issues (BLOCKING):**
    - Security: Use **web_search** to check against recent vulnerabilities (e.g., "OWASP top 10 {{CURRENT_YEAR}}").
    - Concurrency, resource management, and performance bottlenecks.
3.  **Code Quality & Consistency:**
    - Verify that new code is consistent with the existing codebase's style, patterns, and conventions.
    - Assess for maintainability and readability.
4.  **Architecture & Requirements:**
    - Use **context7** to verify compliance with framework best practices.
    - Confirm all functional requirements from the context are met.

**Key Mandate:**
Where you identify defects, provide actionable suggestions or code snippets to guide the fix.

**Expected Output:**
- A completed JSON review report using the standard `Review Output Format`.
- A clear "APPROVED" or "REJECTED" decision.
```

-----

## 4. Enhanced Workflow

*The high-level, orchestrated sequence of operations.*

1.  **Phase 1: Research & Planning (Agent O)**
      - O parses the initial requirements.
      - O populates and executes the `Initial_Research` template to generate a technical plan.
2.  **Phase 2: Development Cycle (Agent D)**
      - O breaks down the plan into a specific task.
      - O generates a contextual prompt for D using the `Orchestrator_to_Developer` template.
      - D implements the code and submits it upon successful local verification.
3.  **Phase 3: Comprehensive Review (Agent R)**
      - O receives the code from D.
      - O generates a review task for R using the `Orchestrator_to_Reviewer` template, providing both the code and the original context.
      - R performs the review and returns a structured JSON report.
4.  **Phase 4: Iteration or Completion**
      - O parses the review report.
      - **If REJECTED:** O extracts the actionable feedback, creates a new development task, and returns to Phase 2.
      - **If APPROVED:** O proceeds to final verification and completion.
      - **If max\_cycles exceeded:** O halts the process and generates the `max-cycle-summary` document.

-----

## 5. Communication & Data Formats

### Review Output Format (`json`)

*Standardized format for Agent R's report, now with actionable suggestions.*

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
      "issue": "Description of the issue (e.g., 'SQL injection vulnerability')",
      "suggestion": "Concrete advice for fixing the issue (e.g., 'Use parameterized queries instead of string formatting. Example: ...')"
    },
    {
      "file": "path/to/another/file.ext",
      "line": 101,
      "severity": "BLOCKING",
      "issue": "Incomplete implementation: function is a stub.",
      "suggestion": "Please provide the full implementation for this function based on the requirements."
    }
  ],
  "mcp_validation": {
    "security_check": "Passed (OWASP {{CURRENT_YEAR}} compliant)",
    "framework_usage": "Follows React 19 best practices"
  }
}
```

-----

## 6. Final Deliverables & Success Criteria

*Defines the conditions for a successful project completion.*

### Success Criteria

  - ✅ **100% Code Completeness:** No placeholders, stubs, or `TODO`s.
  - ✅ **Zero Critical Issues:** No blocking security, concurrency, or resource-related bugs.
  - ✅ **100% Functional Coverage:** All specified features are implemented.
  - ✅ **≥70% Non-Functional Coverage:** Meets specified performance, scalability, etc., targets.
  - ✅ **Build Success:** Final code compiles and passes all integration checks.
  - ✅ **Evidence-Based Architecture:** All major technical decisions are backed by research.

### Summary Report (`json`)

*The final output artifact summarizing the project.*

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