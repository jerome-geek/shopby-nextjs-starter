# API 사용 예시

## 구조 요약

```
src/
├── api/                    # Layer 1: 순수 HTTP 요청 (재사용 가능)
│   └── admin/
│       └── mall.ts         # ✅ cache() 없음, 순수 HTTP 요청만
│
└── hooks/                  # Layer 2: Client Component용 Hook
    └── query/
        └── admin/
            └── useMall.ts # ✅ useQuery로 감싼 커스텀 훅
```

## 사용 방법

### 1. Server Component에서 사용

**각 컴포넌트에서 `cache()`로 감싸서 사용:**

```typescript
// src/components/Header.tsx
import { cache } from 'react';
import { mall } from '@/api/admin';

// Server Component에서 사용하기 위해 cache() 적용
const getMallCached = cache(mall.getMall);

export default async function Header() {
    // 같은 렌더링 사이클 내에서 여러 번 호출해도 한 번만 실행됨
    const mallData = await getMallCached();
    
    return <header>...</header>;
}
```

**장점:**
- ✅ API 레이어는 순수 HTTP 요청만 (재사용 가능)
- ✅ Server Component에서만 `cache()` 적용
- ✅ Client Component에서도 같은 API 사용 가능

### 2. Client Component에서 사용

**`useQuery`로 감싼 커스텀 훅 사용:**

```typescript
// src/components/SomeClientComponent.tsx
'use client';

import { useMall } from '@/hooks/query/admin';

export default function SomeClientComponent() {
    const { data, isLoading, error } = useMall();
    
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    
    return <div>{data?.mallName}</div>;
}
```

**장점:**
- ✅ 자동 캐싱, 리프레시, 에러 처리
- ✅ 로딩 상태 관리
- ✅ 여러 컴포넌트에서 사용해도 한 번만 호출됨

### 3. 여러 컴포넌트에서 동시 사용

**Server Component (Header, Footer):**
```typescript
// src/components/Header.tsx
import { cache } from 'react';
import { mall } from '@/api/admin';

const getMallCached = cache(mall.getMall);

export default async function Header() {
    const mallData = await getMallCached(); // 첫 번째 호출
    return <header>...</header>;
}

// src/components/Footer.tsx
import { cache } from 'react';
import { mall } from '@/api/admin';

const getMallCached = cache(mall.getMall); // 같은 함수 참조

export default async function Footer() {
    const mallData = await getMallCached(); // 캐시에서 가져옴 (실제 호출 안 됨)
    return <footer>...</footer>;
}
```

**결과:** 같은 렌더링 사이클 내에서 한 번만 API 호출됨 ✅

**Client Component:**
```typescript
// src/components/ComponentA.tsx
'use client';
import { useMall } from '@/hooks/query/admin';

export default function ComponentA() {
    const { data } = useMall(); // 첫 번째 호출
    return <div>{data?.mallName}</div>;
}

// src/components/ComponentB.tsx
'use client';
import { useMall } from '@/hooks/query/admin';

export default function ComponentB() {
    const { data } = useMall(); // React Query 캐시에서 가져옴 (실제 호출 안 됨)
    return <div>{data?.mallName}</div>;
}
```

**결과:** React Query가 자동으로 캐싱하여 한 번만 호출됨 ✅

## 비교표

| 사용 위치 | 방법 | 캐싱 | 재사용성 |
|----------|------|------|---------|
| **Server Component** | `cache(mall.getMall)` | 같은 렌더링 사이클 내 | ✅ 높음 |
| **Client Component** | `useMall()` Hook | React Query 자동 캐싱 | ✅ 높음 |
| **API 레이어** | `mall.getMall()` | 없음 (순수 함수) | ✅ 매우 높음 |

## 주의사항

### ❌ 잘못된 사용

```typescript
// ❌ API 레이어에 cache() 포함
// src/api/admin/mall.ts
getMall: cache(async () => { ... })  // Client Component에서 사용 불가!

// ❌ Server Component에서 직접 호출 (중복 호출 발생)
// src/components/Header.tsx
const data = await mall.getMall();  // cache() 없으면 중복 호출!

// ❌ Client Component에서 직접 호출
// src/components/SomeComponent.tsx
const data = await mall.getMall();  // 'use client'에서 async/await 불가!
```

### ✅ 올바른 사용

```typescript
// ✅ API 레이어: 순수 HTTP 요청만
// src/api/admin/mall.ts
getMall: async () => { ... }

// ✅ Server Component: cache()로 감싸서 사용
// src/components/Header.tsx
const getMallCached = cache(mall.getMall);
const data = await getMallCached();

// ✅ Client Component: useQuery Hook 사용
// src/components/SomeComponent.tsx
const { data } = useMall();
```

## 요약

1. **API 레이어 (`src/api/`)**: 순수 HTTP 요청만 포함
2. **Server Component**: `cache()`로 감싸서 사용
3. **Client Component**: `useQuery`로 감싼 커스텀 훅 사용
4. **재사용성**: API 레이어는 모든 곳에서 재사용 가능

