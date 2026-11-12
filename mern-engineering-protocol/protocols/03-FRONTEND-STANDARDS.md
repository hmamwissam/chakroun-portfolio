# 03 — Frontend Standards

A professional frontend is more than a visually attractive interface. Enforcement: L2 by default; security rows are L1.

## 1. Architecture rules

- [ ] Reusable components are actually reusable (no hidden coupling to one page).
- [ ] Clear feature boundaries — business logic in features/, UI primitives in components/.
- [ ] UI and business logic separated (hooks/services for logic, components for rendering).
- [ ] Consistent state management — one strategy per project, documented.
- [ ] Centralized API client — no direct `fetch`/`axios` in components.
- [ ] No unnecessary prop drilling; no duplicated business logic.

## 2. Required user experience (every user-facing feature)

- [ ] **Loading state** (skeleton/spinner — never a blank screen).
- [ ] **Empty state** (informative, with a next action where applicable).
- [ ] **Error state** (clear message, recovery action, no raw error dumps to users).
- [ ] **Success feedback** (confirmation of the action taken).
- [ ] Form validation with field-level messages; submit disabled appropriately.
- [ ] Confirmation dialog for destructive actions.
- [ ] Responsive layout (mobile, tablet, desktop).
- [ ] Accessibility: labels, keyboard navigation, focus management, contrast.
- [ ] Optimistic updates only where safe and reconciled on failure.

## 3. Performance rules

- [ ] Route-level code splitting and lazy loading.
- [ ] Image optimization (compressed, responsive sizes, lazy-loaded below the fold).
- [ ] Avoid unnecessary re-renders (correct memoization, stable references).
- [ ] No oversized dependencies — check bundle impact before adding packages.
- [ ] Virtualize long lists.
- [ ] No blocking main-thread work; heavy computation off-loaded.
- [ ] Targets: meet the performance budgets defined in PROJECT-CONTEXT.md (default: Lighthouse performance ≥ 80 on key pages).

## 4. Security rules (L1)

- [ ] **Never trust frontend validation alone** — server re-validates everything.
- [ ] No `dangerouslySetInnerHTML` with unescaped content; prevent XSS.
- [ ] Auth tokens handled securely (memory or httpOnly cookie — never localStorage for sensitive sessions unless justified).
- [ ] No secrets in the bundle — anything in the frontend is public. `REACT_APP_*/VITE_*` variables are visible to everyone.
- [ ] Permissions are enforced on the backend; the frontend hides UI only as UX.

## 5. Anti-patterns

- ❌ Copy-pasted API call logic across components.
- ❌ Giant components (>~300 lines) mixing data, logic, and rendering without justification.
- ❌ `useEffect` chains that are hard to reason about where a derived state or query library fits.
- ❌ Hardcoded URLs, colors, or business rules that belong in config/backend.
- ❌ Swallowing errors silently in event handlers.
- ❌ Committing commented-out code or console.log noise.

## 6. Definition of done (frontend)

- [ ] §2 checklist fully implemented.
- [ ] Component/feature tests pass where applicable.
- [ ] Works against the real API contract (mock server or dev backend), not only mock data.
- [ ] Lint and production build pass.
- [ ] Manual check: mobile viewport + keyboard navigation.
