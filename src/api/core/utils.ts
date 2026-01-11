import { deleteCookie, getCookies } from 'cookies-next/client';
import ky, {
    AfterResponseHook,
    BeforeRequestHook,
    BeforeRetryHook,
    HTTPError,
} from 'ky';
import { redirect } from 'next/navigation';

import { oauth2 } from '@/api/auth';
import {
    ACCESS_TOKEN_KEY,
    cookieTokenManager,
    getRefreshTokenFromAppRouter,
    getTokenFromAppRouter,
    REFRESH_TOKEN_KEY,
} from '@/api/core/cookie';
import { PATHS } from '@/const/paths';

export const DEFAULT_API_RETRY_BACKOFF_LIMIT = 3 * 1000;
export const DEFAULT_API_RETRY_LIMIT = 4;
export const DEFAULT_API_TIMEOUT = 10 * 1000;

export const logRequest: BeforeRequestHook = (request) => {
    if (process.env.NODE_ENV === 'development') {
        console.log('API Request:', request);
    }
};

export const logResponse: AfterResponseHook = (request, _, response) => {
    if (process.env.NODE_ENV === 'development') {
        console.log('API Response:', response.status, request.url);
    }
};

export const beforeRetry: BeforeRetryHook = async ({
    request,
    error,
    retryCount,
}) => {
    const response = (error as HTTPError).response;
    if (response?.status !== 401) {
        return ky.stop;
    }

    if (retryCount === DEFAULT_API_RETRY_LIMIT - 1) {
        // await UserService.onLoginDurationExpired();
        return ky.stop;
    }

    // refresh token을 이용하여 access token을 가져옵니다.
    //   await UserService.getAccessTokenByRefreshToken();

    const isServer = typeof window === 'undefined';
    try {
        console.log('🚀 ~ refreshToken ~ isServer:', isServer);
        if (isServer) {
            const { getCookiesFromServer } = await import(
                '@/api/core/utils.server'
            );
            const cookies = await getCookiesFromServer();
            const currentAccessToken = cookies?.[ACCESS_TOKEN_KEY];
            console.log(
                '🚀 ~ refreshToken ~ currentAccessToken:',
                currentAccessToken,
            );
            const currentRefreshToken = cookies?.[REFRESH_TOKEN_KEY];
            console.log(
                '🚀 ~ refreshToken ~ currentRefreshToken:',
                currentRefreshToken,
            );

            const refreshResponse = await oauth2
                .updateAccessToken({
                    headers: {
                        'Shop-By-Authorization': `Bearer ${currentAccessToken || ''}`,
                        'Refresh-Token': currentRefreshToken,
                    },
                })
                .json();
            console.log(
                '🚀 ~ refreshToken ~ refreshResponse:',
                refreshResponse,
            );
            const newToken = refreshResponse.accessToken;
            // 2. [중요] 현재 실행 중인 리트라이 요청에만 새 토큰 주입
            // 이렇게 하면 쿠키는 못 바꿔도, 현재 페이지 렌더링은 에러 없이 끝낼 수 있습니다.
            // request.headers.set('Authorization', `Bearer ${newToken}`);
            request.headers.set('Shop-By-Authorization', `Bearer ${newToken}`);
        } else {
            const cookies = getCookies();
            const currentAccessToken = cookies?.[ACCESS_TOKEN_KEY];
            const currentRefreshToken = cookies?.[REFRESH_TOKEN_KEY];

            const refreshResponse = await oauth2
                .updateAccessToken({
                    headers: {
                        'Shop-By-Authorization': `Bearer ${currentAccessToken || ''}`,
                        'Refresh-Token': currentRefreshToken,
                    },
                })
                .json();
            console.log(
                '🚀 ~ refreshToken ~ refreshResponse:',
                refreshResponse,
            );
        }
    } catch (error) {
        console.dir('🚀 ~ refreshToken ~ error:', error);
        deleteCookie(ACCESS_TOKEN_KEY);
        deleteCookie(REFRESH_TOKEN_KEY);
        redirect(PATHS.AUTH.LOGIN);
    }
};

export const refreshToken: BeforeRetryHook = async ({ request, error }) => {
    const isServer = typeof window === 'undefined';
    const response = (error as HTTPError).response;

    if (response?.status !== 401) {
        return;
    }

    try {
        console.log('🚀 ~ refreshToken ~ isServer:', isServer);
        if (isServer) {
            const { getCookiesFromServer } = await import(
                '@/api/core/utils.server'
            );
            const cookies = await getCookiesFromServer();
            const currentAccessToken = cookies?.[ACCESS_TOKEN_KEY];
            console.log(
                '🚀 ~ refreshToken ~ currentAccessToken:',
                currentAccessToken,
            );
            const currentRefreshToken = cookies?.[REFRESH_TOKEN_KEY];
            console.log(
                '🚀 ~ refreshToken ~ currentRefreshToken:',
                currentRefreshToken,
            );

            const refreshResponse = await oauth2
                .updateAccessToken({
                    headers: {
                        'Shop-By-Authorization': `Bearer ${currentAccessToken || ''}`,
                        'Refresh-Token': currentRefreshToken,
                    },
                })
                .json();
            console.log(
                '🚀 ~ refreshToken ~ refreshResponse:',
                refreshResponse,
            );
        } else {
            const cookies = getCookies();
            const currentAccessToken = cookies?.[ACCESS_TOKEN_KEY];
            const currentRefreshToken = cookies?.[REFRESH_TOKEN_KEY];

            const refreshResponse = await oauth2
                .updateAccessToken({
                    headers: {
                        'Shop-By-Authorization': `Bearer ${currentAccessToken || ''}`,
                        'Refresh-Token': currentRefreshToken,
                    },
                })
                .json();
            console.log(
                '🚀 ~ refreshToken ~ refreshResponse:',
                refreshResponse,
            );
        }
    } catch (error) {
        console.log('🚀 ~ refreshToken ~ error:', error);
    }
};

export const setTokenHeader: BeforeRequestHook = async (request) => {
    let token: string | null = null;

    if (typeof window !== 'undefined') {
        token = await cookieTokenManager.getToken();
    } else {
        token = await getTokenFromAppRouter();
    }

    console.log('🚀 ~ setTokenHeader ~ token:', token);

    if (token) {
        request.headers.set('Shop-By-Authorization', `Bearer ${token}`);
    } else if (
        typeof window === 'undefined' &&
        process.env.NODE_ENV === 'development'
    ) {
        console.warn('⚠️ [Request] No access token for:', request.url);
    }
};

export const setRefreshTokenHeader: BeforeRequestHook = async (request) => {
    let token: string | null = null;
    if (typeof window !== 'undefined') {
        token = await cookieTokenManager.getRefreshToken();
    } else {
        token = await getRefreshTokenFromAppRouter();
    }

    if (token) {
        request.headers.set('Refresh-Token', token);
    }
};
