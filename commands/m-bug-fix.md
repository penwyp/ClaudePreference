# Bug Fix Workflow: Analyze, Reproduce, Identify, Fix, Verify 

**Bug source:** $ARGUMENTS

If no parameters specified, analyze recent error logs and failed tests by default.
Supported inputs: issue number (#123), error text, screenshot/image, log file path, or bug description.

## Commands:

1. **Analyze bug source** - Parse issue, image, text, or logs to understand the problem, and search doc from context7 for more details or solutions

2. **Reproduce the issue** - Create test cases to consistently reproduce the bug

3. **Identify root cause** - Trace through code to find the underlying issue

4. **Implement fix** - Apply targeted solution with minimal side effects

5. **Verify fix and test** - Ensure bug is resolved and no regressions introduced