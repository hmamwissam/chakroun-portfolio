# 02 — Backend Standards

Applies to every backend change. Enforcement: L1 for data integrity and security rows; L2 for the rest.

## 1. Every endpoint must pass this verification

| Verification | Expected behavior | Level |
|---|---|---|
| Input validation | Malformed input rejected with 400 + consistent error format | L1 |
| Authentication | Requester identified on every protected route | L1 |
| Authorization | Resource-level permissions verified (ownership/role) — see IDOR | L1 |
| Business logic | Correct rules applied, edge cases handled | L1 |
| Database operations | Consistency preserved (atomic ops, transactions) | L1 |
| Error handling | Predictable errors, no leaked internals | L1 |
| Logging | Relevant events logged, nothing sensitive | L1 |
| Rate limiting | Abuse prevented on public and sensitive endpoints | L1 |
| Response contract | Matches `05-API-CONTRACTS.md` | L2 |
| Pagination | No endpoint returns unbounded result sets | L2 |

## 2. Idempotency (L1)

An identical retry must never create duplicate business operations. Required for: order creation, payments, webhooks, cancellations, money movement.

Implementation:
- Accept an `Idempotency-Key` header (or equivalent) on mutation endpoints, or
- Enforce natural idempotency via unique constraints (e.g., `orderId` unique per checkout attempt), and
- Store and return the original result for duplicate keys; never process twice.
- Payment webhooks: verify signature + deduplicate on provider event ID before any state change.

## 3. Atomic database operations (L1)

Never read-check-write across requests for finite resources. Example — stock deduction:

```js
const product = await Product.findOneAndUpdate(
  { _id: productId, stock: { $gte: quantity } },
  { $inc: { stock: -quantity } },
  { new: true }
);

if (!product) {
  throw new AppError("INSUFFICIENT_STOCK", 409);
}
```

- Multi-document writes that must succeed or fail together → MongoDB transactions.
- Define transaction boundaries in the service layer, never in controllers.

## 4. Queries

- **No N+1.** Review access patterns, `.populate()` calls, loops issuing queries, and aggregations.
- **Pagination on every list endpoint**: default page size, maximum page size cap, stable sort key, appropriate indexes.
- Filtering/sorting fields must be allow-listed — never pass raw client input into queries (NoSQL injection).

## 5. External service resilience (L1 for payments/AI/email)

For SMTP, Cloudinary, payment gateways, AI APIs, and any third party:

- [ ] Timeouts set on every call.
- [ ] Connection failures handled and logged.
- [ ] Retries only where safe (idempotent operations only).
- [ ] Exponential backoff with jitter; never unlimited retries.
- [ ] Fallback behavior defined (degrade, queue, or explicit failure).
- [ ] No cascading failure — a slow provider must not exhaust the event loop or connection pool.

## 6. Configuration

- Environment variables validated at startup; **missing required config → process refuses to start**.
- `.env.example` kept in sync with every new variable.
- No hardcoded credentials, URLs, or feature flags in source code.

## 7. Process hygiene

- `app.js` must not listen on a port (testability); `server.js` bootstraps.
- Graceful shutdown: close server, drain/close DB connections, finish in-flight jobs.
- No synchronous heavy operations on the request path (image processing, big JSON transforms) — move to background jobs.
- JSON body size limits configured; large payloads rejected.

## 8. Definition of done (backend)

- [ ] All rows of §1 verified with evidence.
- [ ] Service layer unit-tested for business rules.
- [ ] Integration test: route → middleware → service → DB (test database, isolated).
- [ ] `npm run lint` and production build pass.
- [ ] Final diff reviewed (`agent-control/01-AGENT-SELF-CHECK.md`).
