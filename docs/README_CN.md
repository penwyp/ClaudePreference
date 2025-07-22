# ClaudePreference 命令文档中心

[English](README.md) | **中文**

这里是 ClaudePreference 项目中所有 Claude Code 命令的详细文档。每个命令都包含完整的使用说明、示例和最佳实践。

## 📋 命令分类

### 核心开发工作流

#### 🚀 开发协作类
- **[m-orchestrated-dev](zh/commands/m-orchestrated-dev.md)** - 多智能体协同开发工作流
  - 三智能体协同 (编排者、开发者、审查者)
  - 研究驱动的开发-审查循环
  - 自动化质量控制和验证

#### 📝 版本控制类
- **[m-commit-push](zh/commands/m-commit-push.md)** - 智能提交推送工作流
  - 自动生成约定式提交消息
  - 暂存、提交、推送一体化
  - 支持自定义提交消息

- **[m-merge-branch](zh/commands/m-merge-branch.md)** - 分支合并工作流
  - 智能分支合并策略
  - 冲突解决和验证
  - 合并后清理

#### 🐛 问题解决类
- **[m-bug-fix](zh/commands/m-bug-fix.md)** - 综合Bug修复工作流
  - 支持多种Bug源输入 (问题号、错误文本、截图、日志)
  - 完整的分析、重现、修复、验证流程
  - 自动化测试和回归验证

### 代码质量管理

#### 🔍 审查分析类
- **[m-review-code](zh/commands/m-review-code.md)** - 综合代码审查工作流
  - 功能完整性、安全性、性能多维度审查
  - 双语报告生成
  - 第三方库优化建议

- **[m-debate-architecture](zh/commands/m-debate-architecture.md)** - 架构辩论分析
  - 战略架构审查
  - 系统设计模式评估
  - 高级重构建议

- **[m-debate-code](zh/commands/m-debate-code.md)** - 代码辩论分析
  - 战术代码审查
  - 实现级别问题识别
  - 编码标准合规性验证

#### 🛡️ 安全测试类
- **[m-security-scan](zh/commands/m-security-scan.md)** - 综合安全扫描工作流
  - 依赖项、认证、数据处理安全检查
  - OWASP Top 10 合规验证
  - 自动化安全修复建议

#### 🧪 测试生成类
- **[m-test-generation](zh/commands/m-test-generation.md)** - 自动化测试生成工作流
  - 单元测试、集成测试、端到端测试
  - 覆盖率分析和目标设定
  - 多框架支持

- **[m-tdd-planner](zh/commands/m-tdd-planner.md)** - TDD规划工作流
  - 测试驱动开发计划生成
  - Red-Green-Refactor 循环规划
  - JSON格式结构化输出

### 项目管理与规划

#### 📊 任务规划类
- **[m-task-planner](zh/commands/m-task-planner.md)** - 开发任务规划工作流
  - 需求分析和任务分解
  - 依赖关系映射
  - 可视化任务流程图

- **[m-next-task](zh/commands/m-next-task.md)** - 下一步任务分析
  - 当前状态分析
  - 优先级任务识别
  - 行动计划生成

- **[m-next-context](zh/commands/m-next-context.md)** - 上下文编译
  - 项目背景分析
  - 任务提取和分类
  - 支持材料收集

#### 📋 完成验证类
- **[m-review-completion](zh/commands/m-review-completion.md)** - 审查完成工作流
  - 完成状态验证
  - 质量门控检查
  - 交付物确认

### 维护与文档

#### 🧹 清理维护类
- **[m-project-cleanup](zh/commands/m-project-cleanup.md)** - 项目清理工作流
  - 代码清理和优化
  - 依赖项管理
  - 结构重组

- **[m-branch-prune](zh/commands/m-branch-prune.md)** - 分支清理工作流
  - 合并分支清理
  - 功能测试和验证
  - 顺序合并操作

- **[m-branch-prune-lite](zh/commands/m-branch-prune-lite.md)** - 轻量分支清理
  - 快速分支清理
  - 无测试的简化流程
  - 特定分支处理

#### 📚 文档管理类
- **[m-document-update](zh/commands/m-document-update.md)** - 文档更新工作流
  - API文档自动更新
  - README和变更日志维护
  - 代码注释验证

## 🚀 快速开始

### 安装配置
```bash
# 克隆项目
git clone https://github.com/penwyp/ClaudePreference.git
cd ClaudePreference

# 复制命令到 Claude Code 目录
cp commands/* ~/.claude/commands/

# 启动 Claude Code
claude
```

### 基本使用
```bash
# 使用斜杠命令
/m-orchestrated-dev requirements.md
/m-commit-push "feat: add new feature"
/m-security-scan
```

## 🎯 使用场景

### 日常开发工作流
```bash
# 1. 任务规划
/m-task-planner requirements.md

# 2. 协同开发
/m-orchestrated-dev

# 3. 代码审查
/m-review-code src/

# 4. 测试生成
/m-test-generation unit src/ 85%

# 5. 安全扫描
/m-security-scan

# 6. 提交推送
/m-commit-push
```

### Bug 修复工作流
```bash
# 1. 分析Bug
/m-bug-fix #123

# 2. 生成测试
/m-test-generation unit src/bugfix/

# 3. 代码审查
/m-review-code src/bugfix/

# 4. 提交修复
/m-commit-push "fix: resolve issue #123"
```

### 发布前工作流
```bash
# 1. 全面测试
/m-test-generation all

# 2. 安全扫描
/m-security-scan full

# 3. 代码审查
/m-review-code

# 4. 文档更新
/m-document-update

# 5. 项目清理
/m-project-cleanup

# 6. 分支清理
/m-branch-prune
```

## 🔧 配置选项

### 命令参数模式
- **无参数**: 使用默认行为
- **单参数**: 指定目标或范围
- **多参数**: 详细配置选项

### 输出格式
- **控制台输出**: 实时进度和结果
- **文件报告**: 保存到 `docs/workspaces/`
- **JSON数据**: 机器可读的结构化数据

## 📈 最佳实践

### 1. 命令组合使用
- 按工作流程顺序使用命令
- 利用命令间的互补性
- 建立标准化的使用模式

### 2. 参数优化
- 根据项目特点调整参数
- 利用可选参数提高效率
- 建立团队使用规范

### 3. 输出管理
- 定期清理报告文件
- 建立报告分析流程
- 追踪改进进展

## 🛠️ 故障排除

### 常见问题
1. **命令未找到**: 检查命令文件是否正确复制到 `~/.claude/commands/`
2. **参数错误**: 参考具体命令文档的参数说明
3. **权限问题**: 确保对项目目录有读写权限
4. **依赖缺失**: 检查项目依赖是否完整安装

### 获取帮助
- 查看具体命令的详细文档
- 使用 `/help` 命令获取帮助
- 检查错误消息获取具体指导

## 📊 命令统计

- **总命令数**: 18个
- **核心开发**: 8个命令
- **质量管理**: 6个命令
- **项目管理**: 4个命令

## 🔄 更新日志

### 最新更新
- **2025-01-15**: 完成所有18个命令的详细文档
- **2025-01-14**: 优化文档结构和分类
- **2025-01-13**: 添加使用示例和最佳实践

---

*这是一个活跃维护的文档项目，会随着命令的更新而持续改进。*