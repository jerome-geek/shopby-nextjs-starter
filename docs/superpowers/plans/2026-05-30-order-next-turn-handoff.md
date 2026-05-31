# Search Refactor Handoff

## Current Branch

- worktree: `/Users/jerome/Developer/geek/shopby-nextjs-starter/.worktrees/codex-web-domain-mypage`
- branch: `codex/web-domain-mypage-rest`
- latest related PR: [#148](https://github.com/GeekStudio-Team/shopby-nextjs-starter/pull/148)

## What Was Just Finished

- `components/mypage/*` legacy domain components were migrated into `features/mypage/*`
- `components/order/*` legacy domain components were migrated into `features/order/components/*`
- `components/product-option/*` legacy option components were migrated into `features/product/option/*`
- `components/product/*` legacy components were migrated into `features/product/components/*`
- `components/product-list/*` legacy components were migrated into `features/product/list/*`
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

Next target domain is `search`.

Why this is next:

- `product` legacy roots are now cleared
- the next large legacy UI bucket is `components/search`
- search already depends on the newly migrated `features/product/list/*`, so it is the next natural cleanup target

## Product Status

Product migration is complete for the legacy `components/product`, `components/product-list`, and `components/product-option` buckets.

Completed:

- `additional-discount`
- `card`
- `card-row`
- `countdown-timer`
- `extra-product-list`
- `grid-section`
- `main-image`
- `order-action`
- `photo-review`
- `product-error-state`
- `product-tabs`
- `related-product-list`
- `category`
- `filter`
- `mobile-filter`
- `search-input`
- `side-bar`
- `flat`, `multi`, `required`, `selected` product options

Also updated:

- product detail, category, best/new, time-sale, wish, recent-products pages
- search, drawer, section, recipe, cart, event, and overlay consumers
- photo review layer contents and bottom sheet option selector

Current state:

- no remaining runtime imports from `@/components/product`, `@/components/product-list`, or `@/components/product-option`
- `apps/web/src/components/product`
- `apps/web/src/components/product-list`
- `apps/web/src/components/product-option`
  are fully removed

## Next Commands

Useful first checks for the next turn:

```bash
cd /Users/jerome/Developer/geek/shopby-nextjs-starter/.worktrees/codex-web-domain-mypage
find apps/web/src/components/search -maxdepth 4 -type f | sort
rg -n "@/components/search" apps/web/src | sort
```

Validation after each batch:

```bash
cd /Users/jerome/Developer/geek/shopby-nextjs-starter/.worktrees/codex-web-domain-mypage/apps/web
./node_modules/.bin/next build --webpack
```

## Low-Token Handoff Note

If the next session starts with low token budget, continue with this exact scope:

- stay on branch `codex/web-domain-mypage-rest`
- start with `search` only
- do not touch `recipe` yet
- stop after:
  - moving the files
  - fixing imports
  - running `next build --webpack`
  - summarizing results

Suggested one-line resume prompt:

```text
Continue from docs/superpowers/plans/2026-05-30-order-next-turn-handoff.md and start the search migration in the current worktree branch.
```
