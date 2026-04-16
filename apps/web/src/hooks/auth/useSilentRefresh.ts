import { shopbyRequest } from '@/api/core/request';
import { useEffect, useRef } from 'react';

import type { UpdateAccessTokenResponse } from '@/models/auth/oauth2';
import { accessTokenCookie } from '@/utils/cookie';

const CHECK_INTERVAL_MS = 1000 * 60; // 1분마다 체크
const REFRESH_THRESHOLD_S = 5 * 60; // 만료 5분 전이면 갱신

/**
 * 토큰 페이로드에서 만료 시간(exp)을 추출하는 헬퍼
 */
const getTokenExpiresAt = (token: string): number | null => {
    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.exp ? payload.exp * 1000 : null; // ms 단위로 변환
    } catch {
        return null;
    }
};

/**
 * Proactive Silent Refresh Hook
 * - 기존 인터셉터 로직과 독립적으로 작동하며, 타이머와 포커스 이벤트를 통해 선제적으로 토큰을 갱신합니다.
 */
export const useSilentRefresh = () => {
    const isRefreshing = useRef(false);

    useEffect(() => {
        const checkAndRefresh = async () => {
            const token = accessTokenCookie.get();
            if (!token || isRefreshing.current) return;

            const expiresAt = getTokenExpiresAt(token);
            if (!expiresAt) return;

            const now = Date.now();
            const remainingSec = (expiresAt - now) / 1000;

            // 만료 임박(5분 이내) 시 갱신 수행
            if (remainingSec < REFRESH_THRESHOLD_S) {
                isRefreshing.current = true;
                try {
                    console.log(
                        `[SilentRefresh] 토큰 만료 임박(${Math.floor(remainingSec)}s). 갱신을 시작합니다.`,
                    );

                    const { data } =
                        await shopbyRequest.request<UpdateAccessTokenResponse>({
                            method: 'PUT',
                            url: '/oauth2',
                        });

                    // 갱신된 토큰 쿠키 저장
                    accessTokenCookie.set(data.accessToken, data.expiresIn);
                    console.log('[SilentRefresh] 토큰 성공적으로 갱신됨.');
                } catch (error) {
                    console.error('[SilentRefresh] 토큰 갱신 실패:', error);
                    // 실패 시에는 인터셉터의 401 핸들러가 최종 처리를 하도록 둡니다.
                } finally {
                    isRefreshing.current = false;
                }
            }
        };

        // 1. 주기적 타이머 (화면을 보고 있을 때)
        const timer = setInterval(checkAndRefresh, CHECK_INTERVAL_MS);

        // 2. 앱 포커스 감지 (자리를 비웠다 돌아왔을 때)
        window.addEventListener('focus', checkAndRefresh);

        // 최초 로드 시 한 번 실행
        checkAndRefresh();

        return () => {
            clearInterval(timer);
            window.removeEventListener('focus', checkAndRefresh);
        };
    }, []);
};
