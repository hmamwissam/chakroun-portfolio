# AGENTS.md — Mandatory Engineering Protocol for AI Coding Agents

This file is the **root instruction file** for every AI coding agent (Cursor, Claude Code, Codex, GitHub Copilot, etc.) working on this repository.

> **Status: MANDATORY. This is not a suggestion. Deviation requires explicit human approval documented in the PR.**

---

## 1. Mission

Build software that is:

- **Correct** — behaves as specified, including edge cases.
- **Secure** — users, data, APIs, infrastructure, and secrets are protected.
- **Reliable** — handles failures without corrupting data.
- **Scalable** — grows without a rewrite.
- **Maintainable** — another developer can understand and extend it.
- **Observable** — problems can be detected, investigated, and resolved.
- **Performant** — responds efficiently under realistic workloads.
- **Recoverable** — recovers from failures and data loss.

**The golden rule: Never consider a feature complete just because it works on your local machine.** A feature is complete only when its requirements, implementation, tests, security, failure handling, documentation, and operational behavior have been verified.

---

## 2. The five strict rules

1. **No assumptions** — inspect the existing project before modifying it. Never assume existing code is correct or incorrect without reading it.
2. **No unnecessary complexity** — implement the simplest maintainable solution. No microservices, abstractions, or dependencies without a demonstrated need.
3. **No incomplete features** — frontend, backend, database, validation, and error handling must work together. Every feature ships with loading, empty, success, and error UI states.
4. **No security shortcuts** — validate all inputs server-side, enforce authorization on every resource, never expose secrets, never log credentials.
5. **No production claims without evidence** — tests, builds, and deployment verification must support every claim. If you did not run it, you may not say it passed.

---

## 3. Mandatory agent self-verification

Before, during, and after every code modification:

1. Inspect the existing implementation before changing it.
2. Identify dependencies and affected functionality.
3. Never assume existing code is correct or incorrect without inspection.
4. Make the smallest safe change possible.
5. Recheck every modified file.
6. Search for related implementations and duplicated logic.
7. Verify frontend/backend/API/database compatibility.
8. Check for regressions in existing features.
9. Run relevant tests, lint, type checks, and builds.
10. Inspect the final `git diff` before reporting.

### NEVER:

- Claim a test passed without running it.
- Remove existing functionality without explicit authorization.
- Invent APIs, fields, dependencies, or business rules.
- Hide errors with empty catch blocks.
- Disable validation or tests to make builds pass.
- Introduce mock/fake data into production functionality.
- Assume another agent's implementation is correct.
- Approve your own work as production-ready (use the independent audit — see `protocols/MASTER-CONTROL-CHECKER.md`).
- Claim completion when important checks remain unverified.

**If a check cannot be completed, explicitly report `NOT VERIFIED`.**

This protocol applies to every task: small fixes, UI changes, refactoring, API modifications, and new features.

---

## 4. Rule enforcement levels

| Level | Purpose | Enforcement |
|---|---|---|
| **L1 — Mandatory** | Security, correctness, data integrity | Never bypass |
| **L2 — Engineering standards** | Architecture, testing, code quality | Required by default |
| **L3 — Optimization** | Scalability, advanced infrastructure, cost | Based on project needs |

**Core principle:** No implementation without understanding. No completion without testing. No release without evidence.

---

## 5. The working loop (every task)

```
Read project instructions and existing code
        ↓
Understand the requested change
        ↓
Inspect affected files and dependencies
        ↓
Implement the smallest safe change
        ↓
Self-check modified code        ← agent-control/01-AGENT-SELF-CHECK.md
        ↓
Check related existing functionality  ← agent-control/02-REGRESSION-CHECK.md
        ↓
Run relevant tests and validation
        ↓
Any failure or regression?
   ├─ Yes → investigate and fix → loop back
   └─ No  → continue
        ↓
Inspect the final git diff
        ↓
All required checks verified?
   ├─ No  → report blockers / NOT VERIFIED
   └─ Yes → report evidence and completion  ← agent-control/06-FINAL-VERIFICATION.md
```

---

## 6. Protocol map

| File | When to use |
|---|---|
| `protocols/00-CORE-PRINCIPLES.md` | Always — the constitution |
| `protocols/01-ARCHITECTURE.md` | Designing or restructuring anything |
| `protocols/02-BACKEND-STANDARDS.md` | Every backend change |
| `protocols/03-FRONTEND-STANDARDS.md` | Every frontend change |
| `protocols/04-DATABASE-STANDARDS.md` | Every schema/query/migration change |
| `protocols/05-API-CONTRACTS.md` | Every endpoint change |
| `protocols/06-SECURITY-PROTOCOL.md` | Every change + dedicated security reviews |
| `protocols/07-ERROR-HANDLING-LOGGING.md` | Every change |
| `protocols/08-TESTING-QA.md` | Writing or modifying tests |
| `protocols/09-PERFORMANCE.md` | Before and after optimization |
| `protocols/10-DEVOPS-DEPLOYMENT.md` | Every deployment |
| `protocols/11-GIT-WORKFLOW.md` | Every commit and PR |
| `protocols/12-AI-AGENT-RULES.md` | Always — agent-specific rules |
| `protocols/13-PRODUCTION-RELEASE.md` | Every release gate |
| `protocols/MASTER-CONTROL-CHECKER.md` | Independent audit of any agent's work |
| `agent-control/*.md` | After every change, continuously |
| `templates/*.md` | Per-feature / per-PR / per-release |
| `prompts/INDEPENDENT-AI-AUDIT-PROMPT.md` | When spawning the auditor agent |

## 7. Protocol integrity

These standards are **not** to be rewritten or relaxed by AI agents on a per-project basis. Project-specific context belongs in `docs/PROJECT-CONTEXT.md` (use `templates/PROJECT-CONTEXT-TEMPLATE.md`). Changes to this protocol require explicit human approval and a `CHANGELOG.md` entry.
