# MERN Engineering Protocol v1.0

A strict, reusable engineering standard for MERN stack projects (MongoDB, Express, React, Node.js). Copy this folder into every new repository (Memorea, Jengo, ENCIANOO, client projects) and give it to every AI coding agent.

**These documents are engineering standards, not suggestions.** Each rule identifies mandatory requirements, prohibited practices, and verification criteria.

---

## Structure

```
mern-engineering-protocol/
│
├── AGENTS.md                          ← Root instruction file for AI agents
├── README.md                          ← This file
│
├── protocols/                         ← The 14 engineering standards
│   ├── 00-CORE-PRINCIPLES.md
│   ├── 01-ARCHITECTURE.md
│   ├── 02-BACKEND-STANDARDS.md
│   ├── 03-FRONTEND-STANDARDS.md
│   ├── 04-DATABASE-STANDARDS.md
│   ├── 05-API-CONTRACTS.md
│   ├── 06-SECURITY-PROTOCOL.md
│   ├── 07-ERROR-HANDLING-LOGGING.md
│   ├── 08-TESTING-QA.md
│   ├── 09-PERFORMANCE.md
│   ├── 10-DEVOPS-DEPLOYMENT.md
│   ├── 11-GIT-WORKFLOW.md
│   ├── 12-AI-AGENT-RULES.md
│   ├── 13-PRODUCTION-RELEASE.md
│   └── MASTER-CONTROL-CHECKER.md      ← Independent senior-engineer audit
│
├── agent-control/                     ← Continuous self-check system for agents
│   ├── 01-AGENT-SELF-CHECK.md
│   ├── 02-REGRESSION-CHECK.md
│   ├── 03-CROSS-AGENT-CHECK.md
│   ├── 04-CODEBASE-CONSISTENCY.md
│   ├── 05-AI-MISTAKE-PATTERNS.md
│   └── 06-FINAL-VERIFICATION.md
│
├── templates/                         ← Per-feature / per-PR / per-release
│   ├── FEATURE-CHECKLIST.md
│   ├── CODE-REVIEW-CHECKLIST.md
│   ├── SECURITY-CHECKLIST.md
│   ├── RELEASE-CHECKLIST.md
│   └── PROJECT-CONTEXT-TEMPLATE.md
│
└── prompts/
    └── INDEPENDENT-AI-AUDIT-PROMPT.md ← Prompt for the independent auditor agent
```

---

## How to use in a new project

1. Copy this folder into the repository root (or keep it as a git submodule if you maintain it centrally).
2. Keep `AGENTS.md` at the repository root — most AI agents read it automatically.
3. Complete `templates/PROJECT-CONTEXT-TEMPLATE.md` and save it as `docs/PROJECT-CONTEXT.md` (stack versions, module list, environment specifics, business rules).
4. Instruct your AI coding agent: **"Follow AGENTS.md and the protocols/ standards. Run the relevant checklists before reporting completion."**
5. Require the relevant checklist before considering each feature complete:
   - Feature done → `templates/FEATURE-CHECKLIST.md`
   - PR opened → `templates/CODE-REVIEW-CHECKLIST.md`
   - Security-sensitive change → `templates/SECURITY-CHECKLIST.md`
   - Release → `templates/RELEASE-CHECKLIST.md`
6. For any significant work: use **two separate agents** — Agent A implements, Agent B audits using `prompts/INDEPENDENT-AI-AUDIT-PROMPT.md`. Never let Agent A approve its own work.

---

## The five strict rules (summary)

1. **No assumptions** — inspect before modifying.
2. **No unnecessary complexity** — simplest maintainable solution.
3. **No incomplete features** — full stack works together.
4. **No security shortcuts** — validate, authorize, protect secrets.
5. **No production claims without evidence** — verified by tests, builds, deployment checks.

---

## Customization policy

- ✅ Customize: `docs/PROJECT-CONTEXT.md`, technology choices, infrastructure specifics.
- ❌ Never customize (without explicit human approval): security rules, verification gates, the self-check system, release criteria.
- Protocol changes require a human decision and a `CHANGELOG.md` entry. AI agents must not silently weaken these standards.
