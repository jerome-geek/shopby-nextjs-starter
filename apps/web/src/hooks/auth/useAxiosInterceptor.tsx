import type { InternalAxiosRequestConfig } from 'axios';
import axios, { HttpStatusCode } from 'axios';
import { useEffect } from 'react';

import {
    handle400Error,
    handle401Error,
    handle404Error,
} from '@/api/core/authInterceptor';
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

type SessionExpiredHandler = () => Promise<void>;

let handleSessionExpiredHandler: SessionExpiredHandler = async () => {};
let handleGuestLoginExpiredHandler: SessionExpiredHandler = async () => {};
let handleNotFoundProfileExpiredHandler: SessionExpiredHandler = async () => {};
let interceptorIds: {
    request: number;
    response: number;
} | null = null;

export const bindAxiosInterceptorHandlers = ({
    handleSessionExpired,
    handleGuestLoginExpired,
    handleNotFoundProfileExpired,
}: {
    handleSessionExpired: SessionExpiredHandler;
    handleGuestLoginExpired: SessionExpiredHandler;
    handleNotFoundProfileExpired: SessionExpiredHandler;
}) => {
    handleSessionExpiredHandler = handleSessionExpired;
    handleGuestLoginExpiredHandler = handleGuestLoginExpired;
    handleNotFoundProfileExpiredHandler = handleNotFoundProfileExpired;
};

const attachAuthHeaders = (config: InternalAxiosRequestConfig) => {
    const { url, method } = config;
    logOnDev(`[API] ${method?.toUpperCase()} ${url} | Request`, '#FF9F0A');

    if (typeof window === 'undefined') {
        return config;
    }

    // 게스트 엔드포인트: 게스트 토큰 사용
    if (isGuestRequest(url, method)) {
        const guestToken = guestTokenCookie.get();
        if (guestToken) {
            config.headers['guestToken'] = guestToken;
        }
        return config;
    }

    // 일반 요청: 액세스 토큰 사용
    const accessToken = accessTokenCookie.get();
    if (accessToken) {
        config.headers['Shop-By-Authorization'] = `Bearer ${accessToken}`;
    }

    // 토큰 갱신 요청: Refresh-Token 헤더 추가
    if (isUpdateOauth2Request(url, method)) {
        const refreshToken = refreshTokenCookie.get();
        if (refreshToken) {
            config.headers['Refresh-Token'] = refreshToken;
        }
    }

    return config;
};

const ensureAxiosInterceptors = () => {
    if (interceptorIds) {
        return;
    }

    const request = shopbyRequest.interceptors.request.use(attachAuthHeaders);

    const response = shopbyRequest.interceptors.response.use(
        (response) => {
            const { method, url } = response.config;
            logOnDev(
                `[API] ${method?.toUpperCase()} ${url} | ${response.status}`,
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

            if (typeof window === 'undefined') {
                return Promise.reject(error);
            }

            if (status === HttpStatusCode.BadRequest) {
                return await handle400Error(error, () =>
                    handleGuestLoginExpiredHandler(),
                );
            }

            if (status === HttpStatusCode.NotFound) {
                return await handle404Error(error, () =>
                    handleNotFoundProfileExpiredHandler(),
                );
            }

            if (status === HttpStatusCode.Unauthorized) {
                return await handle401Error(error, shopbyRequest, () =>
                    handleSessionExpiredHandler(),
                );
            }

            return Promise.reject(error);
        },
    );

    interceptorIds = {
        request,
        response,
    };
};

ensureAxiosInterceptors();

export const useAxiosInterceptor = () => {
    const {
        handleSessionExpired,
        handleGuestLoginExpired,
        handleNotFoundProfileExpired,
    } = useHandleSessionExpired();

    useEffect(() => {
        bindAxiosInterceptorHandlers({
            handleSessionExpired,
            handleGuestLoginExpired,
            handleNotFoundProfileExpired,
        });
    }, [
        handleSessionExpired,
        handleGuestLoginExpired,
        handleNotFoundProfileExpired,
    ]);
};
