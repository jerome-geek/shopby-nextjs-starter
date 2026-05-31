# Overlay Refactor Handoff

## Current Branch

- worktree: `/Users/jerome/Developer/geek/shopby-nextjs-starter/.worktrees/codex-web-domain-mypage`
- branch: `codex/web-domain-mypage-rest`
- latest related PR: [#149](https://github.com/GeekStudio-Team/shopby-nextjs-starter/pull/149)

## What Was Just Finished

- `components/mypage/*` legacy domain components were migrated into `features/mypage/*`
- `components/order/*` legacy domain components were migrated into `features/order/components/*`
- `components/product-option/*` legacy option components were migrated into `features/product/option/*`
- `components/product/*` legacy components were migrated into `features/product/components/*`
- `components/product-list/*` legacy components were migrated into `features/product/list/*`
- `components/search/*` legacy components were migrated into `features/search/components/view/*`
- `components/recipe/*` legacy components were migrated into `features/recipe/components/view/*`
- `components/section/*` legacy components were migrated into `features/section/components/*`
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

Next target is overlay cleanup across `modal`, `bottom-sheet`, and `layer-contents`.

Why this is next:

- the remaining domain buckets `search`, `recipe`, and `section` are now cleared
- the largest structural duplication now lives in overlay presentation roots
- many flows such as address, coupon, share, inquiry, and recipe save are split by shell instead of feature purpose

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

## Next Commands

Useful first checks for the next turn:

```bash
cd /Users/jerome/Developer/geek/shopby-nextjs-starter/.worktrees/codex-web-domain-mypage
find apps/web/src/components/modal -maxdepth 4 -type f | sort
find apps/web/src/components/bottom-sheet -maxdepth 4 -type f | sort
find apps/web/src/components/layer-contents -maxdepth 4 -type f | sort
rg -n "address|coupon|share|recipe|inquiry|withdrawal" apps/web/src/components/{modal,bottom-sheet,layer-contents} | sort
```

Validation after each batch:

```bash
cd /Users/jerome/Developer/geek/shopby-nextjs-starter/.worktrees/codex-web-domain-mypage/apps/web
./node_modules/.bin/next build --webpack
```

## Low-Token Handoff Note

If the next session starts with low token budget, continue with this exact scope:

- stay on branch `codex/web-domain-mypage-rest`
- start with overlay duplication only
- do not start global bucket cleanup yet
- stop after:
  - moving the files
  - fixing imports
  - running `next build --webpack`
  - summarizing results

Suggested one-line resume prompt:

```text
Continue from docs/superpowers/plans/2026-05-30-order-next-turn-handoff.md and start the overlay cleanup in the current worktree branch.
```
