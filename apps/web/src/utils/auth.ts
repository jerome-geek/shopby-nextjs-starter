import type { CookieCtx } from '@/utils/cookie';
import { accessTokenCookie } from '@/utils/cookie';

/** 쿠키 변경을 감지하기 위한 커스텀 이벤트 이름 */
export const AUTH_CHANGE_EVENT = 'shopby:auth-change';
// TODO: 로그아웃 전용 intent 대신 공통 auth navigation state로 정리해서
// 로그인/세션만료/명시적 로그아웃 흐름을 한 곳에서 제어할 수 있게 개선.
const AUTH_NAVIGATION_INTENT_KEY = 'shopby:auth-navigation-intent';

/**
 * 로그인 여부를 쿠키 기반으로 판단합니다.
 *
 * ⚠️ [주의] 컴포넌트 내부에서는 이 함수 대신 `useAuth()` 훅을 사용하세요.
 * 이 함수는 SSR(getServerSideProps) 또는 일반 유틸리티 함수 내에서만 단독으로 사용해야 합니다.
 *
 * @example SSR (getServerSideProps)
 * export const getServerSideProps = async (ctx) => {
 *   if (!isLoggedIn(ctx)) {
 *     return { redirect: { destination: '/login', permanent: false } };
 *   }
 *   return { props: {} };
 * };
 */
export function isLoggedIn(ctx?: CookieCtx): boolean {
    const access = accessTokenCookie.get(ctx);

    return !!access;
}

/** 훅 밖에서 강제로 auth 상태를 업데이트하고 싶을 때 호출하는 헬퍼 함수 */
export function dispatchAuthChange() {
    if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event(AUTH_CHANGE_EVENT));
    }
}

function setAuthNavigationIntent(intent: 'logout' | null) {
    if (typeof window === 'undefined') {
        return;
    }

    if (intent) {
        window.sessionStorage.setItem(AUTH_NAVIGATION_INTENT_KEY, intent);
        return;
    }

    window.sessionStorage.removeItem(AUTH_NAVIGATION_INTENT_KEY);
}

export function markLogoutNavigationInProgress() {
    setAuthNavigationIntent('logout');
}

export function clearLogoutNavigationInProgress() {
    setAuthNavigationIntent(null);
}

export function isLogoutNavigationInProgress() {
    if (typeof window === 'undefined') {
        return false;
    }

    return (
        window.sessionStorage.getItem(AUTH_NAVIGATION_INTENT_KEY) === 'logout'
    );
}
