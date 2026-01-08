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

// 전역적으로 토큰 갱신 상태를 공유하기 위한 Promise 변수
let refreshPromise: Promise<string | null> | null = null;

export const refreshToken: BeforeRetryHook = async ({ request, error }) => {
    const response = (error as HTTPError).response;

    // 401(Unauthorized) 혹은 400(Bad Request) 에러인 경우에만 토큰 갱신 시도 고려
    if (response?.status !== 401 && response?.status !== 400) {
        return;
    }

    // 1. 이미 다른 요청에 의해 토큰 갱신이 진행 중이라면 그 작업을 기다림 (Queueing)
    if (refreshPromise) {
        try {
            const newAccessToken = await refreshPromise;
            if (newAccessToken) {
                request.headers.set(
                    'Shop-By-Authorization',
                    `Bearer ${newAccessToken}`,
                );
                return;
            }
        } catch (e) {
            // 진행 중이던 갱신 작업이 실패했다면 재시도 중단
            return ky.stop;
        }
    }

    // 2. 내가 첫 번째로 도착한 요청이라면 갱신 프로세스를 시작하고 약속(Promise)을 선언함 (Locking)
    refreshPromise = (async () => {
        try {
            let currentAccessToken: string | null = null;
            let currentRefreshToken: string | null = null;

            if (typeof window !== 'undefined') {
                currentAccessToken = await cookieTokenManager.getToken();
                currentRefreshToken =
                    await cookieTokenManager.getRefreshToken();
            } else {
                currentAccessToken = await getTokenFromAppRouter();
                currentRefreshToken = await getRefreshTokenFromAppRouter();
            }

            // 400 에러인데 액세스 토큰이 여전히 존재한다면, 단순한 요청 오류일 확률이 높음
            if (response?.status === 400 && currentAccessToken) {
                return null;
            }

            if (!currentRefreshToken) {
                throw new Error('No refresh token available');
            }

            if (process.env.NODE_ENV === 'development') {
                console.log(
                    '🚀 Attempting to Refresh Token due to status:',
                    response.status,
                );
            }

            // 토큰 갱신 API 호출
            const refreshResponse = await oauth2
                .updateAccessToken({
                    headers: {
                        'Shop-By-Authorization': `Bearer ${currentAccessToken || ''}`,
                        'Refresh-Token': currentRefreshToken,
                    },
                })
                .json();

            // 새로운 토큰 쿠키에 저장
            await cookieTokenManager.setToken({
                accessToken: refreshResponse.accessToken,
                // refreshToken: refreshResponse.refreshToken,
                expiresIn: Number(refreshResponse.expiresIn),
                // refreshTokenExpiresIn: Number(
                //     refreshResponse.refreshTokenExpiresIn,
                // ),
            });

            if (process.env.NODE_ENV === 'development') {
                console.log('🔄 Token Refreshed Successfully!');
            }

            return refreshResponse.accessToken;
        } finally {
            // 작업이 끝나면 공유 변수 초기화
            refreshPromise = null;
        }
    })();

    try {
        const newAccessToken = await refreshPromise;

        if (!newAccessToken) {
            return;
        }

        // 현재 재시도하는 요청의 헤더 갈아끼우기
        request.headers.set(
            'Shop-By-Authorization',
            `Bearer ${newAccessToken}`,
        );
    } catch (refreshError) {
        if (process.env.NODE_ENV === 'development') {
            console.error('❌ Token Refresh Failed:', refreshError);
        }
        await cookieTokenManager.clearTokens();
        if (typeof window === 'undefined') {
            redirect(PATHS.AUTH.LOGIN);
        } else {
            window.location.href = PATHS.AUTH.LOGIN;
        }
        return ky.stop;
    }
};

export const setTokenHeader: BeforeRequestHook = async (request) => {
    let token: string | null = null;
    if (typeof window !== 'undefined') {
        token = await cookieTokenManager.getToken();
    } else {
        token = await getTokenFromAppRouter();
    }

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
