# ClaudePreference

[English](README.md) | **中文**

专为Claude Code设计的全面开发工作流命令集合，旨在简化从规划到部署的整个软件开发过程。

## 🚀 概述

ClaudePreference提供了一套专业化的命令，与Claude Code无缝集成，为以下方面提供智能协助：

- **开发生命周期管理**：从需求分析到部署
- **代码质量保证**：自动化审查、测试和安全扫描
- **项目维护**：清理、文档和分支管理
- **架构规划**：战略设计决策和代码分析

## 📋 可用命令

> 💡 **完整文档**：查看 [命令文档中心](docs/README_CN.md) 获取所有命令的详细说明、使用示例和最佳实践。

### 核心开发工作流

#### 1. **协同开发** - `m-orchestrated-dev`
基于研究驱动和模板系统的多智能体开发工作流。

**用法**：为当前目录部署三个专业化智能体（编排者、开发者、审查者）进行协同开发。

**特性**：
- 集成MCP工具的研究驱动架构规划
- 基于模板的提示生成系统，确保智能体间通信一致性
- 动态上下文感知提示，严格质量执行标准
- 构建验证要求100%功能覆盖率
- 通过外部验证实现基于证据的决策制定

**详细文档**：[m-orchestrated-dev](docs/zh/commands/m-orchestrated-dev.md)

#### 2. **提交推送** - `m-commit-push`
自动化提交和推送工作流，智能生成消息。

**参数**：`[message]`（可选）

**示例**：
- `m-commit-push "feat: add user authentication"`
- `m-commit-push "fix: resolve memory leak"`
- `m-commit-push`（自动生成约定式提交消息）

**详细文档**：[m-commit-push](docs/zh/commands/m-commit-push.md)

#### 3. **Bug修复工作流** - `m-bug-fix`
全面的Bug分析、重现和修复工作流。

**参数**：`[source]`（可选）- 问题编号、错误文本、截图、日志文件或描述

**示例**：
- `m-bug-fix #123` - 修复GitHub问题
- `m-bug-fix "NullPointerException in login"`
- `m-bug-fix screenshot.png` - 从错误截图修复
- `m-bug-fix logs/error.log` - 分析日志文件

**详细文档**：[m-bug-fix](docs/zh/commands/m-bug-fix.md)

### 代码质量管理

#### 4. **安全扫描** - `m-security-scan`
全面的安全漏洞扫描和评估。

**参数**：`[scope]`（可选）- dependencies, auth, data-handling, full, 或特定路径

**示例**：
- `m-security-scan dependencies` - 仅扫描依赖项
- `m-security-scan auth` - 专注于认证安全
- `m-security-scan src/api` - 扫描特定目录

**详细文档**：[m-security-scan](docs/zh/commands/m-security-scan.md)

#### 5. **测试生成** - `m-test-generation`
自动化测试用例生成和覆盖率分析。

**参数**：`[type] [target] [coverage]`（可选）

**示例**：
- `m-test-generation unit src/auth 90%` - 生成90%覆盖率的单元测试
- `m-test-generation integration api` - 生成集成测试
- `m-test-generation e2e user-flow` - 生成端到端测试

**详细文档**：[m-test-generation](docs/zh/commands/m-test-generation.md)

#### 6. **代码审查** - `m-review-code`
全面的代码审查与质量评估报告。

**参数**：`[target] [depth] [focus]`（可选）

**示例**：
- `m-review-code src/auth deep security` - 深度安全审查
- `m-review-code PR#123 quick` - 快速PR审查
- `m-review-code components standard performance` - 性能审查

**详细文档**：[m-review-code](docs/zh/commands/m-review-code.md)

### 项目管理与规划

#### 7. **任务规划器** - `m-task-planner`
分析需求并生成结构化实施计划。

**参数**：`[target]`（可选）- 需求文档或项目范围

**特性**：
- 需求分析和任务分解
- 依赖关系映射和排序
- 实施策略设计
- 可视化任务流程图

**详细文档**：[m-task-planner](docs/zh/commands/m-task-planner.md)

#### 8. **TDD规划器** - `m-tdd-planner`
生成全面的测试驱动开发计划。

**参数**：`[target]`（可选）- 需求文档

**特性**：
- 测试策略设计和框架选择
- Red-Green-Refactor循环规划
- 测试金字塔结构定义
- JSON格式的实施计划

**详细文档**：[m-tdd-planner](docs/zh/commands/m-tdd-planner.md)

#### 9. **下一步任务** - `m-next-task`
分析当前开发状态并生成优先级行动计划。

**参数**：`[priority]`（可选）- high, medium, low

**特性**：
- 文档和跟踪器扫描
- Git历史分析待办工作
- 优先级排序和依赖评估
- 全面状态报告

**详细文档**：[m-next-task](docs/zh/commands/m-next-task.md)

#### 10. **下一步上下文** - `m-next-context`
编译全面的任务清单和背景信息。

**参数**：`[target]`（可选）- 项目范围或对话上下文

**特性**：
- 项目背景分析
- 任务提取和分类
- 支持材料收集
- 模糊性检测和澄清

**详细文档**：[m-next-context](docs/zh/commands/m-next-context.md)

### 维护与文档

#### 11. **项目清理** - `m-project-cleanup`
自动化项目卫生和维护工作流。

**参数**：`[scope]`（可选）- code, dependencies, structure, artifacts, config, all

**特性**：
- 死代码消除
- 依赖项修剪和更新
- 代码库格式化和检查
- 结构重组

#### 12. **文档更新** - `m-document-update`
自动化文档维护和更新。

**参数**：`[scope]`（可选）- api, readme, changelog, comments, all, 或特定路径

**特性**：
- API文档刷新
- README和变更日志更新
- 代码注释验证
- 文档一致性检查

**详细文档**：[m-document-update](docs/zh/commands/m-document-update.md)

#### 13. **分支管理** - `m-branch-prune`
全面的分支管理和清理工作流。

**特性**：
- 分支分析和文档
- 已合并分支清理
- 跨版本功能测试
- 顺序合并操作

**详细文档**：[m-branch-prune](docs/zh/commands/m-branch-prune.md)

#### 14. **轻量分支清理** - `m-branch-prune-lite`
不包含测试的轻量分支清理。

**参数**：`[target_branch]`（可选）- 要修剪的特定分支

**特性**：
- 单独分支分析
- 已合并分支清理
- 特定工作树和分支移除
- 顺序合并操作

**详细文档**：[m-branch-prune-lite](docs/zh/commands/m-branch-prune-lite.md)

### 架构与设计

#### 15. **架构审查** - `m-debate-architecture`
战略架构审查和分析工作流。

**参数**：`[target]`（可选）- 模块、目录或"all"

**特性**：
- 系统级模式识别
- 结构设计问题检测
- 战略"-ilities"评估
- 高级重构建议

**详细文档**：[m-debate-architecture](docs/zh/commands/m-debate-architecture.md)

#### 16. **代码分析** - `m-debate-code`
战术代码审查与详细实施分析。

**参数**：`[target] [depth] [focus]`（可选）

**特性**：
- 代码实施分析
- 实施级别问题识别
- 编码标准合规性验证
- 行级反馈生成

**详细文档**：[m-debate-code](docs/zh/commands/m-debate-code.md)

#### 17. **审查完成** - `m-review-completion`
审查完成工作流和验证。

**特性**：
- 完成状态验证
- 质量门控验证
- 交付物确认
- 最终审查签署

**详细文档**：[m-review-completion](docs/zh/commands/m-review-completion.md)

#### 18. **分支合并** - `m-merge-branch`
智能分支合并工作流。

**特性**：
- 智能合并策略选择
- 冲突解决协助
- 合并后验证
- 自动化清理

**详细文档**：[m-merge-branch](docs/zh/commands/m-merge-branch.md)

## 🔧 安装与设置

1. **先决条件**：
   - 已安装并配置Claude Code CLI
   - 适当的开发环境设置
   - MCP环境设置（如 `context7`）

2. **安装**：
   ```bash
   # 克隆仓库
   git clone https://github.com/penwyp/ClaudePreference.git
   cd ClaudePreference
   
   # 复制命令到Claude Code目录
   cp commands/* ~/.claude/commands/
   
   # 启动Claude Code
   claude
   ```

3. **使用**：
   ```bash
   # 在Claude Code中使用斜杠命令
   /m-orchestrated-dev requirements.md
   /m-commit-push "feat: add new feature"
   /m-security-scan
   ```

## 📖 使用示例

### 日常开发工作流
```bash
# 从任务规划开始
/m-task-planner requirements.md

# 开发和审查循环
/m-orchestrated-dev

# 为新功能生成测试
/m-test-generation unit src/newfeature 85%

# 运行安全扫描
/m-security-scan

# 提交和推送更改
/m-commit-push "feat: implement user dashboard"
```

### Bug修复工作流
```bash
# 分析和修复bug
/m-bug-fix #456

# 生成回归测试
/m-test-generation unit src/bugfix

# 审查并提交修复
/m-review-code src/bugfix standard
/m-commit-push "fix: resolve login timeout issue"
```

### 发布前工作流
```bash
# 全面测试
/m-test-generation integration

# 更新文档
/m-document-update

# 安全评估
/m-security-scan full

# 清理分支
/m-branch-prune
```

### 架构审查
```bash
# 战略架构分析
/m-debate-architecture src/core

# 战术代码审查
/m-debate-code src/api deep security

# 生成改进计划
/m-task-planner architecture-improvements.md
```

## 🛠️ 最佳实践

1. **命令排序**：按逻辑顺序使用命令以获得最佳效果
2. **参数使用**：充分利用可选参数进行有针对性的操作
3. **定期维护**：定期运行清理和安全扫描
4. **文档维护**：在重大更改后保持文档更新
5. **测试**：在主要发布前生成全面测试

## 🚨 故障排除

### 常见问题

**命令未找到**：
- 确保Claude Code CLI已正确安装
- 验证您在正确的项目目录中
- 检查commands/目录是否存在

**权限错误**：
- 确保正确的Git权限
- 验证对项目文件的写入权限
- 检查Claude Code身份验证

**构建失败**：
- 运行 `m-project-cleanup` 解决依赖问题
- 确保所有先决条件已安装
- 检查冲突依赖

### 获得帮助

获取更多支持：
- 访问 [命令文档中心](docs/zh/README.md) 获取详细指南
- 检查 [commands/](commands/) 目录中的命令定义
- 查看 [docs/commands/](docs/zh/commands/) 目录中的详细文档
- 审查错误消息获取具体指导
- 确保您的开发环境满足所有要求

## 📁 项目结构

```
ClaudePreference/
├── README.md                    # 英文版本
├── README_CN.md                 # 中文版本（本文件）
├── commands/                    # 命令定义（Claude Code斜杠命令）
│   ├── m-orchestrated-dev.md   # 多智能体开发
│   ├── m-commit-push.md        # 提交推送工作流
│   ├── m-bug-fix.md           # Bug修复工作流
│   ├── m-security-scan.md     # 安全扫描
│   ├── m-test-generation.md   # 测试生成
│   ├── m-review-code.md       # 代码审查
│   ├── m-task-planner.md      # 任务规划
│   ├── m-tdd-planner.md       # TDD规划
│   ├── m-next-task.md         # 下一步任务分析
│   ├── m-next-context.md      # 上下文编译
│   ├── m-project-cleanup.md   # 项目清理
│   ├── m-document-update.md   # 文档更新
│   ├── m-branch-prune.md      # 分支清理
│   ├── m-branch-prune-lite.md # 轻量分支清理
│   ├── m-debate-architecture.md # 架构审查
│   ├── m-debate-code.md       # 代码审查辩论
│   ├── m-review-completion.md # 审查完成
│   └── m-merge-branch.md      # 分支合并
└── docs/                       # 文档和报告
    ├── README.md               # 命令文档索引（英文）
    ├── README_CN.md            # 命令文档索引（中文）
    ├── commands/               # 详细命令文档
    │   ├── m-orchestrated-dev.md   # 详细使用和示例
    │   ├── m-commit-push.md        # 提交工作流文档
    │   ├── m-bug-fix.md           # Bug修复过程指南
    │   ├── m-security-scan.md     # 安全扫描指南
    │   ├── m-test-generation.md   # 测试生成指南
    │   ├── m-review-code.md       # 代码审查指南
    │   ├── m-task-planner.md      # 任务规划指南
    │   ├── m-tdd-planner.md       # TDD规划指南
    │   └── ...（更多文档）
    └── workspaces/            # 生成的工作流报告
```

## 🤝 贡献

本项目旨在随着您的开发需求而发展。欢迎您：
- 为您的特定工作流自定义命令
- 按照既定模式添加新命令
- 改进现有命令文档
- 分享您的工作流优化

## 📄 许可证

本项目是开源的，遵循标准软件开发实践。

---

*为重视智能自动化和全面工作流管理的开发者而构建。*