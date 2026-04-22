/**
 * @file cookie.ts
 * @description 인증 쿠키 헬퍼
 *
 * cookies-next 기반으로 CSR/SSR 양쪽에서 동일하게 사용할 수 있습니다.
 * SSR(getServerSideProps)에서는 ctx를 넘겨주세요.
 *
 * @example CSR
 * accessTokenCookie.get()
 * accessTokenCookie.set(token, expires)
 *
 * @example SSR
 * accessTokenCookie.get(ctx)
 * accessTokenCookie.set(token, expires, { ctx })
 */

import {
    type OptionsType,
    deleteCookie,
    getCookie,
    setCookie,
} from 'cookies-next';
import type { GetServerSidePropsContext } from 'next';

import { COOKIE_KEYS } from '@/const/cookieKeys';

// ─── Types ────────────────────────────────────────────────────────────────────

/** getServerSideProps의 ctx에서 req/res 부분만 추출한 타입 */
export type CookieCtx = Pick<GetServerSidePropsContext, 'req' | 'res'>;

export interface CookieSetOptions {
    /** @default 'lax' */
    sameSite?: 'lax' | 'strict' | 'none';
    secure?: boolean;
    path?: string;
    domain?: string;
    /** SSR에서 사용할 때 ctx를 넘겨주세요 */
    ctx?: CookieCtx;
}

export type CookieClearOptions = Pick<
    CookieSetOptions,
    'path' | 'domain' | 'ctx'
>;

// ─── Internal ─────────────────────────────────────────────────────────────────

const DEFAULT_PATH = '/';
const DEFAULT_SAME_SITE = 'lax' as const;

/**
 * [SECURITY & UX]
 * 실제 토큰 만료 시간보다 쿠키의 수명을 더 길게 설정하기 위한 보정값(1일)입니다.
 * 이렇게 해야 토큰이 만료된 직후에도 인터셉터가 쿠키를 읽어 /oauth2로 갱신을 시도할 수 있습니다.
 */
const COOKIE_EXPIRY_BUFFER_SECONDS = 60 * 60 * 24;

function toDate(expires: number | string): Date {
    return typeof expires === 'string'
        ? new Date(expires)
        : new Date(Date.now() + expires * 1000);
}

function toOptions(
    expires?: number | string,
    opts?: CookieSetOptions,
): OptionsType {
    return {
        expires: expires !== undefined ? toDate(expires) : undefined,
        path: opts?.path ?? DEFAULT_PATH,
        sameSite: opts?.sameSite ?? DEFAULT_SAME_SITE,
        secure: opts?.secure,
        domain: opts?.domain,
        req: opts?.ctx?.req,
        res: opts?.ctx?.res,
    };
}

function read(key: string, ctx?: CookieCtx): string | undefined {
    if (ctx?.req) {
        return (ctx.req.cookies as Record<string, string>)[key];
    }
    const val = getCookie(key);
    return val ? String(val) : undefined;
}

function write(
    key: string,
    value: string,
    expires?: number | string,
    opts?: CookieSetOptions,
) {
    setCookie(key, value, toOptions(expires, opts));
}

function remove(key: string, opts?: CookieClearOptions) {
    deleteCookie(key, {
        path: opts?.path ?? DEFAULT_PATH,
        domain: opts?.domain,
        req: opts?.ctx?.req,
        res: opts?.ctx?.res,
    });
}

// ─── Cookie Namespaces ────────────────────────────────────────────────────────

/**
 * 액세스 토큰 쿠키
 * @example
 * accessTokenCookie.get()
 * accessTokenCookie.set(token, 1800)
 * accessTokenCookie.update()   // 만료 시간만 30분 연장
 * accessTokenCookie.clear()
 */
export const accessTokenCookie = {
    get: (ctx?: CookieCtx) => read(COOKIE_KEYS.ACCESS_TOKEN, ctx),

    /**
     * 액세스 토큰을 쿠키에 저장합니다.
     * 실제 토큰 만료 시간보다 쿠키 수명을 더 길게 설정하여(buffer),
     * 만료 직후에도 인터셉터가 토큰 갱신을 시도할 수 있게 합니다.
     */
    set: (token: string, expires: number, opts?: CookieSetOptions) => {
        write(
            COOKIE_KEYS.ACCESS_TOKEN,
            token,
            expires + COOKIE_EXPIRY_BUFFER_SECONDS,
            opts,
        );
    },

    /**
     * 기존 토큰 값을 유지한 채 만료 시간만 30분(1800초) 연장합니다.
     * 이때도 동일한 보정값(buffer)을 더해 쿠키 수명을 확보합니다.
     */
    update: (ctx?: CookieCtx) => {
        const token = read(COOKIE_KEYS.ACCESS_TOKEN, ctx);
        if (!token) return;
        write(
            COOKIE_KEYS.ACCESS_TOKEN,
            token,
            1800 + COOKIE_EXPIRY_BUFFER_SECONDS,
        );
    },

    clear: (opts?: CookieClearOptions) =>
        remove(COOKIE_KEYS.ACCESS_TOKEN, opts),
} as const;

/**
 * 리프레시 토큰 쿠키
 * @example
 * refreshTokenCookie.get()
 * refreshTokenCookie.set(token, 604800)
 * refreshTokenCookie.clear()
 */
export const refreshTokenCookie = {
    get: (ctx?: CookieCtx) => read(COOKIE_KEYS.REFRESH_TOKEN, ctx),

    set: (token: string, expires: number, opts?: CookieSetOptions) =>
        write(COOKIE_KEYS.REFRESH_TOKEN, token, expires, opts),

    clear: (opts?: CookieClearOptions) =>
        remove(COOKIE_KEYS.REFRESH_TOKEN, opts),
} as const;

/**
 * 게스트 토큰 쿠키
 * @example
 * guestTokenCookie.get()
 * guestTokenCookie.set(token)
 * guestTokenCookie.clear()
 */
export const guestTokenCookie = {
    get: (ctx?: CookieCtx) => read(COOKIE_KEYS.GUEST_TOKEN, ctx),

    /**
     * @param token 게스트 토큰
     * @param opts 만료 시간이 없으면 세션 쿠키로 저장됩니다
     */
    set: (token: string, opts?: CookieSetOptions) =>
        write(COOKIE_KEYS.GUEST_TOKEN, token, undefined, opts),

    clear: (opts?: CookieClearOptions) => remove(COOKIE_KEYS.GUEST_TOKEN, opts),
} as const;

/**
 * 회원 토큰(액세스 + 리프레시)을 한번에 제거합니다
 * @example memberCookie.clearAll()
 */
export const memberCookie = {
    clearAll: (opts?: CookieClearOptions) => {
        accessTokenCookie.clear(opts);
        refreshTokenCookie.clear(opts);
    },
} as const;
