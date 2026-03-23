import { useSyncExternalStore, useCallback } from 'react';
import { isLoggedIn } from '@/utils/auth';

/**
 * 쿠키 변경을 감지하기 위한 커스텀 이벤트 이름
 * (쿠키 세팅 로직에서 이벤트를 발생시키면 실시간 동기화 가능)
 */
export const AUTH_CHANGE_EVENT = 'shopby:auth-change';

/** 외부 스토어 구독 함수 */
const subscribe = (callback: () => void) => {
    // 커스텀 이벤트 구독 (같은 탭 내에서 로그인/로그아웃 발생 시 감지)
    window.addEventListener(AUTH_CHANGE_EVENT, callback);
    // storage 이벤트 구독 (다른 탭에서 로그인/로그아웃 발생 시 감지)
    window.addEventListener('storage', callback);

    return () => {
        window.removeEventListener(AUTH_CHANGE_EVENT, callback);
        window.removeEventListener('storage', callback);
    };
};

/**
 * 컴포넌트 내부에서 안전하게 로그인 여부를 확인하는 훅 (하이드레이션 불일치 및 legacy useMemo 방지)
 *
 * @example
 * const isLogin = useAuth();
 *
 * if (isLogin === null) return null; // 아직 클라이언트 마운트 전 (스켈레톤 등)
 * return isLogin ? <LogoutBtn /> : <LoginBtn />;
 */
export function useAuth() {
    // 1. 브라우저 환경에서 현재 로그인 상태를 읽어옴
    const getSnapshot = useCallback(() => isLoggedIn(), []);

    // 2. SSR(서버) 환경에서는 null을 반환하여 마운트 여부를 추적할 수 있게 함
    // (만료된 캐시/토큰으로 인한 반짝임(hydration mismatch) 방지)
    const getServerSnapshot = useCallback(() => null, []);

    const isLogin = useSyncExternalStore(
        subscribe,
        getSnapshot,
        getServerSnapshot,
    );

    return isLogin;
}

/**
 * 훅 밖에서 강제로 auth 상태를 업데이트하고 싶을 때 호출하는 헬퍼 함수
 * @example
 * accessTokenCookie.set(token);
 * dispatchAuthChange(); // -> useAuth 상태가 즉시 리렌더링 (깜빡임 없이)
 */
export function dispatchAuthChange() {
    if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event(AUTH_CHANGE_EVENT));
    }
}
