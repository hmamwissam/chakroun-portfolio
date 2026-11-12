# Template — Code Review Checklist

For reviewers (human or agent) on every PR.

**PR:** ______________________  **Reviewer:** ______________________  **Date:** __________

| Category | Questions | ✓ |
|---|---|---|
| Requirements | Implements the requested behavior? Nothing silently dropped or added? | ☐ |
| Architecture | Respects module boundaries and request flow? No unjustified complexity? | ☐ |
| Correctness | Business rules correct? Edge cases handled? | ☐ |
| Security | Auth + ownership on every route? Input validated? No secrets/data exposure? | ☐ |
| Database | Queries safe (indexes, no N+1)? Atomic ops/transactions? Migration safe? | ☐ |
| Performance | No unbounded queries? No heavy sync work? Bundle impact acceptable? | ☐ |
| Error handling | Centralized? No empty catches? No internals leaked? | ☐ |
| Testing | Meaningful tests included and executed? Not hollow? Regression covered? | ☐ |
| Maintainability | Understandable? Named well? No duplication? Sized reasonably? | ☐ |
| Compatibility | Could it break existing features, APIs, or data shapes? | ☐ |
| Docs | README/API docs/CHANGELOG updated where behavior changed? | ☐ |

**Verdict:** ☐ Approve  ☐ Approve with comments  ☐ Request changes

**Findings (severity P0–P3):**
1.
