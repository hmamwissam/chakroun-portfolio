# 11 — Git Workflow

Enforcement: L2; the secrets rules are L1.

## 1. Branch strategy

```
main                    ← protected, always deployable
  ├── develop           ← integration branch (optional for small teams)
  │    ├── feature/authentication
  │    ├── feature/order-management
  │    ├── fix/inventory-race-condition
  │    └── refactor/api-error-handling
```

- [ ] `main` is protected: no direct pushes; changes arrive via PR only.
- [ ] Feature branches are short-lived (trunk-based development preferred for small teams).
- [ ] Branch names: `feature/…`, `fix/…`, `refactor/…`, `chore/…`.

## 2. Commits

- [ ] Small, atomic commits; one logical change each.
- [ ] Conventional format recommended: `feat(orders): add idempotent order creation`, `fix(auth): invalidate session on password change`.
- [ ] No "wip", "fix stuff", or bulk formatting mixed with logic changes.
- [ ] No commented-out code committed; no debug `console.log` noise.

## 3. Pull requests

- [ ] PRs are small and reviewable (target < ~400 changed lines).
- [ ] Description template: what/why/how verified (tests run, evidence).
- [ ] CI green before merge; failed mandatory gates block merge.
- [ ] Review against `templates/CODE-REVIEW-CHECKLIST.md`.
- [ ] Squash or merge policy consistent per repo (documented in PROJECT-CONTEXT.md).

## 4. Repository hygiene (L1 where noted)

- [ ] `.gitignore` covers: `node_modules`, `.env*`, build outputs, uploaded files, logs.
- [ ] **No secrets in git — ever.** If a secret was committed: rotate it immediately, then purge history. (L1)
- [ ] `.env.example` maintained and committed.
- [ ] README with setup instructions; CONTRIBUTING for conventions.
- [ ] CHANGELOG maintained for releases.
- [ ] Versioning strategy defined (semver recommended for APIs/packages).

## 5. Verification

- [ ] `git diff main...HEAD` reviewed before opening the PR — no stray changes, no secrets, no dead files.
- [ ] CI status checked, not assumed.
