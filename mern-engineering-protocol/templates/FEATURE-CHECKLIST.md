# Template — Feature Checklist

Copy per feature. A feature is complete only when every box is checked with evidence.

**Feature:** ______________________  **Branch:** ______________________  **Date:** __________

## Requirements
- [ ] Acceptance criteria defined and reviewed
- [ ] Edge cases identified (see `protocols/08-TESTING-QA.md` §5)

## Backend
- [ ] Validation on all inputs (schema-based)
- [ ] Authentication enforced
- [ ] Authorization + ownership check on every resource
- [ ] Business logic in service layer (thin controller)
- [ ] Atomic operations / transactions where multi-document
- [ ] Idempotency for retries (payments, orders, webhooks)
- [ ] Pagination on list endpoints
- [ ] Error handling + structured logging
- [ ] Rate limiting on sensitive endpoints

## Frontend
- [ ] Loading / empty / success / error states
- [ ] Form validation + destructive-action confirmations
- [ ] Responsive + accessible (keyboard, focus, labels)
- [ ] API integration matches contract (verified against backend code)

## Database
- [ ] Schema validation, constraints, indexes
- [ ] Migration script (expand-and-contract) if schema changed
- [ ] `.env.example` updated if new config

## Security
- [ ] `templates/SECURITY-CHECKLIST.md` reviewed for affected areas
- [ ] No secrets in code/diff; no sensitive data logged

## Testing
- [ ] Unit tests (business rules) — pass
- [ ] Integration tests (route + DB + ownership) — pass
- [ ] E2E if business-critical — pass
- [ ] Regression suite — pass
- [ ] Lint + build — pass

## Review
- [ ] `agent-control/06-FINAL-VERIFICATION.md` complete
- [ ] Independent audit (`protocols/MASTER-CONTROL-CHECKER.md`) for significant features
- [ ] Open P0/P1: none (list P2/P3 with disposition)
