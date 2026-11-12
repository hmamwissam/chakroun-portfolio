# 00 — Core Principles (The Constitution)

Every other protocol derives from this file. If a conflict appears between protocols, this file wins.

## 1. Rule levels

| Level | Scope | Enforcement |
|---|---|---|
| **L1 — Mandatory** | Security, correctness, data integrity | Never bypass. No exceptions, no "temporary" workarounds. |
| **L2 — Engineering standards** | Architecture, testing, code quality, documentation | Required by default. Deviation needs a written justification in the PR. |
| **L3 — Optimization** | Scalability, advanced infrastructure, cost optimization | Applied only when the project context demonstrates a real need. |

## 2. The five strict rules

### R1 — No assumptions
- Inspect the existing implementation before changing it.
- Never assume existing code is correct **or** incorrect without reading it.
- Never assume an API, field, or dependency exists — verify it in the codebase.
- Never assume another agent's work is correct — verify or flag it (`agent-control/03-CROSS-AGENT-CHECK.md`).

### R2 — No unnecessary complexity
- Start with a modular monolith. Microservices only with a documented operational need (ADR required).
- No abstraction without at least two concrete uses. No dependency without a demonstrated problem it solves.
- Apply KISS, YAGNI, DRY (without over-abstraction).
- **Clean code does not mean 50 files for a simple feature.** Architecture must be proportional to the problem.

### R3 — No incomplete features
- Frontend, backend, database, validation, and error handling must work together.
- Every user-facing feature ships with loading, empty, success, and error UI states.
- Every endpoint ships with validation, authentication, authorization, error handling, and logging.
- A feature is not complete at "works on my machine."

### R4 — No security shortcuts
- Validate all input server-side. Frontend validation is UX, not security.
- Enforce authorization on every resource (ownership checks on every relevant route — see IDOR/BOLA in `06-SECURITY-PROTOCOL.md`).
- Never expose secrets, stack traces, database internals, or credentials in production responses or logs.
- Never store raw card details. Never log passwords or tokens.

### R5 — No production claims without evidence
- Every claim of "done", "passes", "works", "secure" must be backed by executed tests, builds, or configuration inspection.
- If a check could not be run, the report must say **NOT VERIFIED** — never imply it passed.
- Never hide unresolved risks in a report that says everything is production-ready.

## 3. The one law

> **No implementation without understanding. No completion without testing. No release without evidence.**

## 4. Definition of Done (applies to every feature)

A feature is complete ONLY when ALL of the following are true:

- [ ] Requirements and acceptance criteria are satisfied.
- [ ] Code follows project conventions (`agent-control/04-CODEBASE-CONSISTENCY.md`).
- [ ] Server-side validation exists.
- [ ] Authorization is checked (including resource ownership).
- [ ] Error handling is implemented and returns predictable errors.
- [ ] Loading, empty, success, and error UI states exist.
- [ ] Relevant tests pass (unit + integration; E2E for critical flows).
- [ ] No new critical security issue is introduced (`npm audit` reviewed).
- [ ] Documentation is updated.
- [ ] Code has been reviewed (or self-reviewed against `templates/CODE-REVIEW-CHECKLIST.md` when working solo).
- [ ] Deployment impact is understood.
- [ ] `agent-control/06-FINAL-VERIFICATION.md` is complete.

## 5. Severity model (used across all protocols)

| Priority | Meaning | Required response |
|---|---|---|
| **P0** | Critical security breach, data loss, platform down | Immediate action; never release |
| **P1** | Major functionality broken, serious vulnerability | Fix before release |
| **P2** | Significant defect or performance issue | Release only after documented risk acceptance |
| **P3** | Minor UI, maintainability, non-critical issue | Backlog |

## 6. The lifecycle (where each protocol applies)

```
1. Requirements ──────► templates/PROJECT-CONTEXT-TEMPLATE.md, FEATURE-CHECKLIST.md
2. Architecture ──────► 01-ARCHITECTURE.md, 04-DATABASE-STANDARDS.md, 05-API-CONTRACTS.md
3. Foundation ────────► 11-GIT-WORKFLOW.md, tooling setup
4. Implementation ────► 02, 03, 04, 05, 07 + agent-control/ (continuous)
5. Review ────────────► 11-GIT-WORKFLOW.md, templates/CODE-REVIEW-CHECKLIST.md
6. Testing ───────────► 08-TESTING-QA.md
7. Production ready ──► 06, 09, 10, templates/RELEASE-CHECKLIST.md
8. Deploy & release ──► 10-DEVOPS-DEPLOYMENT.md, 13-PRODUCTION-RELEASE.md
9. Operate ───────────► 07 (logging), 10 (monitoring), 13 (incidents)
```
