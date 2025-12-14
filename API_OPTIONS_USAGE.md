# API Options 사용 가이드

## 변경 사항

`getMall` 함수가 이제 `options` 파라미터를 선택적으로 받을 수 있습니다.

```typescript
// src/api/admin/mall.ts
getMall: async (options?: Options): Promise<GetMallResponse> => {
    return request.get('malls', options).json<GetMallResponse>();
}
```

## 사용 방법

### 1. 기본 사용 (options 없음)

```typescript
// Server Component
import { cache } from 'react';
import { mall } from '@/api/admin';

const getMallCached = cache((options?: Parameters<typeof mall.getMall>[0]) => 
    mall.getMall(options)
);

const mallData = await getMallCached(); // options 없이 호출
```

### 2. Options 전달 (헤더 추가, 쿼리 파라미터 등)

```typescript
// Server Component - 헤더 추가
const mallData = await getMallCached({
    headers: {
        'Custom-Header': 'value',
    },
});

// Server Component - 쿼리 파라미터 추가
const mallData = await getMallCached({
    searchParams: {
        includeCategories: 'true',
    },
});

// Server Component - 타임아웃 설정
const mallData = await getMallCached({
    timeout: 5000, // 5초
});
```

### 3. Client Component에서 사용

```typescript
// src/hooks/query/admin/useMall.ts
import { useQuery } from '@tanstack/react-query';
import type { Options } from 'ky';
import { mall } from '@/api/admin';

export const useMall = (options?: Options) => {
    return useQuery({
        queryKey: ['mall', options], // options가 다르면 다른 캐시
        queryFn: () => mall.getMall(options),
        staleTime: 1000 * 60 * 60,
    });
};

// 사용 예시
const { data } = useMall({
    headers: {
        'Authorization': `Bearer ${token}`,
    },
});
```

## Options 타입

`ky`의 `Options` 타입을 사용하며, 주요 옵션들:

```typescript
interface Options {
    // 헤더
    headers?: Record<string, string>;
    
    // 쿼리 파라미터
    searchParams?: Record<string, string | number | boolean>;
    
    // 타임아웃 (밀리초)
    timeout?: number;
    
    // 재시도 설정
    retry?: RetryOptions;
    
    // 기타 ky 옵션들...
}
```

## 주의사항

### 1. cache()와 options

`cache()`는 함수의 인자를 기반으로 캐시 키를 생성합니다.

```typescript
// 같은 options → 같은 캐시
await getMallCached({ headers: { 'X-Token': 'abc' } });
await getMallCached({ headers: { 'X-Token': 'abc' } }); // 캐시 사용

// 다른 options → 다른 캐시
await getMallCached({ headers: { 'X-Token': 'abc' } });
await getMallCached({ headers: { 'X-Token': 'xyz' } }); // 새로운 호출
```

### 2. 객체 참조 비교

`cache()`는 얕은 비교를 사용하므로, 객체 참조가 다르면 다른 캐시로 인식될 수 있습니다.

```typescript
// ❌ 잘못된 사용
const options1 = { headers: { 'X-Token': 'abc' } };
const options2 = { headers: { 'X-Token': 'abc' } };
await getMallCached(options1);
await getMallCached(options2); // 다른 캐시로 인식될 수 있음

// ✅ 올바른 사용
const options = { headers: { 'X-Token': 'abc' } };
await getMallCached(options);
await getMallCached(options); // 같은 캐시 사용
```

### 3. React Query와 options

React Query도 `queryKey`에 options를 포함시켜야 합니다.

```typescript
// ✅ 올바른 사용
const useMall = (options?: Options) => {
    return useQuery({
        queryKey: ['mall', options], // options 포함
        queryFn: () => mall.getMall(options),
    });
};
```

## 실제 사용 예시

### 인증 토큰이 필요한 경우

```typescript
// Server Component
import { getTokenFromAppRouter } from '@/api/core/utils';

const token = await getTokenFromAppRouter();
const mallData = await getMallCached({
    headers: {
        Authorization: `Bearer ${token}`,
    },
});
```

### 쿼리 파라미터가 필요한 경우

```typescript
const mallData = await getMallCached({
    searchParams: {
        includeCategories: 'true',
        includePartners: 'false',
    },
});
```

## 요약

1. ✅ `getMall` 함수는 이제 `options` 파라미터를 선택적으로 받을 수 있습니다
2. ✅ `cache()`로 감싼 함수도 options를 전달할 수 있습니다
3. ✅ options가 다르면 다른 캐시가 생성됩니다
4. ✅ React Query 사용 시 `queryKey`에 options를 포함해야 합니다

