import { useSyncExternalStore, useCallback } from 'react';
import { isLoggedIn, AUTH_CHANGE_EVENT } from '@/utils/auth';

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
