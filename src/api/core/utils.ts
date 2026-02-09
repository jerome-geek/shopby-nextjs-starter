import { getCookie } from 'cookies-next';
import ky, {
    type AfterResponseHook,
    type BeforeRequestHook,
    type BeforeRetryHook,
    HTTPError,
} from 'ky';

import {
    ACCESS_TOKEN_KEY,
    cookieTokenManager,
    REFRESH_TOKEN_KEY,
} from '@/api/core/cookie';
import { PATHS } from '@/const/paths';

export const DEFAULT_API_RETRY_BACKOFF_LIMIT = 3 * 1000;
export const DEFAULT_API_RETRY_LIMIT = 4;
export const DEFAULT_API_TIMEOUT = 10 * 1000;

/**
 * 요청 로깅 (개발 환경만)
 */
export const logRequest: BeforeRequestHook = (request) => {
    if (process.env.NODE_ENV === 'development') {
        console.log('📤 API Request:', request.method, request.url);
    }
};

/**
 * 응답 로깅 (개발 환경만)
 */
export const logResponse: AfterResponseHook = (request, _options, response) => {
    if (process.env.NODE_ENV === 'development') {
        console.log('📥 API Response:', response.status, request.url);
    }
};

/**
 * 클라이언트 사이드에서 액세스 토큰을 헤더에 설정
 */
export const setTokenHeader: BeforeRequestHook = (request) => {
    // 클라이언트 사이드에서만 동작 (SSR 시점에서는 ctx로 직접 전달)
    if (typeof window === 'undefined') return;

    const token = cookieTokenManager.getToken();
    if (token) {
        request.headers.set('Shop-By-Authorization', `Bearer ${token}`);
    } else if (process.env.NODE_ENV === 'development') {
        console.warn('⚠️ [Request] No access token for:', request.url);
    }
};

/**
 * 클라이언트 사이드에서 리프레시 토큰을 헤더에 설정
 */
export const setRefreshTokenHeader: BeforeRequestHook = (request) => {
    if (typeof window === 'undefined') return;

    const token = cookieTokenManager.getRefreshToken();
    if (token) {
        request.headers.set('Refresh-Token', token);
    }
};

/**
 * 401 에러 시 토큰 갱신 후 재시도 (클라이언트 사이드)
 */
export const beforeRetry: BeforeRetryHook = async ({
    request,
    error,
    retryCount,
}) => {
    const response = (error as HTTPError).response;
    if (response?.status !== 401) {
        return ky.stop;
    }

    // 서버 사이드에서는 재시도 불가 (ctx 없이는 토큰 갱신이 어려움)
    if (typeof window === 'undefined') {
        return ky.stop;
    }

    // 최대 재시도 횟수 초과
    if (retryCount >= DEFAULT_API_RETRY_LIMIT - 1) {
        console.warn('🔒 Token refresh failed, redirecting to login');
        cookieTokenManager.clearTokens();
        window.location.href = PATHS.AUTH.LOGIN;
        return ky.stop;
    }

    try {
        const currentAccessToken = getCookie(ACCESS_TOKEN_KEY);
        const currentRefreshToken = getCookie(REFRESH_TOKEN_KEY);

        if (!currentRefreshToken) {
            console.warn('🔒 No refresh token available');
            cookieTokenManager.clearTokens();
            window.location.href = PATHS.AUTH.LOGIN;
            return ky.stop;
        }

        // authRequest (순환 참조 방지를 위해 동적 임포트)
        const { authRequest } = await import('@/api/core/request');

        const refreshResponse = await authRequest
            .post('oauth2/update-access-token', {
                headers: {
                    'Shop-By-Authorization': `Bearer ${currentAccessToken || ''}`,
                    'Refresh-Token': currentRefreshToken?.toString() || '',
                },
            })
            .json<{ accessToken: string }>();

        const newToken = refreshResponse.accessToken;

        // 쿠키에 새 토큰 저장
        cookieTokenManager.setToken(newToken);

        // 현재 요청에 새 토큰 설정
        request.headers.set('Shop-By-Authorization', `Bearer ${newToken}`);

        console.log('🔄 Token refreshed successfully');
    } catch (refreshError) {
        console.error('🔒 Token refresh failed:', refreshError);
        cookieTokenManager.clearTokens();
        window.location.href = PATHS.AUTH.LOGIN;
        return ky.stop;
    }
};
