# 01 — Agent Self-Check (Mandatory After Every Change)

Run this after **every** code modification, however small. It inspects your own implementation, assumptions, errors, and side effects.

## A. Change scope

- [ ] I changed only what the task required (smallest safe change).
- [ ] I did not refactor, rename, or reformat unrelated code.
- [ ] I inspected the existing implementation **before** changing it.
- [ ] I identified all files that depend on what I changed.

## B. Implementation correctness

- [ ] I re-read every file I modified, line by line, after editing.
- [ ] No invented APIs, fields, dependencies, or business rules — everything exists in the codebase or was explicitly requested.
- [ ] Edge cases handled (empty, null, boundary, duplicate, concurrent — see `protocols/08-TESTING-QA.md` §5).
- [ ] No silent failures: every catch handles, wraps with context, or re-throws. No empty catch blocks.
- [ ] Async errors reach the error middleware.

## C. Assumptions audit

List every assumption you made (data shapes, existing behaviors, environment). For each: verified against code/config, or disclosed in the report as an assumption.

## D. Side effects

- [ ] My change doesn't alter behavior of code paths I didn't intend to touch (check callers, importers, shared utilities).
- [ ] Environment/config implications identified (new env var → `.env.example` + startup validation).
- [ ] Database implications identified (schema/index/migration needs).

## E. Verification evidence

- [ ] Relevant tests run — record the command and result.
- [ ] Lint passes. Build passes.
- [ ] Final `git diff` inspected — no stray edits, no secrets, no debug output.

**Output:** brief self-check summary attached to the task report. Any failed item → fix before continuing, or report NOT VERIFIED.
