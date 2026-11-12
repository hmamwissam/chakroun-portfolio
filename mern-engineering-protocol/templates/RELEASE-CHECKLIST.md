# Template — Release Checklist

Full gate per release. **Every checked item requires evidence.** See `protocols/13-PRODUCTION-RELEASE.md` for the complete 51-item audit.

**Release:** ______________________  **Date:** __________

### 1. Requirements & architecture (6)
- [ ] PRD and scope approved
- [ ] User workflows documented
- [ ] Acceptance criteria defined
- [ ] Architecture and ADRs documented
- [ ] Database and API designs reviewed
- [ ] Non-functional requirements defined

### 2. Code quality (7)
- [ ] ESLint and formatting pass
- [ ] No duplicated critical business logic
- [ ] No unnecessary dependencies
- [ ] No hardcoded secrets or configuration
- [ ] Error handling standardized
- [ ] No unresolved critical TODOs
- [ ] Code review approved

### 3. Security (8)
- [ ] Authentication tested
- [ ] Authorization and ownership tested (IDOR matrix)
- [ ] Input validation enforced server-side
- [ ] Rate limiting configured
- [ ] CORS and security headers verified
- [ ] File uploads secured
- [ ] Dependency vulnerabilities reviewed
- [ ] Secrets and production access secured

### 4. Testing (8)
- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] Critical E2E journeys pass
- [ ] Edge cases tested
- [ ] Regression tests pass
- [ ] Concurrency tested where necessary
- [ ] Load and performance tests completed
- [ ] No unresolved critical defects

### 5. Database & data (7)
- [ ] Indexes reviewed
- [ ] Data integrity verified
- [ ] Atomic operations verified
- [ ] Migrations tested
- [ ] Backups configured
- [ ] Database restore tested
- [ ] Retention and deletion policies defined

### 6. Production infrastructure (7)
- [ ] Production environment variables verified
- [ ] Domain and HTTPS configured
- [ ] Frontend and backend deployed
- [ ] External integrations verified
- [ ] Health checks configured
- [ ] Rollback procedure tested
- [ ] Smoke tests pass

### 7. Operations & monitoring (8)
- [ ] Structured logging enabled
- [ ] Error tracking configured
- [ ] Performance monitoring enabled
- [ ] Critical alerts configured
- [ ] Incident response documented
- [ ] RPO and RTO defined
- [ ] Disaster recovery procedure documented
- [ ] Release documentation updated

---

**Release decision:** ☐ GO ☐ NO-GO
**Open P0/P1:** (must be empty) **Open P2 (risk-accepted):** __________
**Rollback owner:** __________  **Smoke test owner:** __________
