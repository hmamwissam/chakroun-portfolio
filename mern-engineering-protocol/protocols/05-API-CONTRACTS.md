# 05 — API Contracts

Enforcement: L1 for authentication/authorization/error safety; L2 for format consistency.

## 1. URL and method conventions

```
GET    /api/v1/products          # list (paginated)
GET    /api/v1/products/:id      # single
POST   /api/v1/products          # create
PATCH  /api/v1/products/:id      # partial update
DELETE /api/v1/products/:id      # remove
```

- [ ] Nouns for resources; verbs live in the method or sub-resources (`POST /orders/:id/cancel`).
- [ ] Plural resource names; kebab-case for multi-word resources.
- [ ] Versioning via URL prefix (`/api/v1`). Breaking changes → new version, never silent.
- [ ] Nested routes only one level deep; deeper relations via query params or top-level routes.

## 2. Status codes

| Code | Use |
|---|---|
| 200 | Successful read/update |
| 201 | Resource created |
| 204 | Success, no content (careful with client handling) |
| 400 | Validation / malformed input |
| 401 | Not authenticated |
| 403 | Authenticated but not permitted (this resource) |
| 404 | Resource not found — same response whether it doesn't exist or isn't yours (no enumeration) |
| 409 | Conflict (duplicate, state conflict, insufficient stock) |
| 422 | Semantically invalid (optional; pick 400 or 422, be consistent) |
| 429 | Rate limited |
| 500 | Unexpected server error (never leaked details) |

## 3. Standard response envelope

Success:

```json
{
  "success": true,
  "data": { },
  "meta": { "page": 1, "limit": 20, "total": 137, "totalPages": 7 }
}
```

Error:

```json
{
  "success": false,
  "error": {
    "code": "INSUFFICIENT_STOCK",
    "message": "Not enough stock for product X.",
    "details": [ { "field": "items[0].quantity", "issue": "exceeds stock" } ]
  }
}
```

- [ ] One envelope format, used everywhere.
- [ ] Error codes are stable, documented strings — clients branch on them.
- [ ] Validation errors include field-level details.
- [ ] Production responses never contain stack traces, SQL/Mongo internals, or secrets.

## 4. Pagination, filtering, sorting

```json
GET /api/v1/products?page=2&limit=20&sort=-createdAt&category=shoes
```

- [ ] Default page size (e.g., 20); hard maximum (e.g., 100) — server-enforced.
- [ ] Sort fields allow-listed; prefix `-` for descending.
- [ ] Filter fields allow-listed and validated.
- [ ] `meta` block always present on list responses.

## 5. Cross-cutting requirements (L1)

- [ ] Authentication enforced on every non-public route (deny by default).
- [ ] Authorization (ownership/role) checked per resource — see `06-SECURITY-PROTOCOL.md` §2.
- [ ] Rate limiting on all endpoints; stricter limits on auth and sensitive operations.
- [ ] Request body size limits.
- [ ] OpenAPI/Swagger (or maintained API docs) updated with every contract change.
- [ ] Webhooks: signature verification + event deduplication before processing.

## 6. Verification checklist

- [ ] New endpoints follow the envelope, status codes, and pagination rules.
- [ ] Docs updated (OpenAPI / API_DESIGN.md).
- [ ] Integration tests assert the exact contract (status + shape).
- [ ] No breaking change to existing consumers without versioning.
