# Next Context Workflow: Compile Task List & Background Info

**Target:** $ARGUMENTS (Default: unstaged code changes and current conversation context)

**Scope:** Analyze project state and compile comprehensive task context

## Execution Steps

1. **Project Background Analysis**
   - Inspect unstaged code changes and modifications
   - Extract context from current conversation history
   - Assess project objectives and technical constraints

2. **Task Extraction & Classification**
   - Detect TODO markers and incomplete implementations
   - Identify open issues and planned features
   - Classify tasks by type (feature, bugfix, refactor, documentation)

3. **Supporting Material Collection**
   - Gather relevant file paths and documentation
   - Identify external links and reference materials
   - Map resources to specific tasks and requirements

4. **Ambiguity Detection**
   - Identify unclear requirements and specifications
   - Flag missing information and decision points
   - Generate clarifying questions for resolution

5. **Context Compilation**
   - Synthesize project state narrative
   - Organize tasks with clear relationships
   - Structure references for easy access

6. **Generate Context Report**
   - Compile findings into structured markdown format
   - Save to `docs/workspaces/next-context-MM-dd-HH-mm-ss.md`

## Output Format

### English Report

#### `context`
- Concise background narrative describing current project state
- Key objectives and development goals
- Technical constraints and architectural decisions
- Recent progress and conversation highlights

#### `tasks`
Array of task objects with structure:
```json
{
  "id": "string",
  "description": "string",
  "type": "feature|bugfix|refactor|docs|test",
  "status": "pending|in-progress|blocked|ready"
}
```

#### `references`
- File paths relevant to each task
- Documentation and specification links
- External resources and dependencies
- Related discussions and decision records

#### `clarifications`
Array of questions for ambiguities requiring resolution:
- Unclear requirements or scope boundaries
- Missing technical specifications
- Implementation approach uncertainties
- Resource and timeline considerations

### 中文报告

> 以下为中文版本，内容与英文部分对应。AGI可跳过此部分。

#### `context` - 项目背景
- 描述当前项目状态的简要说明
- 关键目标和开发方向
- 技术约束和架构决策
- 近期进展和对话要点

#### `tasks` - 任务清单
任务对象数组结构：
```json
{
  "id": "字符串",
  "description": "任务描述",
  "type": "功能|缺陷修复|重构|文档|测试",
  "status": "待开始|进行中|受阻|就绪"
}
```

#### `references` - 参考资料
- 与各任务相关的文件路径
- 文档和规范链接
- 外部资源和依赖项
- 相关讨论和决策记录

#### `clarifications` - 待澄清问题
需要解决的模糊性问题数组：
- 不清楚的需求或范围边界
- 缺失的技术规范
- 实现方法的不确定性
- 资源和时间线考虑

## Final Output

Save the complete bilingual context report to:
`docs/workspaces/next-context-MM-dd-HH-mm-ss.md`

Output the saved file path to confirm completion.