# 04 — Codebase Consistency Check

**Purpose:** verify architecture, naming, imports, code organization, and dependencies remain consistent as the project evolves.

Run before merging any branch and after any structural change.

## A. Architecture

- [ ] New code lives in the correct module/feature folder (per `protocols/01-ARCHITECTURE.md`).
- [ ] Respect for layers: no DB access in controllers; no HTTP logic in services.
- [ ] No cross-module imports except through public service interfaces.

## B. Naming & style

- [ ] File names follow the repo convention (e.g., `auth.service.js`, `useOrders.js`).
- [ ] Variables/functions describe intent; no single-letter names outside loops/math.
- [ ] No magic numbers/strings — named constants instead.

## C. Imports & dependencies

- [ ] No unused imports or dead exports.
- [ ] No duplicate packages (e.g., both `moment` and `dayjs`, both `axios` and `fetch` wrappers).
- [ ] New dependencies: justified, actively maintained, license acceptable.
- [ ] Import order/lint rules pass.

## D. Dead code & files

- [ ] No orphaned files (nothing imports them) added by recent changes.
- [ ] No unreachable code paths.
- [ ] `console.log` / debug statements removed.

## E. Coding standards

- [ ] ESLint clean; Prettier-formatted.
- [ ] Functions/components within reasonable size (flag >200-line services, >300-line components for review).
- [ ] DRY without over-abstraction: shared logic extracted, but no speculative generality.

## F. Verification commands (adapt per repo)

```bash
npm run lint
npm run test -- --run
npm run build
npx depcheck            # unused deps
npm audit --omit=dev
```

**Result:** pass/fail per section, with any inconsistencies listed by severity.
