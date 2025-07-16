# m-security-scan - Comprehensive Security Scan Workflow

## Overview

`m-security-scan` is a comprehensive security vulnerability scanning and assessment workflow that checks for security issues in dependencies, code, authentication mechanisms, and data handling processes. The command supports different scan scopes, from dependency checks to full security audits.

## Usage

```bash
/m-security-scan [scope]
```

## Parameter Details

- `scope` (optional): The scope of the scan.
  - **Default Behavior**: Scans the entire codebase.
  - **Supported Scopes**:
    - `dependencies` - Scans only dependencies.
    - `auth` - Focuses on authentication mechanisms.
    - `data-handling` - Security of data processing.
    - `full` - Comprehensive security assessment.
    - **Specific Paths**: `src/api`, `config/`, etc.

## Usage Examples

### Full Security Scan
```bash
/m-security-scan
```
**Expected Outcome**:
- Scans all code files.
- Checks for dependency vulnerabilities.
- Analyzes authentication and authorization.
- Assesses data handling security.
- Generates a comprehensive security report.

### Dependency Security Scan
```bash
/m-security-scan dependencies
```
**Expected Outcome**:
- Checks dependency files like `package.json` or `requirements.txt`.
- Identifies known security vulnerabilities.
- Checks for outdated dependencies.
- Provides update recommendations.

### Authentication Security Scan
```bash
/m-security-scan auth
```
**Expected Outcome**:
- Analyzes the implementation of authentication mechanisms.
- Checks password storage and validation.
- Assesses session management.
- Reviews permission controls.

### Data Handling Security Scan
```bash
/m-security-scan data-handling
```
**Expected Outcome**:
- Checks input validation.
- Analyzes SQL injection risks.
- Assesses data encryption.
- Reviews sensitive data handling.

### Scan a Specific Directory
```bash
/m-security-scan src/api
```
**Expected Outcome**:
- Scans API-related code.
- Checks for API security best practices.
- Analyzes endpoint access control.
- Assesses data transmission security.

## Workflow

### 1. Vulnerability Scanning
- **Dependency Check**: Checks for known vulnerabilities using security databases.
- **Static Code Analysis**: Scans code for security issues.
- **Configuration Review**: Checks security settings in configuration files.
- **Third-Party Library Assessment**: Analyzes the security of third-party libraries.

### 2. Authentication Analysis
- **Authentication Mechanism Review**: Checks login and authentication processes.
- **Password Policy**: Assesses password storage and validation.
- **Session Management**: Analyzes session creation, maintenance, and destruction.
- **Multi-Factor Authentication**: Checks MFA implementation.

### 3. Data Handling Check
- **Input Validation**: Checks validation and sanitization of user input.
- **SQL Injection Protection**: Analyzes the security of database queries.
- **XSS Protection**: Checks for cross-site scripting protection.
- **Data Encryption**: Assesses encryption of sensitive data.

### 4. Security Report Generation
- **Risk Rating**: Assesses risk levels according to CVSS standards.
- **Fix Recommendations**: Provides specific fix solutions.
- **Prioritization**: Ranks issues based on risk level.
- **Compliance Check**: Checks against security standards.

### 5. Application of Security Fixes
- **Automatic Fixes**: Applies fixes that can be safely automated.
- **Manual Fix Guidance**: Provides detailed steps for manual fixes.
- **Configuration Updates**: Updates security configurations.
- **Dependency Updates**: Upgrades vulnerable dependencies.

## Security Check Categories

### Dependency Security
- **Known Vulnerabilities**: Checks CVE databases.
- **License Issues**: Checks dependency licenses.
- **Outdated Dependencies**: Identifies dependencies that need updating.
- **Malicious Packages**: Checks for suspicious third-party packages.

### Code Security
- **Injection Attacks**: SQL injection, command injection, LDAP injection.
- **Cross-Site Scripting**: XSS, CSRF attack protection.
- **Access Control**: Permission validation and authorization checks.
- **Data Leaks**: Checks for sensitive information leaks.

### Configuration Security
- **Default Credentials**: Checks for default usernames and passwords.
- **Debug Mode**: Debug configurations in production environments.
- **Log Security**: Leaks of sensitive information in logs.
- **Network Configuration**: Port, protocol, and encryption settings.

### Authentication & Authorization
- **Weak Passwords**: Password complexity and storage.
- **Session Fixation**: Protection against session hijacking.
- **Privilege Escalation**: Vertical and horizontal permission checks.
- **Token Security**: JWT, API key management.

## Expected Outcomes

### Security Scan Report
```
🔒 Security Scan Report
Scan Time: 2025-01-15 14:30:00
Scan Scope: Full codebase
Files Scanned: 234

📊 Vulnerability Statistics
  - High Risk: 2
  - Medium Risk: 5
  - Low Risk: 12
  - Informational: 8

🚨 High-Risk Vulnerabilities
  1. SQL Injection Risk (src/api/userController.js:45)
     - Description: User input is not parameterized in a query.
     - Risk: Database information leakage.
     - Fix: Use parameterized queries or an ORM.

  2. Hardcoded Secret Key (config/database.js:12)
     - Description: Database password is hardcoded.
     - Risk: Credential leakage.
     - Fix: Use environment variables or a secret management service.

⚠️ Medium-Risk Vulnerabilities
  1. Missing CSRF protection (src/middleware/auth.js)
  2. Session timeout is too long (config/session.js)
  3. Logging of sensitive information (src/utils/logger.js)
  4. Insecure random number generation (src/utils/crypto.js)
  5. Missing input length validation (src/api/commentController.js)

🔧 Fix Recommendations
  1. Immediately fix all high-risk vulnerabilities.
  2. Implement a code review process.
  3. Add security testing to CI/CD.
  4. Regularly update dependencies.
  5. Enable security header configurations.
```

### Dependency Scan Results
```
📦 Dependency Security Scan
Dependencies Checked: 156

🚨 High-Risk Dependencies
  - lodash@4.17.15 (CVE-2021-23337)
    Impact: Prototype pollution vulnerability.
    Fix: Upgrade to 4.17.21+

  - express@4.16.4 (CVE-2022-24999)
    Impact: Path traversal vulnerability.
    Fix: Upgrade to 4.17.3+

📋 Fix Commands
npm audit fix
npm install lodash@^4.17.21
npm install express@^4.17.3
```

### Authentication Security Assessment
```
🔐 Authentication Security Assessment

✅ Secure Configurations
  - Password Hashing: bcrypt (secure)
  - Session Management: Secure configuration
  - HTTPS Enforcement: Enabled

❌ Issues Found
  - Missing password complexity checks.
  - No account lockout mechanism.
  - Missing multi-factor authentication.

🔧 Improvement Suggestions
  1. Add password complexity validation.
  2. Implement login attempt limits.
  3. Consider adding 2FA support.
  4. Implement a session timeout mechanism.
```

## Security Standards Compliance

### OWASP Top 10 Checks
- A01: Broken Access Control
- A02: Cryptographic Failures
- A03: Injection
- A04: Insecure Design
- A05: Security Misconfiguration
- A06: Vulnerable and Outdated Components
- A07: Identification and Authentication Failures
- A08: Software and Data Integrity Failures
- A09: Security Logging and Monitoring Failures
- A10: Server-Side Request Forgery

### Security Frameworks
- **ISO 27001**: Information Security Management
- **NIST**: Cybersecurity Framework
- **PCI DSS**: Payment Card Industry Data Security Standard
- **GDPR**: General Data Protection Regulation

## Best Practices

### 1. Regular Scanning
- Daily automated scans.
- Scans before version releases.
- Scans after dependency updates.
- Scans after code changes.

### 2. Risk Management
- Fix vulnerabilities by priority.
- Establish a risk acceptance process.
- Track fix progress.
- Verify the effectiveness of fixes.

### 3. Security Culture
- Developer security training.
- Secure code reviews.
- Automated security testing.
- Incident response planning.

## Tool Integration

### Scanning Tools
- **SAST**: Static Application Security Testing
- **DAST**: Dynamic Application Security Testing
- **Dependency Checkers**: npm audit, Snyk
- **Code Analysis**: SonarQube, CodeQL

### Monitoring Tools
- **Real-time Monitoring**: Application performance monitoring
- **Log Analysis**: Security event detection
- **Threat Intelligence**: Latest threat information
- **Compliance Reporting**: Automated compliance checks

## Related Commands

- [`m-review-code`](m-review-code.md) - Code Quality Review
- [`m-test-generation`](m-test-generation.md) - Security Test Generation
- [`m-project-cleanup`](m-project-cleanup.md) - Project Cleanup
- [`m-document-update`](m-document-update.md) - Security Documentation Updates
