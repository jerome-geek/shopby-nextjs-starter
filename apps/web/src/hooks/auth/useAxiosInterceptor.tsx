import axios, { HttpStatusCode } from 'axios';
import { useEffect, useRef, useState } from 'react';

import { handle401Error } from '@/api/core/authInterceptor';
import { shopbyRequest } from '@/api/core/request';
import {
    isGuestRequest,
    isUpdateOauth2Request,
    logOnDev,
} from '@/api/core/utils';
import { useHandleSessionExpired } from '@/hooks/auth/useHandleSessionExpired';
import {
    accessTokenCookie,
    guestTokenCookie,
    refreshTokenCookie,
} from '@/utils/cookie';

export const useAxiosInterceptor = () => {
    const [isReady, setIsReady] = useState(false);
    const { handleSessionExpired } = useHandleSessionExpired();
    const handleSessionExpiredRef = useRef(handleSessionExpired);
    handleSessionExpiredRef.current = handleSessionExpired;

    useEffect(() => {
        // ─── Request Interceptor ──────────────────────────────────────────────
        const requestInterceptor = shopbyRequest.interceptors.request.use(
            (config) => {
                const { url, method } = config;
                logOnDev(
                    `[API] ${method?.toUpperCase()} ${url} | Request`,
                    '#FF9F0A',
                );

                // 게스트 엔드포인트: 게스트 토큰 사용
                if (isGuestRequest(url, method)) {
                    const guestToken = guestTokenCookie.get();
                    if (guestToken) {
                        config.headers['Shop-By-Authorization'] =
                            `Bearer ${guestToken}`;
                    }
                    return config;
                }

                // 일반 요청: 액세스 토큰 사용
                const accessToken = accessTokenCookie.get();
                if (accessToken) {
                    config.headers['Shop-By-Authorization'] =
                        `Bearer ${accessToken}`;
                }

                // 토큰 갱신 요청: Refresh-Token 헤더 추가
                if (isUpdateOauth2Request(url, method)) {
                    const refreshToken = refreshTokenCookie.get();
                    if (refreshToken) {
                        config.headers['Refresh-Token'] = refreshToken;
                    }
                }

                return config;
            },
        );

        // ─── Response Interceptor ─────────────────────────────────────────────
        const responseInterceptor = shopbyRequest.interceptors.response.use(
            (response) => {
                const { method, url } = response.config;
                logOnDev(
                    `[API] ${method?.toUpperCase()} ${url} | ${
                        response.status
                    }`,
                );
                return response;
            },
            async (error: unknown) => {
                if (!axios.isAxiosError(error)) {
                    return Promise.reject(error);
                }

                const status = error.response?.status;

                logOnDev(
                    `[API] ${error.config?.method?.toUpperCase()} ${
                        error.config?.url
                    } | Error ${status}`,
                    'red',
                );

                if (status !== HttpStatusCode.Unauthorized) {
                    return Promise.reject(error);
                }

                return await handle401Error(error, shopbyRequest, () =>
                    handleSessionExpiredRef.current(),
                );
            },
        );

        setIsReady(true);

        return () => {
            shopbyRequest.interceptors.request.eject(requestInterceptor);
            shopbyRequest.interceptors.response.eject(responseInterceptor);
        };
    }, []);

    return {
        isReady,
    };
};
