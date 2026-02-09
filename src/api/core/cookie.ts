import { getCookie, setCookie, deleteCookie } from 'cookies-next';
import type { OptionsType } from 'cookies-next';

export const ACCESS_TOKEN_KEY = 'shopby_access_token';
export const REFRESH_TOKEN_KEY = 'shopby_refresh_token';

// 쿠키 옵션
const COOKIE_OPTIONS: OptionsType = {
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7일
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
};

/**
 * 클라이언트 사이드에서 토큰을 쿠키에 저장/조회하는 매니저
 */
export const cookieTokenManager = {
    getToken: (): string | null => {
        if (typeof window === 'undefined') return null;
        const token = getCookie(ACCESS_TOKEN_KEY);
        return token?.toString() || null;
    },

    getRefreshToken: (): string | null => {
        if (typeof window === 'undefined') return null;
        const token = getCookie(REFRESH_TOKEN_KEY);
        return token?.toString() || null;
    },

    setToken: (accessToken: string, refreshToken?: string): void => {
        setCookie(ACCESS_TOKEN_KEY, accessToken, COOKIE_OPTIONS);
        if (refreshToken) {
            setCookie(REFRESH_TOKEN_KEY, refreshToken, COOKIE_OPTIONS);
        }
    },

    clearTokens: (): void => {
        deleteCookie(ACCESS_TOKEN_KEY);
        deleteCookie(REFRESH_TOKEN_KEY);
    },
};

/**
 * getServerSideProps에서 토큰 가져오기
 * @param ctx - GetServerSidePropsContext
 */
export function getTokenFromContext(ctx: {
    req: { cookies: Record<string, string> };
}): string | null {
    return ctx.req.cookies[ACCESS_TOKEN_KEY] || null;
}

export function getRefreshTokenFromContext(ctx: {
    req: { cookies: Record<string, string> };
}): string | null {
    return ctx.req.cookies[REFRESH_TOKEN_KEY] || null;
}

/**
 * API Route에서 토큰 가져오기
 */
export function getTokenFromApiRoute(req: {
    cookies: Record<string, string>;
}): string | null {
    return req.cookies[ACCESS_TOKEN_KEY] || null;
}

export function getRefreshTokenFromApiRoute(req: {
    cookies: Record<string, string>;
}): string | null {
    return req.cookies[REFRESH_TOKEN_KEY] || null;
}
