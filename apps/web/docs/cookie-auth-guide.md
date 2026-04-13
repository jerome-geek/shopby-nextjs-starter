# 쿠키 & 인증 유틸 가이드

> `src/utils/cookie.ts` · `src/utils/auth.ts`

---

## 개요

| 파일        | 역할                         |
| ----------- | ---------------------------- |
| `cookie.ts` | 인증 쿠키 읽기 / 쓰기 / 삭제 |
| `auth.ts`   | 로그인 여부 판단             |

**라이브러리:** [`cookies-next`](https://github.com/andreizanik/cookies-next)  
→ `react-cookie`, `nookies` 대신 채택. CSR(브라우저)과 SSR(`getServerSideProps`) 양쪽에서 동일한 API로 쿠키를 다룰 수 있음.

---

## 쿠키 키 명명 규칙

```
SHOPBY_{TOKEN_TYPE}

예시)
SHOPBY_ACCESS_TOKEN
SHOPBY_REFRESH_TOKEN
SHOPBY_GUEST_TOKEN
```

---

## `cookie.ts` 사용법

각 토큰은 **네임스페이스 객체**로 묶여 있어서 IDE 자동완성으로 바로 찾을 수 있음.

### 액세스 토큰

```ts
import { accessTokenCookie } from '@/utils/cookie';

accessTokenCookie.get(); // 읽기
accessTokenCookie.set(token, 1800); // 쓰기 (두 번째 인자: 만료 시간, 단위: 초)
accessTokenCookie.update(); // 값은 유지하고 만료 시간만 30분으로 갱신
accessTokenCookie.clear(); // 삭제
```

### 리프레시 토큰

```ts
import { refreshTokenCookie } from '@/utils/cookie';

refreshTokenCookie.get();
refreshTokenCookie.set(token, 604800); // 7일 = 60 * 60 * 24 * 7
refreshTokenCookie.clear();
```

### 게스트 토큰

```ts
import { guestTokenCookie } from '@/utils/cookie';

guestTokenCookie.get();
guestTokenCookie.set(token); // 만료 시간 없음 = 브라우저 종료 시 삭제 (세션 쿠키)
guestTokenCookie.clear();
```

### 회원 토큰 일괄 삭제 (로그아웃)

```ts
import { memberCookie } from '@/utils/cookie';

memberCookie.clearAll(); // accessToken + refreshToken 동시 삭제
```

---

## SSR에서 사용하기

`getServerSideProps`에서는 반드시 `ctx`를 넘겨야 서버의 요청 쿠키를 읽을 수 있음.  
`ctx`를 넘기지 않으면 서버에서는 항상 `undefined`가 반환됨.

```ts
export const getServerSideProps = async (ctx) => {
    const token = accessTokenCookie.get(ctx); // ✅ ctx 전달
    // ...
};
```

`set`, `clear`도 SSR에서 응답 쿠키를 조작할 때 동일하게 `ctx` 전달 필요.

```ts
accessTokenCookie.set(token, 1800, { ctx });
accessTokenCookie.clear({ ctx });
```

---

## `auth.ts` — 로그인 여부 판단

> ⚠️ **UI 분기 전용입니다.**  
> 쿠키는 클라이언트에서 조작이 가능하므로, 실제 권한 검증은 반드시 서버 API가 최종 판단합니다.

### 판단 기준

`accessToken` **또는** `refreshToken` 중 하나라도 있으면 `true`.

> accessToken만 확인하지 않는 이유:  
> 토큰이 만료됐더라도 refreshToken이 있으면 무음(silent) 갱신이 가능하기 때문에  
> 이 경우도 로그인 상태로 봐야 함.

---

## 훅 vs 일반 함수 가이드 (`useAuth` vs `isLoggedIn`)

로그인 상태를 확인할 때 **사용하는 환경(컴포넌트 vs 일반 로직)**에 따라 다음과 같이 구분해서 사용해야 합니다!

### 1. `useAuth()` (React Hook)

> **용도:** 로그인 상태 변화에 따라 **화면(UI)이 실시간으로 리렌더링되어야 하는 곳**  
> _예시: 헤더 네비게이션바, 마이페이지, 찜 버튼 등_

`useAuth`는 브라우저 다른 탭에서의 로그인/로그아웃, 혹은 백그라운드에서의 토큰 만료를 실시간으로 감지해서 에러(Hydration 불일치) 없이 화면을 업데이트합니다. (`useSyncExternalStore` 사용됨)

```tsx
import { useAuth } from '@/hooks/useAuth';

export default function Header() {
    const isLogin = useAuth(); // null | true | false

    // 참고: SSR 마운트 전 깜빡임을 막기 위해 처음엔 null 반환
    if (isLogin === null) return <Skeleton />;

    return isLogin ? <LogoutBtn /> : <LoginBtn />;
}
```

> **💡 중요:** 클라이언트 단에서 토큰을 새로 구웠을 때(로그인 완료, 로그아웃) 즉시 UI 동기화를 시키려면 `dispatchAuthChange()`를 같이 호출해 주면 됩니다.

```ts
import { dispatchAuthChange } from '@/hooks/useAuth';

accessTokenCookie.set(token, 1800);
dispatchAuthChange(); // 모든 useAuth 사용처 일제히 업데이트!
```

### 2. `isLoggedIn()` (일반 유틸 함수)

> **용도:** 실시간 상태 구독이나 리렌더링이 필요 없는 **순간적인 상태 확인**  
> _예시: Axios/Ky 요청, SSR 페이지 보호(`getServerSideProps`), 일반 버튼 클릭 핸들러 안 등_

비-리액트 환경이나 단순히 `true`, `false` 1회성 판단이 필요할 때 씁니다.

#### CSR — 버튼 클릭 핸들러 내부 등

```ts
import { isLoggedIn } from '@/utils/auth';

const onSubmit = () => {
    if (!isLoggedIn()) {
        alert('로그인이 필요합니다!');
        return;
    }
    // ...제출
};
```

### SSR — 로그인 필요 페이지 보호

```ts
import { isLoggedIn } from '@/utils/auth';

export const getServerSideProps = async (ctx) => {
    if (!isLoggedIn(ctx)) {
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        };
    }

    return { props: {} };
};
```

---

## 전체 플로우 요약

```
로그인 성공
    └─> accessTokenCookie.set(token, expires)
    └─> refreshTokenCookie.set(token, expires)

페이지 접근 (SSR)
    └─> isLoggedIn(ctx)
         ├─ false → /login 리다이렉트
         └─ true  → 페이지 렌더링

API 요청 (axios 인터셉터)
    └─> accessTokenCookie.get()   → Authorization 헤더에 주입
    └─> 401 응답 → accessTokenCookie.update() 후 재시도

로그아웃
    └─> memberCookie.clearAll()
```
