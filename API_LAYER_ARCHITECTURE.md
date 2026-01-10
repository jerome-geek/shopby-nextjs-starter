# API 레이어 아키텍처 가이드

## 현재 구조 분석

```
src/
├── api/              # API 호출 레이어 (순수 HTTP 요청)
│   ├── admin/
│   │   └── mall.ts   # ⚠️ 현재 cache() 포함되어 있음 (문제!)
│   └── member/       # ✅ 순수 HTTP 요청만
│
└── hooks/            # React Query Hook 레이어
    └── query/
        └── member/
            └── profile/
                └── useProfile.ts  # ✅ useQuery로 감싼 커스텀 훅
```

## 문제점

1. **`src/api/admin/mall.ts`에 `cache()` 포함**
   - API 레이어는 순수한 HTTP 요청만 있어야 함
   - `cache()`는 Server Component 전용이므로 Client Component에서 사용 불가
   - 재사용성이 떨어짐

2. **일관성 부족**
   - `src/api/member`는 순수 HTTP 요청
   - `src/api/admin/mall`은 `cache()` 포함
   - 구조가 일관되지 않음

## 권장 구조

### 레이어 분리

```
src/
├── api/                    # Layer 1: 순수 HTTP 요청 (재사용 가능)
│   ├── admin/
│   │   └── mall.ts         # ✅ cache() 제거, 순수 HTTP 요청만
│   └── member/
│       └── profile.ts      # ✅ 순수 HTTP 요청만
│
├── services/               # Layer 2: Server Component용 Service (선택적)
│   └── admin/
│       └── mallService.ts  # cache() 적용된 Server Component용 함수
│
└── hooks/                  # Layer 3: Client Component용 Hook
    └── query/
        ├── admin/
        │   └── useMall.ts  # useQuery로 감싼 커스텀 훅
        └── member/
            └── profile/
                └── useProfile.ts
```

## 사용 방법

### 1. Server Component에서 사용

**방법 A: 직접 cache() 사용 (간단)**
```typescript
// src/components/Header.tsx
import { cache } from 'react';
import { mall } from '@/api/admin';

export default async function Header() {
    // 직접 cache()로 감싸서 사용
    const getMallCached = cache(mall.getMall);
    const mallData = await getMallCached();
    
    return <header>...</header>;
}
```

**방법 B: Service 레이어 사용 (명확)**
```typescript
// src/services/admin/mallService.ts
import { cache } from 'react';
import { mall } from '@/api/admin';

export const mallService = {
    getMall: cache(mall.getMall),
};

// src/components/Header.tsx
import { mallService } from '@/services/admin';

export default async function Header() {
    const mallData = await mallService.getMall();
    return <header>...</header>;
}
```

### 2. Client Component에서 사용

```typescript
// src/hooks/query/admin/useMall.ts
import { useQuery } from '@tanstack/react-query';
import { mall } from '@/api/admin';
import { mallKeys } from '@/hooks/queryKeys';

export const useMall = () => {
    return useQuery({
        queryKey: mallKeys.all,
        queryFn: () => mall.getMall(),
        staleTime: 1000 * 60 * 60, // 1시간
    });
};

// src/components/SomeClientComponent.tsx
'use client';

import { useMall } from '@/hooks/query/admin';

export default function SomeClientComponent() {
    const { data, isLoading } = useMall();
    
    if (isLoading) return <div>Loading...</div>;
    return <div>{data?.mallName}</div>;
}
```

## 권장 사항

### ✅ 권장: 방법 A (직접 cache() 사용)

**장점:**
- 추가 레이어 불필요
- 간단하고 명확
- 기존 코드와 일관성 유지

**단점:**
- 각 컴포넌트에서 `cache()` 호출 필요

### ⚠️ 선택적: 방법 B (Service 레이어)

**장점:**
- Server Component용 로직 중앙화
- 재사용성 높음
- 테스트 용이

**단점:**
- 추가 레이어 필요
- 복잡도 증가

## 결론

**API 레이어는 순수한 HTTP 요청만 포함해야 합니다.**

- ✅ Server Component: 직접 `cache()`로 감싸서 사용
- ✅ Client Component: `hooks/query/`에서 `useQuery`로 감싼 커스텀 훅 사용
- ✅ API 레이어: `cache()` 제거, 순수 HTTP 요청만

