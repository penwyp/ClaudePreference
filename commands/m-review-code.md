# Code Review Workflow: Comprehensive Analysis & Report Generation

**Target:** $ARGUMENTS (Default: latest commits of current branch)

**Scope:** Analyze code changes, architecture patterns, and implementation quality

## Execution Steps

1. **Architecture & Pattern Analysis**
   - Review repository patterns, service layers, and migration strategies
   - Assess system design decisions and structural changes

2. **Security & Multi-tenant Validation**
   - Check authentication, authorization, and tenant isolation
   - Identify potential security vulnerabilities and access control issues

3. **Functional Completeness Verification**
   - Ensure all requirements are implemented with proper edge case handling
   - Validate input validation, error handling, and boundary conditions

4. **Code Quality Assessment**
   - Identify code smells, anti-patterns, and duplicated logic
   - Detect potential runtime issues: race conditions, memory leaks, null pointer exceptions

5. **Test Coverage Evaluation**
   - Assess unit and integration test coverage gaps
   - Review test quality and edge case coverage

6. **Third-party Library Opportunities**
   - Suggest robust external libraries for current implementations
   - Identify opportunities to reduce custom code complexity

7. **Generate Bilingual Report**
   - Compile findings into structured markdown format
   - Save to `docs/workspaces/review-MM-dd-HH-mm-ss.md`

## Output Format

### English Report

Present findings in the following sections:

#### `functionalCompleteness`
- Requirements implementation status
- Edge case handling assessment
- Missing functionality identification

#### `criticalBugs`
- Potential crashes, panics, or system failures
- Security vulnerabilities and data exposure risks
- Performance bottlenecks and resource leaks

#### `badSmells`
- Code anti-patterns and design issues
- Duplicated or overly complex logic
- Maintainability concerns

#### `thirdPartyOpportunities`
- External library suggestions for current implementations
- Benefits and integration considerations
- Risk assessment for library adoption

#### `testCoverage`
- Coverage gaps in unit and integration tests
- Missing test scenarios and edge cases
- Test quality and reliability issues

#### `actionables`
- Prioritized improvement recommendations
- Specific code changes and refactoring suggestions
- Implementation guidance and best practices

### 中文报告

> 以下为中文版本，内容与英文部分对应。AGI可跳过此部分。

#### `functionalCompleteness` - 功能完整性
- 需求实现状态评估
- 边界条件处理分析
- 缺失功能识别

#### `criticalBugs` - 关键问题
- 潜在崩溃、异常或系统故障
- 安全漏洞和数据暴露风险
- 性能瓶颈和资源泄露

#### `badSmells` - 代码异味
- 反模式和设计问题
- 重复或过度复杂的逻辑
- 可维护性问题

#### `thirdPartyOpportunities` - 第三方库优化
- 现有实现的外部库替代建议
- 集成收益和考虑因素
- 库采用风险评估

#### `testCoverage` - 测试覆盖
- 单元测试和集成测试覆盖缺口
- 缺失的测试场景和边界用例
- 测试质量和可靠性问题

#### `actionables` - 行动建议
- 优先级改进建议
- 具体代码修改和重构建议
- 实施指导和最佳实践

## Final Output

Save the complete bilingual report to:
`docs/workspaces/review-MM-dd-HH-mm-ss.md`

Output the saved file path to confirm completion.