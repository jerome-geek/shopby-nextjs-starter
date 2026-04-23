# React Query v5 (TanStack Query) 컨벤션 가이드

이 문서는 React Query v5 도입에 따라, 쿼리 키(Query Key)와 실행 로직(Query Function)을 효율적으로 관리하기 위한 `queryOptions` 기반의 컨벤션 가이드를 제공합니다.

---

## 1. 개요 및 배경

React Query v5에서는 쿼리의 세 가지 핵심 요소인 **Key, Function, Options**를 하나의 객체로 묶어 관리할 수 있는 `queryOptions` API를 제공합니다. 이를 통해 다음과 같은 이점을 얻을 수 있습니다.

- **타입 안전성**: 데이터의 타입 추론이 자동으로 이루어져 타입 정의 중복을 방지합니다.
- **코드 재사용**: CSR(클라이언트)과 SSR/ISR(서버)에서 동일한 쿼리 설정을 공유합니다.
- **유지보수 효율**: 쿼리 로직 변경 시 UI 컴포넌트를 건드리지 않고 중앙에서 관리합니다.

---

## 2. 폴더 및 파일 구조

기존의 `queryKeys` 폴더를 확장하거나, 쿼리 통합 관리를 위한 전 전용 폴더를 운영합니다.

- **위치**: `src/hooks/queries/`
- **파일명**: `{domain}.ts` (소문자 케밥 케이스)

✅ **구조 예시:**

```text
src/
  hooks/
    queryKeys/       # (기존) 쿼리 키 모음
    queries/         # (신규) queryOptions 정의 (추천)
      recipe.ts
      collection.ts
    query/           # (기존) 커스텀 useQuery 훅
```

---

## 3. 데이터 흐름 및 정의 순서 (Sequence)

프로젝트의 안정성과 타입 추론을 최적화하기 위해 아래 순서대로 정의하는 것을 원칙으로 합니다.

1.  **Query Key 정의 (`src/hooks/queryKeys/`)**: 데이터의 캐시 키 계층 구조를 정의합니다.
2.  **Query Options 정의 (`src/hooks/queries/`)**: `queryKey`를 가져와 `queryFn`, `staleTime` 등을 포함한 통합 옵션 객체를 생성합니다.
3.  **Custom Query Hook 정의 (`src/hooks/query/` 또는 `src/hooks/suspenseQuery/`)**: 정의된 `queryOptions`를 전개(`...`) 하여 실제 UI 컴포넌트에서 사용할 전용 훅을 만듭니다.

---

## 4. 작성 규칙 (Code Pattern)

### 4.1 `queryOptions` 정의 방식

단순히 쿼리 키만 정의하는 것이 아니라, 실행 함수와 기본적인 옵션을 포함한 객체를 정의합니다. 검색 파라미터는 **`searchParams`**로 명명합니다.

```typescript
import { queryOptions } from '@tanstack/react-query';
import recipeKeys from '@/hooks/queryKeys/recipeKeys';
import { recipe } from '@/api/shop';

export const recipeQueries = {
    // 상세 조회 예시
    detail: (sno: number, memberNo: number | string) =>
        queryOptions({
            queryKey: recipeKeys.detail(sno, memberNo),
            queryFn: async () => {
                const { data } = await recipe.getRecipeDetail(sno);

                return data;
            },
            staleTime: 1000 * 60 * 5, // 5분
        }),

    // 목록 조회 예시
    list: (searchParams: SearchRecipesParams) =>
        queryOptions({
            queryKey: recipeKeys.list(searchParams),
            queryFn: async () => {
                const { data } = await recipe.getRecipes(searchParams);

                return data;
            },
        }),
};
```

### 4.2 서버 사이드 활용 (SSR/ISR)

`getStaticProps` 또는 `getServerSideProps`에서 쿼리를 미리 가져올 때 사용합니다.

```typescript
export const getStaticProps: GetStaticProps = async ({ params }) => {
    const queryClient = new QueryClient();
    const sno = Number(params?.sno);

    // queryOptions를 사용하여 서버와 클라이언트의 설정을 일치시킴
    await queryClient.prefetchQuery(recipeQueries.detail(sno, 0));

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
    };
};
```

### 3.3 클라이언트 사이드 활용 (Hooks)

커스텀 훅 내에서 `useQuery` 또는 `useSuspenseQuery`에 전달합니다.

```typescript
export const useRecipeDetail = (sno: number, memberNo: number) => {
    // 타입 추론이 자동으로 이루어짐
    return useSuspenseQuery(recipeQueries.detail(sno, memberNo));
};
```

---

## 4. 권장 사항

1. **상수화**: 도메인별 쿼리는 반드시 객체(`Queries`)로 묶어 관리하여 가독성을 높입니다.
2. **Key Factory와 조합**: 기존의 `queryKeys` 공용 팩토리를 `queryOptions`의 `queryKey`로 활용하여 계층 구조를 유지합니다.
3. **Select 사용**: 데이터 가공이 필요한 경우 `queryOptions` 내부에 `select`를 포함시켜 뷰 계층에서 가공 로직을 분리합니다.

---

## 5. Barrel Export 및 임포트 규칙

### 5.1 Barrel Export 패턴이란?

여러 모듈(파일)에서 내보내는 항목들을 하나의 `index.ts` 파일(Barrel)로 모아서 다시 내보내는 방식입니다.

✅ **Good Pattern (index.ts):**

```typescript
// src/hooks/queries/index.ts
export * from '@/hooks/queries/recipe';
export * from '@/hooks/queries/product';
```

### 5.2 왜 Barrel 방식을 사용해야 하는가?

- **임포트 가독성**: 사용하는 쪽에서 수많은 파일 경로를 외울 필요 없이 폴더 단위로 깔끔하게 임포트할 수 있습니다. (`import { recipeQueries, productQueries } from '@/hooks/queries'`)

* **캡슐화 및 추상화**: 폴더 내부의 복잡한 파일 구조를 외부에 숨기고, 외부에 노출할 핵심 인터페이스만 선택적으로 정리하여 내보낼 수 있습니다.

- **리팩토링 용이성**: 폴더 내부 파일명이 바뀌어도 외부 컴포넌트의 임포트 경로를 일일이 수정할 필요가 없습니다.

### 5.3 장단점 비교

| 구분            | Barrel 방식 (index.ts)                   | 개별 직접 임포트 방식                  |
| :-------------- | :--------------------------------------- | :------------------------------------- |
| **임포트 경로** | 매우 깔끔함 (폴더 경로만 사용)           | 파일이 늘어날수록 경로가 길고 복잡해짐 |
| **의존성 관리** | 중앙 집중식 관리 가능                    | 각 파일마다 파편화됨                   |
| **트리 쉐이킹** | 설정에 따라 불필요한 모듈 로드 위험 있음 | 최적화에 가장 유리함                   |
| **순환 참조**   | 잘못 사용 시 순환 참조 위험 있음         | 비교적 안전함                          |

### 5.4 절대 경로 임포트 컨벤션

프로젝트 내의 모든 모듈 임포트 시, 불필요한 상대 경로(`../../`)를 지양하고 **절대 경로 별칭(`@/`)**을 사용합니다. 이는 Barrel 파일 내부의 `export` 문에도 동일하게 적용됩니다.

```typescript
// ❌ Bad (상대 경로)$$
export * from './recipe';

// ✅ Good (절대 경로)
export * from '@/hooks/queries/recipe';
```
