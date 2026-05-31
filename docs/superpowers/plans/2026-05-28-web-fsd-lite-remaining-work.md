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

Additional domain migration batches already completed:

- [x] `components/hoc/with-member-join-config`
  - moved to `features/member/member-join-config-field`
- [x] `components/mypage/*`
  - fully migrated into `features/mypage/*`
- [x] `components/order/*`
  - fully migrated into `features/order/components/*`
- [x] `components/product/*`
  - moved to `features/product/components/*`
- [x] `components/product-list/*`
  - moved to `features/product/list/*`
- [x] `components/product-option/*`
  - moved to `features/product/option/*`

## What Is Still Left

The largest remaining FSD-lite debt is now in global technical buckets.

### 1. Domain Slice Migration

Recommended order:

1. global technical buckets

Primary legacy roots still in use:

- [x] `apps/web/src/components/mypage`
  - fully migrated into `features/mypage/*`
- [x] `apps/web/src/components/order`
  - fully migrated into `features/order/components/*`
- [x] `apps/web/src/components/product`
  - moved to `features/product/components/*`
- [x] `apps/web/src/components/product-list`
  - moved to `features/product/list/*`
- [x] `apps/web/src/components/product-option`
  - moved to `features/product/option/*`
- [x] `apps/web/src/components/search`
  - moved to `features/search/components/view/*`
- [x] `apps/web/src/components/recipe`
  - moved to `features/recipe/components/view/*`
- [x] `apps/web/src/components/section`
  - moved to `features/section/components/*`

Goal:

- move page-specific orchestration into `features/*`
- move reusable domain models into `entities/*`
- keep only truly generic primitives in `shared/*`

### 2. Overlay Structure Cleanup

These three roots still overlap heavily by behavior:

- [x] `apps/web/src/components/bottom-sheet`
- [x] `apps/web/src/components/layer-contents`
- [ ] `apps/web/src/components/modal`
  - only compatibility barrel cleanup remains if we decide to delete the legacy entrypoint

Completed in the first overlay batch:

- [x] `share`
- [x] `coupon-register`
- [x] `product-coupon`
- [x] `recipe-save`
- [x] `recipe-create-select`
- [x] `recipe-url-input`
- [x] `recipe-image-upload`
- [x] `product-select`
- [x] `period-range-picker`
- [x] `find-id-result`
- [x] `withdrawal`
- [x] `address-search`
- [x] `shipping-address-change`
- [x] `shipping-address-list`
- [x] `product-inquiry-write`
- [x] `review-report`
- [x] `photo-review-list`
- [x] `collection-form`
- [x] `recipe-recommendation`
- [x] `report`
- [x] `password-check`
- [x] `claim-detail`
- [x] `filter`
- [x] `sort`
- [x] `option-select`
- [x] `image-detail`

Still remaining in overlay cleanup:

- [ ] decide whether to keep or delete `components/modal/index.ts` compatibility barrel

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
  - keep root `models` as the headless domain type layer
- [ ] `apps/web/src/api`
  - keep root `api` as the headless integration layer
- [ ] `apps/web/src/utils`
- [ ] `apps/web/src/context`
- [ ] `apps/web/src/store`
- [~] `apps/web/src/schema`
  - `order`, `payment`, `shippingAddress`, `laterShippingInput` moved into `entities/order/schema`
  - `claim` moved into `entities/claim/schema`
- [ ] `apps/web/src/const`
- [ ] `apps/web/src/helpers`

Goal:

- keep root `api` as the headless integration boundary
- keep root `models` as the headless type boundary
- move schemas, hooks, and UI logic by slice ownership
- keep only cross-domain utilities in `shared`

## Recommended Next Execution Plan

### Phase A

- Keep `api` and `models` at the root by project convention
- Continue schema migration by ownership where it helps feature boundaries
- Start reducing root-level `hooks` by moving domain-owned query hooks into `entities/*` or `features/*`

### Phase B

- Break down `utils`, `const`, `helpers`, `context`, and `store`
- Revisit whether `components/modal/index.ts` compatibility barrel should be removed

## Validation Notes

- This checklist was revalidated against the latest `dev` plus the current refactor branch.
- `components/ui`, `components/icons`, `components/common`, and `components/layout` are no longer present.
- `components/hoc`, `components/mypage`, and `components/order` are no longer present.
- `components/product`, `components/product-list`, and `components/product-option` are no longer present.
- `components/search`, `components/recipe`, and `components/section` are no longer present.
- Remaining work should focus on global buckets.
- root `api` and `models` are intentionally retained as headless integration and type layers.
- order-related root schemas were already migrated into `entities/order/schema`.
- `claim.schema.ts` was already migrated into `entities/claim/schema`.

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
