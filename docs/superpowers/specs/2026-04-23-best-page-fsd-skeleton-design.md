# 베스트 페이지 FSD-lite 구조 개편 + 상품 스켈레톤 UI

Date: 2026-04-23

## 목표

1. 베스트 전용 코드를 `features/products/best/`로 모아 FSD-lite 구조 정착
2. 로딩 중 상품 스켈레톤 UI 표시

---

## 폴더 구조

`pages/products/best/` 경로와 대칭되도록 `features/products/best/`를 생성한다.

### 이동 대상

| 현재 경로 | 이동 경로 |
|---|---|
| `components/product/best-category-filter/` | `features/products/best/components/category-filter/` |
| `components/product/best-product-list-container/` | `features/products/best/components/product-list-container/` |
| `hooks/product/useBestProductParams.ts` | `features/products/best/hooks/useBestProductParams.ts` |

### 신규 생성

| 경로 | 내용 |
|---|---|
| `features/products/best/components/product-grid-skeleton/` | 상품 그리드 스켈레톤 컴포넌트 |

---

## 상품 스켈레톤 (`ProductGridSkeleton`)

`ProductCard`와 동일한 DOM 구조의 스켈레톤 컴포넌트.

### 구조 (ProductCard 미러링)

```
article
  └── 썸네일 영역 (aspectRatio: 1/1, 회색 박스)
  └── 정보 영역
        ├── 브랜드명 라인 (짧은 회색 바)
        ├── 상품명 2줄 (긴 회색 바 × 2)
        └── 가격 라인 (중간 회색 바)
```

### 스타일

- 배경색: `vars.color.gray[10]` (카드 이미지 배경과 동일)
- 애니메이션: shimmer (keyframes — 좌→우 반짝임)
- 개수: `PAGE_SIZE`(20)개 그리드로 표시
- 그리드: `best/index.css.ts`의 `productGrid` 스타일 재사용

### Props

```ts
interface ProductGridSkeletonProps {
  count?: number; // default: 20 (PAGE_SIZE)
}
```

---

## LoadingWrapper 연동

`LoadingWrapper`에 `loadingContent?: ReactNode` prop 추가.
- prop이 있으면 spinner 대신 `loadingContent`를 표시
- prop이 없으면 기존 spinner 동작 유지 (하위 호환)

### 사용 예시

```tsx
<LoadingWrapper
  isLoading={isFetching && isEmpty(products)}
  loadingContent={<ProductGridSkeleton count={PAGE_SIZE} />}
>
  {/* 상품 목록 */}
</LoadingWrapper>
```

---

## Import 경로 변경

모든 이동된 파일의 import는 `@/features/products/best/...`로 업데이트.
`pages/products/best/index.tsx`에서만 import하므로 변경 범위가 좁음.

---

## 범위 외

- `pages/products/new/` 구조 변경 — 신상품 페이지는 이번 스코프에서 제외
- `LoadingWrapper` 외 다른 사용처의 스켈레톤 — 이번 스코프에서 제외
