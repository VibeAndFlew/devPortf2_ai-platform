# Security Policy

## Supported Versions

| Version | Supported |
|---------|-----------|
| 1.x     | ✅ Active |
| < 1.0   | ❌        |

## Reporting a Vulnerability

We take the security of NOVA AI Workflow OS seriously. If you discover a security vulnerability, please follow these steps:

### Private Disclosure Process

1. **Do NOT** file a public issue or discussion.
2. Email your findings to **security@novalabs.dev** (or use the GitHub Security Advisory tab).
3. Include as much detail as possible:
   - Type of vulnerability
   - Full reproduction steps
   - Affected versions
   - Potential impact
   - Suggested fix (if applicable)

### What to Expect

- **Acknowledgement** within 48 hours of submission
- **Initial assessment** within 5 business days
- **Regular updates** every 7 days until resolution
- **Disclosure coordination** — we work with reporters on timeline

### Our Commitment

- We will validate and respond to all legitimate reports
- We will keep you informed of the fix progress
- We will credit researchers (with permission) in security advisories
- We will issue CVEs for confirmed vulnerabilities
- No legal action against good-faith security research

## Security Features

### Authentication & Authorization

- **NextAuth.js/Auth.js** for session management
- **RBAC** with role-based access control
- **API key authentication** for programmatic access
- **JWT-based tokens** with configurable expiry
- **Rate limiting** on authentication endpoints

### Data Protection

- **Encryption at rest** for all sensitive data
- **TLS 1.3** for all network traffic
- **Content Security Policy** headers (see `next.config.ts`)
- **XSS protection** via React's built-in escaping
- **SQL injection prevention** via parameterized queries
- **CSRF protection** with double-submit cookie pattern

### AI Provider Security

- **API keys stored server-side only** — never exposed to client
- **Request/response logging** with sensitive data redaction
- **Token usage monitoring** for anomaly detection
- **Prompt injection detection** at the middleware level
- **Context window limits** to prevent prompt leakage

### Infrastructure Security

- **Dependency scanning** via Dependabot
- **SAST scanning** via CodeQL
- **Secret detection** in CI/CD pipelines
- **Container scanning** for Docker images
- **Immutable deployments** with no runtime SSH access

## Security Best Practices for Contributors

1. Never commit secrets, tokens, or credentials
2. Use environment variables for all sensitive configuration
3. Run `npm audit` before submitting PRs
4. Follow the principle of least privilege
5. Validate and sanitize all user inputs
6. Use Zod schemas for runtime type validation
7. Avoid `dangerouslySetInnerHTML` — use proper React patterns
8. Report vulnerabilities, don't exploit them
9. Keep dependencies updated via Dependabot PRs

## Incident Response

1. **Detection** — Automated monitoring alerts security team
2. **Analysis** — Determine scope, impact, and severity
3. **Containment** — Apply mitigations, rotate keys if needed
4. **Eradication** — Deploy fixes, patch affected systems
5. **Recovery** — Restore normal operations, verify fixes
6. **Post-mortem** — Document lessons learned, improve processes

## Compliance

- **GDPR-ready** — data deletion, export, and consent management
- **SOC 2 alignment** — audit logging, access controls, monitoring
- **OWASP Top 10** — all relevant vulnerabilities addressed
- **WCAG AA** — accessibility for inclusive security interfaces
