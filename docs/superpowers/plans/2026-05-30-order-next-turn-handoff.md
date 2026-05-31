# Global Bucket Cleanup Handoff

## Current Branch

- worktree: `/Users/jerome/Developer/geek/shopby-nextjs-starter/.worktrees/codex-web-domain-mypage`
- branch: `codex/web-search-recipe-section`
- latest related PR: [#152](https://github.com/GeekStudio-Team/shopby-nextjs-starter/pull/152)

## What Was Just Finished

- `components/mypage/*` legacy domain components were migrated into `features/mypage/*`
- `components/order/*` legacy domain components were migrated into `features/order/components/*`
- `components/product-option/*` legacy option components were migrated into `features/product/option/*`
- `components/product/*` legacy components were migrated into `features/product/components/*`
- `components/product-list/*` legacy components were migrated into `features/product/list/*`
- `components/search/*` legacy components were migrated into `features/search/components/view/*`
- `components/recipe/*` legacy components were migrated into `features/recipe/components/view/*`
- `components/section/*` legacy components were migrated into `features/section/components/*`
- overlay refactor was completed and legacy `bottom-sheet` / `layer-contents` implementations were cleared
- `schema/order.schema.ts`, `payment.schema.ts`, `shippingAddress.schema.ts`, `laterShippingInput.schema.ts`
  - moved into `entities/order/schema/*`
- `schema/claim.schema.ts`
  - moved into `entities/claim/schema/claim.ts`
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
  - `SHOP_KIDS_TOP` 404
- those event 404 logs are existing remote data issues, not this refactor

## Next Target

Next target is continuing the global bucket cleanup.

Why this is next:

- the remaining domain buckets `search`, `recipe`, and `section` are already cleared
- overlay implementations are now feature-owned or shared-owned
- root `api` and `models` stay in place as headless integration and type layers
- the new highest-payoff work is reducing root `hooks`, plus the remaining `schema/utils/store/context/...` buckets

## Cleared Domain Status

The following legacy roots are complete and removed:

- `apps/web/src/components/mypage`
- `apps/web/src/components/order`
- `apps/web/src/components/product`
- `apps/web/src/components/product-list`
- `apps/web/src/components/product-option`
- `apps/web/src/components/search`
- `apps/web/src/components/recipe`
- `apps/web/src/components/section`

The following overlay flows are no longer sourced from legacy `components/modal`, `components/bottom-sheet`, or `components/layer-contents` implementations:

- `share`
- `coupon-register`
- `product-coupon`
- `recipe-save`
- `recipe-create-select`
- `recipe-url-input`
- `recipe-image-upload`
- `product-select`
- `period-range-picker`
- `find-id-result`
- `withdrawal`
- `address-search`
- `shipping-address-change`
- `shipping-address-list`
- `product-inquiry-write`
- `review-report`
- `photo-review-list`
- `collection-form`
- `recipe-recommendation`
- `report`
- `password-check`
- `claim-detail`
- `filter`
- `sort`
- `option-select`
- `image-detail`

## Next Commands

Useful first checks for the next turn:

```bash
cd /Users/jerome/Developer/geek/shopby-nextjs-starter/.worktrees/codex-web-domain-mypage
find apps/web/src/hooks -maxdepth 3 -type f | sort | head -n 200
find apps/web/src/models -maxdepth 3 -type f | sort
find apps/web/src/api -maxdepth 3 -type f | sort
find apps/web/src/schema -maxdepth 2 -type f | sort
rg -n "@/schema|@/hooks|@/context|@/store|@/utils" apps/web/src | head -n 200
```

Validation after each batch:

```bash
cd /Users/jerome/Developer/geek/shopby-nextjs-starter/.worktrees/codex-web-domain-mypage/apps/web
./node_modules/.bin/next build --webpack
```

## Low-Token Handoff Note

If the next session starts with low token budget, continue with this exact scope:

- stay on branch `codex/web-search-recipe-section`
- keep root `api` and `models` as-is
- continue with schemas, hooks, stores, contexts, and utilities
- stop after:
  - moving the files
  - fixing imports
  - running `next build --webpack`
  - summarizing results

Suggested one-line resume prompt:

```text
Continue from docs/superpowers/plans/2026-05-30-order-next-turn-handoff.md and keep migrating schemas/hooks/stores/utilities while preserving root api and models.
```
