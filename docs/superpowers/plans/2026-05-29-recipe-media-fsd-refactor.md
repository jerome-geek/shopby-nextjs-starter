# Recipe Media FSD-lite Refactor Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 레시피 상세 페이지의 미디어 영역(YouTube embed / 외부링크 / 이미지)을 FSD-lite 구조에 맞게 `entities/recipe/ui/recipe-media/`로 분리한다.

**Architecture:** sourceType 판별 로직을 `entities/recipe/utils/source.ts`의 순수 함수로 분리하고, 렌더링 컴포넌트 `RecipeMedia`를 `entities/recipe/ui/recipe-media/`에 배치한다. `useYoutubePlayer`는 컴포넌트 내부에서 소유하며, `onPlayerReady` prop으로 `seekAndPause` 함수를 부모에게 전달한다. 페이지는 `seekAndPauseRef`에 함수를 보관해 스텝 타임스탬프 클릭에 사용한다.

**Tech Stack:** Next.js Pages Router, TypeScript, Vanilla Extract, Vitest

---

## File Map

| 파일 | 작업 |
|---|---|
| `apps/web/src/entities/recipe/utils/source.ts` | 신규 — `resolveRecipeMediaVariant` 순수 함수 |
| `apps/web/src/entities/recipe/utils/__tests__/source.test.ts` | 신규 — 유틸 단위 테스트 |
| `apps/web/src/entities/recipe/ui/recipe-media/index.css.ts` | 신규 — 캐러셀 스타일 (페이지 CSS에서 이동) |
| `apps/web/src/entities/recipe/ui/recipe-media/index.tsx` | 신규 — `RecipeMedia` 컴포넌트 |
| `apps/web/src/entities/recipe/ui/index.ts` | 신규 — barrel export |
| `apps/web/src/pages/recipes/[sno]/index.tsx` | 수정 — 인라인 미디어 로직 제거, `RecipeMedia` 사용 |
| `apps/web/src/pages/recipes/[sno]/index.css.ts` | 수정 — 이동된 스타일 제거 |

---

## Task 1: `resolveRecipeMediaVariant` 유틸 + 테스트

**Files:**
- Create: `apps/web/src/entities/recipe/utils/source.ts`
- Create: `apps/web/src/entities/recipe/utils/__tests__/source.test.ts`

- [ ] **Step 1: 테스트 파일 작성**

```ts
// apps/web/src/entities/recipe/utils/__tests__/source.test.ts
import { describe, expect, it } from 'vitest';

import { resolveRecipeMediaVariant } from '../source';

describe('resolveRecipeMediaVariant', () => {
    it('YOUTUBE + sourceId 있으면 youtube 반환', () => {
        expect(
            resolveRecipeMediaVariant('YOUTUBE', 'abc123', 'https://youtu.be/abc123'),
        ).toBe('youtube');
    });

    it('YOUTUBE이지만 sourceId 없으면 external 반환', () => {
        expect(
            resolveRecipeMediaVariant('YOUTUBE', null, 'https://youtu.be/abc123'),
        ).toBe('external');
    });

    it('INSTAGRAM + sourceUrl 있으면 external 반환', () => {
        expect(
            resolveRecipeMediaVariant(
                'INSTAGRAM',
                null,
                'https://www.instagram.com/reel/abc',
            ),
        ).toBe('external');
    });

    it('MANUAL + sourceUrl 없으면 image 반환', () => {
        expect(resolveRecipeMediaVariant('MANUAL', null, null)).toBe('image');
    });

    it('MANUAL + sourceUrl 있으면 external 반환', () => {
        expect(
            resolveRecipeMediaVariant('MANUAL', null, 'https://example.com/recipe'),
        ).toBe('external');
    });

    it('sourceId 빈 문자열이면 youtube로 처리하지 않음', () => {
        expect(
            resolveRecipeMediaVariant('YOUTUBE', '', 'https://youtu.be/abc123'),
        ).toBe('external');
    });
});
```

- [ ] **Step 2: 테스트 실행 — 실패 확인**

```bash
cd apps/web && pnpm test:run src/entities/recipe/utils/__tests__/source.test.ts
```

Expected: `Cannot find module '../source'` 오류

- [ ] **Step 3: 유틸 구현**

```ts
// apps/web/src/entities/recipe/utils/source.ts
import type { RecipeSourceType } from '@/models/shop';

export type RecipeMediaVariant = 'youtube' | 'external' | 'image';

export function resolveRecipeMediaVariant(
    sourceType: RecipeSourceType,
    sourceId?: string | null,
    sourceUrl?: string | null,
): RecipeMediaVariant {
    if (sourceType === 'YOUTUBE' && sourceId) return 'youtube';
    if (sourceUrl) return 'external';
    return 'image';
}
```

- [ ] **Step 4: 테스트 실행 — 통과 확인**

```bash
cd apps/web && pnpm test:run src/entities/recipe/utils/__tests__/source.test.ts
```

Expected: 6개 테스트 PASS

- [ ] **Step 5: 커밋**

```bash
git add apps/web/src/entities/recipe/utils/source.ts apps/web/src/entities/recipe/utils/__tests__/source.test.ts
git commit -m "feat(entities/recipe): sourceType → mediaVariant 판별 유틸 추가"
```

---

## Task 2: `recipe-media` 스타일 파일 작성

**Files:**
- Create: `apps/web/src/entities/recipe/ui/recipe-media/index.css.ts`

페이지의 `index.css.ts`에서 캐러셀 관련 스타일을 이동한다. 아직 페이지 CSS는 수정하지 않는다 (Task 5에서 제거).

- [ ] **Step 1: CSS 파일 생성**

```ts
// apps/web/src/entities/recipe/ui/recipe-media/index.css.ts
import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { media } from '@/styles/media';
import { vars } from '@/styles/theme.css';

export const imageCarouselContainer = recipe({
    base: {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        marginBottom: '24px',
        backgroundColor: vars.color.white,

        '@media': {
            [media.desktop]: {
                position: 'static',
                zIndex: 'auto',
                gap: '16px',
                marginBottom: 0,
                backgroundColor: 'transparent',
            },
        },
    },
    variants: {
        sticky: {
            true: {
                position: 'sticky',
                top: 0,
                zIndex: 1000,
            },
            false: {
                position: 'relative',
                top: 'auto',
                zIndex: 'auto',
            },
        },
    },
    defaultVariants: {
        sticky: false,
    },
});

export const imageCarousel = recipe({
    base: {
        width: 'calc(100% + 40px)',
        margin: '0 -20px',
        overflow: 'hidden',
        position: 'relative',

        '@media': {
            [media.desktop]: {
                width: '600px',
                margin: '0',
                flexShrink: 0,
                borderRadius: '12px',
            },
        },
    },
    variants: {
        ratio: {
            square: {
                aspectRatio: '1 / 1',
            },
            wide: {
                aspectRatio: '16 / 9',
            },
        },
    },
    defaultVariants: {
        ratio: 'square',
    },
});

export const carouselImage = style({
    width: '100%',
    height: '100%',
    objectFit: 'cover',
});

export const carouselVideo = style({
    width: '100%',
    height: '100%',
    border: 0,
    display: 'block',
});

export const carouselExternalLink = style({
    display: 'block',
    width: '100%',
    height: '100%',
});
```

- [ ] **Step 2: 커밋**

```bash
git add apps/web/src/entities/recipe/ui/recipe-media/index.css.ts
git commit -m "feat(entities/recipe): recipe-media 캐러셀 스타일 추가"
```

---

## Task 3: `RecipeMedia` 컴포넌트 작성

**Files:**
- Create: `apps/web/src/entities/recipe/ui/recipe-media/index.tsx`

- [ ] **Step 1: 컴포넌트 파일 작성**

```tsx
// apps/web/src/entities/recipe/ui/recipe-media/index.tsx
import { useEffect } from 'react';

import type { RecipeSourceType } from '@/models/shop';
import { useYoutubePlayer } from '@/shared/hooks/useYoutubePlayer';

import { resolveRecipeMediaVariant } from '@/entities/recipe/utils/source';
import * as styles from './index.css';

interface RecipeMediaProps {
    sourceType: RecipeSourceType;
    sourceUrl: string;
    sourceId?: string | null;
    thumbnailUrl?: string | null;
    title: string;
    onPlayerReady?: (seekAndPause: (seconds: number) => void) => void;
}

export const RecipeMedia = ({
    sourceType,
    sourceUrl,
    sourceId,
    thumbnailUrl,
    title,
    onPlayerReady,
}: RecipeMediaProps) => {
    const { iframeRef, seekAndPause } = useYoutubePlayer();
    const variant = resolveRecipeMediaVariant(sourceType, sourceId, sourceUrl);
    const isYoutubeShorts = variant === 'youtube' && sourceUrl.includes('/shorts/');
    const isYoutubeLongForm = variant === 'youtube' && !isYoutubeShorts;
    const youtubeEmbedUrl =
        variant === 'youtube' && sourceId
            ? `https://www.youtube.com/embed/${sourceId}?enablejsapi=1&rel=0&playsinline=1`
            : null;

    useEffect(() => {
        if (variant === 'youtube') {
            onPlayerReady?.(seekAndPause);
        }
    }, [variant, seekAndPause, onPlayerReady]);

    return (
        <div
            className={styles.imageCarouselContainer({
                sticky: isYoutubeLongForm,
            })}
        >
            <div
                className={styles.imageCarousel({
                    ratio: isYoutubeLongForm ? 'wide' : 'square',
                })}
            >
                {variant === 'youtube' && youtubeEmbedUrl ? (
                    <iframe
                        ref={iframeRef}
                        src={youtubeEmbedUrl}
                        title={title}
                        className={styles.carouselVideo}
                        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                        allowFullScreen
                    />
                ) : variant === 'external' && thumbnailUrl ? (
                    <a
                        href={sourceUrl}
                        target='_blank'
                        rel='noopener noreferrer'
                        className={styles.carouselExternalLink}
                    >
                        <img
                            src={thumbnailUrl}
                            alt={title}
                            className={styles.carouselImage}
                        />
                    </a>
                ) : (
                    thumbnailUrl && (
                        <img
                            src={thumbnailUrl}
                            alt={title}
                            className={styles.carouselImage}
                        />
                    )
                )}
            </div>
        </div>
    );
};
```

- [ ] **Step 2: 커밋**

```bash
git add apps/web/src/entities/recipe/ui/recipe-media/index.tsx
git commit -m "feat(entities/recipe): RecipeMedia 컴포넌트 추가"
```

---

## Task 4: Barrel Export 작성

**Files:**
- Create: `apps/web/src/entities/recipe/ui/index.ts`

- [ ] **Step 1: barrel 파일 작성**

```ts
// apps/web/src/entities/recipe/ui/index.ts
export { RecipeMedia } from './recipe-media';
```

- [ ] **Step 2: `next.config.ts`의 `optimizePackageImports`에 경로 추가 확인**

```bash
grep -n "optimizePackageImports" apps/web/next.config.ts
```

`@/entities/recipe/ui`가 없으면 추가한다. 있으면 넘어간다.

- [ ] **Step 3: 커밋**

```bash
git add apps/web/src/entities/recipe/ui/index.ts
git commit -m "feat(entities/recipe): ui barrel export 추가"
```

---

## Task 5: 페이지 업데이트

**Files:**
- Modify: `apps/web/src/pages/recipes/[sno]/index.tsx`
- Modify: `apps/web/src/pages/recipes/[sno]/index.css.ts`

- [ ] **Step 1: `index.tsx` import 수정**

파일 상단 import를 아래와 같이 수정한다.

`import { useRef } from 'react';` 추가:
```tsx
import { useRef } from 'react';
```

`useYoutubePlayer` import 제거:
```tsx
// 삭제
import { useYoutubePlayer } from '@/shared/hooks/useYoutubePlayer';
```

`RecipeMedia` import 추가:
```tsx
import { RecipeMedia } from '@/entities/recipe/ui';
```

- [ ] **Step 2: `RecipeDetailContent` 내부 미디어 관련 변수 제거 및 `seekAndPauseRef` 추가**

아래 코드 블록을 찾아 교체한다.

제거 대상 (4줄):
```tsx
    const isYoutube = recipeDetailData.sourceType === 'YOUTUBE';
    const { iframeRef, seekAndPause } = useYoutubePlayer();
    const isYoutubeShorts = isYoutube && sourceUrl.includes('/shorts/');
    const isYoutubeLongForm = isYoutube && !isYoutubeShorts;
    const youtubeEmbedUrl =
        isYoutube && recipeDetailData.sourceId
            ? `https://www.youtube.com/embed/${recipeDetailData.sourceId}?enablejsapi=1&rel=0&playsinline=1`
            : null;
    const thumbnailUrl = recipeDetailData.thumbnailUrl || imageList[0];
    // YouTube는 embed iframe으로 처리, 그 외 sourceUrl이 있는 타입(인스타 등)은 외부 링크로 열기
    const externalLinkUrl = !isYoutube && sourceUrl ? sourceUrl : null;
```

교체 후:
```tsx
    const thumbnailUrl = recipeDetailData.thumbnailUrl || imageList[0];
    const seekAndPauseRef = useRef<((seconds: number) => void) | null>(null);
```

- [ ] **Step 3: `console.log` 디버그 로그 제거**

```tsx
// 삭제
    console.log(
        '🚀 ~ RecipeDetailContent ~ recipeDetailData:',
        recipeDetailData,
    );
```

- [ ] **Step 4: 헤더 영역 JSX에서 캐러셀 블록을 `<RecipeMedia />`로 교체**

제거 대상 (캐러셀 div 전체):
```tsx
                <div
                    className={styles.imageCarouselContainer({
                        sticky: isYoutubeLongForm,
                    })}
                >
                    <div
                        className={styles.imageCarousel({
                            ratio: isYoutubeLongForm ? 'wide' : 'square',
                        })}
                    >
                        {youtubeEmbedUrl ? (
                            <iframe
                                ref={iframeRef}
                                src={youtubeEmbedUrl}
                                title={recipeDetailData.title}
                                className={styles.carouselVideo}
                                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                                allowFullScreen
                            />
                        ) : thumbnailUrl && externalLinkUrl ? (
                            <a
                                href={externalLinkUrl}
                                target='_blank'
                                rel='noopener noreferrer'
                                className={styles.carouselExternalLink}
                            >
                                <img
                                    src={thumbnailUrl}
                                    alt={recipeDetailData.title}
                                    className={styles.carouselImage}
                                />
                            </a>
                        ) : (
                            thumbnailUrl && (
                                <img
                                    src={thumbnailUrl}
                                    alt={recipeDetailData.title}
                                    className={styles.carouselImage}
                                />
                            )
                        )}
                    </div>
                </div>
```

교체 후:
```tsx
                <RecipeMedia
                    sourceType={recipeDetailData.sourceType}
                    sourceUrl={sourceUrl}
                    sourceId={recipeDetailData.sourceId}
                    thumbnailUrl={thumbnailUrl}
                    title={recipeDetailData.title}
                    onPlayerReady={(fn) => {
                        seekAndPauseRef.current = fn;
                    }}
                />
```

- [ ] **Step 5: 스텝 타임스탬프 클릭 핸들러 업데이트**

```tsx
// 변경 전
                                                onClick={() =>
                                                    seekAndPause(
                                                        step.timestampSeconds ??
                                                            0,
                                                    )
                                                }
```

```tsx
// 변경 후
                                                onClick={() =>
                                                    seekAndPauseRef.current?.(
                                                        step.timestampSeconds ??
                                                            0,
                                                    )
                                                }
```

- [ ] **Step 6: `index.css.ts`에서 이동된 스타일 제거**

`apps/web/src/pages/recipes/[sno]/index.css.ts`에서 아래 export 5개를 삭제한다:
- `imageCarouselContainer` (recipe variant 전체 블록)
- `imageCarousel` (recipe variant 전체 블록)
- `carouselImage`
- `carouselVideo`
- `carouselExternalLink`

그리고 `recipe` import가 더 이상 사용되지 않으므로 제거한다:

```ts
// 삭제
import { recipe } from '@vanilla-extract/recipes';
```

`vars` import는 나머지 스타일에서 계속 사용하므로 유지한다.

- [ ] **Step 7: 빌드 확인**

```bash
cd apps/web && pnpm build
```

Expected: 빌드 성공, 타입 오류 없음

- [ ] **Step 8: 전체 테스트 확인**

```bash
cd apps/web && pnpm test:run
```

Expected: 모든 테스트 PASS

- [ ] **Step 9: 커밋**

```bash
git add apps/web/src/pages/recipes/[sno]/index.tsx apps/web/src/pages/recipes/[sno]/index.css.ts
git commit -m "refactor(pages/recipes): RecipeMedia 컴포넌트로 미디어 영역 분리"
```
