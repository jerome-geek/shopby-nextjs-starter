# cache() 동작 확인 가이드

## 문제점

Server Component에서 `cache()`가 적용된 함수는 서버에서 실행되므로, 브라우저의 네트워크 탭에서는 확인할 수 없습니다.

## 확인 방법

### 방법 1: 콘솔 로그로 확인 (가장 간단)

함수 내부에 로그를 추가하여 실제 호출 횟수를 확인합니다.

```typescript
// src/api/admin/mall.ts
getMall: cache(async (): Promise<GetMallResponse> => {
    const timestamp = new Date().toISOString();
    console.log(`[getMall] 🚀 실제 API 호출 발생! ${timestamp}`);
    
    const result = await request.get('malls', {}).json<GetMallResponse>();
    
    console.log(`[getMall] ✅ API 응답 완료! ${timestamp}`);
    return result;
}),
```

**확인 방법:**
1. 터미널에서 `yarn dev` 실행
2. 브라우저에서 페이지 접속
3. 터미널 로그 확인:
   - `cache()`가 작동하면: `[getMall] 🚀 실제 API 호출 발생!` 로그가 **1번만** 출력됨
   - `cache()`가 작동하지 않으면: 로그가 **2번 이상** 출력됨 (Header, Footer 각각 호출)

**예상 출력 (cache() 작동 시):**
```
[getMall] 🚀 실제 API 호출 발생! 2025-01-XX...
[getMall] ✅ API 응답 완료! 2025-01-XX...
```

**예상 출력 (cache() 작동 안 할 시):**
```
[getMall] 🚀 실제 API 호출 발생! 2025-01-XX...
[getMall] ✅ API 응답 완료! 2025-01-XX...
[getMall] 🚀 실제 API 호출 발생! 2025-01-XX...  ← 중복 호출!
[getMall] ✅ API 응답 완료! 2025-01-XX...
```

### 방법 2: 호출 스택 확인

어디서 호출되었는지 확인하여 중복 호출을 찾습니다.

```typescript
getMall: cache(async (): Promise<GetMallResponse> => {
    console.log(`[getMall] 호출 스택:`, new Error().stack?.split('\n').slice(1, 4).join('\n'));
    return request.get('malls', {}).json<GetMallResponse>();
}),
```

### 방법 3: 타임스탬프 비교

각 컴포넌트에서 호출 시간을 기록하여 비교합니다.

```typescript
// src/components/Header.tsx
export default async function Header() {
    const startTime = Date.now();
    const data = await mall.getMall();
    const endTime = Date.now();
    console.log(`[Header] getMall 호출 시간: ${endTime - startTime}ms`);
    // ...
}

// src/components/Footer.tsx
export default async function Footer({ data }: FooterProps) {
    const startTime = Date.now();
    const data11 = await mall.getMall();
    const endTime = Date.now();
    console.log(`[Footer] getMall 호출 시간: ${endTime - startTime}ms`);
    // ...
}
```

**확인:**
- `cache()`가 작동하면: 두 번째 호출은 거의 0ms (캐시에서 즉시 반환)
- `cache()`가 작동하지 않으면: 두 호출 모두 실제 네트워크 시간이 소요됨

### 방법 4: 서버 로그 확인 (프로덕션)

프로덕션 환경에서는 서버 로그를 확인합니다.

```typescript
// 실제 HTTP 요청을 로깅하는 미들웨어 추가
// next.config.ts 또는 middleware.ts
```

### 방법 5: Next.js 빌드 로그 확인

빌드 시 로그를 확인하여 중복 호출을 찾습니다.

```bash
yarn build
```

빌드 로그에서 같은 API가 여러 번 호출되는지 확인합니다.

## 실제 테스트 시나리오

### 테스트 1: cache() 적용 전

```typescript
// cache() 없이
getMall: async () => {
    console.log('[getMall] 호출됨');
    return request.get('malls', {}).json<GetMallResponse>();
},
```

**예상 결과:**
```
[getMall] 호출됨  ← Header에서 호출
[getMall] 호출됨  ← Footer에서 호출 (중복!)
```

### 테스트 2: cache() 적용 후

```typescript
// cache() 적용
getMall: cache(async () => {
    console.log('[getMall] 호출됨');
    return request.get('malls', {}).json<GetMallResponse>();
}),
```

**예상 결과:**
```
[getMall] 호출됨  ← Header에서 호출 (실제 API 호출)
                    ← Footer에서 호출 (캐시 사용, 로그 없음)
```

## 디버깅 팁

### 1. 개발 환경에서 확인

```bash
# 터미널 1: 개발 서버 실행
yarn dev

# 터미널 2: 로그 필터링
yarn dev | grep "\[getMall\]"
```

### 2. 조건부 로깅

개발 환경에서만 로그를 출력하도록 설정:

```typescript
getMall: cache(async (): Promise<GetMallResponse> => {
    if (process.env.NODE_ENV === 'development') {
        console.log(`[getMall] 🚀 실제 API 호출 발생!`);
    }
    return request.get('malls', {}).json<GetMallResponse>();
}),
```

### 3. 성능 측정

```typescript
getMall: cache(async (): Promise<GetMallResponse> => {
    const start = performance.now();
    const result = await request.get('malls', {}).json<GetMallResponse>();
    const end = performance.now();
    
    if (process.env.NODE_ENV === 'development') {
        console.log(`[getMall] 실행 시간: ${(end - start).toFixed(2)}ms`);
    }
    
    return result;
}),
```

## 요약

1. **가장 간단한 방법**: 함수 내부에 `console.log` 추가 → 터미널에서 로그 확인
2. **확인 포인트**: 로그가 1번만 출력되면 `cache()` 작동 중
3. **주의사항**: Server Component이므로 브라우저 콘솔이 아닌 **터미널 로그**를 확인해야 함

