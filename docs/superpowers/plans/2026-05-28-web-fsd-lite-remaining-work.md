# Web FSD-lite Remaining Work

## Scope

- Target app: `apps/web`
- Excluded: `apps/admin`
- Initial migration branch: `codex/web-fsd-shared`
- Current checklist should be validated against the latest `dev`

## Current Status

The shared-layer recovery is largely complete and build-safe.

Completed and verified with `next build --webpack`:

- [x] `components/icons` -> `shared/ui/icons`
- [x] `components/common` -> `shared/components/common`
- [x] `components/layout` -> `shared/components/layout`
- [x] `components/ui/*` -> `shared/ui/*`
  - includes `button`, `input`, `form`
  - includes `accordion`, `paging`, `paging-v2`, `paging-v3`
  - includes `dialog/confirm`, `dialog/product-inquiry`, `dialog/term`
  - includes `file-upload`, `image`, `skeleton`, `tooltip`, `scroll-to-top`, `vertical-more-menu`, `quantity-controller`, `view-all-link`, `toast`
- [x] empty legacy roots removed
  - `apps/web/src/components/ui`
  - `apps/web/src/components/icons`
  - `apps/web/src/components/common`
  - `apps/web/src/components/layout`

Additional baseline fixes already included:

- [x] `apps/web/src/api/core/request.ts`
  - `NEXT_PUBLIC_SHOPBY_BASE_URL` access normalized through `env`
- [x] Route param guards added for build-safe rendering:
  - `pages/guest/order/[orderNo]/index.tsx`
  - `pages/mypage/orders/[orderNo]/index.tsx`
  - `pages/mypage/previous-orders/[orderNo]/index.tsx`
- [x] Regression test added:
  - `apps/web/src/tests/pages/guest-order-page.test.tsx`

Additional `mypage` migration batches already completed:

- [x] `components/hoc/with-member-join-config`
  - moved to `features/member/member-join-config-field`
- [x] `components/mypage/common/*`
  - moved to `features/mypage/common/*`
- [x] `components/mypage/filters/*`
  - moved to `features/mypage/filters/*`
- [x] `components/mypage/side-navigation/*`
  - moved to `features/mypage/side-navigation/*`
- [x] `components/mypage/edit/*`
  - moved to `features/mypage/edit/*`
- [x] legacy shared-like mypage imports removed
  - no remaining imports from `@/components/hoc/with-member-join-config`
  - no remaining imports from `@/components/mypage/common/*`
  - no remaining imports from `@/components/mypage/filters/*`
  - no remaining imports from `@/components/mypage/side-navigation/*`
  - no remaining imports from `@/components/mypage/edit/*`
- [x] `components/mypage/addresses/*`
  - moved to `features/mypage/addresses/*`
- [x] `components/mypage/inquiries/*`
  - moved to `features/mypage/inquiries/*`
- [x] `components/mypage/product-inquiries/*`
  - moved to `features/mypage/product-inquiries/*`
- [x] `components/mypage/review/*`
  - moved to `features/mypage/review/*`
- [x] `components/mypage/wish/*`
  - moved to `features/mypage/wish/*`
- [x] `components/mypage/coupons/*`
  - moved to `features/mypage/coupons/*`
- [x] `components/mypage/orders/*`
  - moved to `features/mypage/orders/*`
- [x] `components/mypage/previous-orders/*`
  - moved to `features/mypage/previous-orders/*`
- [x] `components/mypage/claims/*`
  - moved to `features/mypage/claims/*`
- [x] empty legacy root removed
  - `apps/web/src/components/mypage`

## What Is Still Left

The largest remaining FSD-lite debt is no longer in `shared`, but in legacy domain buckets and global technical buckets.

### 1. Domain Slice Migration

Recommended order:

1. `order`
2. `product`
3. `search`
4. `recipe`

Primary legacy roots still in use:

- [x] `apps/web/src/components/mypage`
  - fully migrated into `features/mypage/*`
- [ ] `apps/web/src/components/order`
- [ ] `apps/web/src/components/product`
- [ ] `apps/web/src/components/search`
- [ ] `apps/web/src/components/recipe`
- [ ] `apps/web/src/components/section`
- [ ] `apps/web/src/components/product-list`
- [ ] `apps/web/src/components/product-option`

Goal:

- move page-specific orchestration into `features/*`
- move reusable domain models into `entities/*`
- keep only truly generic primitives in `shared/*`

### 2. Overlay Structure Cleanup

These three roots still overlap heavily by behavior:

- [ ] `apps/web/src/components/modal`
- [ ] `apps/web/src/components/bottom-sheet`
- [ ] `apps/web/src/components/layer-contents`

Examples of duplicated or near-duplicated flows:

- address search
- coupon register
- product coupon
- product inquiry write
- recipe recommendation
- recipe save
- shipping address change
- share
- withdrawal

Goal:

- split "feature purpose" from "presentation shell"
- feature logic should live in `features/*`
- generic shells should live under `shared/ui` or `shared/components/layout`

### 3. Global Technical Buckets

Still not aligned with FSD-lite:

- [ ] `apps/web/src/hooks`
- [ ] `apps/web/src/models`
- [ ] `apps/web/src/api`
- [ ] `apps/web/src/utils`
- [ ] `apps/web/src/context`
- [ ] `apps/web/src/store`
- [ ] `apps/web/src/schema`
- [ ] `apps/web/src/const`
- [ ] `apps/web/src/helpers`

Goal:

- domain-owned code moves into each slice
- only cross-domain utilities remain in `shared`

### 4. Remaining Shared-Layer Cleanup

Most shared-layer recovery is complete.

- [x] `apps/web/src/components/hoc`
  - absorbed into domain-oriented feature structure via `features/member/member-join-config-field`
- [x] `mypage` domain slice migration
  - `components/mypage/*` is fully migrated into `features/mypage/*`

## Recommended Next Execution Plan

### Phase A

- Move `order` vertical slice
- Reconcile `components/order/*` with existing `features/order/*`
- Verify with `next build --webpack`

### Phase B

- Move `product` vertical slice
- Reconcile `components/product/*`, `product-list/*`, `product-option/*`
- Verify with `next build --webpack`

### Phase C

- Tackle `search`, `recipe`, and `section` domain buckets
- Verify each batch with `next build --webpack`

### Phase D

- Tackle overlay deduplication across `modal`, `bottom-sheet`, `layer-contents`
- Use one interaction family at a time

### Phase E

- Break down global buckets: `hooks`, `models`, `api`, `utils`, `schema`, `store`, `context`

## Validation Notes

- This checklist was revalidated against a `dev` workspace where the shared migration is already present.
- `components/ui`, `components/icons`, `components/common`, and `components/layout` are no longer present.
- `components/hoc` is also no longer present.
- `components/mypage` is no longer present.
- Remaining work should focus on `order`, `product`, `search`, `recipe`, overlay cleanup, and global buckets.

## Verification Standard

Every migration batch should finish with:

```bash
pnpm --filter web exec tsc --noEmit
pnpm --filter web exec eslint src
./node_modules/.bin/next build --webpack
```

In practice, the reliable gate used during this branch was:

```bash
./node_modules/.bin/next build --webpack
```

because repository-wide `tsc` and `eslint` had pre-existing noise outside the migration scope.
