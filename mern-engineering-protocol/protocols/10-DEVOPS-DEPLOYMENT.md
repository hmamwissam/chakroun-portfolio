# 10 — DevOps & Deployment

Enforcement: L1 for rollback capability, secrets, and database backups; L2 for the rest.

## 1. Infrastructure verification (before any release)

| Component | Required verification |
|---|---|
| Hosting | Correct production environment, correct runtime versions |
| Domain | DNS records correct and propagated |
| SSL | Valid certificate, HTTPS enforced, HSTS |
| Frontend | Production build deployed (never dev server in prod) |
| Backend | Correct runtime, env vars, process manager/restart policy |
| Database | Production cluster, access restricted, least-privilege users |
| Storage | Secure file/object storage, private by default |
| Email | SMTP/provider configured and verified |
| CDN | Assets delivered efficiently, cache rules correct |
| Secrets | Valid production credentials in a manager — never in git |
| Firewall | Only required ports exposed |

## 2. Deployment sequence

```
1.  Freeze the release scope
2.  Verify CI pipeline is green
3.  Review environment variables against .env.example
4.  Verify database backups are current
5.  Apply backward-compatible migrations (expand phase)
6.  Deploy backend
7.  Verify health endpoints (/health/live, /health/ready)
8.  Deploy frontend
9.  Run smoke tests (see §5)
10. Check logs and monitoring dashboards
11. Confirm critical business workflows
12. Announce release
```

## 3. Rollback strategy (must exist BEFORE deploying)

Answer in writing before every release:

- [ ] How do we revert the application? (previous image/build kept available)
- [ ] Can the previous version still access the database? (expand-and-contract makes this yes)
- [ ] Can migrations be reversed safely?
- [ ] What happens to transactions processed during the release?
- [ ] How do we recover corrupted data?

**A code rollback does not automatically reverse database changes or external transactions.** Payment/AI/email side effects are irreversible — design accordingly (idempotency, outbox patterns).

## 4. Health checks

```
GET /health/live    → is the process functioning? (must not fail on temporary external issues)
GET /health/ready   → can it serve traffic (DB, required deps reachable)?
```

Liveness must not depend on a flaky external service (or Kubernetes will restart-loop the app).

## 5. Smoke tests (immediately after every deployment)

- [ ] Homepage loads.
- [ ] Authentication works (login/logout).
- [ ] API responds (health + one real endpoint).
- [ ] Database connectivity works.
- [ ] Critical data loads (products, orders…).
- [ ] File upload works.
- [ ] Email delivery works (test send).
- [ ] Admin dashboard loads and functions.
- [ ] Critical business workflow end-to-end.
- [ ] No critical errors in monitoring/Sentry since deploy.

**A successful hosting-provider build is NOT a successful deployment. Smoke tests are the gate.**

## 6. Monitoring & alerting (production operation)

Four golden signals + business metrics:

| Area | Metrics |
|---|---|
| Traffic | Requests, throughput, active users |
| Errors | 4xx/5xx, exceptions, failed jobs |
| Latency | avg, p95, p99 |
| Saturation | CPU, RAM, DB connections, disk |

Business metrics: successful orders, failed checkouts, payment failures, registration failures, email delivery failures, upload failures.

- [ ] Sentry (or equivalent) on frontend + backend; releases tagged; source maps secured.
- [ ] Alerts on critical issues (error-rate spikes, downtime, disk/DB saturation).
- [ ] Structured logging queryable (see `07-ERROR-HANDLING-LOGGING.md`).

## 7. Disaster recovery

- [ ] RPO (max acceptable data loss) and RTO (max acceptable downtime) defined in writing.
- [ ] Backup frequency meets RPO; retention defined; backups encrypted.
- [ ] Restore tested on a schedule (a backup never restored is an unverified recovery strategy).
- [ ] Recovery runbook exists (who does what, in what order).
- [ ] Incident process: detect → assess → contain → restore → verify data integrity → communicate → postmortem → preventive measures. Postmortems are blameless.

## 8. CI/CD quality gates (every PR)

```
1. Dependency installation (npm ci)
2. Formatting check (Prettier)
3. ESLint
4. Type check (if TypeScript)
5. Unit tests
6. Integration tests
7. Production build
8. Dependency security audit (npm audit / Snyk)
9. Coverage threshold
10. E2E tests for critical workflows
```

A failed mandatory gate blocks merge. Pin third-party CI actions to reviewed commit SHAs.
