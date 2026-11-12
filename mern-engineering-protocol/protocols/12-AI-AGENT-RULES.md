# 12 — AI Agent Rules

Additional rules that apply specifically to AI coding agents, extending `AGENTS.md`.

## 1. The continuous verification loop (every task, no exceptions)

```
Read project instructions and existing code
        ↓
Understand the requested change
        ↓
Inspect affected files and dependencies
        ↓
Implement the smallest safe change
        ↓
Self-check modified code                    → agent-control/01-AGENT-SELF-CHECK.md
        ↓
Check related existing functionality        → agent-control/02-REGRESSION-CHECK.md
        ↓
Check for prior-agent conflicts/dupes       → agent-control/03-CROSS-AGENT-CHECK.md
        ↓
Check codebase consistency                  → agent-control/04-CODEBASE-CONSISTENCY.md
        ↓
Run relevant tests and validation
        ↓
Failure or regression? ── Yes ──► investigate & fix, then loop back
        ↓ No
Inspect the final git diff
        ↓
All checks verified? ── No ──► report blockers / NOT VERIFIED
        ↓ Yes
Final verification                          → agent-control/06-FINAL-VERIFICATION.md
        ↓
Report evidence and completion
```

**These checks protect the entire existing project — not just the code you just wrote.**

## 2. When each agent-control file runs

| File | Trigger |
|---|---|
| `01-AGENT-SELF-CHECK.md` | **Mandatory after every change**, however small |
| `02-REGRESSION-CHECK.md` | After any change touching shared modules, APIs, DB schemas, auth, or config |
| `03-CROSS-AGENT-CHECK.md` | At the start of any task in a repo previously touched by other agents |
| `04-CODEBASE-CONSISTENCY.md` | Before merging any branch; after any structural change |
| `05-AI-MISTAKE-PATTERNS.md` | Consulted during every self-check (the mistake database) |
| `06-FINAL-VERIFICATION.md` | **Mandatory before reporting completion** |

## 3. The two-agent rule

For any significant implementation:

- **Agent A** implements the feature.
- **Agent B** independently audits Agent A's work using `protocols/MASTER-CONTROL-CHECKER.md` and `prompts/INDEPENDENT-AI-AUDIT-PROMPT.md`.

**Never allow Agent A to approve its own work as production-ready.** Agent B must be a separate context/conversation without Agent A's assumptions.

## 4. Honesty requirements

- If a check cannot be completed → report **NOT VERIFIED** explicitly.
- If you broke something → say so, with the evidence.
- If requirements are ambiguous → ask, or state your assumption explicitly in the report.
- Never downgrade, delete, or weaken a failing test to make the suite pass. (L1)
- Never weaken these protocol files to make your work easier. Protocol changes require explicit human approval. (L1)

## 5. Reporting format for every task completion

```
SUMMARY: what changed and why
EVIDENCE: commands run + results (tests, lint, build)
CHECKS:   self-check / regression / consistency — pass or NOT VERIFIED
RISKS:    anything the reviewer/auditor should know
DIFF:     files changed, migration impact, deployment impact
```
