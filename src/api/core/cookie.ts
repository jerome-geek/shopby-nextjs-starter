import {
    getCookie,
    setCookie,
    deleteCookie,
    hasCookie,
    OptionsType,
} from 'cookies-next';

/**
 * 스토리지 키에 prefix를 추가하는 헬퍼 함수
 */
function getStorageKey(key: string): string {
    const prefix = process.env.NEXT_PUBLIC_APP_NAME || 'shopby';
    return `${prefix}_${key}`;
}

/**
 * 쿠키 기반 토큰 관리 클래스
 * cookies-next 라이브러리를 사용하여 클라이언트/서버 환경을 통합 관리합니다.
 */
export class CookieTokenManager {
    private static instance: CookieTokenManager;
    public readonly ACCESS_TOKEN_KEY: string;
    public readonly REFRESH_TOKEN_KEY: string;

    private readonly isProduction = process.env.NODE_ENV === 'production';

    private constructor() {
        this.ACCESS_TOKEN_KEY = getStorageKey('access-token');
        this.REFRESH_TOKEN_KEY = getStorageKey('refresh-token');
    }

    static getInstance(): CookieTokenManager {
        if (!CookieTokenManager.instance) {
            CookieTokenManager.instance = new CookieTokenManager();
        }
        return CookieTokenManager.instance;
    }

    /**
     * 기본 쿠키 옵션 생성
     */
    private getCookieOptions(maxAge: number): OptionsType {
        return {
            maxAge,
            path: '/',
            secure: this.isProduction,
            sameSite: this.isProduction ? 'strict' : 'lax',
        };
    }

    /**
     * 토큰들을 쿠키에 저장
     */
    async setToken(
        {
            accessToken,
            refreshToken,
            expiresIn = 3600,
            refreshTokenExpiresIn = 604800,
        }: {
            accessToken: string;
            refreshToken?: string;
            expiresIn?: number;
            refreshTokenExpiresIn?: number;
        },
        options?: OptionsType
    ) {
        // Access Token 저장
        await setCookie(this.ACCESS_TOKEN_KEY, accessToken, {
            ...this.getCookieOptions(expiresIn),
            ...options,
        } as OptionsType);

        // Refresh Token 저장
        if (refreshToken) {
            await setCookie(this.REFRESH_TOKEN_KEY, refreshToken, {
                ...this.getCookieOptions(refreshTokenExpiresIn),
                ...options,
            } as OptionsType);
        }
    }

    /**
     * 특정 키의 쿠키 값 가져오기 (클라이언트/서버 공용)
     */
    async get(key: string, options?: OptionsType): Promise<string | null> {
        const value = await getCookie(key, options);
        return value ? String(value) : null;
    }

    /**
     * 액세스 토큰 가져오기
     */
    async getToken(options?: OptionsType): Promise<string | null> {
        return this.get(this.ACCESS_TOKEN_KEY, options);
    }

    /**
     * 리프레시 토큰 가져오기
     */
    async getRefreshToken(options?: OptionsType): Promise<string | null> {
        return this.get(this.REFRESH_TOKEN_KEY, options);
    }

    /**
     * 토큰 존재 여부 확인
     */
    async hasToken(options?: OptionsType): Promise<boolean> {
        return await hasCookie(this.ACCESS_TOKEN_KEY, options);
    }

    /**
     * 모든 토큰 제거
     */
    async clearTokens(options?: OptionsType): Promise<void> {
        const clearOptions = { ...options, path: '/' } as OptionsType;
        await deleteCookie(this.ACCESS_TOKEN_KEY, clearOptions);
        await deleteCookie(this.REFRESH_TOKEN_KEY, clearOptions);
    }

    /**
     * [Legacy/Shim] 서버 사이드 수동 파싱 지원 (하위 호환성용)
     */
    getTokenFromServer(cookies?: any): string | null {
        if (!cookies) return null;
        if (typeof cookies === 'string') {
            const parsed = parseCookies(cookies);
            return parsed[this.ACCESS_TOKEN_KEY] || null;
        }
        return cookies[this.ACCESS_TOKEN_KEY] || null;
    }

    getRefreshTokenFromServer(cookies?: any): string | null {
        if (!cookies) return null;
        if (typeof cookies === 'string') {
            const parsed = parseCookies(cookies);
            return parsed[this.REFRESH_TOKEN_KEY] || null;
        }
        return cookies[this.REFRESH_TOKEN_KEY] || null;
    }
}

export const cookieTokenManager = CookieTokenManager.getInstance();

/**
 * Next.js App Router 전용 헬퍼 함수들
 * cookies() API를 자동으로 주입하여 사용합니다.
 */

const getAppRouterContext = async () => {
    if (typeof window !== 'undefined') return {};
    const { cookies: nextCookies } = await import('next/headers');
    // cookies-next 6.x expects the cookies function itself (unresolved) for Next.js 15
    return { cookies: nextCookies as any };
};

export const getTokenFromAppRouter = async (): Promise<string | null> => {
    try {
        const context = await getAppRouterContext();
        return await cookieTokenManager.getToken(context);
    } catch (error) {
        console.error('❌ [Server] Failed to get token:', error);
        return null;
    }
};

export const getRefreshTokenFromAppRouter = async (): Promise<
    string | null
> => {
    try {
        const context = await getAppRouterContext();
        return await cookieTokenManager.getRefreshToken(context);
    } catch {
        return null;
    }
};

export const isTokenValidFromAppRouter = async (): Promise<boolean> => {
    try {
        const token = await getTokenFromAppRouter();
        return !!token;
    } catch {
        return false;
    }
};

/**
 * [Optional] Header/Request 객체로부터 쿠키 추출 및 토큰 확인
 */
export const getTokenFromHeaders = (headers: Headers): string | null => {
    const cookieString = headers.get('cookie');
    return cookieTokenManager.getTokenFromServer(cookieString);
};

/**
 * 쿠키 문자열을 객체로 파싱 (Legacy/Shim)
 */
export const parseCookies = (
    cookieString: string | null | undefined
): Record<string, string> => {
    if (!cookieString) return {};

    const cookies: Record<string, string> = {};
    cookieString.split(';').forEach((cookie) => {
        const [name, value] = cookie.trim().split('=');
        if (name && value) {
            cookies[name] = decodeURIComponent(value);
        }
    });
    return cookies;
};
