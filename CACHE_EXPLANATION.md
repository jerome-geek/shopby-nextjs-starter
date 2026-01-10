# React cache() 동작 원리

## 기본 개념

`cache()`는 함수를 감싸서, **같은 인자(파라미터 값)로 호출되면 캐시된 결과를 반환**합니다.

## 동작 방식

### 예시 1: 인자가 없는 경우

```typescript
import { cache } from 'react';

const getMall = cache(async () => {
    console.log('API 호출됨!');
    return request.get('malls').json();
});

// 첫 번째 호출
const data1 = await getMall(); // "API 호출됨!" 출력 → 캐시 생성

// 두 번째 호출 (같은 렌더링 사이클 내)
const data2 = await getMall(); // 출력 없음 → 캐시에서 가져옴

// data1 === data2 (같은 객체 참조)
```

**결과**: 인자가 없으므로 항상 같은 캐시를 사용합니다.

### 예시 2: 인자가 있는 경우

```typescript
import { cache } from 'react';

const getUserProfile = cache(async (userId: string) => {
    console.log(`사용자 ${userId} 프로필 조회`);
    return request.get(`users/${userId}`).json();
});

// 첫 번째 호출
const user1 = await getUserProfile("123"); 
// "사용자 123 프로필 조회" 출력 → 캐시 생성 (키: "123")

// 두 번째 호출 (같은 userId)
const user2 = await getUserProfile("123"); 
// 출력 없음 → 캐시에서 가져옴 (키: "123")

// 세 번째 호출 (다른 userId)
const user3 = await getUserProfile("456"); 
// "사용자 456 프로필 조회" 출력 → 새로운 캐시 생성 (키: "456")

// 네 번째 호출 (다시 첫 번째 userId)
const user4 = await getUserProfile("123"); 
// 출력 없음 → 기존 캐시에서 가져옴 (키: "123")
```

**결과**: 
- `userId = "123"` → 캐시 키: `["123"]`
- `userId = "456"` → 캐시 키: `["456"]`
- 같은 인자 값이면 같은 캐시 사용, 다른 인자 값이면 다른 캐시 사용

### 예시 3: 여러 인자가 있는 경우

```typescript
import { cache } from 'react';

const getProduct = cache(async (productId: number, options?: { includeReviews?: boolean }) => {
    console.log(`상품 ${productId} 조회`, options);
    return request.get(`products/${productId}`, { searchParams: options }).json();
});

// 첫 번째 호출
const p1 = await getProduct(1, { includeReviews: true });
// 캐시 키: [1, { includeReviews: true }]

// 두 번째 호출 (같은 인자)
const p2 = await getProduct(1, { includeReviews: true });
// 캐시 키: [1, { includeReviews: true }] → 같은 캐시 사용

// 세 번째 호출 (다른 인자)
const p3 = await getProduct(1, { includeReviews: false });
// 캐시 키: [1, { includeReviews: false }] → 새로운 캐시 생성

// 네 번째 호출 (인자 없음)
const p4 = await getProduct(1);
// 캐시 키: [1, undefined] → 또 다른 캐시 생성
```

**결과**: 모든 인자 값의 조합이 캐시 키가 됩니다.

## 실제 사용 예시

### 공통 데이터 (인자 없음)

```typescript
// src/api/admin/mall.ts
import { cache } from 'react';

const mall = {
    // 인자가 없으므로 모든 사용자에게 동일한 결과
    getMall: cache(async () => {
        return request.get('malls', {}).json<GetMallResponse>();
    }),
};
```

**사용:**
```typescript
// Header.tsx
const mallData1 = await mall.getMall(); // API 호출

// Footer.tsx  
const mallData2 = await mall.getMall(); // 캐시에서 가져옴 (API 호출 안 함)
```

### 사용자별 데이터 (인자 있음)

```typescript
// src/api/order/cart.ts
import { cache } from 'react';
import { getTokenFromAppRouter } from '@/api/core/utils';

const cart = {
    // 방법 1: 토큰을 인자로 받기
    getCartCount: cache(async (token: string | null) => {
        if (!token) return { count: 0 };
        return request.get('carts/count', {
            headers: { Authorization: `Bearer ${token}` }
        }).json();
    }),
    
    // 방법 2: 함수 내부에서 토큰 가져오기
    // ⚠️ 주의: 이 방법은 cache()가 제대로 작동하지 않을 수 있습니다!
    // 왜냐하면 함수 내부에서 가져온 값은 캐시 키에 포함되지 않기 때문입니다.
    getCartCount2: cache(async () => {
        const token = await getTokenFromAppRouter(); // 이 값은 캐시 키에 포함 안 됨!
        if (!token) return { count: 0 };
        return request.get('carts/count', {
            headers: { Authorization: `Bearer ${token}` }
        }).json();
    }),
};
```

**사용:**
```typescript
// Header.tsx
const token = await getTokenFromAppRouter();
const cartData1 = await cart.getCartCount(token); // token="abc123" → 캐시 키: ["abc123"]

// 다른 컴포넌트
const cartData2 = await cart.getCartCount(token); // token="abc123" → 같은 캐시 사용

// 다른 사용자
const token2 = await getTokenFromAppRouter(); // token="xyz789"
const cartData3 = await cart.getCartCount(token2); // token="xyz789" → 다른 캐시 생성
```

## 중요 포인트

1. **캐시 키 = 함수의 인자 값들**
   - `cache(fn)(arg1, arg2)` → 캐시 키: `[arg1, arg2]`
   - 인자가 없으면: `[]` (항상 같은 캐시)

2. **같은 렌더링 사이클 내에서만 유효**
   - Server Component의 경우, 같은 요청(request) 내에서만 캐시가 유효합니다
   - 다른 요청에서는 새로운 캐시가 생성됩니다

3. **인자 비교는 얕은 비교(Shallow Comparison)**
   - 객체나 배열의 경우, 참조가 같아야 같은 캐시로 인식됩니다
   - `{ a: 1 }`과 `{ a: 1 }`은 다른 캐시로 인식될 수 있습니다

4. **함수 내부에서 가져온 값은 캐시 키에 포함 안 됨**
   ```typescript
   // ❌ 잘못된 예시
   const getData = cache(async () => {
       const userId = await getUserId(); // 이 값은 캐시 키에 포함 안 됨!
       return fetch(`/api/users/${userId}`);
   });
   
   // ✅ 올바른 예시
   const getData = cache(async (userId: string) => {
       return fetch(`/api/users/${userId}`); // userId가 캐시 키에 포함됨
   });
   ```

## 요약

- **`cache()`의 캐시 키 = 함수에 전달된 인자(파라미터) 값들**
- 인자가 없으면 항상 같은 캐시 사용
- 인자가 있으면 인자 값이 같으면 같은 캐시, 다르면 다른 캐시 사용
- 사용자별 데이터는 사용자 식별자(토큰 등)를 **인자로 전달**해야 합니다

