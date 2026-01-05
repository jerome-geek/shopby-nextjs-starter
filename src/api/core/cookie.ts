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
     * 서버 사이드 컨텍스트를 동적으로 가져옵니다 (Next.js 15 전용)
     */
    private async getServerContext(): Promise<OptionsType> {
        if (typeof window !== 'undefined') return {};
        try {
            const { cookies } = await import('next/headers');
            // cookies-next expects the cookies function itself as part of context in Next.js 15
            return { cookies } as unknown as OptionsType;
        } catch {
            return {} as OptionsType;
        }
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
        const context = await this.getServerContext();
        const mergedOptions = { ...context, ...options } as OptionsType;

        // Access Token 저장
        await setCookie(this.ACCESS_TOKEN_KEY, accessToken, {
            ...this.getCookieOptions(expiresIn),
            ...mergedOptions,
        } as OptionsType);

        // Refresh Token 저장
        if (refreshToken) {
            await setCookie(this.REFRESH_TOKEN_KEY, refreshToken, {
                ...this.getCookieOptions(refreshTokenExpiresIn),
                ...mergedOptions,
            } as OptionsType);
        }
    }

    /**
     * 액세스 토큰 가져오기
     */
    async getToken(options?: OptionsType): Promise<string | null> {
        const context = await this.getServerContext();
        const value = await getCookie(this.ACCESS_TOKEN_KEY, {
            ...context,
            ...options,
        } as OptionsType);
        return value ? String(value) : null;
    }

    /**
     * 리프레시 토큰 가져오기
     */
    async getRefreshToken(options?: OptionsType): Promise<string | null> {
        const context = await this.getServerContext();
        const value = await getCookie(this.REFRESH_TOKEN_KEY, {
            ...context,
            ...options,
        } as OptionsType);
        return value ? String(value) : null;
    }

    /**
     * 토큰 존재 여부 확인
     */
    async hasToken(options?: OptionsType): Promise<boolean> {
        const context = await this.getServerContext();
        return await hasCookie(this.ACCESS_TOKEN_KEY, {
            ...context,
            ...options,
        } as OptionsType);
    }

    /**
     * 모든 토큰 제거
     */
    async clearTokens(options?: OptionsType): Promise<void> {
        const context = await this.getServerContext();
        const clearOptions = {
            ...this.getCookieOptions(0),
            ...context,
            ...options,
        } as OptionsType;
        await deleteCookie(this.ACCESS_TOKEN_KEY, clearOptions);
        await deleteCookie(this.REFRESH_TOKEN_KEY, clearOptions);
    }

    /**
     * 클라이언트 사이드 전용 동기 메서드 (UI 렌더링용)
     */
    getTokenSync(): string | null {
        if (typeof window === 'undefined') return null;
        const value = getCookie(this.ACCESS_TOKEN_KEY);
        return value ? String(value) : null;
    }

    getRefreshTokenSync(): string | null {
        if (typeof window === 'undefined') return null;
        const value = getCookie(this.REFRESH_TOKEN_KEY);
        return value ? String(value) : null;
    }

    isTokenValidSync(): boolean {
        return !!this.getTokenSync();
    }
}

export const cookieTokenManager = CookieTokenManager.getInstance();

/**
 * Next.js App Router용 헬퍼 함수들
 */
export const getTokenFromAppRouter = () => cookieTokenManager.getToken();
export const getRefreshTokenFromAppRouter = () =>
    cookieTokenManager.getRefreshToken();
export const isTokenValidFromAppRouter = async () =>
    !!(await getTokenFromAppRouter());

export const getServerCookies = async () => {
    const { cookies } = await import('next/headers');
    return cookies();
};

export const getTokenFromHeaders = () => cookieTokenManager.getToken();
export const isTokenValidFromHeaders = () => cookieTokenManager.hasToken();

/**
 * 미들웨어 또는 옵션에서 직접 쿠키를 다룰 때 사용하는 헬퍼
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
