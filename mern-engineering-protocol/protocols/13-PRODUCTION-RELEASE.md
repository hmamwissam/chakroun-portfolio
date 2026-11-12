# 13 — Production Release Gate

The final gate before authorizing a production release. Use with `templates/RELEASE-CHECKLIST.md`.

**A checked item means you have evidence** (test output, config inspection, screenshot, command result) — not that you believe it works.

## 1. Production readiness audit (51 items)

### A. Requirements & architecture (6)
1. PRD and scope approved
2. User workflows documented
3. Acceptance criteria defined
4. Architecture and ADRs documented
5. Database and API designs reviewed
6. Non-functional requirements defined

### B. Code quality (7)
7. ESLint and formatting pass
8. No duplicated critical business logic
9. No unnecessary dependencies
10. No hardcoded secrets or configuration
11. Error handling standardized
12. No unresolved critical TODOs
13. Code review approved

### C. Security (8)
14. Authentication tested
15. Authorization and ownership tested (IDOR matrix)
16. Input validation enforced server-side
17. Rate limiting configured
18. CORS and security headers verified
19. File uploads secured
20. Dependency vulnerabilities reviewed
21. Secrets and production access secured

### D. Testing (8)
22. Unit tests pass
23. Integration tests pass
24. Critical E2E journeys pass
25. Edge cases tested
26. Regression tests pass
27. Concurrency tested where necessary
28. Load/performance tests completed
29. No unresolved critical defects

### E. Database & data (7)
30. Indexes reviewed
31. Data integrity verified
32. Atomic operations verified
33. Migrations tested
34. Backups configured
35. **Database restore tested**
36. Retention and deletion policies defined

### F. Production infrastructure (7)
37. Production environment variables verified
38. Domain and HTTPS configured
39. Frontend and backend deployed
40. External integrations verified
41. Health checks configured
42. Rollback procedure tested
43. Smoke tests pass

### G. Operations & monitoring (8)
44. Structured logging enabled
45. Error tracking configured
46. Performance monitoring enabled
47. Critical alerts configured
48. Incident response documented
49. RPO and RTO defined
50. Disaster recovery procedure documented
51. Release documentation updated

## 2. Release decision policy

| Severity | Policy |
|---|---|
| **P0** open | Never release |
| **P1** open | Never release until resolved or formally mitigated (human decision, documented) |
| **P2** open | Release only after documented risk acceptance |
| **P3** open | May be scheduled for later |

## 3. Hard rules

- ❌ Never hide unresolved risks in a report that claims production readiness.
- ❌ Never mark an item checked without evidence.
- ❌ A "successful build" on the hosting provider is not a release approval — smoke tests and monitoring are (see `10-DEVOPS-DEPLOYMENT.md` §5).
- ✅ Any NOT VERIFIED item must be listed explicitly in the release report with an owner and a date.
