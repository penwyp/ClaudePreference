# ClaudePreference

**English** | [中文](README_CN.md)

A comprehensive collection of development workflow commands for Claude Code, designed to streamline software development processes from planning to deployment.

## 🚀 Overview

ClaudePreference provides a suite of specialized commands that integrate seamlessly with Claude Code to provide intelligent assistance for:

- **Development Lifecycle Management**: From requirements analysis to deployment
- **Code Quality Assurance**: Automated reviews, testing, and security scanning
- **Project Maintenance**: Cleanup, documentation, and branch management
- **Architecture Planning**: Strategic design decisions and code analysis

## 📋 Available Commands
💡 **Complete Documentation**: Visit [Command Documentation Hub](docs/README.md) for detailed descriptions, usage examples, and best practices for all commands.

### Core Development Workflow

#### 1. **Orchestrated Development** - `/m:orchestrated-dev`
Multi-agent development workflow with coordinated dev-review cycles.

**Usage**: Deploy three specialized agents (Orchestrator, Developer, Reviewer) for collaborative development in the current directory.

**Features**:
- Research-driven architecture planning with MCP tools integration
- Template-based prompt generation for consistent agent communication
- Dynamic context-aware prompts with strict quality enforcement
- Build verification with 100% functional coverage requirement
- Evidence-based decision making with external validation

- **Detailed Documentation**: [m:orchestrated-dev](docs/en/commands/m-orchestrated-dev.md)

#### 2. **Commit & Push** - `/m:commit-push`
Automated commit and push workflow with intelligent message generation.

**Parameters**: `[message]` (optional)

**Examples**:
- `/m:commit-push "feat: add user authentication"`
- `/m:commit-push "fix: resolve memory leak"`
- `/m:commit-push` (auto-generates conventional commit message)

**Detailed Documentation**: [m-commit-push](docs/en/commands/m-commit-push.md)

#### 3. **Bug Fix Workflow** - `/m:bug-fix`
Comprehensive bug analysis, reproduction, and fix workflow.

**Parameters**: `[source]` (optional) - issue number, error text, screenshot, log file, or description

**Examples**:
- `/m:bug-fix #123` - Fix GitHub issue
- `/m:bug-fix "NullPointerException in login"`
- `/m:bug-fix screenshot.png` - Fix from error screenshot
- `/m:bug-fix logs/error.log` - Analyze log file

**Detailed Documentation**: [m:bug-fix](docs/en/commands/m-bug-fix.md)

### Code Quality Management

#### 4. **Security Scan** - `/m:security-scan`
Comprehensive security vulnerability scanning and assessment.

**Parameters**: `[scope]` (optional) - dependencies, auth, data-handling, full, or specific paths

**Examples**:
- `/m:security-scan dependencies` - Scan only dependencies
- `/m:security-scan auth` - Focus on authentication security
- `/m:security-scan src/api` - Scan specific directory

**Detailed Documentation**: [m:security-scan](docs/en/commands/m-security-scan.md)

#### 5. **Test Generation** - `/m:test-generation`
Automated test case generation with coverage analysis.

**Parameters**: `[type] [target] [coverage]` (optional)

**Examples**:
- `/m:test-generation unit src/auth 90%` - Generate unit tests with 90% coverage
- `/m:test-generation integration api` - Generate integration tests
- `/m:test-generation e2e user-flow` - Generate end-to-end tests

**Detailed Documentation**: [m:test-generation](docs/en/commands/m-test-generation.md)
**Detailed Documentation**:
#### 6. **Code Review** - `/m:review-code`
Tactical code review with quality assessment and reporting.

**Parameters**: `[target] [depth] [focus]` (optional)

**Examples**:
- `/m:review-code src/auth deep security` - Deep security review
- `/m:review-code PR#123 quick` - Quick PR review
- `/m:review-code components standard performance` - Performance review

### Project Management & Planning

#### 7. **Task Planner** - `/m:task-planner`
Analyze requirements and generate structured implementation plans.

**Parameters**: `[target]` (optional) - requirement documents or project scope

**Features**:
- Requirements analysis and task decomposition
- Dependency mapping and sequencing
- Implementation strategy design
- Visual task flow diagrams

**Detailed Documentation**: [m:task-planner](docs/en/commands/m-task-planner.md)

#### 8. **TDD Planner** - `/m:tdd-planner`
Generate comprehensive Test-Driven Development plans.

**Parameters**: `[target]` (optional) - requirement documents

**Features**:
- Test strategy design and framework selection
- Red-Green-Refactor cycle planning
- Test pyramid structure definition
- JSON-formatted implementation plan

**Detailed Documentation**: [m:tdd-planner](docs/en/commands/m-tdd-planner.md)
#### 9. **Next Tasks** - `/m:next-task`
Analyze current development status and generate prioritized action plans.

**Parameters**: `[priority]` (optional) - high, medium, low

**Features**:
- Documentation and tracker scanning
- Git history analysis for pending work
- Priority ranking and dependency assessment
- Comprehensive status reporting

**Detailed Documentation**: [m:next-task](docs/en/commands/m-next-task.md)
#### 10. **Next Context** - `/m:next-context`
Compile comprehensive task lists and background information.

**Parameters**: `[target]` (optional) - project scope or conversation context

**Features**:
- Project background analysis
- Task extraction and classification
- Supporting material collection
- Ambiguity detection and clarification

**Detailed Documentation**: [m:next-context](docs/en/commands/m-next-context.md)
### Maintenance & Documentation

#### 11. **Project Cleanup** - `/m:project-cleanup`
Automated project hygiene and maintenance workflow.

**Parameters**: `[scope]` (optional) - code, dependencies, structure, artifacts, config, all

**Features**:
- Dead code elimination
- Dependency pruning and updates
- Codebase formatting and linting
- Structural reorganization

**Detailed Documentation**: [m:project-cleanup](docs/en/commands/m-project-cleanup.md)

#### 12. **Document Update** - `/m:document-update`
Automated documentation maintenance and updates.

**Parameters**: `[scope]` (optional) - api, readme, changelog, comments, all, or specific paths

**Features**:
- API documentation refresh
- README and changelog updates
- Code comment validation
- Documentation consistency checks

**Detailed Documentation**: [m:document-update](docs/en/commands/m-document-update.md)

#### 13. **Branch Cleanup** - `/m:branch-prune`
Comprehensive branch management and cleanup workflow.

**Features**:
- Branch analysis and documentation
- Merged branch cleanup
- Functionality testing across versions
- Sequential merge operations

**Detailed Documentation**: [m:branch-prune](docs/en/commands/m-branch-prune.md)
#### 14. **Branch Cleanup Lite** - `/m:branch-prune-lite`
Lightweight branch cleanup without testing.

**Parameters**: `[target_branch]` (optional) - specific branch to prune

**Features**:
- Individual branch analysis
- Merged branch cleanup
- Specific worktree and branch removal
- Sequential merge operations

**Detailed Documentation**: [m:branch-prune-lite](docs/en/commands/m-branch-prune-lite.md)
### Architecture & Design

#### 15. **Architecture Debate** - `/m:debate-architecture`
Strategic architecture review and analysis workflow.

**Parameters**: `[target]` (optional) - modules, directories, or "all"

**Features**:
- System-wide pattern identification
- Structural design issue detection
- Strategic "-ilities" evaluation
- High-level refactoring proposals

**Detailed Documentation**: [m:debate-architecture](docs/en/commands/m-debate-architecture.md)
**Detailed Documentation**:
#### 16. **Code Debate** - `/m:debate-code`
Tactical code review with detailed implementation analysis.

**Parameters**: `[target] [depth] [focus]` (optional)

**Features**:
- Code implementation analysis
- Implementation-level issue identification
- Coding standards compliance verification
- Line-level feedback generation

**Detailed Documentation**: [m:debate-code](docs/en/commands/m-debate-code.md)
#### 17. **Review Completion** - `/m:review-completion`
Review completion workflow and verification.

**Features**:
- Completion status validation
- Quality gate verification
- Deliverable confirmation
- Final review sign-off

**Detailed Documentation**: [m:review-completion](docs/en/commands/m-review-completion.md)

#### 18. **Branch Merge** - `/m:merge-branch`
Intelligent branch merging workflow.

**Features**:
- Smart merge strategy selection
- Conflict resolution assistance
- Post-merge validation
- Automated cleanup

**Detailed Documentation**: [m:merge-branch](docs/en/commands/m-merge-branch.md)
## 🔧 Installation & Setup

### Prerequisites:
   - Claude Code CLI installed and configured
   - Appropriate development environment setup
   - Appropriate MCP environment setup (e.g. `context7`)

### Automated Installation (Recommended)

**Quick Install:**
```bash
# Clone and install in one command
git clone https://github.com/penwyp/ClaudePreference.git
cd ClaudePreference
./install.sh
```

**Installation Options:**
```bash
# Install to default location (~/.claude/commands/m)
./install.sh

# Install to custom directory
./install.sh --dir /custom/path

# Preview installation without making changes
./install.sh --dry-run

# Force overwrite existing files
./install.sh --force

# Update existing installation
./install.sh --update

# Show all available options
./install.sh --help
```

### Manual Installation
```bash
# Clone repository
git clone https://github.com/penwyp/ClaudePreference.git
cd ClaudePreference

# Copy commands manually
cp commands/* ~/.claude/commands/
```

### Verify Installation
```bash
# Start Claude Code in any project directory
claude

# Type "/" to see available commands
# Look for commands in the "m:" directory (e.g., /m:orchestrated-dev)
```

### Management Commands
```bash
# Update to latest version
./install.sh --update

# Remove ClaudePreference commands
./install.sh --uninstall

# Rollback to previous version
./install.sh --rollback
```

## 📖 Usage Examples

### Daily Development Workflow
```bash
# Start with task planning
/m:task-planner requirements.md

# Dev-Review Cycle
/m:orchestrated-dev requirements.md

# Generate tests for new features
/m:test-generation unit src/newfeature 85%

# Run security scan
/m:security-scan

# Commit and push changes
/m:commit-push "feat: implement user dashboard"
```

### Bug Fix Workflow
```bash
# Analyze and fix bug
/m:bug-fix #456

# Generate regression tests
/m:test-generation unit src/bugfix

# Review and commit fix
/m:review-code src/bugfix standard
/m:commit-push "fix: resolve login timeout issue"
```

### Pre-Release Workflow
```bash
# Comprehensive testing
/m:test-generation integration

# Update documentation
/m:document-update

# Security assessment
/m:security-scan full

# Clean up branches
/m:branch-prune
```

### Architecture Review
```bash
# Strategic architecture analysis
/m:debate-architecture src/core

# Tactical code review
/m:debate-code src/api deep security

# Generate improvement plan
/m:task-planner architecture-improvements.md
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
- Run `/m:project-cleanup` to resolve dependency issues
- Ensure all prerequisites are installed
- Check for conflicting dependencies

### Getting Help

For additional support:
- Check command-specific documentation in the `commands/` directory
- Review error messages for specific guidance
- Ensure your development environment meets all requirements

## Project Structure

```
ClaudePreference/
├── README.md                    # Main project documentation
├── README_CN.md                 # Chinese documentation
├── LICENSE                      # MIT license
├── install.sh                   # Installation script
├── commands/                    # Claude Code command definitions
│   ├── m-orchestrated-dev.md
│   ├── m-commit-push.md
│   ├── m-bug-fix.md
│   ├── m-security-scan.md
│   ├── m-test-generation.md
│   ├── m-review-code.md
│   ├── m-task-planner.md
│   ├── m-tdd-planner.md
│   ├── m-next-task.md
│   ├── m-next-context.md
│   ├── m-project-cleanup.md
│   ├── m-document-update.md
│   ├── m-branch-prune.md
│   ├── m-branch-prune-lite.md
│   ├── m-debate-architecture.md
│   ├── m-debate-code.md
│   ├── m-review-completion.md
│   └── m-merge-branch.md
└── docs/                        # Comprehensive documentation
    ├── README.md                # Documentation hub
    ├── en/                      # English documentation
    │   └── commands/            # Detailed command guides
    │       └── ...              # 18 command documentation files
    └── zh/                      # Chinese documentation
        └── commands/            # Chinese command guides
            └── ...              # 18 command documentation files
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