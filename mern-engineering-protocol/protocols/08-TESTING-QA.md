# 08 — Testing & QA

Enforcement: L1 for critical workflows; L2 for everything else.

**The objective is to verify the application behaves correctly across normal, unexpected, malicious, and failure scenarios — not merely that the happy path works.**

## 1. The pyramid

```
        E2E        ← few; critical user journeys (Playwright)
     Integration   ← APIs + DB + services (Vitest/Jest + test DB)
        Unit        ← many; fast; functions, services, validation, permissions
```

Target distribution: many fast unit tests, solid integration coverage of every module, E2E only for business-critical journeys. No critical user workflow may depend solely on manual testing.

## 2. Unit tests — cover

- [ ] Utility functions and business calculations (discounts, totals).
- [ ] Validation rules (invalid email rejected, boundary values).
- [ ] Permission/role rules (unauthorized role rejected).
- [ ] State transitions (order cannot go `delivered → pending`).
- [ ] Stock cannot become negative.
- [ ] React components: rendering states, user interactions.

## 3. Integration tests — cover

- [ ] Every route: auth → validation → service → DB round trip.
- [ ] Ownership enforcement (user A cannot GET user B's order → 403/404).
- [ ] Multi-document transactions (rollback on failure).
- [ ] Concurrent stock deduction (two parallel buys of the last item → exactly one succeeds).
- [ ] Webhook processing (signature, deduplication, state change).

**Use a dedicated test database. Tests are isolated and never touch production/development data.**

## 4. E2E tests (Playwright) — minimum critical journey

```
Register → verify → login → browse → add to cart → checkout →
order confirmation → admin sees order → admin updates status →
customer sees updated status
```

Run on desktop and mobile viewports. Seed deterministically; never depend on external services (mock payment/AI providers).

## 5. Edge-case matrix (apply to every important operation)

- [ ] Empty input / null / missing fields / wrong types.
- [ ] Extremely long input; boundary values.
- [ ] Duplicate requests; concurrent requests.
- [ ] Expired/invalid session; missing permissions.
- [ ] Network interruption mid-request.
- [ ] Database unavailable / slow.
- [ ] Third-party service down / returning garbage / timing out.
- [ ] Partial failure (multi-step operation fails at step N).
- [ ] Retry after failure (idempotency verified).

## 6. Performance testing

Use k6 (or equivalent). Measure — never assume:

- [ ] Average and p95/p99 latency per key endpoint.
- [ ] Throughput (req/s) at expected load.
- [ ] Error rate under load.
- [ ] CPU/memory/DB connection saturation.

Targets derive from PROJECT-CONTEXT non-functional requirements, not arbitrary numbers. Results recorded; regressions beyond budget block release.

## 7. Regression policy

- [ ] Every fixed bug gets an automated test (regression test) before the fix is closed.
- [ ] Full suite runs on every PR (CI); failures block merge.
- [ ] Before release: full suite + smoke suite green.

## 8. Test integrity rules (L1 — fake tests are a protocol violation)

- ❌ Tests that assert nothing meaningful (`expect(true).toBe(true)`).
- ❌ Tests that mock away the very thing under test (mocked DB on an integration test).
- ❌ Tests that only run in isolation because of shared state pollution.
- ❌ Tests written but never run, then claimed as passing.
- ❌ Disabled/skipped tests committed without a linked issue.

**Claiming a test passed without running it is a protocol violation (see `AGENTS.md`).**

## 9. Verification checklist per feature

- [ ] Unit: business rules + validation covered.
- [ ] Integration: route + ownership + DB behavior covered.
- [ ] E2E: added if the flow is business-critical.
- [ ] Edge-case matrix applied.
- [ ] All tests executed locally AND in CI with evidence.
