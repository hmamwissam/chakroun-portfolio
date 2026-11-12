# 03 — Cross-Agent Check

**Purpose:** detect conflicts, duplicate implementations, inconsistent conventions, and mistakes left by previous agents — before they compound.

Run at the **start** of any task in a repo previously touched by other agents, and before merging any branch.

## A. Duplicate implementation detection

Search the codebase for the functionality you're about to build/change:

```bash
# examples — adapt to the repo
grep -ri "order.*create" src/
grep -ri "sendEmail\|sendMail" src/
grep -ri "calculateTotal\|computePrice" src/
```

- [ ] No second implementation of the same function/feature exists elsewhere.
- [ ] If a similar implementation exists, you extended it — you did not create a parallel one.
- [ ] No near-duplicate utilities in `utils/` (date formatters, validators, API helpers).

## B. Convention conflict check

- [ ] Naming matches existing modules (file naming, export style, function style).
- [ ] Import paths use the established pattern (aliases vs relative).
- [ ] Error format, response envelope, and status codes match existing endpoints.
- [ ] State management approach matches the project (don't mix Redux/Zustand/Context).

## C. Prior-agent mistake sweep

Known residues to hunt (extend with findings from `05-AI-MISTAKE-PATTERNS.md`):

- [ ] Empty catch blocks and swallowed errors.
- [ ] Hardcoded values (URLs, secrets, magic numbers) that should be config.
- [ ] Disabled tests, `.skip`/`.only` committed.
- [ ] Mock data left in production code paths.
- [ ] Commented-out code blocks.
- [ ] Unused files/dead code added by previous agents.
- [ ] Incomplete migrations or half-applied schema changes.

## D. Git history intelligence

```bash
git log --oneline -20
git log -p -- <file-you-touch>
```

- [ ] You reviewed recent commits on the files you're modifying — you understand why they look the way they do.
- [ ] You did not revert another agent's intentional fix as "cleanup".

## E. Report

List anything found: file, issue, severity (P0–P3). Do not fix out-of-scope issues silently — report them.
