# 06 — Security Protocol

**Enforcement: L1. Never bypass.** Use OWASP ASVS and the OWASP Top 10 as reference frameworks. Security is integrated into development, never postponed to deployment.

> A successful login test is not proof of secure authentication.

## 1. Authentication

- [ ] Passwords hashed with **Argon2id** (or bcrypt with appropriate cost factor). Never MD5/SHA-1/plain.
- [ ] Login rate-limited and brute-force protected (lockout/backoff, CAPTCHA after thresholds).
- [ ] No account enumeration: identical responses/timing for "user not found" vs "wrong password".
- [ ] Password reset tokens: single-use, short-lived (≤ 15–60 min), not guessable, invalidated after use.
- [ ] Email verification where required.
- [ ] Session invalidation on logout and password change.
- [ ] Refresh-token rotation if JWT refresh flow is used; reuse detection.
- [ ] MFA available for admin/sensitive accounts.

## 2. Authorization — the IDOR/BOLA rule (L1, most violated)

**Changing `/orders/123` to `/orders/124` must never expose another user's data.**

- [ ] Every route touching a resource verifies **ownership or role** server-side, on every request.
- [ ] Admin endpoints reject non-admin users (verified server-side, not by hiding buttons).
- [ ] Role changes take effect immediately (no stale cached permissions).
- [ ] Privileged actions logged (who, what, when, target).
- [ ] Test: user A's token cannot read/modify user B's resources — automated where possible.

## 3. API security

- [ ] Rate limiting (express-rate-limit or gateway-level) on all endpoints; stricter on login, signup, password reset.
- [ ] Request size limits; input sanitization; schema validation on every payload.
- [ ] CORS: explicit allow-list of origins — never `*` with credentials.
- [ ] Helmet/security headers configured.
- [ ] CSRF protection when using cookie-based authentication.
- [ ] NoSQL injection prevention: never interpolate raw user input into queries; allow-list filter/sort fields.
- [ ] SSRF protection: server fetches only allow-listed URLs.
- [ ] File uploads: type/size validation, stored outside web root or in object storage, served with safe headers, random filenames.
- [ ] Webhooks: signature verification (shared secret/HMAC) before any processing; replay protection.
- [ ] Errors are generic to clients; details go to logs only.

## 4. Infrastructure security

- [ ] HTTPS everywhere; HSTS enabled; secure cookies (`httpOnly`, `secure`, `sameSite`).
- [ ] Database not publicly exposed; network allow-lists; least-privilege DB users.
- [ ] Secrets in a manager/deployment env — never in git, never hardcoded, never in frontend bundles.
- [ ] Secrets rotation policy; different secrets per environment.
- [ ] Production debug mode disabled.
- [ ] Firewall/security groups expose only required ports.
- [ ] Dependency vulnerability scanning in CI (`npm audit`, Snyk or equivalent) — new critical vulnerabilities block merge.

## 5. Security testing (required evidence)

- [ ] SAST + SCA run in CI.
- [ ] Auth & authorization tests automated (including the IDOR test matrix).
- [ ] OWASP Top 10 reviewed against every new feature (see `templates/SECURITY-CHECKLIST.md`).
- [ ] `npm audit --omit=dev` clean of critical/high issues, or formally accepted with justification.
- [ ] Manual penetration testing for important workflows before major releases.

## 6. E-commerce / payment specific (when applicable)

- [ ] Atomic inventory reservation; idempotent order creation.
- [ ] Payment webhook signature verification + duplicate handling.
- [ ] Payment/order state reconciliation job.
- [ ] Prices always calculated server-side; client prices never trusted.
- [ ] Refund/cancellation consistency (no partial states).
- [ ] No raw card data ever touches or is stored on our servers.

## 7. AI-integration specific (when applicable)

- [ ] Model output treated as **untrusted input** — validated and sanitized like user input.
- [ ] Prompt-injection defenses: system prompts protected, tool permissions scoped, user content delimited.
- [ ] Authorization enforced **outside** the LLM (the model never decides access).
- [ ] Rate/token/cost limits per user; provider timeouts and fallbacks.
- [ ] Prompts and models versioned; no silent behavior changes.
- [ ] No sensitive data sent to providers without policy compliance.
