# Order Refactor Handoff

## Current Branch

- worktree: `/Users/jerome/Developer/geek/shopby-nextjs-starter/.worktrees/codex-web-domain-mypage`
- branch: `codex/web-domain-mypage-rest`
- latest related PR: [#147](https://github.com/GeekStudio-Team/shopby-nextjs-starter/pull/147)

## What Was Just Finished

- `components/mypage/*` legacy domain components were migrated into `features/mypage/*`
- migrated slices:
  - `addresses`
  - `claims`
  - `coupons`
  - `inquiries`
  - `orders`
  - `previous-orders`
  - `product-inquiries`
  - `review`
  - `wish`
- related page imports and `features/order` consumers were updated
- progress checklist was refreshed:
  - [2026-05-28-web-fsd-lite-remaining-work.md](/Users/jerome/Developer/geek/shopby-nextjs-starter/.worktrees/codex-web-domain-mypage/docs/superpowers/plans/2026-05-28-web-fsd-lite-remaining-work.md)

## Verified State

Production build was rechecked in this worktree:

```bash
cd /Users/jerome/Developer/geek/shopby-nextjs-starter/.worktrees/codex-web-domain-mypage/apps/web
./node_modules/.bin/next build --webpack
```

Result:

- final exit code: `0`
- known non-blocking logs:
  - `SHOP_LIFE_TOP` 404
  - `SHOP_DISCOVERY_TOP` 404
- those event 404 logs are existing remote data issues, not this refactor

## Next Domain

Next target domain is `order`.

Why this is next:

- `features/order/*` already exists and owns page orchestration
- `components/order/*` is still a legacy UI bucket
- `mypage/orders`, `claims`, and order detail consumers are already aligned, so the next cut can focus on the order page stack itself

## Order Scan Result

### Legacy source still in use

- `apps/web/src/components/order/accumulation/*`
- `apps/web/src/components/order/coupon/*`
- `apps/web/src/components/order/order-product-item/*`
- `apps/web/src/components/order/order-products/*`
- `apps/web/src/components/order/orderer-info/*`
- `apps/web/src/components/order/payment-method/*`
- `apps/web/src/components/order/payment-summary/*`
- `apps/web/src/components/order/shipping-address/*`

### Existing feature-side entry points

- `apps/web/src/features/order/components/order-sheet-content/index.tsx`
- `apps/web/src/features/order/components/order-details-content/index.tsx`
- `apps/web/src/features/order/components/order-detail-view/index.tsx`
- `apps/web/src/features/order/components/member-order-content/index.tsx`
- `apps/web/src/features/order/components/guest-order-content/index.tsx`

### Main current consumers of `@/components/order/*`

- `features/order/components/order-sheet-content/index.tsx`
  - imports `Accumulation`
  - imports `Coupon`
  - imports `OrderProducts`
  - imports `OrdererInfo`
  - imports `PaymentMethod`
  - imports `OrderPaymentSummary`
  - imports `ShippingAddress`
- `features/order/components/order-details-content/index.tsx`
  - imports `OrderProductItem`
- `features/order/components/gift-order-product-list/index.tsx`
  - imports `OrderProductItem`
- `components/modal/shipping-address-list/index.tsx`
  - imports `ShippingAddressCreateModal`
- `components/bottom-sheet/shipping-address-list/index.tsx`
  - imports `ShippingAddressCreateModal`

## Order Progress

Completed batch 1:

- `order-product-item`
- `order-products`
- `orderer-info`
- `payment-summary`

Moved to:

- `features/order/components/order-product-item`
- `features/order/components/order-products`
- `features/order/components/orderer-info`
- `features/order/components/payment-summary`

Updated consumers:

- `features/order/components/order-sheet-content/index.tsx`
- `features/order/components/order-details-content/index.tsx`
- `features/order/components/gift-order-product-list/index.tsx`

Batch 1 verification:

```bash
cd /Users/jerome/Developer/geek/shopby-nextjs-starter/.worktrees/codex-web-domain-mypage/apps/web
./node_modules/.bin/next build --webpack
```

Result:

- final exit code: `0`
- known non-blocking logs:
  - `SHOP_LIFE_TOP` 404
  - `SHOP_DISCOVERY_TOP` 404

## Recommended Next Batch

Recommended batch 2:

1. `payment-method`
2. `accumulation`
3. `coupon`

Recommended batch 3:

1. `shipping-address/*`
2. `ShippingAddressCreateModal`
3. related overlay consumers

## Expected Destination Shape

Most likely remaining targets:

- `features/order/components/payment-method`
- `features/order/components/accumulation`
- `features/order/components/coupon`
- `features/order/components/shipping-address`

If some pieces are truly reusable across order detail and order sheet, keep them under `features/order/components/*` first.
Do not force `entities/order` yet unless the component is clearly domain-generic and no longer tied to page workflow.

## Next Commands

Useful first checks for the next turn:

```bash
cd /Users/jerome/Developer/geek/shopby-nextjs-starter/.worktrees/codex-web-domain-mypage
rg -n "@/components/order" apps/web/src | sort
find apps/web/src/components/order -maxdepth 3 -type f | sort
find apps/web/src/features/order -maxdepth 4 -type f | sort
```

Validation after each batch:

```bash
cd /Users/jerome/Developer/geek/shopby-nextjs-starter/.worktrees/codex-web-domain-mypage/apps/web
./node_modules/.bin/next build --webpack
```

## Low-Token Handoff Note

If the next session starts with low token budget, continue with this exact scope:

- stay on branch `codex/web-domain-mypage-rest`
- do not touch `product`, `search`, or `recipe` yet
- start from `components/order` batch 2
- stop after:
  - moving the files
  - fixing imports
  - running `next build --webpack`
  - summarizing results

Suggested one-line resume prompt:

```text
Continue from docs/superpowers/plans/2026-05-30-order-next-turn-handoff.md and start order batch 2 in the current worktree branch.
```
