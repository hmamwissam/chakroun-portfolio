# 02 — Regression Check

**Purpose:** detect whether new changes broke existing frontend, backend, APIs, database behavior, or user flows.

Run this whenever changes touch: shared modules, API contracts, DB schemas, auth/authorization, config, or middleware.

## A. Identify the blast radius

1. List every modified file.
2. For each: find its importers/callers (frontend pages using the component, routes using the middleware/service, scripts using the util).
3. Trace into shared code: utils, middleware, API client, error handler, config.

## B. Backend regression checklist

- [ ] Every route in modified modules still returns the standard envelope with correct status codes.
- [ ] Existing consumers of changed services/functions still receive compatible data.
- [ ] Auth/authorization behavior unchanged for untouched routes (middleware order not altered).
- [ ] DB queries still performant (no removed indexes, no new unindexed filters).
- [ ] Background jobs/schedulers still run correctly.

## C. Frontend regression checklist

- [ ] Pages/components that import modified code render correctly.
- [ ] User flows touching modified state/APIs work end-to-end (walk them manually or via E2E).
- [ ] No styling/UI regressions in shared components.
- [ ] Routing and navigation unaffected.

## D. Database regression checklist

- [ ] Old documents remain valid under new schemas (expand-and-contract respected).
- [ ] Existing indexes still serve old query patterns.

## E. Verification

- [ ] Relevant automated tests executed (unit + integration + E2E smoke) — record results.
- [ ] Where automation is absent, the affected flows were manually exercised — list which.
- [ ] Previously fixed bugs re-verified (regression suite green).

**Rule:** If you cannot run the relevant checks, say NOT VERIFIED and name exactly which flows are unverified.
