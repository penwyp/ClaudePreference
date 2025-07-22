# ClaudePreference 命令文档中心

[English](README.md) | **中文**

这里是 ClaudePreference 项目中所有 Claude Code 命令的详细文档。每个命令都包含完整的使用说明、示例和最佳实践。

## 📋 命令分类

### 核心开发工作流

#### 🚀 开发协作类
- **[m:orchestrated-dev](zh/commands/m-orchestrated-dev.md)** - 多智能体协同开发工作流
  - 三智能体协同 (编排者、开发者、审查者)
  - 研究驱动的开发-审查循环
  - 自动化质量控制和验证

#### 📝 版本控制类
- **[m:commit-push](zh/commands/m-commit-push.md)** - 智能提交推送工作流
  - 自动生成约定式提交消息
  - 暂存、提交、推送一体化
  - 支持自定义提交消息

- **[m:merge-branch](zh/commands/m-merge-branch.md)** - 分支合并工作流
  - 智能分支合并策略
  - 冲突解决和验证
  - 合并后清理

#### 🐛 问题解决类
- **[m:bug-fix](zh/commands/m-bug-fix.md)** - 综合Bug修复工作流
  - 支持多种Bug源输入 (问题号、错误文本、截图、日志)
  - 完整的分析、重现、修复、验证流程
  - 自动化测试和回归验证

### 代码质量管理

#### 🔍 审查分析类
- **[m:review-code](zh/commands/m-review-code.md)** - 综合代码审查工作流
  - 功能完整性、安全性、性能多维度审查
  - 双语报告生成
  - 第三方库优化建议

- **[m:debate-architecture](zh/commands/m-debate-architecture.md)** - 架构辩论分析
  - 战略架构审查
  - 系统设计模式评估
  - 高级重构建议

- **[m:debate-code](zh/commands/m-debate-code.md)** - 代码辩论分析
  - 战术代码审查
  - 实现级别问题识别
  - 编码标准合规性验证

#### 🛡️ 安全测试类
- **[m:security-scan](zh/commands/m-security-scan.md)** - 综合安全扫描工作流
  - 依赖项、认证、数据处理安全检查
  - OWASP Top 10 合规验证
  - 自动化安全修复建议

#### 🧪 测试生成类
- **[m:test-generation](zh/commands/m-test-generation.md)** - 自动化测试生成工作流
  - 单元测试、集成测试、端到端测试
  - 覆盖率分析和目标设定
  - 多框架支持

- **[m:tdd-planner](zh/commands/m-tdd-planner.md)** - TDD规划工作流
  - 测试驱动开发计划生成
  - Red-Green-Refactor 循环规划
  - JSON格式结构化输出

### 项目管理与规划

#### 📊 任务规划类
- **[m:task-planner](zh/commands/m-task-planner.md)** - 开发任务规划工作流
  - 需求分析和任务分解
  - 依赖关系映射
  - 可视化任务流程图

- **[m:next-task](zh/commands/m-next-task.md)** - 下一步任务分析
  - 当前状态分析
  - 优先级任务识别
  - 行动计划生成

- **[m:next-context](zh/commands/m-next-context.md)** - 上下文编译
  - 项目背景分析
  - 任务提取和分类
  - 支持材料收集

#### 📋 完成验证类
- **[m:review-completion](zh/commands/m-review-completion.md)** - 审查完成工作流
  - 完成状态验证
  - 质量门控检查
  - 交付物确认

### 维护与文档

#### 🧹 清理维护类
- **[m:project-cleanup](zh/commands/m-project-cleanup.md)** - 项目清理工作流
  - 代码清理和优化
  - 依赖项管理
  - 结构重组

- **[m:branch-prune](zh/commands/m-branch-prune.md)** - 分支清理工作流
  - 合并分支清理
  - 功能测试和验证
  - 顺序合并操作

- **[m:branch-prune-lite](zh/commands/m-branch-prune-lite.md)** - 轻量分支清理
  - 快速分支清理
  - 无测试的简化流程
  - 特定分支处理

#### 📚 文档管理类
- **[m:document-update](zh/commands/m-document-update.md)** - 文档更新工作流
  - API文档自动更新
  - README和变更日志维护
  - 代码注释验证
