# ClaudePreference Command Documentation

**English** | [中文](../zh/README.md)

This is the comprehensive documentation for all Claude Code commands in the ClaudePreference project. Each command includes complete usage instructions, examples, and best practices.

## 📋 Command Categories

### Core Development Workflow

#### 🚀 Development Collaboration
- **[m-orchestrated-dev](commands/m-orchestrated-dev.md)** - Multi-agent collaborative development workflow
  - Three-agent collaboration (Orchestrator, Developer, Reviewer)
  - Research-driven development-review cycles
  - Automated quality control and verification

#### 📝 Version Control
- **[m-commit-push](commands/m-commit-push.md)** - Smart commit and push workflow
  - Auto-generates conventional commit messages
  - Integrated staging, committing, and pushing
  - Support for custom commit messages

- **[m-merge-branch](commands/m-merge-branch.md)** - Branch merging workflow
  - Smart branch merge strategies
  - Conflict resolution and verification
  - Post-merge cleanup

#### 🐛 Problem Resolution
- **[m-bug-fix](commands/m-bug-fix.md)** - Comprehensive bug fix workflow
  - Support for multiple bug source inputs (issue numbers, error text, screenshots, logs)
  - Complete analysis, reproduction, fix, and verification process
  - Automated testing and regression verification

### Code Quality Management

#### 🔍 Review and Analysis
- **[m-review-code](commands/m-review-code.md)** - Comprehensive code review workflow
  - Multi-dimensional review: functionality, security, performance
  - Bilingual report generation
  - Third-party library optimization suggestions

- **[m-debate-architecture](commands/m-debate-architecture.md)** - Architecture debate analysis
  - Strategic architecture review
  - System design pattern evaluation
  - Advanced refactoring suggestions

- **[m-debate-code](commands/m-debate-code.md)** - Code debate analysis
  - Tactical code review
  - Implementation-level issue identification
  - Coding standards compliance verification

#### 🛡️ Security Testing
- **[m-security-scan](commands/m-security-scan.md)** - Comprehensive security scanning workflow
  - Dependencies, authentication, data processing security checks
  - OWASP Top 10 compliance validation
  - Automated security fix suggestions

#### 🧪 Test Generation
- **[m-test-generation](commands/m-test-generation.md)** - Automated test generation workflow
  - Unit tests, integration tests, end-to-end tests
  - Coverage analysis and target setting
  - Multi-framework support

- **[m-tdd-planner](commands/m-tdd-planner.md)** - TDD planning workflow
  - Test-driven development plan generation
  - Red-Green-Refactor cycle planning
  - JSON format structured output

### Project Management & Planning

#### 📊 Task Planning
- **[m-task-planner](commands/m-task-planner.md)** - Development task planning workflow
  - Requirements analysis and task decomposition
  - Dependency relationship mapping
  - Visual task flow diagrams

- **[m-next-task](commands/m-next-task.md)** - Next task analysis
  - Current status analysis
  - Priority task identification
  - Action plan generation

- **[m-next-context](commands/m-next-context.md)** - Context compilation
  - Project background analysis
  - Task extraction and classification
  - Supporting material collection

#### 📋 Completion Verification
- **[m-review-completion](commands/m-review-completion.md)** - Review completion workflow
  - Completion status verification
  - Quality gate checks
  - Deliverable confirmation

### Maintenance & Documentation

#### 🧹 Cleanup & Maintenance
- **[m-project-cleanup](commands/m-project-cleanup.md)** - Project cleanup workflow
  - Code cleanup and optimization
  - Dependency management
  - Structure reorganization

- **[m-branch-prune](commands/m-branch-prune.md)** - Branch cleanup workflow
  - Merged branch cleanup
  - Function testing and verification
  - Sequential merge operations

- **[m-branch-prune-lite](commands/m-branch-prune-lite.md)** - Lightweight branch cleanup
  - Quick branch cleanup
  - Simplified process without testing
  - Specific branch handling

#### 📚 Documentation Management
- **[m-document-update](commands/m-document-update.md)** - Documentation update workflow
  - API documentation auto-update
  - README and changelog maintenance
  - Code comment validation

## 🚀 Quick Start

### Installation & Setup
```bash
# Clone the project
git clone https://github.com/penwyp/ClaudePreference.git
cd ClaudePreference

# Copy commands to Claude Code directory
cp commands/* ~/.claude/commands/

# Start Claude Code
claude
```

### Basic Usage
```bash
# Use slash commands
/m-orchestrated-dev requirements.md
/m-commit-push "feat: add new feature"
/m-security-scan
```

## 🎯 Usage Scenarios

### Daily Development Workflow
```bash
# 1. Task planning
/m-task-planner requirements.md

# 2. Collaborative development
/m-orchestrated-dev

# 3. Code review
/m-review-code src/

# 4. Test generation
/m-test-generation unit src/ 85%

# 5. Security scan
/m-security-scan

# 6. Commit and push
/m-commit-push
```

### Bug Fix Workflow
```bash
# 1. Analyze bug
/m-bug-fix #123

# 2. Generate tests
/m-test-generation unit src/bugfix/

# 3. Code review
/m-review-code src/bugfix/

# 4. Commit fix
/m-commit-push "fix: resolve issue #123"
```

### Pre-Release Workflow
```bash
# 1. Comprehensive testing
/m-test-generation all

# 2. Security scan
/m-security-scan full

# 3. Code review
/m-review-code

# 4. Documentation update
/m-document-update

# 5. Project cleanup
/m-project-cleanup

# 6. Branch cleanup
/m-branch-prune
```

## 🔧 Configuration Options

### Command Parameter Patterns
- **No parameters**: Use default behavior
- **Single parameter**: Specify target or scope
- **Multiple parameters**: Detailed configuration options

### Output Formats
- **Console output**: Real-time progress and results
- **File reports**: Saved to `docs/workspaces/`
- **JSON data**: Machine-readable structured data

## 📈 Best Practices

### 1. Command Combination Usage
- Use commands in workflow sequence
- Leverage command complementarity
- Establish standardized usage patterns

### 2. Parameter Optimization
- Adjust parameters based on project characteristics
- Use optional parameters to improve efficiency
- Establish team usage standards

### 3. Output Management
- Regularly clean up report files
- Establish report analysis processes
- Track improvement progress

## 🛠️ Troubleshooting

### Common Issues
1. **Command not found**: Check if command files are correctly copied to `~/.claude/commands/`
2. **Parameter errors**: Refer to specific command documentation for parameter descriptions
3. **Permission issues**: Ensure read/write permissions for project directory
4. **Missing dependencies**: Check if project dependencies are fully installed

### Getting Help
- Check specific command detailed documentation
- Use `/help` command for assistance
- Check error messages for specific guidance

## 📊 Command Statistics

- **Total commands**: 18
- **Core development**: 8 commands
- **Quality management**: 6 commands
- **Project management**: 4 commands

## 🔄 Update Log

### Latest Updates
- **2025-01-15**: Completed detailed documentation for all 18 commands
- **2025-01-14**: Optimized documentation structure and categorization
- **2025-01-13**: Added usage examples and best practices

---

*This is an actively maintained documentation project that will continue to improve as commands are updated.*