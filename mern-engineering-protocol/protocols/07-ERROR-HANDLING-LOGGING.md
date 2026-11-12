# 07 — Error Handling & Logging

Enforcement: L1 (no information leakage, no silent failures).

## 1. Centralized error handling

One consistent error-handling mechanism. The error taxonomy:

| Type | HTTP | Client sees | Logged |
|---|---|---|---|
| Validation error | 400 | Field details | Yes (warn) |
| Authentication error | 401 | Generic | Yes (warn) |
| Authorization error | 403/404 | Generic | Yes (warn) |
| Not found | 404 | Generic | Optional |
| Business-rule violation | 409 | Stable error code + safe message | Yes (info/warn) |
| External service failure | 502/503 | Safe generic message | Yes (error) |
| Database error | 500 | Safe generic message | Yes (error) |
| Unexpected error | 500 | Safe generic message | Yes (error + stack) |

Rules:

- [ ] One error middleware; controllers/services `throw` typed errors; no `res.status().json()` error scattering.
- [ ] Custom `AppError` class with stable `code`, HTTP status, and safe `message`.
- [ ] Production clients never receive stack traces, query internals, or secrets.
- [ ] **Silent failures are forbidden.** Every catch either handles, wraps with context, or re-throws. No empty catch blocks (`catch {}` is a protocol violation).
- [ ] Async errors reach the error middleware (wrap async handlers or use Express 5).
- [ ] Expected business failures (insufficient stock, duplicate email) are errors, not exceptions — status 409 with a code.

## 2. Structured logging

Use a structured logger (Pino or equivalent):

```js
logger.info({
  event: "order.created",
  orderId: order._id,
  userId: user.id,
  requestId
});
```

- [ ] Logs answer: what happened, when, which service, which request, what result.
- [ ] `requestId` propagated across the request (and across async jobs where feasible).
- [ ] Log levels used correctly (info/warn/error — no error-logging normal flow).
- [ ] Errors include stack traces and context.

## 3. Never log (L1)

- ❌ Passwords, tokens (JWT/refresh/reset), API keys.
- ❌ Full payment card data.
- ❌ Unnecessary personal data (PII minimization).
- ❌ Entire request bodies on endpoints carrying secrets.

Apply a log redaction list at the logger level (key names like `password`, `token`, `authorization`, `cookie`).

## 4. Frontend error handling

- [ ] API client normalizes errors into the envelope format.
- [ ] Users see actionable messages; technical detail goes to console/Sentry.
- [ ] Global error boundary exists; unhandled rejections tracked.
- [ ] Retry logic only for safe, idempotent operations.

## 5. Verification checklist

- [ ] Error middleware tested for every taxonomy type.
- [ ] A grep for empty catch blocks returns nothing.
- [ ] Production-mode response inspection shows no internals.
- [ ] Redaction verified (trigger an auth error, check logs contain no token).
