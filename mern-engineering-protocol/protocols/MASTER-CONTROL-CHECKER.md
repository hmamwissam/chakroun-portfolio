# MASTER CONTROL — Independent AI Agent Audit

**Purpose:** act as an independent senior-engineer reviewer that checks the work of any coding agent (Codex, Claude Code, Cursor, Copilot, etc.).

## 1. The one principle

> **Never trust an AI agent's claim that its implementation is correct. Require evidence.**

The checker detects not only coding errors, but the mistakes AI agents commonly introduce: incomplete implementations, invented assumptions, broken integrations, security vulnerabilities, hidden regressions, unnecessary refactoring, fake tests, and incorrect production-readiness claims.

## 2. How to run it

- Use a **separate agent (Agent B)** from the one that implemented the work (Agent A).
- Agent B receives: the task requirements, Agent A's report, and `prompts/INDEPENDENT-AI-AUDIT-PROMPT.md`.
- Agent B works **read-only**: it audits, it does not fix. Findings are returned as a report.
- Agent A may not mark work complete until Agent B's verdict.

## 3. The audit — 18 sections

Run every section. For each: **VERIFIED / ISSUE / NOT VERIFIED**.

### 1. Scope & requirement compliance
- [ ] Every requirement in the task is implemented — nothing silently dropped.
- [ ] Nothing extra was added beyond scope (no unrequested "improvements").
- [ ] Acceptance criteria each have evidence.

### 2. Architecture & structure
- [ ] Module boundaries respected (no cross-module controller imports).
- [ ] Request flow intact: router → auth → authorization → validation → controller → service → repository.
- [ ] No unjustified new dependencies, folders, or abstractions.
- [ ] No unnecessary refactoring of untouched code.

### 3. Backend correctness
- [ ] Business rules match requirements (read the code, not the report).
- [ ] All edge cases from `08-TESTING-QA.md` §5 handled.
- [ ] Async errors reach the error middleware.
- [ ] No unbounded loops, queries, or payloads.

### 4. Frontend correctness
- [ ] All four UI states present (loading/empty/success/error).
- [ ] API integration matches the real contract (compare against `05-API-CONTRACTS.md`).
- [ ] No business logic duplicated between frontend and backend.
- [ ] Forms validate and handle submission failure correctly.

### 5. API contract consistency
- [ ] Envelope, status codes, error codes match the standard.
- [ ] Endpoints documented (OpenAPI/API_DESIGN.md) and docs match reality.
- [ ] Pagination present on all list endpoints.
- [ ] No breaking changes to existing consumers.

### 6. Database integrity
- [ ] Schema validation, unique constraints, required fields.
- [ ] Indexes for new query patterns.
- [ ] Atomic operations / transactions for multi-document writes.
- [ ] Finite resources protected against race conditions.
- [ ] Migrations are expand-and-contract, versioned, reversible.

### 7. Integration compatibility
- [ ] Frontend ↔ backend: request/response shapes match (verify against actual code, not mocks).
- [ ] Environment variables: required vars validated at startup; `.env.example` updated.
- [ ] Third-party integrations: timeouts, retries, failure handling.
- [ ] Shared config/constants not diverged.

### 8. Security audit
- [ ] Every new route: authentication + ownership/role check (IDOR test).
- [ ] Input validation on every payload; allow-listed filters/sorts.
- [ ] Rate limiting on new/sensitive endpoints.
- [ ] No secrets in code, logs, or responses; no sensitive data in frontend bundles.
- [ ] Webhook signature verification where applicable.
- [ ] `npm audit` results reviewed.

### 9. Error handling & logging
- [ ] No empty catch blocks (grep the diff).
- [ ] Errors follow the taxonomy; no internals leaked.
- [ ] Structured logging on important events; nothing sensitive logged.
- [ ] Frontend error states don't dump raw errors to users.

### 10. Testing quality (fake-test detection)
- [ ] Every claimed test exists and runs in CI — spot-check by executing.
- [ ] Tests assert meaningful behavior (not trivially true).
- [ ] Integration tests use a real DB, not a fully mocked one.
- [ ] No skipped/disabled tests without a linked issue.
- [ ] Coverage of the change is real: failure-inducing mutation causes test failure (spot-check 1–2).

### 11. Regression check
- [ ] Adjacent features that share touched modules were exercised.
- [ ] Existing API consumers unaffected (or migration path exists).
- [ ] Existing UI flows still work (run the E2E smoke set if available).
- [ ] Previously fixed bugs remain fixed (regression suite).

### 12. Code quality & consistency
- [ ] No duplicate logic introduced (search for similar implementations).
- [ ] Naming, file placement, and conventions match the existing codebase.
- [ ] No dead code, unused files, unused dependencies.
- [ ] Functions/components within reasonable size; no giant controllers.

### 13. Dependencies & supply chain
- [ ] Each new dependency justified and vetted (maintenance, size, license).
- [ ] Lockfile updated; no unexpected transitive additions.
- [ ] No duplicate packages providing the same functionality.

### 14. Configuration & secrets
- [ ] No secrets in the diff (scan for keys, tokens, connection strings).
- [ ] Environment-specific config handled correctly; no prod values in dev defaults.
- [ ] Feature flags sane (nothing silently enabled/disabled).

### 15. Performance
- [ ] No N+1 introduced; queries have indexes.
- [ ] Payload sizes reasonable; pagination present.
- [ ] No heavy synchronous work added to the request path.
- [ ] Frontend: no bundle blow-up, no new render-hotspot patterns.

### 16. Production-readiness claims
- [ ] Every "tested/works/passes" claim in the report is backed by evidence you can inspect.
- [ ] Claims of "production-ready" verified against `13-PRODUCTION-RELEASE.md`.
- [ ] Deployment impact assessed (migrations, env vars, rollback).

### 17. Documentation accuracy
- [ ] README/docs updated where behavior changed.
- [ ] No documentation describing behavior the code doesn't have (a classic AI failure).
- [ ] ADR added for significant decisions.

### 18. Unresolved risks & honesty of the report
- [ ] Every NOT VERIFIED item in Agent A's report is real and listed.
- [ ] Known limitations disclosed (not buried).
- [ ] No overstated claims ("fully tested" with partial evidence).
- [ ] Risks rated with the P0–P3 model.

## 4. Audit verdict format

```
AUDIT REPORT — <feature/branch/date>
Auditor: Agent B (independent)

SUMMARY: <one paragraph>

FINDINGS:
| # | Section | Severity (P0-P3) | Description | Evidence | Required action |

VERDICT:  APPROVED | APPROVED WITH CONDITIONS | REJECTED
NOT VERIFIED: <items that could not be checked and why>

Conditions must be resolved and re-audited before completion.
```

## 5. Rules

- The auditor does not fix — it reports. (Fixing blurs accountability.)
- A REJECTED verdict sends the work back to Agent A with the findings.
- The auditor never shares context with Agent A; independence is the point.
- Human review remains the final authority for P0/P1 findings.
