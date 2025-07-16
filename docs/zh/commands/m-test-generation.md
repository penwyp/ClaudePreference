# m-test-generation - 自动化测试生成工作流

## 概述

`m-test-generation` 是一个智能的测试生成工具，能够自动创建单元测试、集成测试和端到端测试。该命令分析代码覆盖率、识别测试缺口，并生成全面的测试用例以确保代码质量和稳定性。

## 使用方法

```bash
/m-test-generation [type] [target] [coverage]
```

## 参数详解

- `type` (可选): 测试类型
  - `unit` - 单元测试
  - `integration` - 集成测试
  - `e2e` - 端到端测试
  - `all` - 所有类型测试
- `target` (可选): 测试目标
  - 文件路径: `src/auth`, `components/`
  - 组件名: `UserService`, `LoginComponent`
  - 功能模块: `auth`, `payment`, `user-flow`
- `coverage` (可选): 覆盖率目标
  - 百分比: `90%`, `85%`, `100%`
  - 默认值: `80%`

## 使用示例

### 默认测试生成
```bash
/m-test-generation
```
**预期结果**: 
- 分析最近修改的文件
- 生成单元测试
- 目标覆盖率80%
- 识别测试缺口

### 单元测试生成
```bash
/m-test-generation unit src/auth 90%
```
**预期结果**: 
- 为 `src/auth` 目录生成单元测试
- 目标覆盖率90%
- 创建测试文件和用例
- 运行测试验证功能

### 集成测试生成
```bash
/m-test-generation integration api
```
**预期结果**: 
- 为API模块生成集成测试
- 测试组件间交互
- 验证工作流程
- 创建测试数据和环境

### 端到端测试生成
```bash
/m-test-generation e2e user-flow
```
**预期结果**: 
- 生成用户流程的端到端测试
- 模拟真实用户操作
- 验证完整业务流程
- 创建测试场景和数据

### 全面测试生成
```bash
/m-test-generation all components 85%
```
**预期结果**: 
- 为所有组件生成所有类型测试
- 目标覆盖率85%
- 创建测试套件
- 建立测试基础设施

## 工作流程

### 1. 代码覆盖率分析
- **当前覆盖率**: 分析现有测试的覆盖情况
- **缺口识别**: 找出未测试的函数和代码路径
- **风险评估**: 评估未覆盖代码的风险等级
- **优先级排序**: 按重要性排序测试需求

### 2. 单元测试生成
- **函数分析**: 分析每个函数的输入输出
- **边界测试**: 创建边界条件测试用例
- **异常测试**: 生成异常情况测试
- **Mock创建**: 创建必要的Mock对象

### 3. 集成测试创建
- **组件交互**: 测试模块间的交互
- **数据流测试**: 验证数据在组件间的流动
- **工作流验证**: 测试完整的业务流程
- **配置测试**: 验证不同配置下的行为

### 4. 端到端测试构建
- **用户场景**: 模拟真实用户操作
- **浏览器测试**: 跨浏览器兼容性测试
- **性能测试**: 测试系统性能和响应时间
- **回归测试**: 确保新功能不破坏现有功能

### 5. 测试套件执行
- **并行执行**: 优化测试执行时间
- **结果分析**: 分析测试结果和失败原因
- **报告生成**: 生成详细的测试报告
- **覆盖率验证**: 验证是否达到目标覆盖率

## 测试类型详解

### 单元测试 (Unit Tests)
**特点**: 
- 测试单个函数或方法
- 快速执行
- 隔离依赖
- 高覆盖率

**生成内容**:
```javascript
// 示例: UserService.test.js
describe('UserService', () => {
  describe('validateEmail', () => {
    it('should return true for valid email', () => {
      const result = UserService.validateEmail('test@example.com');
      expect(result).toBe(true);
    });

    it('should return false for invalid email', () => {
      const result = UserService.validateEmail('invalid-email');
      expect(result).toBe(false);
    });

    it('should handle null input', () => {
      const result = UserService.validateEmail(null);
      expect(result).toBe(false);
    });
  });
});
```

### 集成测试 (Integration Tests)
**特点**:
- 测试模块间交互
- 验证数据流
- 测试API端点
- 检查配置

**生成内容**:
```javascript
// 示例: AuthIntegration.test.js
describe('Authentication Integration', () => {
  it('should complete full login flow', async () => {
    const loginData = { email: 'test@example.com', password: 'password' };
    const response = await request(app)
      .post('/api/auth/login')
      .send(loginData);
    
    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined();
  });
});
```

### 端到端测试 (E2E Tests)
**特点**:
- 模拟真实用户行为
- 跨浏览器测试
- 完整业务流程
- 性能验证

**生成内容**:
```javascript
// 示例: UserFlow.e2e.js
describe('User Registration Flow', () => {
  it('should allow user to register and login', async () => {
    await page.goto('/register');
    await page.fill('[data-testid="email"]', 'test@example.com');
    await page.fill('[data-testid="password"]', 'password123');
    await page.click('[data-testid="submit"]');
    
    await expect(page).toHaveURL('/dashboard');
  });
});
```

## 预期结果

### 测试生成报告
```
🧪 测试生成报告
生成时间: 2025-01-15 14:30:00
目标: src/auth 目录
测试类型: 单元测试
覆盖率目标: 90%

📊 覆盖率分析
  - 当前覆盖率: 65%
  - 目标覆盖率: 90%
  - 提升需求: 25%
  - 未覆盖函数: 12个

🔧 生成的测试文件
  1. UserService.test.js (15个测试用例)
  2. AuthMiddleware.test.js (8个测试用例)
  3. PasswordValidator.test.js (12个测试用例)
  4. TokenManager.test.js (10个测试用例)

✅ 测试执行结果
  - 总测试数: 45
  - 通过: 42
  - 失败: 3
  - 跳过: 0
  - 执行时间: 2.3秒

📈 覆盖率达成
  - 行覆盖率: 92%
  - 函数覆盖率: 89%
  - 分支覆盖率: 87%
  - 语句覆盖率: 91%

🚨 需要关注的问题
  1. AuthMiddleware.validateToken() 异常处理覆盖不足
  2. PasswordValidator.checkComplexity() 边界条件测试缺失
  3. TokenManager.refreshToken() 并发场景未测试
```

### 测试文件结构
```
tests/
├── unit/
│   ├── services/
│   │   ├── UserService.test.js
│   │   └── AuthService.test.js
│   ├── utils/
│   │   └── PasswordValidator.test.js
│   └── middleware/
│       └── AuthMiddleware.test.js
├── integration/
│   ├── api/
│   │   ├── authRoutes.test.js
│   │   └── userRoutes.test.js
│   └── database/
│       └── userRepository.test.js
└── e2e/
    ├── userFlow.test.js
    └── authFlow.test.js
```

## 测试框架支持

### JavaScript/TypeScript
- **Jest**: 单元测试和集成测试
- **Mocha + Chai**: 灵活的测试框架
- **Playwright**: 端到端测试
- **Cypress**: 现代端到端测试

### Python
- **pytest**: 全功能测试框架
- **unittest**: 标准库测试框架
- **Selenium**: Web自动化测试
- **FastAPI TestClient**: API测试

### Java
- **JUnit**: 标准单元测试框架
- **TestNG**: 灵活的测试框架
- **Mockito**: Mock对象框架
- **Spring Boot Test**: 集成测试

### Go
- **go test**: 内置测试框架
- **Testify**: 增强测试库
- **Ginkgo**: BDD测试框架
- **GoConvey**: Web界面测试

## 最佳实践

### 1. 测试设计原则
- **FIRST原则**: Fast, Independent, Repeatable, Self-Validating, Timely
- **AAA模式**: Arrange, Act, Assert
- **单一职责**: 每个测试只验证一个行为
- **描述性命名**: 测试名称应该清晰描述被测试的行为

### 2. 测试数据管理
- **测试数据隔离**: 每个测试使用独立的数据
- **数据清理**: 测试后清理测试数据
- **Factory模式**: 使用工厂方法创建测试数据
- **Mock策略**: 合理使用Mock对象

### 3. 测试维护
- **定期重构**: 保持测试代码的质量
- **并行执行**: 优化测试执行时间
- **失败分析**: 快速定位和修复失败的测试
- **覆盖率监控**: 持续监控测试覆盖率

## 错误处理

### 常见问题
- **测试失败**: 分析失败原因并修复
- **覆盖率不足**: 识别未覆盖的代码路径
- **执行缓慢**: 优化测试执行性能
- **环境依赖**: 解决测试环境问题

### 故障排除
```
❌ 测试生成失败
原因: 无法解析代码结构
解决: 检查代码语法和导入语句

⚠️ 覆盖率低于目标
原因: 复杂逻辑分支未完全覆盖
解决: 增加边界条件和异常测试

🐛 测试不稳定
原因: 异步操作和时间依赖
解决: 使用Mock和固定时间
```

## 相关命令

- [`m-tdd-planner`](m-tdd-planner.md) - TDD规划
- [`m-review-code`](m-review-code.md) - 代码审查
- [`m-bug-fix`](m-bug-fix.md) - Bug修复
- [`m-security-scan`](m-security-scan.md) - 安全测试