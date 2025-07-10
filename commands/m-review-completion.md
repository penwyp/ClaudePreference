# Review code against a plan and generate a quality report

**Target:** `$ARGUMENTS` (Default: a plan or requirement document, such as `.md`, `.txt`, or direct text)

**Scope:** Analyze code implementation against a plan, verify completion, and identify quality issues.

## Execution Steps

1.  **Plan Analysis and Code Discovery:**
    *   Parse the input plan to extract requirements and technical specifications.
    *   Discover relevant code files by searching the codebase and analyzing dependencies.

2.  **Implementation Verification:**
    *   Check if features are implemented according to the plan's acceptance criteria.
    *   Trace requirements to specific code segments and flag deviations.

3.  **Code Quality Analysis:**
    *   Detect bugs, including runtime errors, logic flaws, and security vulnerabilities.
    *   Identify code smells like high complexity, duplication, and poor design patterns.
    *   Analyze architectural issues such as circular dependencies and layering violations.

4.  **Enhancement and Reporting:**
    *   Suggest opportunities for improvement, such as using third-party libraries or performance optimizations.
    *   Generate a structured report summarizing all findings.
    *   Save the report to `reports/code-review-report-MM-dd-HH-mm-ss.md`.

## Output Format

The output is a single markdown report.

### English Report

#### `summary`
- A high-level overview of the review.
- Key metrics for plan completion, code quality, and critical issues.
- A list of critical action items that require immediate attention.

#### `completion_analysis`
- A breakdown of completed, partially completed, and missing features from the plan.
- JSON structure for a feature:
  ```json
  {
    "feature": "string",
    "status": "Completed | Partial | Missing",
    "location": "string",
    "notes": "string"
  }
  ```

#### `quality_analysis`
- A detailed list of bugs, security vulnerabilities, and code smells.
- JSON structure for an issue:
  ```json
  {
    "id": "string",
    "severity": "Critical | High | Medium | Low",
    "description": "string",
    "file": "string",
    "recommendation": "string"
  }
  ```

#### `enhancements`
- Suggestions for improvements, such as library replacements or performance tuning.

### 中文报告

> 以下为中文版本，内容与英文部分对应。

#### `summary` - 总结
- 评审工作的高度概括。
- 计划完成度、代码质量和关键问题的核心指标。
- 需要立即处理的关键行动项列表。

#### `completion_analysis` - 完成度分析
- 按计划细分的已完成、部分完成和缺失的功能。
- 功能点JSON结构:
  ```json
  {
    "feature": "功能描述",
    "status": "已完成 | 部分完成 | 缺失",
    "location": "代码位置",
    "notes": "备注"
  }
  ```

#### `quality_analysis` - 质量分析
- Bug、安全漏洞和代码坏味道的详细列表。
- 问题点JSON结构:
  ```json
  {
    "id": "问题ID",
    "severity": "严重 | 高 | 中 | 低",
    "description": "问题描述",
    "file": "相关文件",
    "recommendation": "修复建议"
  }
  ```

#### `enhancements` - 优化建议
- 改进建议，例如替换第三方库或性能调优。