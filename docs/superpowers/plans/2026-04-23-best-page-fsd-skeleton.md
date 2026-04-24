# 베스트 페이지 FSD-lite 구조 개편 + 스켈레톤 UI Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 베스트 전용 컴포넌트·훅을 `features/products/best/`로 이동하고, 로딩 중 ProductCard 형태의 스켈레톤 UI를 표시한다.

**Architecture:** `pages/products/best/` 경로와 대칭되는 `features/products/best/` 슬라이스를 생성한다. 기존 `LoadingWrapper`에 `loadingContent` prop을 추가해 스피너 대신 스켈레톤을 선택적으로 표시할 수 있도록 확장한다.

**Tech Stack:** Next.js 16 Pages Router, Vanilla Extract, nuqs, TypeScript

**Spec:** `docs/superpowers/specs/2026-04-23-best-page-fsd-skeleton-design.md`

---

## File Map

### 이동 (내용 변경 없음)

| 출발 | 도착 |
|---|---|
| `src/components/product/best-category-filter/index.tsx` | `src/features/products/best/components/category-filter/index.tsx` |
| `src/components/product/best-category-filter/index.css.ts` | `src/features/products/best/components/category-filter/index.css.ts` |
| `src/components/product/best-product-list-container/index.tsx` | `src/features/products/best/components/product-list-container/index.tsx` |
| `src/hooks/product/useBestProductParams.ts` | `src/features/products/best/hooks/useBestProductParams.ts` |

### 신규 생성

| 파일 | 역할 |
|---|---|
| `src/features/products/best/components/product-grid-skeleton/index.tsx` | ProductCard 레이아웃 기반 스켈레톤 그리드 |
| `src/features/products/best/components/product-grid-skeleton/index.css.ts` | shimmer 애니메이션 스타일 |

### 수정

| 파일 | 변경 내용 |
|---|---|
| `src/components/common/loading-wrapper/index.tsx` | `loadingContent?: ReactNode` prop 추가 |
| `src/pages/products/best/index.tsx` | import 경로 → `@/features/products/best/...` |

### 삭제

| 파일 |
|---|
| `src/components/product/best-category-filter/index.tsx` |
| `src/components/product/best-category-filter/index.css.ts` |
| `src/components/product/best-product-list-container/index.tsx` |
| `src/hooks/product/useBestProductParams.ts` |

---

## Task 1: features/products/best/ 디렉토리 생성 + category-filter 이동

**Files:**
- Create: `src/features/products/best/components/category-filter/index.tsx`
- Create: `src/features/products/best/components/category-filter/index.css.ts`
- Delete: `src/components/product/best-category-filter/index.tsx`
- Delete: `src/components/product/best-category-filter/index.css.ts`

- [ ] **Step 1: 디렉토리 생성 및 파일 복사**

```bash
mkdir -p apps/web/src/features/products/best/components/category-filter
mkdir -p apps/web/src/features/products/best/components/product-list-container
mkdir -p apps/web/src/features/products/best/hooks

cp apps/web/src/components/product/best-category-filter/index.tsx \
   apps/web/src/features/products/best/components/category-filter/index.tsx

cp apps/web/src/components/product/best-category-filter/index.css.ts \
   apps/web/src/features/products/best/components/category-filter/index.css.ts
```

- [ ] **Step 2: 이동된 파일의 CSS import 경로 수정**

`src/features/products/best/components/category-filter/index.tsx` 의 CSS import를:
```ts
import * as styles from './index.css';
```
→ 이미 상대경로(`./index.css`)이므로 변경 불필요. 확인만 한다.

- [ ] **Step 3: 기존 파일 삭제**

```bash
rm apps/web/src/components/product/best-category-filter/index.tsx
rm apps/web/src/components/product/best-category-filter/index.css.ts
rmdir apps/web/src/components/product/best-category-filter
```

- [ ] **Step 4: 타입 체크**

```bash
cd apps/web && pnpm exec tsc --noEmit 2>&1 | grep -v "recipe-form" | head -20
```

Expected: category-filter 관련 에러 없음 (recipe-form 에러는 기존 에러이므로 무시)

- [ ] **Step 5: 커밋**

```bash
git add apps/web/src/features/products/best/components/category-filter/
git add apps/web/src/components/product/best-category-filter/  # 삭제 스테이징
git commit -m "🔨 refactor: best-category-filter → features/products/best/"
```

---

## Task 2: product-list-container 이동

**Files:**
- Create: `src/features/products/best/components/product-list-container/index.tsx`
- Delete: `src/components/product/best-product-list-container/index.tsx`

- [ ] **Step 1: 파일 복사**

```bash
cp apps/web/src/components/product/best-product-list-container/index.tsx \
   apps/web/src/features/products/best/components/product-list-container/index.tsx
```

- [ ] **Step 2: 기존 파일 삭제**

```bash
rm apps/web/src/components/product/best-product-list-container/index.tsx
rmdir apps/web/src/components/product/best-product-list-container
```

- [ ] **Step 3: 타입 체크**

```bash
cd apps/web && pnpm exec tsc --noEmit 2>&1 | grep -v "recipe-form" | head -20
```

Expected: product-list-container 관련 에러 없음

- [ ] **Step 4: 커밋**

```bash
git add apps/web/src/features/products/best/components/product-list-container/
git add apps/web/src/components/product/best-product-list-container/
git commit -m "🔨 refactor: best-product-list-container → features/products/best/"
```

---

## Task 3: useBestProductParams 이동

**Files:**
- Create: `src/features/products/best/hooks/useBestProductParams.ts`
- Delete: `src/hooks/product/useBestProductParams.ts`

- [ ] **Step 1: 파일 복사**

```bash
cp apps/web/src/hooks/product/useBestProductParams.ts \
   apps/web/src/features/products/best/hooks/useBestProductParams.ts
```

- [ ] **Step 2: 기존 파일 삭제**

```bash
rm apps/web/src/hooks/product/useBestProductParams.ts
```

- [ ] **Step 3: 타입 체크**

```bash
cd apps/web && pnpm exec tsc --noEmit 2>&1 | grep -v "recipe-form" | head -20
```

Expected: useBestProductParams 관련 에러 노출 (pages/best/index.tsx 에서 아직 구 경로 참조 중) — 정상

- [ ] **Step 4: pages/products/best/index.tsx import 경로 업데이트**

`src/pages/products/best/index.tsx` 에서:
```ts
// Before
import { useBestProductParams } from '@/hooks/product/useBestProductParams';
import { BestCategoryFilter } from '@/components/product/best-category-filter';
import { BestProductListContainer } from '@/components/product/best-product-list-container';

// After
import { useBestProductParams } from '@/features/products/best/hooks/useBestProductParams';
import { BestCategoryFilter } from '@/features/products/best/components/category-filter';
import { BestProductListContainer } from '@/features/products/best/components/product-list-container';
```

- [ ] **Step 5: 타입 체크**

```bash
cd apps/web && pnpm exec tsc --noEmit 2>&1 | grep -v "recipe-form" | head -20
```

Expected: 에러 없음

- [ ] **Step 6: 커밋**

```bash
git add apps/web/src/features/products/best/hooks/
git add apps/web/src/hooks/product/useBestProductParams.ts
git add apps/web/src/pages/products/best/index.tsx
git commit -m "🔨 refactor: useBestProductParams → features/products/best/ + import 경로 업데이트"
```

---

## Task 4: LoadingWrapper에 loadingContent prop 추가

**Files:**
- Modify: `src/components/common/loading-wrapper/index.tsx`

- [ ] **Step 1: LoadingWrapper props 타입에 loadingContent 추가**

`src/components/common/loading-wrapper/index.tsx` 를 다음과 같이 수정:

```tsx
import { isArray } from '@fxts/core';
import { AnimatePresence, motion, Transition } from 'motion/react';
import { type ReactNode, useState } from 'react';

import * as styles from '@/components/common/loading-wrapper/index.css';

interface LoadingWrapperProps {
    children: ReactNode;
    isLoading: boolean;
    isLoadedAnimation?: boolean;
    loadingText?: string | React.ReactNode;
    loadingContent?: ReactNode;
    containerStyle?: React.CSSProperties;
    spinnerStyle?: React.CSSProperties;
    onExitComplete?: () => void;
}

const LoadingWrapper = ({
    children,
    isLoading,
    isLoadedAnimation,
    loadingText,
    loadingContent,
    containerStyle,
    spinnerStyle,
    onExitComplete,
}: LoadingWrapperProps) => {
    const transition: Transition = {
        type: 'keyframes',
        duration: 0.2,
    };

    const [isLoadedFinished, setIsLoadedFinished] = useState(
        !isLoading ? true : isLoadedAnimation ? false : true,
    );

    const [isLoadingFinished, setIsLoadingFinished] = useState(false);

    return (
        <AnimatePresence
            mode='wait'
            onExitComplete={() => {
                setTimeout(() => {
                    setIsLoadedFinished(true);
                }, 500);
                setIsLoadingFinished(true);
                onExitComplete?.();
            }}
        >
            {isLoading ? (
                loadingContent ? (
                    <motion.div
                        key='loading-container'
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={transition}
                    >
                        {loadingContent}
                    </motion.div>
                ) : (
                    <motion.div
                        className={styles.loadingContainer}
                        key='loading-container'
                        id='loading-wrapper-container'
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{
                            ...transition,
                            damping: 50,
                            stiffness: 500,
                            type: 'spring',
                        }}
                        style={containerStyle}
                    >
                        <>
                            <span className={styles.spinner} style={spinnerStyle} />
                            {loadingText && loadingText}
                        </>
                    </motion.div>
                )
            ) : (
                <motion.div
                    key='loaded-container'
                    id='loaded-wrapper-container'
                    className={styles.loadedContainer}
                    initial={{
                        opacity: 0,
                        height: isLoadedAnimation
                            ? isLoadingFinished
                                ? containerStyle?.height || 250
                                : 'auto'
                            : 'auto',
                        overflow: 'hidden',
                    }}
                    animate={{
                        opacity: 1,
                        height: 'auto',
                        overflow: isLoadedAnimation
                            ? isLoadedFinished
                                ? 'visible'
                                : 'hidden'
                            : 'visible',
                    }}
                    transition={{
                        ...transition,
                        ease: 'easeOut',
                    }}
                >
                    {isArray(children) &&
                    (children as ReactNode[]).length > 1 ? (
                        <>{children}</>
                    ) : (
                        children
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default LoadingWrapper;
```

- [ ] **Step 2: 타입 체크**

```bash
cd apps/web && pnpm exec tsc --noEmit 2>&1 | grep -v "recipe-form" | head -20
```

Expected: 에러 없음

- [ ] **Step 3: 커밋**

```bash
git add apps/web/src/components/common/loading-wrapper/index.tsx
git commit -m "✨ feat: LoadingWrapper에 loadingContent prop 추가"
```

---

## Task 5: ProductGridSkeleton 컴포넌트 생성

**Files:**
- Create: `src/features/products/best/components/product-grid-skeleton/index.tsx`
- Create: `src/features/products/best/components/product-grid-skeleton/index.css.ts`

ProductCard(`src/components/product/card/index.tsx`) 레이아웃을 기반으로 한 스켈레톤.

- [ ] **Step 1: CSS 파일 생성**

`src/features/products/best/components/product-grid-skeleton/index.css.ts`:

```ts
import { keyframes, style } from '@vanilla-extract/css';
import { media } from '@/styles/media';
import { vars } from '@/styles/theme.css';

const shimmer = keyframes({
    '0%': { backgroundPosition: '-200% 0' },
    '100%': { backgroundPosition: '200% 0' },
});

const skeletonBase = style({
    background: `linear-gradient(90deg, ${vars.color.gray[10]} 25%, ${vars.color.gray[20]} 50%, ${vars.color.gray[10]} 75%)`,
    backgroundSize: '200% 100%',
    animation: `${shimmer} 1.5s ease-in-out infinite`,
    borderRadius: '4px',
});

export const grid = style({
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    columnGap: '4px',
    rowGap: '24px',

    '@media': {
        [media.tablet]: {
            gridTemplateColumns: 'repeat(4, 1fr)',
            columnGap: '18px',
            rowGap: '36px',
        },
        [media.desktop]: {
            gridTemplateColumns: 'repeat(5, 1fr)',
            columnGap: '25px',
            rowGap: '48px',
        },
    },
});

export const card = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
});

export const thumb = style([
    skeletonBase,
    {
        width: '100%',
        aspectRatio: '1/1',
        borderRadius: '4px',
    },
]);

export const info = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
});

export const brandLine = style([
    skeletonBase,
    {
        height: '12px',
        width: '40%',
        borderRadius: '4px',
    },
]);

export const nameLine1 = style([
    skeletonBase,
    {
        height: '14px',
        width: '100%',
        borderRadius: '4px',
    },
]);

export const nameLine2 = style([
    skeletonBase,
    {
        height: '14px',
        width: '70%',
        borderRadius: '4px',
    },
]);

export const priceLine = style([
    skeletonBase,
    {
        height: '16px',
        width: '50%',
        borderRadius: '4px',
        marginTop: '4px',
    },
]);
```

- [ ] **Step 2: 컴포넌트 파일 생성**

`src/features/products/best/components/product-grid-skeleton/index.tsx`:

```tsx
import * as styles from './index.css';

interface ProductGridSkeletonProps {
    count?: number;
}

export const ProductGridSkeleton = ({ count = 20 }: ProductGridSkeletonProps) => {
    return (
        <div className={styles.grid}>
            {Array.from({ length: count }).map((_, i) => (
                <div key={i} className={styles.card}>
                    <div className={styles.thumb} />
                    <div className={styles.info}>
                        <div className={styles.brandLine} />
                        <div className={styles.nameLine1} />
                        <div className={styles.nameLine2} />
                        <div className={styles.priceLine} />
                    </div>
                </div>
            ))}
        </div>
    );
};
```

- [ ] **Step 3: 타입 체크**

```bash
cd apps/web && pnpm exec tsc --noEmit 2>&1 | grep -v "recipe-form" | head -20
```

Expected: 에러 없음

- [ ] **Step 4: 커밋**

```bash
git add apps/web/src/features/products/best/components/product-grid-skeleton/
git commit -m "✨ feat: ProductGridSkeleton 컴포넌트 추가"
```

---

## Task 6: 베스트 페이지에 스켈레톤 연동

**Files:**
- Modify: `src/pages/products/best/index.tsx`

- [ ] **Step 1: ProductGridSkeleton import 추가 및 LoadingWrapper에 연동**

`src/pages/products/best/index.tsx` 전체:

```tsx
import { isEmpty } from '@fxts/core';

import LoadingWrapper from '@/components/common/loading-wrapper';
import { NoResult } from '@/components/common/no-result';
import { ObserverTarget } from '@/components/common/observer-target';
import { ProductCard } from '@/components/product';
import { Column } from '@/components/ui/layout/flex';
import PagingV2 from '@/components/ui/paging-v2';
import { BestCategoryFilter } from '@/features/products/best/components/category-filter';
import { BestProductListContainer } from '@/features/products/best/components/product-list-container';
import { ProductGridSkeleton } from '@/features/products/best/components/product-grid-skeleton';
import { useBestProductParams } from '@/features/products/best/hooks/useBestProductParams';
import { useCategoryAll } from '@/hooks/suspenseQuery/display/category';
import { useResponsive } from '@/hooks/utils';
import * as styles from '@/pages/products/best/index.css';

const PAGE_SIZE = 20;

const BestProductsPage = () => {
    const { isMobile } = useResponsive();
    const [queryParams, setQueryParams] = useBestProductParams();

    const { data: categoryData } = useCategoryAll();
    const mainCategoryNo =
        categoryData?.multiLevelCategories?.[0]?.categoryNo ?? 0;
    const selectedCategory =
        queryParams.categoryNo && queryParams.categoryNo > 0
            ? queryParams.categoryNo
            : mainCategoryNo;

    return (
        <div className={styles.container}>
            <Column>
                <Column style={{ gap: isMobile ? '20px' : '32px' }}>
                    {!isMobile && <h1 className={styles.title}>베스트 랭킹</h1>}

                    <BestCategoryFilter
                        selectedCategory={selectedCategory}
                        mainCategoryNo={mainCategoryNo}
                        onSelect={(categoryNo) =>
                            setQueryParams({ categoryNo, pageNumber: 1 })
                        }
                    />
                </Column>

                <div className={styles.border} />
            </Column>

            <BestProductListContainer
                params={{ ...queryParams, pageSize: PAGE_SIZE }}
                selectedCategory={selectedCategory}
            >
                {({
                    products,
                    totalCount,
                    hasNextPage,
                    fetchNextPage,
                    pageNumber,
                    isFetching,
                }) => (
                    <LoadingWrapper
                        isLoading={isFetching && isEmpty(products)}
                        loadingContent={<ProductGridSkeleton count={PAGE_SIZE} />}
                    >
                        {isEmpty(products) ? (
                            <NoResult title={'등록된 상품이 없습니다.'} />
                        ) : (
                            <Column style={{ gap: isMobile ? '0' : '60px' }}>
                                <div className={styles.productGrid}>
                                    {products.map((product, index) => (
                                        <ProductCard
                                            key={product.productNo}
                                            productNo={product.productNo}
                                            productName={product.productName}
                                            imageUrlInfo={product.imageUrlInfo}
                                            brandNo={product.brandNo}
                                            brandName={product.brandName}
                                            stickerInfos={product.stickerInfos}
                                            likeCount={product.likeCount}
                                            liked={product.liked}
                                            reviewRating={product.reviewRating}
                                            totalReviewCount={
                                                product.totalReviewCount
                                            }
                                            salePrice={product.salePrice}
                                            immediateDiscountAmt={
                                                product.immediateDiscountAmt
                                            }
                                            additionDiscountAmt={
                                                product.additionDiscountAmt
                                            }
                                            rank={
                                                isMobile
                                                    ? index + 1
                                                    : (pageNumber - 1) *
                                                          PAGE_SIZE +
                                                      index +
                                                      1
                                            }
                                        />
                                    ))}
                                </div>

                                {isMobile ? (
                                    <ObserverTarget
                                        onIntersect={() => {
                                            if (hasNextPage) {
                                                fetchNextPage?.();
                                            }
                                        }}
                                        hasNextPage={hasNextPage || false}
                                        totalCount={totalCount}
                                    />
                                ) : (
                                    <PagingV2
                                        currentPage={pageNumber}
                                        totalCount={totalCount}
                                        pageSize={PAGE_SIZE}
                                        onPageClick={(page) =>
                                            setQueryParams(
                                                { pageNumber: page },
                                                { scroll: true },
                                            )
                                        }
                                    />
                                )}
                            </Column>
                        )}
                    </LoadingWrapper>
                )}
            </BestProductListContainer>
        </div>
    );
};

export default BestProductsPage;
```

- [ ] **Step 2: 타입 체크**

```bash
cd apps/web && pnpm exec tsc --noEmit 2>&1 | grep -v "recipe-form" | head -20
```

Expected: 에러 없음

- [ ] **Step 3: 커밋**

```bash
git add apps/web/src/pages/products/best/index.tsx
git commit -m "✨ feat: 베스트 페이지 스켈레톤 UI 연동"
```

---

## Task 7: PR 업데이트 + 최종 확인

- [ ] **Step 1: 변경 범위 확인**

```bash
git log --oneline origin/refactor/best..HEAD
git diff --stat origin/refactor/best
```

- [ ] **Step 2: 원격 push**

```bash
git push origin refactor/best
```

- [ ] **Step 3: PR 본문 업데이트**

```bash
gh pr edit 10 --body "$(cat <<'EOF'
## Summary

- \`useRouter\`로 직접 관리하던 쿼리 파라미터를 \`nuqs\` 라이브러리로 교체
- FSD-lite 구조 적용: 베스트 전용 컴포넌트·훅을 \`features/products/best/\`로 이동
- 로딩 중 ProductCard 레이아웃 기반 shimmer 스켈레톤 UI 표시
- \`LoadingWrapper\`에 \`loadingContent\` prop 추가 (기존 스피너와 하위 호환)
- 신상품 페이지가 베스트 CSS에 의존하던 문제 해결 (자체 CSS 파일 생성)

## Changed Files

\`\`\`
features/products/best/
  components/
    category-filter/        ← components/product/best-category-filter/ 에서 이동
    product-list-container/ ← components/product/best-product-list-container/ 에서 이동
    product-grid-skeleton/  ← 신규
  hooks/
    useBestProductParams.ts ← hooks/product/ 에서 이동
\`\`\`

## Test plan

- [ ] 베스트 페이지 진입 시 스켈레톤 → 상품 목록 전환 확인
- [ ] 카테고리 클릭 시 URL 파라미터 반영 및 상품 갱신
- [ ] PC 페이지네이션 정상 동작
- [ ] 모바일 무한 스크롤 정상 동작
- [ ] 신상품 페이지 스타일 이상 없음

🤖 Generated with [Claude Code](https://claude.com/claude-code)
EOF
)"
```
