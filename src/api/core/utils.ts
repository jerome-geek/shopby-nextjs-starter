import { AxiosRequestConfig } from 'axios';
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
