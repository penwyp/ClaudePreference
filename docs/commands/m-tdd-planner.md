# m-tdd-planner - 测试驱动开发规划工作流

## 概述

`m-tdd-planner` 是一个专门的测试驱动开发规划工具，分析需求并生成全面的TDD实施计划。该命令采用结构化的JSON输出格式，提供详细的Red-Green-Refactor循环规划、测试策略设计和任务依赖映射。

## 使用方法

```bash
/m-tdd-planner [target]
```

## 参数详解

- `target` (可选): 目标需求文档
  - 默认值: 项目默认位置的需求文档
  - 支持格式: Markdown文件、需求文档、项目描述
  - 示例: `requirements.md`, `specs/user-auth.md`, `"用户认证系统"`

## 使用示例

### 基于需求文档规划
```bash
/m-tdd-planner requirements.md
```
**预期结果**: 
- 解析需求文档中的可测试需求
- 生成完整的TDD实施计划
- 创建Red-Green-Refactor循环任务
- 输出结构化JSON格式计划

### 基于项目描述规划
```bash
/m-tdd-planner "用户认证和权限管理系统"
```
**预期结果**: 
- 分析项目描述中的功能需求
- 设计测试策略和框架选择
- 创建TDD任务序列
- 生成依赖关系图

### 默认自动发现
```bash
/m-tdd-planner
```
**预期结果**: 
- 自动发现项目中的需求文档
- 分析现有代码结构
- 生成TDD补充计划
- 规划测试基础设施

## 工作流程

### 1. 需求分析
- **文档解析**: 提取可测试需求和验收标准
- **行为规范**: 识别行为规范和接受标准
- **模糊识别**: 记录需要澄清的模糊需求
- **优先级评估**: 根据业务价值评估测试优先级

### 2. 测试策略设计
- **测试金字塔**: 定义单元、集成、端到端测试结构
- **框架选择**: 选择适当的测试框架和工具
- **基础设施**: 概述测试基础设施和环境设置
- **覆盖目标**: 设定测试覆盖率目标和质量门控

### 3. TDD任务分解
- **Red-Green-Refactor**: 将功能分解为TDD循环
- **测试场景**: 为每个需求创建具体的测试场景
- **任务排序**: 基于依赖关系对任务进行排序
- **并行机会**: 规划并行测试开发机会

### 4. 任务依赖映射
- **前置关系**: 识别任务间的前置依赖关系
- **逻辑顺序**: 建立TDD实施的逻辑顺序
- **并行开发**: 规划并行测试开发机会
- **里程碑**: 设定测试里程碑和检查点

### 5. 计划可视化
- **依赖图**: 生成Mermaid图表显示任务流程和依赖
- **TDD循环**: 可视化展示Red-Green-Refactor循环
- **关键路径**: 突出显示关键测试里程碑
- **时间线**: 展示TDD实施时间线

### 6. JSON报告生成
- **结构化输出**: 编译所有组件到JSON对象
- **完整性验证**: 验证测试覆盖策略的完整性
- **可机器读取**: 提供机器可读的格式
- **集成友好**: 便于与其他工具集成

## TDD任务类型

### Red阶段任务
**特点**: 编写失败的测试
- 基于需求创建测试用例
- 验证测试确实失败
- 清晰定义期望行为
- 确保测试可读性

### Green阶段任务
**特点**: 实现最小代码使测试通过
- 编写最简单的实现
- 专注于使测试通过
- 避免过度工程化
- 保持代码简洁

### Refactor阶段任务
**特点**: 在保持测试通过的前提下改进代码
- 消除代码重复
- 提高代码可读性
- 优化性能
- 改善设计

### Setup阶段任务
**特点**: 基础设施和框架配置
- 测试环境设置
- 框架配置
- 工具链设置
- CI/CD集成

### Integration阶段任务
**特点**: 跨组件测试场景
- 组件间交互测试
- 端到端流程验证
- 系统集成测试
- 性能和负载测试

## 预期结果

### JSON输出格式
```json
{
  "testStrategy": "采用测试金字塔方法，70%单元测试，20%集成测试，10%端到端测试。使用Jest作为主要测试框架，配合Supertest进行API测试，Playwright进行E2E测试。测试环境使用Docker容器化，支持CI/CD自动化执行。覆盖率目标：行覆盖率90%，分支覆盖率85%。",
  
  "tasks": [
    {
      "id": "setup_001",
      "description": "配置Jest测试框架和基础测试环境",
      "type": "setup",
      "status": "pending",
      "dependencies": [],
      "testLevel": "unit"
    },
    {
      "id": "red_001",
      "description": "编写用户注册功能的失败测试",
      "type": "red",
      "status": "pending",
      "dependencies": ["setup_001"],
      "testLevel": "unit"
    },
    {
      "id": "green_001",
      "description": "实现用户注册功能使测试通过",
      "type": "green",
      "status": "pending",
      "dependencies": ["red_001"],
      "testLevel": "unit"
    },
    {
      "id": "refactor_001",
      "description": "重构用户注册代码提高可读性",
      "type": "refactor",
      "status": "pending",
      "dependencies": ["green_001"],
      "testLevel": "unit"
    },
    {
      "id": "red_002",
      "description": "编写用户登录功能的失败测试",
      "type": "red",
      "status": "pending",
      "dependencies": ["refactor_001"],
      "testLevel": "unit"
    },
    {
      "id": "green_002",
      "description": "实现用户登录功能使测试通过",
      "type": "green",
      "status": "pending",
      "dependencies": ["red_002"],
      "testLevel": "unit"
    },
    {
      "id": "integration_001",
      "description": "创建用户认证流程的集成测试",
      "type": "integration",
      "status": "pending",
      "dependencies": ["green_002"],
      "testLevel": "integration"
    }
  ],
  
  "diagram": "```mermaid\nflowchart TD\n    A[setup_001: 配置测试环境] --> B[red_001: 用户注册失败测试]\n    B --> C[green_001: 实现注册功能]\n    C --> D[refactor_001: 重构注册代码]\n    D --> E[red_002: 用户登录失败测试]\n    E --> F[green_002: 实现登录功能]\n    F --> G[integration_001: 认证流程集成测试]\n    \n    style A fill:#f9f,stroke:#333,stroke-width:2px\n    style B fill:#faa,stroke:#333,stroke-width:2px\n    style C fill:#afa,stroke:#333,stroke-width:2px\n    style D fill:#aaf,stroke:#333,stroke-width:2px\n    style E fill:#faa,stroke:#333,stroke-width:2px\n    style F fill:#afa,stroke:#333,stroke-width:2px\n    style G fill:#ffa,stroke:#333,stroke-width:2px\n```",
  
  "clarifications": [
    "用户密码复杂度要求的具体规则是什么？",
    "是否需要支持第三方认证（如OAuth）？",
    "用户会话的超时时间设置为多少？",
    "是否需要实现用户权限系统？",
    "测试环境的数据库配置要求是什么？"
  ]
}
```

### 测试策略详解
```json
{
  "testStrategy": {
    "pyramid": {
      "unit": "70% - 快速反馈，测试单个函数和组件",
      "integration": "20% - 验证组件间交互",
      "e2e": "10% - 验证完整用户流程"
    },
    "frameworks": {
      "unit": "Jest - 快速、功能丰富的测试框架",
      "integration": "Supertest - API测试专用库",
      "e2e": "Playwright - 现代端到端测试框架"
    },
    "infrastructure": {
      "containerization": "Docker - 一致的测试环境",
      "ci_cd": "GitHub Actions - 自动化测试执行",
      "database": "测试专用数据库实例"
    },
    "coverage": {
      "line": "90%",
      "branch": "85%",
      "function": "95%"
    }
  }
}
```

## TDD最佳实践

### 1. Red阶段最佳实践
- **测试先行**: 在编写代码之前先写测试
- **最小测试**: 每次只测试一个行为
- **失败确认**: 确保测试真的失败
- **清晰断言**: 使用描述性的断言消息

### 2. Green阶段最佳实践
- **最简实现**: 使用最简单的方法使测试通过
- **避免过度设计**: 不要在这个阶段过度工程化
- **快速迭代**: 快速实现，后续再重构
- **保持专注**: 只关注当前失败的测试

### 3. Refactor阶段最佳实践
- **保持测试通过**: 重构过程中测试必须一直通过
- **小步重构**: 进行小的、安全的重构
- **消除重复**: 识别并消除代码重复
- **提高可读性**: 改善变量名和函数结构

### 4. 测试质量保证
- **独立性**: 每个测试应该独立运行
- **可重复性**: 测试结果应该可重复
- **快速执行**: 单元测试应该快速执行
- **易于维护**: 测试代码应该易于理解和维护

## 框架支持

### JavaScript/TypeScript
- **Jest**: 功能丰富的测试框架
- **Vitest**: 现代快速的测试框架
- **Mocha + Chai**: 灵活的测试组合
- **Playwright**: 端到端测试

### Python
- **pytest**: 功能强大的测试框架
- **unittest**: 标准库测试框架
- **hypothesis**: 基于属性的测试
- **tox**: 测试环境管理

### Java
- **JUnit 5**: 现代Java测试框架
- **TestNG**: 功能丰富的测试框架
- **Mockito**: Mock对象框架
- **AssertJ**: 流畅的断言库

### Go
- **go test**: 内置测试框架
- **Testify**: 增强测试库
- **Ginkgo**: BDD风格测试框架
- **GoMock**: Mock生成工具

## 集成工具

### CI/CD集成
- **GitHub Actions**: 自动化测试执行
- **Jenkins**: 持续集成支持
- **GitLab CI**: 内置CI/CD功能
- **CircleCI**: 云端持续集成

### 覆盖率工具
- **Istanbul**: JavaScript覆盖率
- **Coverage.py**: Python覆盖率
- **JaCoCo**: Java覆盖率
- **go tool cover**: Go覆盖率

## 相关命令

- [`m-test-generation`](m-test-generation.md) - 测试生成工具
- [`m-task-planner`](m-task-planner.md) - 任务规划
- [`m-review-code`](m-review-code.md) - 代码审查
- [`m-orchestrated-dev`](m-orchestrated-dev.md) - 协同开发