// import { getCookie } from 'cookies-next';
// import ky, {
//     type AfterResponseHook,
//     type BeforeRequestHook,
//     type BeforeRetryHook,
//     HTTPError,
// } from 'ky';

// import {
//     ACCESS_TOKEN_KEY,
//     cookieTokenManager,
//     REFRESH_TOKEN_KEY,
// } from '@/api/core/cookie';
// import { PATHS } from '@/const/paths';

// /**
//  * 요청 로깅 (개발 환경만)
//  */
// export const logRequest: BeforeRequestHook = (request) => {
//     if (process.env.NODE_ENV === 'development') {
//         console.log('📤 API Request:', shopbyRequest.method, shopbyRequest.url);
//     }
// };

// /**
//  * 응답 로깅 (개발 환경만)
//  */
// export const logResponse: AfterResponseHook = (request, _options, response) => {
//     if (process.env.NODE_ENV === 'development') {
//         console.log('📥 API Response:', response.status, shopbyRequest.url);
//     }
// };

// /**
//  * 클라이언트 사이드에서 액세스 토큰을 헤더에 설정
//  */
// export const setTokenHeader: BeforeRequestHook = (request) => {
//     // 클라이언트 사이드에서만 동작 (SSR 시점에서는 ctx로 직접 전달)
//     if (typeof window === 'undefined') return;

//     const token = cookieTokenManager.getToken();
//     if (token) {
//         shopbyRequest.headers.set('Shop-By-Authorization', `Bearer ${token}`);
//     } else if (process.env.NODE_ENV === 'development') {
//         console.warn('⚠️ [Request] No access token for:', shopbyRequest.url);
//     }
// };

// /**
//  * 클라이언트 사이드에서 리프레시 토큰을 헤더에 설정
//  */
// export const setRefreshTokenHeader: BeforeRequestHook = (request) => {
//     if (typeof window === 'undefined') return;

//     const token = cookieTokenManager.getRefreshToken();
//     if (token) {
//         shopbyRequest.headers.set('Refresh-Token', token);
//     }
// };

// /**
//  * 401 에러 시 토큰 갱신 후 재시도 (클라이언트 사이드)
//  */
// export const beforeRetry: BeforeRetryHook = async ({
//     request,
//     error,
//     retryCount,
// }) => {
//     const response = (error as HTTPError).response;
//     if (response?.status !== 401) {
//         return ky.stop;
//     }

//     // 서버 사이드에서는 재시도 불가 (ctx 없이는 토큰 갱신이 어려움)
//     if (typeof window === 'undefined') {
//         return ky.stop;
//     }

//     // 최대 재시도 횟수 초과
//     if (retryCount >= DEFAULT_API_RETRY_LIMIT - 1) {
//         console.warn('🔒 Token refresh failed, redirecting to login');
//         cookieTokenManager.clearTokens();
//         window.location.href = PATHS.AUTH.LOGIN;
//         return ky.stop;
//     }

//     try {
//         const currentAccessToken = getCookie(ACCESS_TOKEN_KEY);
//         const currentRefreshToken = getCookie(REFRESH_TOKEN_KEY);

//         if (!currentRefreshToken) {
//             console.warn('🔒 No refresh token available');
//             cookieTokenManager.clearTokens();
//             window.location.href = PATHS.AUTH.LOGIN;
//             return ky.stop;
//         }

//         // authRequest (순환 참조 방지를 위해 동적 임포트)
//         const { authRequest } = await import('@/api/core/request');

//         const refreshResponse = await authRequest
//             .post('oauth2/update-access-token', {
//                 headers: {
//                     'Shop-By-Authorization': `Bearer ${currentAccessToken || ''}`,
//                     'Refresh-Token': currentRefreshToken?.toString() || '',
//                 },
//             })
//             .json<{ accessToken: string }>();

//         const newToken = refreshResponse.accessToken;

//         // 쿠키에 새 토큰 저장
//         cookieTokenManager.setToken(newToken);

//         // 현재 요청에 새 토큰 설정
//         shopbyRequest.headers.set('Shop-By-Authorization', `Bearer ${newToken}`);

//         console.log('🔄 Token refreshed successfully');
//     } catch (refreshError) {
//         console.error('🔒 Token refresh failed:', refreshError);
//         cookieTokenManager.clearTokens();
//         window.location.href = PATHS.AUTH.LOGIN;
//         return ky.stop;
//     }
// };

import { AxiosRequestConfig } from 'axios';

// import { PATHS } from '@/const/paths';
// import { authCookieManager } from '@/utils/cookie';
// import { partnerHouseLogoutUrl } from '@/utils/url';
import { deviceDetect, isAndroid, isIOS } from 'react-device-detect';
import { ClientPlatformType } from '@/models';
import { env } from '@/configs/env';

export const DEFAULT_API_RETRY_BACKOFF_LIMIT = 3 * 1000;
export const DEFAULT_API_RETRY_LIMIT = 4;
export const DEFAULT_API_TIMEOUT = 10 * 1000;

export const getPlatform = (): ClientPlatformType => {
    const device = deviceDetect(navigator.userAgent);

    if (device.isMobile) {
        if (isIOS) {
            return 'IOS';
        }
        if (isAndroid) {
            return 'AOS';
        }
        return 'MOBILE_WEB';
    }

    return 'PC';
};

export const defaultHeaders = () => {
    return {
        version: env.NEXT_PUBLIC_VERSION || '',
        clientId: env.NEXT_PUBLIC_CLIENT_ID || '',
        platform: getPlatform(),
        language: env.NEXT_PUBLIC_LOCALE,
        currency: env.NEXT_PUBLIC_CURRENCY,
    };
};

export const logOnDev = (message: string, color?: string) => {
    if (env.NEXT_PUBLIC_MODE === 'development') {
        console.log(
            `%c${message}`,
            `color: ${color || 'orange'}; font-weight:bold;`,
        );
    }
};

export const isUpdateOauth2Request = (
    url: AxiosRequestConfig['url'],
    method: AxiosRequestConfig['method'],
) => {
    return url === '/oauth2' && method?.toUpperCase() === 'PUT';
};

export const isIssueOauth2Request = (
    url: AxiosRequestConfig['url'],
    method: AxiosRequestConfig['method'],
) => {
    return url === '/oauth2' && method?.toUpperCase() === 'POST';
};

export const isDormantAccountRequest = (
    url: AxiosRequestConfig['url'],
    method: AxiosRequestConfig['method'],
    code: string,
) => {
    return (
        url === '/profile' &&
        method?.toUpperCase() === 'GET' &&
        code === 'M0020'
    );
};

export const isShopbyRequest = (baseUrl?: string) => {
    return baseUrl === env.NEXT_PUBLIC_SHOPBY_BASE_URL;
};

export const isGuestRequest = (
    url: AxiosRequestConfig['url'],
    method: AxiosRequestConfig['method'],
) => {
    const requestMethod = method?.toUpperCase() || '';
    const requestUrl = url ?? '';

    if (!requestUrl.includes('/guest')) {
        return false;
    }

    const exceptionList = [
        // 비회원 장바구니 계산하기 /guest/cart
        { method: 'POST', pattern: /^\/guest\/cart(?:\?.*)?$/ },
        // 비회원 주문 토큰 발급하기 /guest/orders/${orderNo}
        { method: 'POST', pattern: /^\/guest\/orders\/[^/]+(?:\?.*)?$/ },
        // 비회원 초기화된 주문 패스워드 전송하기 /guest/orders/${orderNo}/forgot-password
        {
            method: 'GET',
            pattern: /^\/guest\/orders\/[^/]+\/forgot-password(?:\?.*)?$/,
        },
        // 이전주문 비회원 토큰 발급 /previous-orders/guest/${orderNo}
        {
            method: 'POST',
            pattern: /^\/previous-orders\/guest\/[^/]+(?:\?.*)?$/,
        },
    ];

    const isException = exceptionList.some(
        (rule) =>
            rule.method === requestMethod && rule.pattern.test(requestUrl),
    );

    if (isException) {
        return false;
    }

    return true;
};
