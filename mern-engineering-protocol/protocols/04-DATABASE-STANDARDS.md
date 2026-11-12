# 04 — Database Standards (MongoDB)

Enforcement: L1 for consistency, integrity, and migration safety.

## 1. Schema design

Every collection must define, in the model or schema validator:

- [ ] Required fields and precise data types.
- [ ] Schema validation rules (Mongoose validation or MongoDB JSON schema).
- [ ] Unique constraints where business rules require uniqueness (emails, slugs, order numbers).
- [ ] Enum/allow-list fields for statuses and roles — no free-text status fields.
- [ ] Document relationships explicitly referenced; ownership fields present (e.g., `ownerId`).
- [ ] Timestamps (`createdAt`, `updatedAt`) on all business collections.
- [ ] Sensitive fields (tokens, hashed passwords) marked and never selected by default.

## 2. Indexes

- [ ] Index every field used in frequent lookups, filters, and sorts.
- [ ] Compound indexes designed for actual query patterns (use `.explain()` to verify).
- [ ] Unique indexes for all uniqueness constraints — not application-level checks.
- [ ] No redundant indexes; review after schema changes.
- [ ] New indexes added through migration scripts, not manually in Atlas.

## 3. Consistency and transactions

- Multi-document writes that must be atomic → **transactions** (define boundaries in the service layer).
- Finite resources (stock, credits, seats) → atomic `findOneAndUpdate` with conditions, never read-check-write.
- Two simultaneous operations must never oversell the same last item — prove it with a concurrency test.
- Define explicit state machines for lifecycle documents (order: `pending → paid → shipped → delivered` / `cancelled`); invalid transitions rejected.

## 4. Migrations — expand and contract (L1)

Never assume a new app version can work with an incompatible schema:

1. **Expand** — add new fields/structures without removing old ones (backward-compatible).
2. Deploy code that works with BOTH versions.
3. **Migrate** existing data.
4. **Verify** data integrity after migration.
5. **Contract** — remove obsolete structures in a LATER release.

Rules:
- Every migration is a versioned script in `backend/migrations/` (or equivalent), runnable and re-runnable safely where possible.
- Rollback plan documented for every migration.
- Never edit an already-applied migration — create a new one.

## 5. Queries and access

- Pagination on every list; never return unbounded result sets.
- Allow-list filter/sort fields; never pass raw client input into queries.
- No N+1 patterns; review `.populate()` depth.
- Data retention and deletion policies defined per collection (especially PII).

## 6. Production readiness (MongoDB Atlas)

- [ ] Production cluster configured (not shared/free tier for production).
- [ ] Network access restricted (IP allow-list / VPC peering).
- [ ] Database users with minimum permissions (least privilege).
- [ ] Connection pooling configured and bounded.
- [ ] Slow queries investigated via profiler.
- [ ] Backup schedule configured; point-in-time recovery where required.
- [ ] **Restore procedure tested.** A backup never restored is an unverified recovery strategy.
- [ ] Retention/deletion policies defined and implemented.

## 7. Verification checklist

- [ ] Uniqueness enforced by database constraints.
- [ ] Concurrency behavior tested for finite resources.
- [ ] Migration applied on a production-like copy and verified.
- [ ] Indexes verified with `.explain("executionStats")` on slow queries.
