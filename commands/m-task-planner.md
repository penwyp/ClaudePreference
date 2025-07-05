# Dev Task Plan Workflow: Structure Implementation & Tests

**Target:** $ARGUMENTS (Default: requirement document(s) discovered in the project)

**Scope:** Analyze requirements and generate structured implementation plan with tests

## Execution Steps

1. **Requirements Analysis**
   - Parse target documents and extract functional requirements
   - Identify technical constraints and dependencies
   - Document ambiguities and unclear specifications

2. **Implementation Strategy Design**
   - Define architecture patterns and system design
   - Plan API structures and data models
   - Outline testing strategy and coverage approach

3. **Task Decomposition**
   - Break down features into actionable implementation tasks
   - Create corresponding test tasks for each feature
   - Define task types (feature, test, refactor, documentation)

4. **Dependency Mapping**
   - Identify task prerequisites and blocking relationships
   - Sequence tasks based on logical dependencies
   - Optimize for parallel development opportunities

5. **Plan Visualization**
   - Generate Mermaid diagram showing task flow
   - Illustrate critical path and milestone dependencies
   - Highlight testing integration points

6. **Generate Task Plan Report**
   - Compile findings into structured markdown format
   - Save to `docs/workspaces/task-plan-MM-dd-HH-mm-ss.md`

## Output Format

### English Report

#### `overview`
- High-level implementation strategy and architectural approach
- Testing methodology and coverage targets
- Key technical decisions and assumptions

#### `tasks`
Array of task objects with structure:
```json
{
  "id": "string",
  "description": "string", 
  "type": "feature|test|refactor|docs",
  "status": "pending|in-progress|completed",
  "dependencies": ["task_id_1", "task_id_2"]
}
```

#### `diagram`
Mermaid diagram code illustrating:
- Task dependencies and flow
- Critical path identification
- Parallel execution opportunities

#### `clarifications`
Array of questions for requirement ambiguities:
- Unclear functional requirements
- Missing technical specifications
- Integration and compatibility concerns

### 中文报告

> 以下为中文版本，内容与英文部分对应。AGI可跳过此部分。

#### `overview` - 总体策略
- 高层实现策略和架构方法
- 测试方法论和覆盖目标
- 关键技术决策和假设

#### `tasks` - 任务清单
任务对象数组结构：
```json
{
  "id": "字符串",
  "description": "任务描述", 
  "type": "功能|测试|重构|文档",
  "status": "待开始|进行中|已完成",
  "dependencies": ["依赖任务ID1", "依赖任务ID2"]
}
```

#### `diagram` - 依赖图表
Mermaid图表代码展示：
- 任务依赖和流程
- 关键路径识别
- 并行执行机会

#### `clarifications` - 待确认问题
需求模糊性问题数组：
- 不明确的功能需求
- 缺失的技术规范
- 集成和兼容性问题

## Final Output

Save the complete bilingual task plan to:
`docs/workspaces/task-plan-MM-dd-HH-mm-ss.md`

Output the saved file path to confirm completion.