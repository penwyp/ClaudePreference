# m-commit-push - 智能提交推送工作流

## 概述

`m-commit-push` 是一个自动化的Git提交和推送工作流，能够智能生成符合约定式提交规范的消息。该命令简化了代码提交过程，确保提交历史的一致性和可读性。

## 使用方法

```bash
/m-commit-push [message]
```

## 参数详解

- `message` (可选): 自定义提交消息
  - 如果未提供，系统将基于更改自动生成描述性提交消息
  - 支持约定式提交格式 (feat:, fix:, chore:, perf:, 等)

## 使用示例

### 自动生成提交消息
```bash
/m-commit-push
```
**预期结果**: 
- 分析当前更改
- 生成符合约定式提交规范的消息
- 执行提交和推送操作

### 自定义提交消息
```bash
/m-commit-push "feat: add user authentication system"
```
**预期结果**: 
- 使用提供的消息进行提交
- 推送到远程仓库
- 显示提交哈希和推送状态

### 修复类型提交
```bash
/m-commit-push "fix: resolve memory leak in data processing"
```
**预期结果**: 
- 创建修复类型的提交
- 自动标记为bug修复
- 推送到远程仓库

## 工作流程

### 1. 暂存更改
- 执行 `git add .` 暂存所有更改
- 检查是否有文件需要提交
- 排除 .gitignore 中的文件

### 2. 生成提交消息
如果未提供消息，系统将:
- 分析暂存的更改
- 识别更改类型 (新功能、修复、重构等)
- 生成符合约定式提交规范的消息

### 3. 创建提交
- 使用生成或提供的消息创建提交
- 验证提交成功
- 显示提交哈希

### 4. 推送到远程
- 推送到当前分支的远程仓库
- 处理推送冲突
- 显示推送结果

## 约定式提交类型

| 类型 | 描述 | 示例 |
|------|------|------|
| `feat` | 新功能 | `feat: add user login functionality` |
| `fix` | 修复bug | `fix: resolve login timeout issue` |
| `docs` | 文档更改 | `docs: update API documentation` |
| `style` | 代码格式化 | `style: fix code formatting` |
| `refactor` | 重构代码 | `refactor: optimize data processing` |
| `test` | 测试相关 | `test: add unit tests for auth module` |
| `chore` | 构建/工具更改 | `chore: update dependencies` |
| `perf` | 性能优化 | `perf: improve query performance` |

## 预期结果

### 成功执行
```
✅ 已暂存 5 个文件
✅ 提交创建成功: feat: add user authentication (abc123f)
✅ 推送到 origin/main 成功
```

### 自动消息生成示例
```
基于更改分析，生成提交消息:
"feat: implement user dashboard with real-time updates"

提交详情:
- 新增文件: src/components/Dashboard.tsx
- 修改文件: src/api/userService.ts
- 测试文件: tests/Dashboard.test.tsx
```

## 错误处理

### 常见错误场景

#### 无更改可提交
```bash
/m-commit-push
```
**结果**: 
```
⚠️ 没有检测到需要提交的更改
请先进行代码修改后再执行提交
```

#### 推送冲突
```bash
/m-commit-push "fix: resolve issue"
```
**结果**: 
```
❌ 推送失败: 远程仓库有新提交
建议先执行 git pull 合并远程更改
```

#### 提交消息格式错误
```bash
/m-commit-push "bad message format"
```
**结果**: 
```
⚠️ 提交消息不符合约定式提交规范
建议格式: type: description
例如: feat: add new feature
```

## 最佳实践

### 1. 提交前检查
- 确保代码编译通过
- 运行相关测试
- 检查代码质量

### 2. 消息编写
- 使用约定式提交格式
- 描述"做了什么"而不是"怎么做"
- 保持简洁明了

### 3. 提交频率
- 小而频繁的提交
- 每个提交解决一个问题
- 避免混合不同类型的更改

### 4. 分支管理
- 在功能分支上工作
- 定期推送到远程仓库
- 保持分支同步

## 配置选项

可以通过 Git 配置自定义行为:

```bash
# 设置默认提交消息格式
git config --global commit.template ~/.gitmessage

# 配置推送行为
git config --global push.default current

# 启用自动换行
git config --global core.autocrlf true
```

## 与其他命令的集成

### 开发工作流
```bash
/m-task-planner requirements.md    # 规划任务
# 进行开发...
/m-test-generation unit src/       # 生成测试
/m-commit-push                     # 提交更改
```

### 修复工作流
```bash
/m-bug-fix #123                    # 修复bug
/m-commit-push "fix: resolve issue #123"
```

## 相关命令

- [`m-bug-fix`](m-bug-fix.md) - Bug修复工作流
- [`m-review-code`](m-review-code.md) - 代码审查
- [`m-merge-branch`](m-merge-branch.md) - 分支合并
- [`m-branch-prune`](m-branch-prune.md) - 分支清理