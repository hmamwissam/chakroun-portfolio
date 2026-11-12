# 06 — Final Verification (Mandatory Before Reporting Completion)

The last gate before you tell the user a task is done. Run **every** applicable block.

## 1. Diff review

- [ ] `git status` and `git diff` inspected — only intended files changed.
- [ ] No secrets, credentials, or `.env` files in the diff.
- [ ] No debug output, commented-out code, or TODOs left.
- [ ] No changes to protocol files or CI configuration without explicit approval.

## 2. Verification evidence (attach to report)

- [ ] `npm run lint` — result recorded.
- [ ] `npm run test` (relevant suites) — result recorded.
- [ ] `npm run build` — result recorded.
- [ ] Application starts cleanly with validated env config.
- [ ] Manual/E2E verification of the changed behavior — recorded.

## 3. System-wide checks

- [ ] `agent-control/01-AGENT-SELF-CHECK.md` — complete.
- [ ] `agent-control/02-REGRESSION-CHECK.md` — complete where triggered.
- [ ] `agent-control/03-CROSS-AGENT-CHECK.md` — complete where triggered.
- [ ] `agent-control/04-CODEBASE-CONSISTENCY.md` — complete.
- [ ] `agent-control/05-AI-MISTAKE-PATTERNS.md` — scanned for applicable patterns.

## 4. Honesty gate

- [ ] Every claim in my report is backed by evidence I actually produced.
- [ ] Every check I could not run is reported as **NOT VERIFIED** with the reason.
- [ ] Known limitations and risks are disclosed, not buried.
- [ ] I have not claimed "production-ready" — that requires `protocols/MASTER-CONTROL-CHECKER.md` (independent audit) and `protocols/13-PRODUCTION-RELEASE.md`.

## 5. Report format

```
SUMMARY: <what changed, why>
EVIDENCE: <commands + outcomes>
CHECKS: <self/regression/cross-agent/consistency — pass | NOT VERIFIED>
RISKS: <anything the reviewer should know>
DIFF: <files changed; migration/env/deployment impact>
```

**If any box is unchecked and unresolvable, the final report must say NOT VERIFIED — completion is not claimed.**
