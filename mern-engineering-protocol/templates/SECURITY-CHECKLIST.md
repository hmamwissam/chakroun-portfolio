# Template — Security Checklist

Run for every security-sensitive change and before every release.

**Scope/branch:** ______________________  **Date:** __________

## Authentication
- [ ] Passwords: Argon2id / bcrypt (no weak hashes)
- [ ] Rate limiting + brute-force protection on login/reset
- [ ] No account enumeration (uniform responses/timing)
- [ ] Reset/verification tokens: single-use, expiring, unguessable
- [ ] Session invalidation on logout/password change

## Authorization (IDOR/BOLA)
- [ ] Ownership verified on every resource route (test: user A cannot access user B's `/orders/124`)
- [ ] Admin endpoints enforce role server-side
- [ ] Privileged actions logged

## API security
- [ ] Input validation/sanitization on every endpoint
- [ ] Rate limiting; body size limits
- [ ] CORS allow-list (no `*` with credentials)
- [ ] Security headers (Helmet)
- [ ] No NoSQL injection (no raw interpolation; allow-listed filters)
- [ ] Webhook signatures verified + events deduplicated
- [ ] File uploads: validated, private storage, safe serving

## Data protection
- [ ] No secrets in code/git/frontend bundles/logs
- [ ] HTTPS + HSTS + secure cookies
- [ ] PII minimized; retention/deletion policy applied
- [ ] No raw card data touches our servers

## Verification
- [ ] `npm audit --omit=dev` — no unaccepted critical/high
- [ ] OWASP Top 10 reviewed for changed surface
- [ ] Auth/authorization tests automated and passing

**Open items (severity + owner + date):**
