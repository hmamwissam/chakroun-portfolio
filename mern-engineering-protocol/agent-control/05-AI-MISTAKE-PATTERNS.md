# 05 — AI Mistake Patterns (Detection Database)

A living database of mistakes AI coding agents commonly make, with detection rules. **Consult during every self-check; append newly discovered patterns.**

## Pattern index

### 1. Incomplete implementation
- **Symptom:** feature described as done, but error states, empty states, or authorization missing.
- **Detection:** check the task's acceptance criteria one by one against the diff; verify all four UI states exist.

### 2. Invented APIs and fields
- **Symptom:** code calls `user.getCartItems()` or reads `order.discountTotal` — none of which exist.
- **Detection:** grep for every called method/field against the actual model/schema; run the integration test against a real DB.

### 3. Happy-path-only logic
- **Symptom:** no handling for empty arrays, null, undefined, network failure, or partial failure.
- **Detection:** walk the edge-case matrix (`08-TESTING-QA.md` §5) against the diff.

### 4. Silent failures
- **Symptom:** `catch (e) {}`, `catch { return null }`, `.catch(() => {})`.
- **Detection:** `grep -rn "catch" src/ | grep -E "catch\s*(\([^)]*\))?\s*\{\s*\}"` — every match is a finding.

### 5. Broken integration across the stack
- **Symptom:** frontend expects `data.items`, backend returns `data.results`.
- **Detection:** compare the frontend API call against the actual backend response shape — read both sides, never assume.

### 6. Hidden regressions
- **Symptom:** "refactor" changes shared util/middleware behavior; other features break.
- **Detection:** run the full test suite + grep for all callers of the changed function.

### 7. Fake or hollow tests
- **Symptom:** tests assert mocks of themselves; `expect(res.status).toHaveBeenCalled()` when the real question is data integrity; tests that never run in CI.
- **Detection:** inspect 1–2 tests per file — does the assertion verify business behavior? Execute the suite and watch it fail when you deliberately break the code (mutation spot-check).

### 8. Unnecessary refactoring
- **Symptom:** task was "add a field"; diff renames 12 files and restructures folders.
- **Detection:** review diff scope; any unrelated change must be justified or reverted.

### 9. Hardcoded values and secrets
- **Symptom:** `const API_URL = "http://localhost:5000"`, API keys in source.
- **Detection:** `grep -rniE "(secret|api[_-]?key|token|password)" src/` and `grep -rn "localhost" src/`.

### 10. Mock data in production paths
- **Symptom:** fallback `return sampleProducts` when API fails.
- **Detection:** search for sample/fixture imports outside `*.test.*` files.

### 11. Disabled validation/tests to pass builds
- **Symptom:** `// eslint-disable`, `.skip(`, commented-out assertions, `validate: false`.
- **Detection:** grep the diff for disable/skip patterns — each needs a linked justification.

### 12. Wrong status codes and error contracts
- **Symptom:** 200 for errors, 500 for validation, inconsistent envelopes.
- **Detection:** review every new/changed route against `05-API-CONTRACTS.md`.

### 13. Missing ownership checks (IDOR)
- **Symptom:** `GET /orders/:id` returns the order without verifying `order.userId === req.user.id`.
- **Detection:** audit every route with an `:id` parameter for an ownership/role check.

### 14. N+1 and unbounded queries
- **Symptom:** loops calling `findById`; list endpoints without pagination.
- **Detection:** review every new query; check for `.populate()` chains inside loops; verify `limit` enforcement.

### 15. Over-abstraction
- **Symptom:** a strategy/factory pattern for two cases; 8 new files for one endpoint.
- **Detection:** apply KISS/YAGNI — is there a simpler implementation that meets the requirement?

### 16. Race conditions on finite resources
- **Symptom:** read stock → check → write stock.
- **Detection:** look for read-check-write sequences; replace with conditional atomic updates; add concurrency test.

### 17. Documentation that lies
- **Symptom:** README describes behavior the code doesn't implement.
- **Detection:** verify each documented claim against code (spot-check).

### 18. Incomplete migrations
- **Symptom:** schema changed, no migration script; old documents break the app.
- **Detection:** check schema diffs against `migrations/`; test with legacy-shaped documents.

---

**Maintainers:** append new patterns as they are discovered in real audits, with date and source. AI agents must not remove entries.
