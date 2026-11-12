# 09 — Performance & Scalability

**Do not optimize based on assumptions. Measure first.**

Enforcement: L3 by default (applied when needed), except: unbounded queries, missing pagination, and N+1 are L2 violations everywhere.

## 1. Performance budgets

Define budgets in PROJECT-CONTEXT.md (examples):

| Metric | Example budget |
|---|---|
| p95 API latency (key endpoints) | ≤ 300 ms |
| Frontend bundle (initial, gzipped) | ≤ 250 KB |
| LCP (key pages, mobile) | ≤ 2.5 s |
| Lighthouse performance | ≥ 80 |

Budgets derive from business requirements, not vanity numbers. Breaches trigger investigation before release.

## 2. Backend optimization checklist

- [ ] Indexes match query patterns (verified with `.explain("executionStats")`).
- [ ] No N+1 query patterns.
- [ ] Connection pooling bounded and sized.
- [ ] Caching where it pays (hot reads, sessions, expensive computations) — with invalidation strategy.
- [ ] Compression enabled for responses.
- [ ] Heavy work moved to background jobs (queues).
- [ ] Request timeouts set; no unbounded operations on the request path.
- [ ] Payloads trimmed (no full documents when a projection suffices).

## 3. Frontend optimization checklist

- [ ] Lighthouse audit + Core Web Vitals tracked.
- [ ] Code splitting / lazy routes; heavy components lazy-loaded.
- [ ] Images: compressed, modern formats, responsive sizes, lazy below fold.
- [ ] Bundle analyzed (no accidental heavy dependencies).
- [ ] Re-render hotspots memoized; no prop-drilling-driven re-renders.
- [ ] Long lists virtualized.
- [ ] Accessibility audit included (performance ≠ quality).

## 4. Infrastructure scaling checklist

- [ ] Horizontal scaling path exists (stateless app instances).
- [ ] Load balancing configured.
- [ ] CDN for static assets.
- [ ] Database scaling plan (read replicas/sharding — only when metrics justify).
- [ ] Queue-based processing for bursty work.
- [ ] Resource limits and autoscaling where supported.

## 5. Process

1. Establish baseline (measure current state).
2. Identify bottleneck with evidence (profiling, slow query logs, traces).
3. Apply the smallest effective optimization.
4. Re-measure and record the delta.
5. Only then move to the next bottleneck.

**Premature optimization is a protocol violation of R2 (no unnecessary complexity).**
