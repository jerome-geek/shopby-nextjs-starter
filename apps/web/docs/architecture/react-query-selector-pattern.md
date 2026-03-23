# React Query Selector Pattern & Architecture Discussion

## 1. Overview
This document summarizes the discussion on managing data transformation logic when using React Query (TanStack Query) in a Next.js application, specifically focusing on the Banner component implementation.

The core comparison was between:
- **Class Model Approach**: Wrapping data in a class instance within `useMemo`.
- **Utility Function + Selector Approach**: Using pure functions with React Query's `select` option.

## 2. Comparison: Class vs. Utility (Selector)

### A. Class Model Approach
```typescript
// Component
const { data } = useBannerList({...});
const bannerModel = useMemo(() => new BannerModel(data), [data]);
const banners = bannerModel.getBanners();
```
- **Pros**: 
  - High cohesion (logic & data together).
  - Easy to derive multiple data points from one instance.
- **Cons**: 
  - Boilerplate with `useMemo`.
  - Class instances are not serializable (issue for global state/SSR).
  - Less integration with React Query's optimizations.

### B. Utility Function + Selector Approach (Recommended)
```typescript
// Component
const { data: banners } = useBannerList({
    // ...
    options: { select: extractBannerContents }
});
```
- **Pros**:
  - **Performance**: React Query memoizes the result. If `data` hasn't changed, the selector doesn't run, and the component doesn't re-render.
  - **Simplicity**: Pure functions are easy to test and reason about.
  - **Tree Shaking**: Only imports what is needed.
- **Cons**:
  - Requires separate selectors for different data needs.

## 3. Efficiency Concerns & Resolution

**Concern**: "Does calling `useBannerList` multiple times with different selectors cause multiple API requests?"

**Resolution**: **No.**
- React Query handles caching based on the `queryKey`.
- Multiple components (or multiple hooks in one component) using the same key will share the **same single network request**.
- Selectors run on the cached data.

## 4. Recommended Directory Structure & Pattern

To keep the codebase scalable and maintainable, we recommend separating concerns into three layers:

### A. Directory Structure
```bash
src/
├── hooks/
│   ├── suspenseQuery/  # Data Fetching (Pure API calls)
│   │   └── useBannerList.ts
│   └── domain/         # Business Logic (Custom Hooks)
│       └── banner/
│           └── useMainHeroBanner.ts
├── utils/
│   └── banner/         # Data Transformation (Pure Selectors)
│       └── index.ts
└── components/
    └── hero-banner/    # UI Presentation
        └── HeroBanner.tsx
```

### B. Implementation Pattern

**1. Pure Utility (Selector)**
Start with a pure function that transforms the raw API response into the shape the UI needs.
```typescript
// src/utils/banner/index.ts
export const selectBannerList = (data: GetBannersResponse): Banner[] => {
    // Transformation logic (sorting, flattening, etc.)
    return transformedData;
};
```

**2. Domain Hook (Business Logic)**
Encapsulate the query configuration (`queryKey`, `select`, specific parameters) in a custom hook.
```typescript
// src/hooks/domain/banner/useMainHeroBanner.ts
export const useMainHeroBanner = () => {
    return useBannerList({
        banners: ['MAIN_TOP'],
        options: {
            select: selectBannerList,
            staleTime: 1000 * 60 * 5, // Optional: specific caching rules
        },
    });
};
```

**3. UI Component**
The component simply consumes the data without knowing about fetching details or transformation logic.
```typescript
// src/components/hero-banner/HeroBanner.tsx
function HeroBannerContent() {
    const { data: banners } = useMainHeroBanner();
    // Render UI
}
```

## 5. Conclusion
Adopting the **Selector Pattern** with **Custom Domain Hooks** provides the best balance of performance, maintainability, and clean code in the React Query ecosystem. It separates "Data Fetching", "Data Transformation", and "UI Rendering" effectively.
