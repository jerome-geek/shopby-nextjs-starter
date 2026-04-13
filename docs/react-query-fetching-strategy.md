# React Query: prefetchQuery vs fetchQuery

SSR(getServerSideProps) 환경에서 데이터를 패칭할 때 사용하는 `prefetchQuery`와 `fetchQuery`의 차이점을 정리합니다.

## 비교 요약

| 구분 | `fetchQuery` | `prefetchQuery` |
|---|---|---|
| **반환값** | `Promise<TData>` (데이터 객체 반환) | `Promise<void>` (반환값 없음) |
| **에러 처리** | Promise rejection이 발생하며 throw됨. `try/catch`로 제어 가능. | 에러 발생 시 내부적으로 catch하여 무시함. |
| **주요 용도** | SSR 시 데이터를 직접 활용해야 하거나(SEO 등), 에러 핸들링이 필수적일 때. | 캐시 워밍(Cache Warming)이 주 목적이며, 실패해도 큰 문제가 없을 때. |

---

## 상세 분석

### 1. fetchQuery (추천 사용법)
`fetchQuery`는 성공 시 데이터를 반환하고, 실패 시 에러를 throw합니다.

```typescript
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const queryClient = new QueryClient();
    const sno = Number(params?.sno);

    try {
        // 1. 데이터를 직접 변수에 할당하여 SEO 데이터 생성 등에 활용 가능
        const data = await queryClient.fetchQuery({
            queryKey: recipeKeys.detail(sno),
            queryFn: () => getRecipeDetail(sno),
        });

        return {
            props: {
                dehydratedState: dehydrate(queryClient),
                seoData: { title: data.title }, // 데이터 활용
            },
        };
    } catch (error) {
        // 2. 에러 발생 시 404 페이지나 커스텀 에러 페이지로 유도 가능
        return { notFound: true };
    }
};
```

### 2. prefetchQuery
`prefetchQuery`는 캐시에 데이터를 채우는 역할만 수행하며, 에러가 발생해도 런타임 에러를 발생시키지 않습니다.

```typescript
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const queryClient = new QueryClient();
    const sno = Number(params?.sno);

    // 에러가 발생해도 catch되지 않고 그대로 진행됨
    await queryClient.prefetchQuery({
        queryKey: recipeKeys.detail(sno),
        queryFn: () => getRecipeDetail(sno),
    });

    return {
        props: {
            dehydratedState: dehydrate(queryClient), // 실패 시 캐시는 비어있게 됨
        },
    };
};
```

## 결론
상품 상세나 레시피 상세와 같이 **데이터가 반드시 있어야 페이지가 성립하거나, 해당 데이터로 SEO(Title, Description 등)를 처리해야 하는 경우**에는 반드시 **`fetchQuery`**를 사용해야 합니다.
