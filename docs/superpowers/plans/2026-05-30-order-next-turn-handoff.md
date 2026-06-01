# Global Bucket Cleanup Handoff

## Current Branch

- worktree: `/Users/jerome/Developer/geek/shopby-nextjs-starter/.worktrees/codex-web-domain-mypage`
- branch: `codex/root-schema-cleanup`
- current base: `origin/dev`

## What Is Already Stable

- shared layer recovery is complete
- legacy domain component roots were already migrated:
  - `components/mypage`
  - `components/order`
  - `components/product`
  - `components/product-list`
  - `components/product-option`
  - `components/search`
  - `components/recipe`
  - `components/section`
- overlay duplication cleanup was completed

## Project Rules That Must Be Preserved

- keep root `api/*`
  - this project treats `api` as the headless integration layer
- keep root `models/*`
  - this project treats `models` as the headless type layer
- keep root query hooks
  - `hooks/query/*`
  - `hooks/suspenseQuery/*`
  - `hooks/infiniteQuery/*`
- keep simple non-business hooks in their current homes
  - do not migrate hooks just because they are hooks
  - only move a hook when it contains real feature-owned orchestration

## Schema Status

Already moved out of root `schema`:

- `claim.schema.ts` -> `entities/claim/schema/claim.ts`
- `order.schema.ts` -> `entities/order/schema/order.ts`
- `payment.schema.ts` -> `entities/order/schema/payment.ts`
- `shippingAddress.schema.ts` -> `entities/order/schema/shippingAddress.ts`
- `laterShippingInput.schema.ts` -> `entities/order/schema/laterShippingInput.ts`
- `product-inquiry.schema.ts` -> `entities/productInquiry/schema/form.ts`
- `inquiry.schema.ts` -> `features/mypage/inquiries/schema.ts`
- `review.schema.ts` -> `features/mypage/review/form/schema.ts`
- `article.schema.ts` -> `features/board/article-write/schema.ts`

Still remaining at root:

- `schema/common.schema.ts`
- `schema/index.ts`

## Verified State

Production build baseline:

```bash
cd /Users/jerome/Developer/geek/shopby-nextjs-starter/.worktrees/codex-web-domain-mypage/apps/web
./node_modules/.bin/next build --webpack
```

Known non-blocking logs:

- `SHOP_LIFE_TOP` 404
- `SHOP_DISCOVERY_TOP` 404
- `SHOP_KIDS_TOP` 404

These are existing remote data issues, not refactor regressions.

## Next Recommended Targets

1. continue `utils`, `helpers`, and `const`
   - product/order/search/recipe/banner 1st cut is done
   - next target is remaining domain-owned files with clear ownership
2. keep trimming root `schema`
   - only `common.schema.ts` and `schema/index.ts` should remain unless new shared cases appear
3. leave headless layers alone
   - do not move `api/*`, `models/*`, or root query hook trees

## Explicitly Not The Next Target

- do not run another large hook migration
- do not move `api/*`
- do not move `models/*`

## Recently Finished In This Branch

- `login`, `profile`, `signup`, `recipe` schemas moved out of root `schema`
- `mypageMenu` context moved into `features/mypage/menu`
- `certificationCheck` context moved into `features/member/certification-check`
- `useRecipeManualStore` moved into `features/recipe/store`
- `useDropdownStore` moved into `shared/ui/vertical-more-menu/model`
- `useGuestCartStore` moved into `features/order/cart/store`
- `useProductOptionStore` moved into `features/product/option/store`
- `product.ts` helper moved into `entities/product/utils/selection`
- `product.ts` constants moved into `entities/product/constants`
- `order.ts` constants moved into `entities/order/constants`
- `search.ts` constants moved into `features/search/constants`
- `recipe.ts` constants moved into `features/recipe/constants`
- `banner.ts` constants and utilities moved into `entities/banner/*`

## Resume Prompt

```text
Continue from docs/superpowers/plans/2026-05-30-order-next-turn-handoff.md and keep api/models/root query hooks in place while cleaning up schema, context, store, utils, helpers, and const by ownership.
```
