# ClaudePreference Command Documentation

**English** | [中文](README_CN.md)

This is the comprehensive documentation for all Claude Code commands in the ClaudePreference project. Each command includes complete usage instructions, examples, and best practices.

## 📋 Command Categories

### Core Development Workflow

#### 🚀 Development Collaboration
- **[m:orchestrated-dev](en/commands/m-orchestrated-dev.md)** - Multi-agent collaborative development workflow
  - Three-agent collaboration (Orchestrator, Developer, Reviewer)
  - Research-driven development-review cycles
  - Automated quality control and verification

#### 📝 Version Control
- **[m:commit-push](en/commands/m-commit-push.md)** - Smart commit and push workflow
  - Auto-generates conventional commit messages
  - Integrated staging, committing, and pushing
  - Support for custom commit messages

- **[m:merge-branch](en/commands/m-merge-branch.md)** - Branch merging workflow
  - Smart branch merge strategies
  - Conflict resolution and verification
  - Post-merge cleanup

#### 🐛 Problem Resolution
- **[m:bug-fix](en/commands/m-bug-fix.md)** - Comprehensive bug fix workflow
  - Support for multiple bug source inputs (issue numbers, error text, screenshots, logs)
  - Complete analysis, reproduction, fix, and verification process
  - Automated testing and regression verification

### Code Quality Management

#### 🔍 Review and Analysis
- **[m:review-code](en/commands/m-review-code.md)** - Comprehensive code review workflow
  - Multi-dimensional review: functionality, security, performance
  - Bilingual report generation
  - Third-party library optimization suggestions

- **[m:debate-architecture](en/commands/m-debate-architecture.md)** - Architecture debate analysis
  - Strategic architecture review
  - System design pattern evaluation
  - Advanced refactoring suggestions

- **[m:debate-code](en/commands/m-debate-code.md)** - Code debate analysis
  - Tactical code review
  - Implementation-level issue identification
  - Coding standards compliance verification

#### 🛡️ Security Testing
- **[m:security-scan](en/commands/m-security-scan.md)** - Comprehensive security scanning workflow
  - Dependencies, authentication, data processing security checks
  - OWASP Top 10 compliance validation
  - Automated security fix suggestions

#### 🧪 Test Generation
- **[m:test-generation](en/commands/m-test-generation.md)** - Automated test generation workflow
  - Unit tests, integration tests, end-to-end tests
  - Coverage analysis and target setting
  - Multi-framework support

- **[m:tdd-planner](en/commands/m-tdd-planner.md)** - TDD planning workflow
  - Test-driven development plan generation
  - Red-Green-Refactor cycle planning
  - JSON format structured output

### Project Management & Planning

#### 📊 Task Planning
- **[m:task-planner](en/commands/m-task-planner.md)** - Development task planning workflow
  - Requirements analysis and task decomposition
  - Dependency relationship mapping
  - Visual task flow diagrams

- **[m:next-task](en/commands/m-next-task.md)** - Next task analysis
  - Current status analysis
  - Priority task identification
  - Action plan generation

- **[m:next-context](en/commands/m-next-context.md)** - Context compilation
  - Project background analysis
  - Task extraction and classification
  - Supporting material collection

#### 📋 Completion Verification
- **[m:review-completion](en/commands/m-review-completion.md)** - Review completion workflow
  - Completion status verification
  - Quality gate checks
  - Deliverable confirmation

### Maintenance & Documentation

#### 🧹 Cleanup & Maintenance
- **[m:project-cleanup](en/commands/m-project-cleanup.md)** - Project cleanup workflow
  - Code cleanup and optimization
  - Dependency management
  - Structure reorganization

- **[m:branch-prune](en/commands/m-branch-prune.md)** - Branch cleanup workflow
  - Merged branch cleanup
  - Function testing and verification
  - Sequential merge operations

- **[m:branch-prune-lite](en/commands/m-branch-prune-lite.md)** - Lightweight branch cleanup
  - Quick branch cleanup
  - Simplified process without testing
  - Specific branch handling

#### 📚 Documentation Management
- **[m:document-update](en/commands/m-document-update.md)** - Documentation update workflow
  - API documentation auto-update
  - README and changelog maintenance
  - Code comment validation