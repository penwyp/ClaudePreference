# m-orchestrated-dev - 多智能体开发工作流：研究驱动与模板化系统

## 概述

`m-orchestrated-dev` 是一个高级的多智能体协同开发工作流，通过部署三个专业化的智能体（编排者、开发者、审查者），由基于模板的编排系统管理，以确保软件开发的质量、一致性和适应性。该命令实现了研究驱动的开发-审查循环，适用于需要高质量代码和架构决策的复杂开发任务。

## 使用方法

```bash
/m-orchestrated-dev [target]
```

## 参数详解

- `target` (可选): 目标需求文档或项目范围
  - 默认值: 之前的讨论结果或当前需求
  - 支持格式: Markdown文件、需求文档、项目描述

## 智能体架构

### Agent O (编排者与提示生成器)
**角色**: 战略规划、工作流协调和动态提示组装

**核心职责**:
- **解析需求**: 使用 `sequential-thinking` 将高级目标分解为可操作的任务
- **启动研究**: 开展研究周期以确定最优架构和技术栈
- **综合发现**: 分析来自多个来源（`web_search`、`context7`）的研究，形成合理、基于证据的技术计划
- **管理状态**: 跟踪开发进度、审查反馈和迭代次数
- **组装和分发提示**: 作为**提示生成器**，使用动态上下文填充 `提示模板库` 中的模板，为其他智能体创建具体、可操作的指令
- **最终验证**: 验证最终构建的成功，并确保在完成前满足所有成功标准

### Agent D (开发者)
**角色**: 高质量、基于研究的代码实现

**核心职责**:
- **从上下文执行**: 专门根据 Agent O 提供的上下文提示工作
- **保持一致性**: 修改现有文件时，首先理解并模仿文件的代码规范、样式和现有模式。适当使用现有库和工具
- **完整实现**: **关键要求**：每个功能必须有完整的、生产就绪的实现
- **禁止事项**: 不允许 `TODO`、`FIXME`、`HACK`、`XXX`、`pass`、`stub` 或任何其他形式的占位符代码
- **实现前研究**: 对于复杂功能或算法，按照 Agent O 的指导使用 `web_search` 查找最佳实现模式
- **确保质量**: 每次代码提交必须编译、运行并通过所有本地验证检查

### Agent R (审查者)
**角色**: 根据客观标准和上下文进行全面验证

**核心职责**:
- **全面审查**: 评估代码的完整性、安全性、性能、架构合规性以及**与现有代码库的一致性**
- **提供可操作的反馈**: 在识别问题时，提供具体建议、代码片段或明确的修复指导。这对于加速迭代周期至关重要
- **外部基准测试**: 使用 `web_search` 等工具根据外部标准（如 OWASP Top 10）进行验证，使用 `context7` 检查特定框架的最佳实践
- **生成报告**: 使用标准化的 `审查输出格式` 生成包含明确发现和最终决定的报告

## 使用示例

### 基本使用
```bash
/m-orchestrated-dev
```
**预期结果**: 分析当前项目需求，启动三智能体协同开发流程

### 指定需求文档
```bash
/m-orchestrated-dev requirements.md
```
**预期结果**: 基于 requirements.md 文件进行需求分析和开发规划

### 复杂项目开发
```bash
/m-orchestrated-dev "实现用户认证系统"
```
**预期结果**: 针对用户认证系统进行完整的设计、开发和审查流程

## 系统配置

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
  # 原则：对时间敏感的查询优先使用最新信息
  # 编排者应在适当时动态添加当前年份（如 2025）
  web_search_year: "dynamic"
```

## 增强工作流程

### 阶段 1：研究与规划 (Agent O)
- O 解析初始需求
- O 填充并执行 `Initial_Research` 模板以生成技术计划

### 阶段 2：开发周期 (Agent D)
- O 将计划分解为具体任务
- O 使用 `Orchestrator_to_Developer` 模板为 D 生成上下文提示
- D 实现代码并在成功完成本地验证后提交

### 阶段 3：全面审查 (Agent R)
- O 从 D 接收代码
- O 使用 `Orchestrator_to_Reviewer` 模板为 R 生成审查任务，同时提供代码和原始上下文
- R 执行审查并返回结构化的 JSON 报告

### 阶段 4：迭代或完成
- O 解析审查报告
- **如果被拒绝**：O 提取可操作的反馈，创建新的开发任务，返回阶段 2
- **如果被批准**：O 进行最终验证和完成
- **如果超过最大周期**：O 停止流程并生成 `max-cycle-summary` 文档

## 决策矩阵

| 完整性 | 关键问题 | 功能需求 | 非功能需求 | 决策 |
|--------|----------|----------|------------|------|
| < 100% | - | - | - | 拒绝: 修复不完整代码 |
| 100% | 是 | - | - | 拒绝: 修复关键问题 |
| 100% | 否 | < 100% | - | 拒绝: 完成功能 |
| 100% | 否 | 100% | < 70% | 警告: 考虑改进 |
| 100% | 否 | 100% | ≥ 70% | 批准 |

## 提示模板库

系统使用标准化、可重用的指令模板，由 Agent O 动态填充：

### 模板类型：
1. **Initial_Research**：用于研究和提出技术架构
2. **Orchestrator_to_Developer**：用于提供开发上下文和标准
3. **Orchestrator_to_Reviewer**：用于全面的代码审查指令

## 通信与数据格式

### 审查输出格式 (JSON)
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
      "issue": "问题描述",
      "suggestion": "修复问题的具体建议"
    }
  ],
  "mcp_validation": {
    "security_check": "通过 (符合 OWASP 2025)",
    "framework_usage": "遵循 React 19 最佳实践"
  }
}
```

## 预期结果

### 成功标准
- ✅ **100% 代码完整性**：无占位符、stub 或 `TODO`
- ✅ **零关键问题**：无阻塞性的安全、并发或资源相关错误
- ✅ **100% 功能覆盖**：所有指定功能都已实现
- ✅ **≥70% 非功能覆盖**：满足指定的性能、可扩展性等目标
- ✅ **构建成功**：最终代码编译并通过所有集成检查
- ✅ **基于证据的架构**：所有主要技术决策都有研究支持

### 总结报告 (JSON)
```json
{
  "project_stats": {
    "total_cycles": 3,
    "mcp_tools_used": { "web_search": 12, "context7": 5, "sequential_thinking": 8 },
    "architecture_decisions": [
      {
        "decision": "使用 Next.js 14",
        "rationale": "基于研究表明对于此用例具有卓越的性能和 SEO 能力",
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

## 最佳实践

1. **开始前**: 确保需求文档清晰完整
2. **研究先行**: 在编码前收集最佳实践
3. **质量为先**: 通过研究确保质量，通过纪律确保完整性
4. **迭代改进**: 使用研究指导改进
5. **完整交付**: 提供完整文档

## 故障排除

### 常见问题
- **循环次数超限**: 检查需求复杂度，考虑分解任务
- **构建失败**: 确保所有依赖正确安装
- **审查不通过**: 检查代码完整性和关键问题

### 错误处理
如果超过最大循环次数，系统将生成 `docs/todo/max-cycle-summary-<timestamp>.md` 文件，包含已完成工作和剩余任务。

## 相关命令

- [`m-task-planner`](m-task-planner.md) - 任务规划
- [`m-review-code`](m-review-code.md) - 代码审查
- [`m-security-scan`](m-security-scan.md) - 安全扫描
- [`m-test-generation`](m-test-generation.md) - 测试生成