# Axios Interceptor 분석 및 설계

## 구조 개요

```
src/
  providers/
    AppProviders.tsx          # 앱 전체 Provider 조합 (OverlayProvider 포함)
  hooks/
    useAxiosInterceptor.ts    # shopbyRequest 인터셉터 (인증/토큰 갱신)
    useGeekInterceptor.ts     # geekRequest 인터셉터 (앱 토큰 주입)
  api/core/
    request.ts                # shopbyRequest axios 인스턴스
    geekRequest.ts            # geekRequest axios 인스턴스
```

### Provider 트리

```
AppProviders
  └── OverlayProvider           # useDialog 사용을 위해 반드시 상위에 위치
      └── InterceptorSetup      # useAxiosInterceptor + useGeekInterceptor 호출
          └── CertificationCheckProvider
              └── children
```

> `AppProviders` 내부에 `OverlayProvider`가 포함되어 있어, `useAxiosInterceptor`에서
> `useDialog`(overlay-kit 기반)를 사용하는 구조적 제약이 코드 레벨에서 보장됩니다.

---

## useAxiosInterceptor 분석

### 동작 흐름

```
Request Interceptor
  ├── 게스트 엔드포인트 → guestToken 헤더 주입
  ├── oauth2 PUT → Refresh-Token 헤더 추가
  └── 일반 요청 → accessToken 헤더 주입

Response Interceptor (401 처리)
  ├── oauth2 PUT 401 → 리프레시 토큰 만료 → handleSessionExpired
  ├── 게스트 요청 401 → 갱신 없이 reject
  ├── _retry=true 401 → 재시도 후에도 실패 → handleSessionExpired
  ├── 갱신 진행 중 → refreshQueue 대기 → 새 토큰으로 재시도
  └── 첫 401 → 토큰 갱신 시도 → 성공 시 원래 요청 재시도
```

### 동시 요청 401 처리 (Queue 패턴)

토큰 갱신 중 추가로 들어오는 401 요청들은 `refreshQueue`에 쌓이고,
갱신 완료 후 새 토큰으로 일괄 재시도됩니다.

```
요청 A → 401 → 갱신 시작 (isRefreshing = true)
요청 B → 401 → 갱신 중 → queue 대기
요청 C → 401 → 갱신 중 → queue 대기
갱신 완료 → notifySuccess(newToken) → A, B, C 모두 새 토큰으로 재시도
```

### controller.abort() 의도

세션 만료 시 `controller.abort()`로 진행 중인 모든 요청을 즉시 취소합니다.
이후 `window.location.replace()`로 **full page reload**가 발생하기 때문에
abort된 singleton controller는 페이지 리로드 시 자연스럽게 재생성됩니다.

```ts
const handleSessionExpired = async () => {
    controller.abort('refresh-token-expiration'); // 진행 중 요청 전부 취소
    // ...
    window.location.replace(url); // full reload → controller 재생성
};
```

**주의:** MyApp(네이티브 앱 WebView) 경로에서는 redirect 없이 네이티브가 세션을 처리합니다.
WebView를 유지한 채 재로그인 후 API를 재사용하는 플로우가 있다면 별도 검토가 필요합니다.

```ts
if (window.myapp?.helpers.isMyApp() && window.myapp?.handler?.send) {
    handleSendRefreshTokenExpiredRef.current();
    return; // window.location.replace 없음
}
```

---

## 문제점 및 개선 검토사항

### 1. Queue 실패 시 Unhandled Rejection 가능성

`notifyFailure`에서 `forEach`로 각 Promise를 독립적으로 reject할 때,
호출부에서 `.catch()`를 붙이지 않은 요청이 있으면 unhandled rejection이 발생할 수 있습니다.

```ts
// 현재 코드
const notifyFailure = () => {
    refreshQueue.current.forEach((callback) => callback(''));
    refreshQueue.current = [];
};

// queue 내부에서 각 Promise가 독립적으로 reject됨
refreshQueue.current.push((newToken) => {
    if (!newToken) {
        reject(error); // 호출부에 .catch()가 없으면 unhandled rejection
        return;
    }
    ...
});
```

**검토 포인트:** React Query를 통해 호출되는 경우 자체적으로 에러를 처리하므로
실제로 unhandled rejection이 발생하는지 확인 필요.

---

### 2. useRouteChange가 interceptor hook에 혼재 (단일 책임 원칙)

토큰 만료 시간 연장 로직(`useRouteChange`)이 인터셉터 훅 내부에 위치해 있어
관심사가 섞여 있습니다.

```ts
// useAxiosInterceptor 하단에 있는 코드
useRouteChange(() => {
    if (isLoggedIn()) {
        accessTokenCookie.update(); // 페이지 이동마다 액세스토큰 30분 연장
    }
});
```

**현재 위치의 이유:** `AppProviders` 안에 마운트되어 앱 생명주기 동안 유지되어야 하기 때문.  
**개선 방향:** `useSessionKeepAlive` 같은 별도 훅으로 분리하고 `InterceptorSetup` 내에서 함께 호출하는 것을 검토.

---

### 3. MyApp 경로에서 abort 후 controller 재사용 불가 (잠재적 문제)

일반 웹 경로는 `window.location.replace()`로 full reload가 발생해 `controller` singleton이
자연스럽게 재생성되지만, MyApp(네이티브 WebView) 경로는 redirect 없이 네이티브가 처리합니다.

```ts
if (window.myapp?.helpers.isMyApp() && window.myapp?.handler?.send) {
    handleSendRefreshTokenExpiredRef.current();
    return; // full reload 없음 → abort된 controller 그대로 유지
}
```

**검토 포인트:** WebView를 유지한 채 재로그인 후 API를 다시 호출하는 플로우가 있다면,
abort된 controller로 인해 모든 요청이 즉시 취소될 수 있음.  
해당 플로우가 없다면 현재 구조로 문제없음.

---

## useGeekInterceptor 분석

shopbyRequest와 달리 토큰 갱신 로직 없이 단순 헤더 주입과 로깅만 담당합니다.

### 요청 헤더 주입 규칙

| 헤더 | 조건 | 값 |
|------|------|----|
| `appToken` | 항상 | `Bearer {NEXT_PUBLIC_GEEK_APP_TOKEN}` |
| `clientId` | 로그인 상태 | `NEXT_PUBLIC_CLIENT_ID` |
| `Shop-By-Authorization` | 로그인 상태 | `Bearer {accessToken}` |
| `shopApiUrl` | 로그인 상태 | `/profile` (고정) |
| `apiMethod` | 로그인 상태 | `GET` (고정) |

---

## 테스트 플랜

### 도구

```
@testing-library/react   renderHook
axios-mock-adapter       axios 인스턴스 mock
vi.mock                  cookie, hook 의존성 mock
```

### useAxiosInterceptor 테스트 범위

#### Request Interceptor

```ts
describe('Request Interceptor', () => {
    it('게스트 엔드포인트: guestToken을 Shop-By-Authorization 헤더에 주입')
    it('게스트 엔드포인트: guestToken 없으면 헤더 미주입')
    it('일반 요청 + 로그인 상태: accessToken을 헤더에 주입')
    it('일반 요청 + 비로그인: 인증 헤더 없음')
    it('oauth2 PUT 요청: Refresh-Token 헤더 추가')
})
```

#### Response Interceptor

```ts
describe('Response Interceptor', () => {
    it('200 응답: 그대로 반환')
    it('non-401 에러: 갱신 시도 없이 reject')

    describe('401 처리', () => {
        it('oauth2 PUT 401: handleSessionExpired 즉시 호출')
        it('게스트 요청 401: 갱신 시도 없이 reject')
        it('_retry=true 401: handleSessionExpired 호출')

        it('첫 401: 토큰 갱신 성공 → 원래 요청 새 토큰으로 재시도')
        it('첫 401: 토큰 갱신 실패 → handleSessionExpired 호출')
        it('첫 401: 토큰 갱신 타임아웃(10s) → handleSessionExpired 호출')

        it('갱신 중 동시 401: queue 대기 후 새 토큰으로 일괄 재시도')
        it('갱신 중 동시 401: 갱신 실패 시 queue의 모든 요청 reject')
    })
})
```

#### Cleanup

```ts
describe('Cleanup', () => {
    it('hook unmount 시 request interceptor eject')
    it('hook unmount 시 response interceptor eject')
    it('eject 후 인터셉터가 동작하지 않음')
})
```

### 핵심 테스트 케이스 구현 예시

```ts
// 동시 요청 queue 테스트
it('갱신 중 동시 401: queue 대기 후 새 토큰으로 일괄 재시도', async () => {
    const mock = new MockAdapter(shopbyRequest);

    mock.onGet('/api/a').replyOnce(401).onGet('/api/a').reply(200, { a: 1 });
    mock.onGet('/api/b').replyOnce(401).onGet('/api/b').reply(200, { b: 2 });
    mock.onPut('/oauth2').reply(200, {
        accessToken: 'new-token',
        expiresIn: 1800,
    });

    const [resA, resB] = await Promise.all([
        shopbyRequest.get('/api/a'),
        shopbyRequest.get('/api/b'),
    ]);

    expect(resA.data).toEqual({ a: 1 });
    expect(resB.data).toEqual({ b: 2 });
    // oauth2 PUT은 한 번만 호출되어야 함
    expect(mock.history.put.length).toBe(1);
});

// 토큰 갱신 타임아웃 테스트
it('토큰 갱신 10초 초과 시 handleSessionExpired 호출', async () => {
    vi.useFakeTimers();
    const mock = new MockAdapter(shopbyRequest);
    const handleSessionExpired = vi.fn();

    mock.onGet('/api/data').replyOnce(401);
    mock.onPut('/oauth2').reply(() => new Promise(() => {})); // 무한 대기

    shopbyRequest.get('/api/data');
    vi.advanceTimersByTime(10_000);

    await vi.runAllTimersAsync();
    expect(handleSessionExpired).toHaveBeenCalled();
    vi.useRealTimers();
});
```

### useGeekInterceptor 테스트 범위

```ts
describe('useGeekInterceptor', () => {
    it('모든 요청에 appToken 헤더 주입')
    it('로그인 상태: clientId, Shop-By-Authorization, shopApiUrl, apiMethod 주입')
    it('비로그인 상태: appToken만 주입, 나머지 헤더 없음')
    it('에러 응답: isAxiosError 여부와 관계없이 reject')
    it('hook unmount 시 interceptor eject')
})
```

### Mock 설정 예시

```ts
vi.mock('@/utils/cookie', () => ({
    accessTokenCookie: { get: vi.fn() },
    guestTokenCookie: { get: vi.fn() },
    refreshTokenCookie: { get: vi.fn() },
    memberCookie: { clearAll: vi.fn() },
}));

vi.mock('@/hooks/utils', () => ({
    useDialog: () => ({ openAsyncDialog: vi.fn().mockResolvedValue(true) }),
    useRouteChange: vi.fn(),
}));

vi.mock('@/hooks/myapp/useMyApp', () => ({
    default: () => ({ handleSendRefreshTokenExpired: vi.fn() }),
}));
```
