# 사용자별 API 처리 가이드

## 문제 상황

`cache()`는 같은 렌더링 사이클 내에서 동일한 함수 호출을 중복 제거합니다. 하지만 사용자별로 달라지는 API(예: 장바구니, 프로필)의 경우, 사용자별로 다른 결과를 반환해야 합니다.

## 해결 방법

### 방법 1: cache()에 사용자 식별자 포함 (권장)

사용자별로 다른 캐시 키를 생성하도록 `cache()` 함수에 사용자 식별자를 포함시킵니다.

```typescript
// src/api/order/cart.ts
import { cache } from 'react';
import { headers } from 'next/headers';
import request from '@/api/core/request';
import { getTokenFromAppRouter } from '@/api/core/utils';
import { GetCartCountResponse } from '@/models/order/cart';

const cart = {
    /**
     * 장바구니 개수 조회 (사용자별)
     * - cache()에 사용자 토큰을 포함시켜 사용자별로 다른 캐시 생성
     */
    getCartCount: cache(async (): Promise<GetCartCountResponse> => {
        const token = await getTokenFromAppRouter();
        
        if (!token) {
            return { count: 0 };
        }

        return request
            .get('carts/count', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .json<GetCartCountResponse>();
    }),
};

export default cart;
```

**동작 방식:**
- `cache()`는 함수의 **인자**를 기반으로 캐시 키를 생성합니다
- 사용자 토큰을 인자로 받으면, 사용자별로 다른 캐시가 생성됩니다
- 같은 사용자의 여러 컴포넌트에서 호출해도 한 번만 실행됩니다

### 방법 2: 사용자 토큰을 인자로 받기

더 명시적으로 사용자 토큰을 인자로 받아서 처리합니다.

```typescript
// src/api/order/cart.ts
import { cache } from 'react';
import request from '@/api/core/request';
import { GetCartCountResponse } from '@/models/order/cart';

const cart = {
    /**
     * 장바구니 개수 조회 (사용자별)
     * - 사용자 토큰을 인자로 받아서 사용자별 캐시 생성
     */
    getCartCount: cache(async (token: string | null): Promise<GetCartCountResponse> => {
        if (!token) {
            return { count: 0 };
        }

        return request
            .get('carts/count', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .json<GetCartCountResponse>();
    }),
};

export default cart;

// 사용 예시
// src/components/Header.tsx
import { getTokenFromAppRouter } from '@/api/core/utils';
import { cart } from '@/api/order';

export default async function Header() {
    const token = await getTokenFromAppRouter();
    const cartData = await cart.getCartCount(token); // 사용자별로 다른 결과
    
    return (
        <header>
            <CartIcon count={cartData.count} />
        </header>
    );
}
```

### 방법 3: cache() 사용하지 않기 (동적 데이터)

매번 최신 데이터가 필요한 경우, `cache()`를 사용하지 않고 직접 호출합니다.

```typescript
// src/api/order/cart.ts
import { headers } from 'next/headers';
import request from '@/api/core/request';
import { getTokenFromAppRouter } from '@/api/core/utils';
import { GetCartCountResponse } from '@/models/order/cart';

const cart = {
    /**
     * 장바구니 개수 조회 (사용자별, 캐시 없음)
     * - 매번 최신 데이터가 필요한 경우
     */
    getCartCount: async (): Promise<GetCartCountResponse> => {
        const token = await getTokenFromAppRouter();
        
        if (!token) {
            return { count: 0 };
        }

        return request
            .get('carts/count', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .json<GetCartCountResponse>();
    },
};

export default cart;
```

**주의사항:**
- `cache()`를 사용하지 않으면, 같은 컴포넌트에서 여러 번 호출하면 여러 번 실행됩니다
- 필요시 컴포넌트 레벨에서 한 번만 호출하도록 주의해야 합니다

### 방법 4: Client Component + React Query (권장 - 동적 UI)

사용자별 데이터가 자주 변경되거나 실시간으로 업데이트가 필요한 경우, Client Component에서 React Query를 사용합니다.

```typescript
// src/components/CartIcon.tsx
'use client';

import { useQuery } from '@tanstack/react-query';
import { cart } from '@/api/order';

export default function CartIcon() {
    const { data } = useQuery({
        queryKey: ['cart', 'count'],
        queryFn: () => cart.getCartCount(),
        staleTime: 1000 * 60, // 1분
    });

    return (
        <div>
            <CartIconSVG />
            {data?.count > 0 && <Badge>{data.count}</Badge>}
        </div>
    );
}
```

## 비교표

| 방법 | 사용 시기 | 장점 | 단점 |
|------|----------|------|------|
| **방법 1: cache() + 토큰** | Server Component, 사용자별 데이터 | 같은 사용자 내에서 중복 제거 | 토큰이 없으면 기본값 반환 |
| **방법 2: cache() + 인자** | Server Component, 명시적 처리 | 명확한 사용자 구분 | 매번 토큰 전달 필요 |
| **방법 3: cache() 없음** | 항상 최신 데이터 필요 | 항상 최신 데이터 | 중복 호출 가능 |
| **방법 4: React Query** | Client Component, 동적 UI | 자동 리프레시, 캐싱 | Client Component 필요 |

## 실제 적용 예시

### 장바구니 카운트 (Header에서 사용)

```typescript
// src/api/order/cart.ts
import { cache } from 'react';
import { getTokenFromAppRouter } from '@/api/core/utils';
import request from '@/api/core/request';
import { GetCartCountResponse } from '@/models/order/cart';

const cart = {
    getCartCount: cache(async (): Promise<GetCartCountResponse> => {
        const token = await getTokenFromAppRouter();
        
        if (!token) {
            return { count: 0 };
        }

        return request
            .get('carts/count', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .json<GetCartCountResponse>();
    }),
};

export default cart;

// src/components/Header.tsx
import { cart } from '@/api/order';

export default async function Header() {
    const cartData = await cart.getCartCount(); // 사용자별로 다른 결과
    
    return (
        <header>
            <CartIcon count={cartData.count} />
        </header>
    );
}
```

## 요약

1. **공통 데이터 (mall 정보 등)**: `cache()` 사용, 인자 없음
2. **사용자별 데이터 (장바구니, 프로필)**: `cache()` 사용하되, 사용자 토큰을 인자로 포함하거나 함수 내부에서 가져오기
3. **동적 UI (실시간 업데이트)**: Client Component + React Query 사용

