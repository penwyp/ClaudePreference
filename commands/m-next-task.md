# Next Tasks Workflow: Analyze Status & Plan Actions

**Target:** $ARGUMENTS (Default: medium priority if none specified)

**Scope:** Analyze current development status and generate prioritized action plan

## Execution Steps

1. **Documentation & Tracker Scan**
   - Inspect development tracking files (`docs/dev*.md`, `TODO.md`, etc.)
   - Extract pending tasks and action items
   - Review project roadmap and milestone documents

2. **Git History Analysis**
   - Parse recent commits for TODO markers and incomplete work
   - Identify new changes requiring follow-up actions
   - Detect unfinished features or partial implementations

3. **Task Status Assessment**
   - Evaluate current task completion status
   - Identify blocking dependencies and prerequisites
   - Assess resource availability and constraints

4. **Priority Ranking**
   - Rank tasks based on specified priority level or default medium
   - Consider business impact, technical debt, and dependencies
   - Balance feature development with maintenance tasks

5. **Reference Collection**
   - Gather relevant files, commits, and documentation
   - Identify helpful discussions and decision records
   - Compile supporting materials for task execution

6. **Generate Next Tasks Report**
   - Compile findings into structured markdown format
   - Save to `docs/workspaces/next-tasks-MM-dd-HH-mm-ss.md`

## Output Format

### English Report

#### `summary`
- Concise overview of current development status
- Key context and recent progress highlights
- Overall project health and momentum assessment

#### `tasks`
Prioritized task list with structure:
```json
{
  "id": "string",
  "description": "string",
  "priority": "high|medium|low",
  "status": "pending|blocked|in-progress",
  "dependencies": ["task_id_1", "task_id_2"]
}
```

#### `references`
- Relevant files and documentation links
- Related commits and pull requests
- Helpful discussions and decision records
- External resources and documentation

#### `clarifications`
Questions for requirement or implementation ambiguities:
- Unclear priorities or scope boundaries
- Missing technical specifications
- Resource allocation and timeline concerns

### 中文报告

> 以下为中文版本，内容与英文部分对应。AGI可跳过此部分。

#### `summary` - 状态概述
- 当前开发状态的简要概览
- 关键背景和近期进展亮点
- 项目整体健康状况和发展势头评估

#### `tasks` - 任务清单
按优先级排序的任务列表结构：
```json
{
  "id": "字符串",
  "description": "任务描述",
  "priority": "高|中|低",
  "status": "待开始|受阻|进行中",
  "dependencies": ["依赖任务ID1", "依赖任务ID2"]
}
```

#### `references` - 参考资料
- 相关文件和文档链接
- 关联的提交和拉取请求
- 有用的讨论和决策记录
- 外部资源和文档

#### `clarifications` - 待澄清问题
需求或实现模糊性问题：
- 不明确的优先级或范围边界
- 缺失的技术规范
- 资源分配和时间线问题

## Final Output

Save the complete bilingual next tasks report to:
`docs/workspaces/next-tasks-MM-dd-HH-mm-ss.md`

Output the saved file path to confirm completion.