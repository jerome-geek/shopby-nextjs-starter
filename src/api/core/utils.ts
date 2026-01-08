import ky, {
    AfterResponseHook,
    BeforeRequestHook,
    BeforeRetryHook,
    HTTPError,
} from 'ky';
import { redirect } from 'next/navigation';

import { oauth2 } from '@/api/auth';
import {
    cookieTokenManager,
    getRefreshTokenFromAppRouter,
    getTokenFromAppRouter,
} from '@/api/core/cookie';
import { PATHS } from '@/const/paths';

import { getCookies } from 'cookies-next/client';

export const DEFAULT_API_RETRY_BACKOFF_LIMIT = 3 * 1000;
export const DEFAULT_API_RETRY_LIMIT = 4;
export const DEFAULT_API_TIMEOUT = 10 * 1000;

export const logRequest: BeforeRequestHook = (request) => {
    if (process.env.NODE_ENV === 'development') {
        console.log('API Request:', request.url);
    }
};

export const logResponse: AfterResponseHook = (request, _, response) => {
    if (process.env.NODE_ENV === 'development') {
        console.log('API Response:', response.status, request.url);
    }
};

export const beforeRetry: BeforeRetryHook = async ({ error, retryCount }) => {
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
            const currentAccessToken = cookies?.['wannamake_access-token'];
            console.log(
                '🚀 ~ refreshToken ~ currentAccessToken:',
                currentAccessToken,
            );
            const currentRefreshToken = cookies?.['wannamake_refresh-token'];
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
            const currentAccessToken = cookies?.['wannamake_access-token'];
            const currentRefreshToken = cookies?.['wannamake_refresh-token'];

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
            const currentAccessToken = cookies?.['wannamake_access-token'];
            console.log(
                '🚀 ~ refreshToken ~ currentAccessToken:',
                currentAccessToken,
            );
            const currentRefreshToken = cookies?.['wannamake_refresh-token'];
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
            const currentAccessToken = cookies?.['wannamake_access-token'];
            const currentRefreshToken = cookies?.['wannamake_refresh-token'];

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
