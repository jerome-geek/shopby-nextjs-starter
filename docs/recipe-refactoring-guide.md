# 레시피 페이지 리팩토링 및 UX 최적화 가이드

이 문서는 레시피 리스트 페이지를 FSD-lite 아키텍처로 리팩토링하고, React Suspense와 Transition/DeferredValue를 활용하여 사용자 경험(UX)을 최적화한 과정을 기록합니다.

## 1. 아키텍처 개요 (FSD-lite)

기존의 파편화된 데이터 페칭 로직을 중앙 집중화하고 UI와 비즈니스 로직을 분리했습니다.

- **Entity Layer (`entities/recipe`)**: `queryOptions`를 정의하여 API 호출 로직을 캡슐화.
- **Hook Layer (`hooks/suspenseQuery`)**: Suspense를 지원하는 커스텀 훅을 통해 선언적 데이터 페칭 구현.
- **Page Layer (`pages/recipes`)**: 상태 관리(`nuqs`) 및 레이아웃 구성을 담당.

## 2. 해결된 문제: Suspense Fallback 깜빡임 (Flicker)

### 문제 상황
`FetchBoundary` 내부에 `useSuspenseQuery`를 사용하는 리스트가 있을 때, 페이지네이션이나 필터 변경으로 파라미터가 바뀌면 즉시 컴포넌트가 일시 중단(Suspend)되면서 부모의 `fallback`(스켈레톤)이 노출되었습니다. 이는 매번 화면이 전체적으로 비었다가 나타나는 부정적인 UX를 유발했습니다.

### 해결책: `useDeferredValue` 전략
단순히 `useTransition`으로 업데이트를 감싸는 것보다, 자식 컴포넌트 레벨에서 값을 지연 처리하는 것이 더 안정적입니다.

```tsx
const RecipeList = ({ queryParams }) => {
    // 1. 파라미터 업데이트를 지연시킴
    const deferredParams = useDeferredValue(queryParams);
    
    // 2. 실제 파라미터와 지연된 파라미터를 비교하여 로딩 상태 감지
    const isPending = queryParams !== deferredParams;

    // 3. 지연된 파라미터로 데이터를 가져옴 (데이터가 올 때까지 이전 UI 박제)
    const { data } = usePublicRecipeSuspenseSearch({ searchParams: deferredParams });

    return (
        <div style={{ opacity: isPending ? 0.5 : 1 }}>
            {/* 리스트 렌더링 */}
        </div>
    );
};
```

## 3. `useTransition` vs `useDeferredValue` 가이드

리액트의 동시성 훅을 선택할 때는 **"업데이트의 주도권"**이 어디에 있는지를 기준으로 판단합니다.

| 훅 | 사용 시점 (When) | 핵심 역할 |
| :--- | :--- | :--- |
| **`useTransition`** | 본인이 직접 `setSomething` 함수를 실행할 때 | 업데이트 트리거를 낮은 우선순위로 설정 |
| **`useDeferredValue`** | 외부(부모, URL 등)로부터 새로운 Props를 내려받을 때 | 들어온 값을 낮은 우선순위로 렌더링 (이전 UI 유지) |

### 실무 적용 팁
- **컴포넌트 내 독립적 업데이트**: `useTransition`을 써서 동작을 감싸세요.
- **공통/전역 상태(URL 등) 기반 렌더링**: `useDeferredValue`를 써서 자식이 스스로 이전 UI를 유지하도록 방어하세요.

## 4. 최종 컴포넌트 구조

현재 레시피 페이지는 아래와 같은 계층 구조를 가집니다.

1. **`RecipesPage`**: 헤더 UI 및 `nuqs` 상태 관리.
2. **`FetchBoundary`**: 에러 처리 및 초기 로딩(스켈레톤) 담당.
3. **`RecipeList`**: `useDeferredValue`를 사용하여 데이터 로딩 중에도 기존 리스트를 화면에 유지 (투명도 0.5 처리).

이 패턴은 페이지 전체가 리프레시되는 느낌을 지우고, 사용자가 끊김 없이 리스트를 탐색할 수 있게 합니다.
