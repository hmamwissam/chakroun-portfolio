# 01 — Architecture Standards

## 1. Default architecture: modular monolith

For most small and medium MERN platforms:

- ✅ Start with a **modular monolith**.
- ✅ Separate business logic from HTTP controllers.
- ✅ Use service and repository boundaries where beneficial.
- ✅ Separate infrastructure concerns (DB, cache, external APIs, queues).
- ✅ Keep modules independently understandable.
- ❌ No microservices without a documented operational or organizational need (requires an ADR and human approval).

You must be able to explain why each component exists and what problem it solves.

## 2. Backend structure (required baseline)

```
backend/
├── src/
│   ├── config/              # env validation, app config (fail fast on missing config)
│   ├── modules/
│   │   ├── auth/
│   │   │   ├── auth.controller.js
│   │   │   ├── auth.service.js
│   │   │   ├── auth.routes.js
│   │   │   ├── auth.validation.js
│   │   │   ├── auth.model.js       (or in a shared models dir — pick one convention)
│   │   │   └── auth.test.js
│   │   ├── users/
│   │   ├── products/
│   │   └── orders/
│   ├── middleware/          # auth, authorization, validation, error handler, rate limit
│   ├── infrastructure/      # db connection, external services, queues, storage
│   ├── utils/
│   ├── jobs/                # background jobs, schedulers
│   ├── app.js               # express app wiring (no listening)
│   └── server.js            # process bootstrap (listen, graceful shutdown)
├── tests/
├── package.json
└── .env.example
```

### Module rules
- A module owns its controller, service, routes, validation, and tests.
- Modules communicate through services — never import another module's controller.
- Cross-module data access goes through the owning module's service or a repository.
- Shared code lives in `utils/` or `infrastructure/`, never copy-pasted between modules.

### Required request flow

```
HTTP Request
    ↓
Router
    ↓
Authentication Middleware   (who are you?)
    ↓
Authorization Middleware    (may you access THIS resource?)
    ↓
Validation Middleware       (is the input well-formed?)
    ↓
Controller                  (HTTP in/out only — thin)
    ↓
Service                     (business rules)
    ↓
Repository / Model          (data access)
    ↓
Database
```

❌ Forbidden: database operations, business rules, and HTTP response shaping inside one giant controller.

## 3. Frontend structure (required baseline)

```
frontend/
├── src/
│   ├── app/ or main entry
│   ├── components/          # reusable, UI-only components
│   ├── features/            # feature-scoped folders (auth/, cart/, orders/…)
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── api.js           # feature API calls only
│   │   └── state/           # feature state
│   ├── hooks/               # shared hooks
│   ├── lib/                 # api client, config, utils
│   ├── store/               # global state
│   └── routes/
```

### Frontend rules
- Feature business logic lives in the feature folder, not scattered across pages.
- All API communication goes through a centralized client (`lib/api`) — no `fetch`/`axios` calls inside components.
- No duplicated business logic between components; shared rules go to `lib/` or hooks.
- State management must be consistent: one strategy per project (documented in PROJECT-CONTEXT.md).

## 4. Architecture Decision Records (ADRs)

Every significant technical decision must be documented:

```
docs/adr/
├── 001-modular-monolith.md
├── 002-mongodb-database.md
├── 003-jwt-authentication.md
└── 004-cloudinary-storage.md
```

Each ADR records: **Context → Options considered → Decision → Consequences.** Required for: database choice, auth strategy, deployment model, any new external service, any deviation from this protocol.

## 5. Anti-patterns (L1/L2 violations)

- ❌ Business logic duplicated in frontend and backend instead of server-authoritative rules.
- ❌ Circular dependencies between modules.
- ❌ A `utils.js` file that becomes a dumping ground of unrelated logic.
- ❌ Controllers/services longer than ~150–200 lines without a written justification.
- ❌ Introducing TypeScript, Redis, queues, or microservices "for professionalism" without a documented need.
- ❌ Shared mutable global state.

## 6. Verification checklist (run before merging architectural changes)

- [ ] Can I explain why each component exists?
- [ ] Does the change respect module boundaries?
- [ ] Did I add an ADR if the decision is significant?
- [ ] Is there a simpler implementation? (KISS)
- [ ] Did I avoid premature abstraction? (YAGNI)
