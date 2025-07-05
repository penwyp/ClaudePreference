# ClaudePreference

A comprehensive collection of development workflow commands for Claude Code, designed to streamline software development processes from planning to deployment.

## 🚀 Overview

ClaudePreference provides a suite of specialized commands that automate and optimize common development workflows. These commands integrate seamlessly with Claude Code to provide intelligent assistance for:

- **Development Lifecycle Management**: From requirements analysis to deployment
- **Code Quality Assurance**: Automated reviews, testing, and security scanning
- **Project Maintenance**: Cleanup, documentation, and branch management
- **Architecture Planning**: Strategic design decisions and code analysis

## 📋 Available Commands

### Core Development Workflow

#### 1. **Orchestrated Development** - `m-orchestrated-dev`
Multi-agent development workflow with coordinated dev-review cycles.

**Usage**: Deploy three specialized agents (Orchestrator, Developer, Reviewer) for collaborative development in the current directory.

**Features**:
- Strategic planning with research validation
- Code implementation with review cycles
- Build verification and quality gates
- Evidence-based decision making

#### 2. **Commit & Push** - `m-commit-push`
Automated commit and push workflow with intelligent message generation.

**Parameters**: `[message]` (optional)

**Examples**:
- `m-commit-push "feat: add user authentication"`
- `m-commit-push "fix: resolve memory leak"`
- `m-commit-push` (auto-generates conventional commit message)

#### 3. **Bug Fix Workflow** - `m-bug-fix`
Comprehensive bug analysis, reproduction, and fix workflow.

**Parameters**: `[source]` (optional) - issue number, error text, screenshot, log file, or description

**Examples**:
- `m-bug-fix #123` - Fix GitHub issue
- `m-bug-fix "NullPointerException in login"`
- `m-bug-fix screenshot.png` - Fix from error screenshot
- `m-bug-fix logs/error.log` - Analyze log file

### Code Quality Management

#### 4. **Security Scan** - `m-security-scan`
Comprehensive security vulnerability scanning and assessment.

**Parameters**: `[scope]` (optional) - dependencies, auth, data-handling, full, or specific paths

**Examples**:
- `m-security-scan dependencies` - Scan only dependencies
- `m-security-scan auth` - Focus on authentication security
- `m-security-scan src/api` - Scan specific directory

#### 5. **Test Generation** - `m-test-generation`
Automated test case generation with coverage analysis.

**Parameters**: `[type] [target] [coverage]` (optional)

**Examples**:
- `m-test-generation unit src/auth 90%` - Generate unit tests with 90% coverage
- `m-test-generation integration api` - Generate integration tests
- `m-test-generation e2e user-flow` - Generate end-to-end tests

#### 6. **Code Review** - `m-review-code`
Tactical code review with quality assessment and reporting.

**Parameters**: `[target] [depth] [focus]` (optional)

**Examples**:
- `m-review-code src/auth deep security` - Deep security review
- `m-review-code PR#123 quick` - Quick PR review
- `m-review-code components standard performance` - Performance review

### Project Management & Planning

#### 7. **Task Planner** - `m-task-planner`
Analyze requirements and generate structured implementation plans.

**Parameters**: `[target]` (optional) - requirement documents or project scope

**Features**:
- Requirements analysis and task decomposition
- Dependency mapping and sequencing
- Implementation strategy design
- Visual task flow diagrams

#### 8. **TDD Planner** - `m-tdd-planner`
Generate comprehensive Test-Driven Development plans.

**Parameters**: `[target]` (optional) - requirement documents

**Features**:
- Test strategy design and framework selection
- Red-Green-Refactor cycle planning
- Test pyramid structure definition
- JSON-formatted implementation plan

#### 9. **Next Tasks** - `m-next-task`
Analyze current development status and generate prioritized action plans.

**Parameters**: `[priority]` (optional) - high, medium, low

**Features**:
- Documentation and tracker scanning
- Git history analysis for pending work
- Priority ranking and dependency assessment
- Comprehensive status reporting

#### 10. **Next Context** - `m-next-context`
Compile comprehensive task lists and background information.

**Parameters**: `[target]` (optional) - project scope or conversation context

**Features**:
- Project background analysis
- Task extraction and classification
- Supporting material collection
- Ambiguity detection and clarification

### Maintenance & Documentation

#### 11. **Project Cleanup** - `m-project-cleanup`
Automated project hygiene and maintenance workflow.

**Parameters**: `[scope]` (optional) - code, dependencies, structure, artifacts, config, all

**Features**:
- Dead code elimination
- Dependency pruning and updates
- Codebase formatting and linting
- Structural reorganization

#### 12. **Document Update** - `m-document-update`
Automated documentation maintenance and updates.

**Parameters**: `[scope]` (optional) - api, readme, changelog, comments, all, or specific paths

**Features**:
- API documentation refresh
- README and changelog updates
- Code comment validation
- Documentation consistency checks

#### 13. **Branch Cleanup** - `m-branch-prune`
Comprehensive branch management and cleanup workflow.

**Features**:
- Branch analysis and documentation
- Merged branch cleanup
- Functionality testing across versions
- Sequential merge operations

#### 14. **Branch Cleanup Lite** - `m-branch-prune-lite`
Lightweight branch cleanup without testing.

**Parameters**: `[target_branch]` (optional) - specific branch to prune

**Features**:
- Individual branch analysis
- Merged branch cleanup
- Specific worktree and branch removal
- Sequential merge operations

### Architecture & Design

#### 15. **Architecture Debate** - `m-debate-architecture`
Strategic architecture review and analysis workflow.

**Parameters**: `[target]` (optional) - modules, directories, or "all"

**Features**:
- System-wide pattern identification
- Structural design issue detection
- Strategic "-ilities" evaluation
- High-level refactoring proposals

#### 16. **Code Debate** - `m-debate-code`
Tactical code review with detailed implementation analysis.

**Parameters**: `[target] [depth] [focus]` (optional)

**Features**:
- Code implementation analysis
- Implementation-level issue identification
- Coding standards compliance verification
- Line-level feedback generation

## 🔧 Installation & Setup

1. **Prerequisites**:
   - Claude Code CLI installed and configured
   - Appropriate development environment setup
   - Appropriate MCP environment setup (e.g. `context7`)

2. **Usage**:
   ```bash
   # Navigate to your project directory
   cd /path/to/your/code
   git clone https://github.com/penwyp/ClaudePreference.git
   cd ClaudePreference
   cp commands/* ~/.claude/commands/
   
   # Run another claude code command
   claude
   # User Slah "/" to select the command you want to run
   ```

## 📖 Usage Examples

### Daily Development Workflow
```bash
# Start with task planning
/m-task-planner requirements.md

# Dev-Review Cycle
/m-orchestrated-dev requirements.md

# Generate tests for new features
/m-test-generation unit src/newfeature 85%

# Run security scan
/m-security-scan

# Commit and push changes
/m-commit-push "feat: implement user dashboard"
```

### Bug Fix Workflow
```bash
# Analyze and fix bug
/m-bug-fix #456

# Generate regression tests
/m-test-generation unit src/bugfix

# Review and commit fix
/m-review-code src/bugfix standard
/m-commit-push "fix: resolve login timeout issue"
```

### Pre-Release Workflow
```bash
# Comprehensive testing
/m-test-generation integration

# Update documentation
/m-document-update

# Security assessment
/m-security-scan full

# Clean up branches
/m-branch-prune
```

### Architecture Review
```bash
# Strategic architecture analysis
/m-debate-architecture src/core

# Tactical code review
/m-debate-code src/api deep security

# Generate improvement plan
m-task-planner architecture-improvements.md
```

## 🛠️ Best Practices

1. **Command Sequencing**: Use commands in logical order for optimal results
2. **Parameter Usage**: Leverage optional parameters for targeted operations
3. **Regular Maintenance**: Run cleanup and security scans regularly
4. **Documentation**: Keep documentation updated after significant changes
5. **Testing**: Generate comprehensive tests before major releases

## 🚨 Troubleshooting

### Common Issues

**Command Not Found**:
- Ensure Claude Code CLI is properly installed
- Verify you're in the correct project directory
- Check that the commands/ directory exists

**Permission Errors**:
- Ensure proper Git permissions
- Verify write access to project files
- Check Claude Code authentication

**Build Failures**:
- Run `m-project-cleanup` to resolve dependency issues
- Ensure all prerequisites are installed
- Check for conflicting dependencies

### Getting Help

For additional support:
- Check command-specific documentation in the `commands/` directory
- Review error messages for specific guidance
- Ensure your development environment meets all requirements

## 📁 Project Structure

```
ClaudePreference/
├── README.md                    # This file
├── commands/                    # Command definitions
│   ├── README.md               # Command usage guide (Chinese)
│   ├── m-orchestrated-dev.md   # Multi-agent development
│   ├── m-commit-push.md        # Commit and push workflow
│   ├── m-bug-fix.md           # Bug fix workflow
│   ├── m-security-scan.md     # Security scanning
│   ├── m-test-generation.md   # Test generation
│   ├── m-review-code.md       # Code review
│   ├── m-task-planner.md      # Task planning
│   ├── m-tdd-planner.md       # TDD planning
│   ├── m-next-task.md         # Next task analysis
│   ├── m-next-context.md      # Context compilation
│   ├── m-project-cleanup.md   # Project cleanup
│   ├── m-document-update.md   # Documentation updates
│   ├── m-branch-prune.md      # Branch cleanup
│   ├── m-branch-prune-lite.md # Lightweight branch cleanup
│   ├── m-debate-architecture.md # Architecture review
│   └── m-debate-code.md       # Code review debate
└── docs/                       # Generated reports and documentation
    └── workspaces/            # Workflow output files
```

## 🤝 Contributing

This project is designed to evolve with your development needs. Feel free to:
- Customize commands for your specific workflows
- Add new commands following the established patterns
- Improve existing command documentation
- Share your workflow optimizations

## 📄 License

This project is open source and available under standard software development practices.

---

*Built for developers who value intelligent automation and comprehensive workflow management.*
