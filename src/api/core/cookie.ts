import { getCookie, setCookie, deleteCookie, OptionsType } from 'cookies-next';
import { LocalStorageManager } from './localStorage';

/**


/**
 * 스토리지 키에 prefix를 추가하는 헬퍼 함수
 */
function getStorageKey(key: string): string {
    const prefix = process.env.NEXT_PUBLIC_APP_NAME || 'shopby';
    return `${prefix}_${key}`;
}

export class CookieTokenManager {
    private static instance: CookieTokenManager;
    private readonly ACCESS_TOKEN_KEY: string;
    private readonly REFRESH_TOKEN_KEY: string;

    // 환경별 설정
    private readonly isDevelopment = process.env.NODE_ENV === 'development';
    private readonly isProduction = process.env.NODE_ENV === 'production';

    private constructor() {
        // prefix를 포함한 키 생성 (소문자 케밥 케이스로 통일)
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
     * 쿠키 옵션 생성 (cookies-next 형식)
     */
    private getCookieOptions(maxAge: number): OptionsType {
        return {
            maxAge,
            path: '/',
            secure: this.isProduction,
            sameSite: this.isProduction ? 'strict' : 'lax',
        };
    }

    setAccessToken(token: string, expiresIn: number = 3600) {
        const options = this.getCookieOptions(expiresIn);

        setCookie(this.ACCESS_TOKEN_KEY, token, options);
    }

    /**
     * 리프레시 토큰을 쿠키에 저장 (cookies-next 사용)
     */
    setRefreshToken(refreshToken: string, expiresIn: number = 604800): void {
        const options = this.getCookieOptions(expiresIn);

        setCookie(this.REFRESH_TOKEN_KEY, refreshToken, options);
    }

    /**
     * 토큰을 쿠키에 저장 (cookies-next 사용)
     *  - accessToken, refreshToken, expiry를 모두 저장
     */
    setToken({
        accessToken,
        refreshToken,
        expiresIn = 3600,
        refreshTokenExpiresIn = 604800,
    }: {
        accessToken: string;
        refreshToken: string;
        expiresIn?: number;
        refreshTokenExpiresIn?: number;
    }) {
        // Access Token 저장
        const accessTokenOptions = this.getCookieOptions(expiresIn);
        setCookie(this.ACCESS_TOKEN_KEY, accessToken, accessTokenOptions);

        // Refresh Token 저장
        const refreshTokenOptions = this.getCookieOptions(
            refreshTokenExpiresIn
        );
        setCookie(this.REFRESH_TOKEN_KEY, refreshToken, refreshTokenOptions);
    }

    /**
     * 저장된 토큰 가져오기 (클라이언트 사이드)
     */
    getToken(): string | null {
        if (typeof window === 'undefined') return null;
        const value = getCookie(this.ACCESS_TOKEN_KEY);
        return value ? String(value) : null;
    }

    /**
     * 저장된 리프레시 토큰 가져오기 (클라이언트 사이드)
     */
    getRefreshToken(): string | null {
        if (typeof window === 'undefined') return null;
        const value = getCookie(this.REFRESH_TOKEN_KEY);
        return value ? String(value) : null;
    }

    /**
     * 서버 사이드에서 토큰 가져오기
     */
    getTokenFromServer(
        cookies?: Record<string, string> | string | undefined
    ): string | null {
        if (!cookies) return null;

        // cookies-next는 서버에서도 사용 가능하지만, 쿠키 객체를 직접 받을 수도 있음
        if (typeof cookies === 'string') {
            // 쿠키 문자열인 경우 파싱
            const cookieObj = this.parseCookieString(cookies);
            return cookieObj[this.ACCESS_TOKEN_KEY] || null;
        }

        if (typeof cookies === 'object') {
            return cookies[this.ACCESS_TOKEN_KEY] || null;
        }

        return null;
    }

    /**
     * 서버 사이드에서 리프레시 토큰 가져오기
     */
    getRefreshTokenFromServer(
        cookies?: Record<string, string> | string | undefined
    ): string | null {
        if (!cookies) return null;

        if (typeof cookies === 'string') {
            const cookieObj = this.parseCookieString(cookies);
            return cookieObj[this.REFRESH_TOKEN_KEY] || null;
        }

        if (typeof cookies === 'object') {
            return cookies[this.REFRESH_TOKEN_KEY] || null;
        }

        return null;
    }

    /**
     * 쿠키 문자열을 객체로 파싱
     */
    private parseCookieString(cookieString: string): Record<string, string> {
        const cookies: Record<string, string> = {};
        cookieString.split(';').forEach((cookie) => {
            const [name, value] = cookie.trim().split('=');
            if (name && value) {
                cookies[name] = decodeURIComponent(value);
            }
        });
        return cookies;
    }

    /**
     * 토큰 만료 여부 확인 (클라이언트 사이드)
     */
    isTokenExpired() {
        return this.getToken() === null;
    }

    /**
     * 서버 사이드에서 토큰 만료 여부 확인
     */
    isTokenExpiredFromServer(
        cookies?: Record<string, string> | string | undefined
    ): boolean {
        return this.getTokenFromServer(cookies) === null;
    }

    /**
     * 토큰 유효성 검사 (클라이언트 사이드)
     */
    isTokenValid(): boolean {
        const token = this.getToken();
        return token !== null && !this.isTokenExpired();
    }

    /**
     * 서버 사이드에서 토큰 유효성 검사
     */
    isTokenValidFromServer(
        cookies?: Record<string, string> | string | undefined
    ): boolean {
        const token = this.getTokenFromServer(cookies);
        return token !== null && !this.isTokenExpiredFromServer(cookies);
    }

    /**
     * 모든 토큰 제거
     */
    clearTokens(): void {
        deleteCookie(this.ACCESS_TOKEN_KEY);
        deleteCookie(this.REFRESH_TOKEN_KEY);
    }

    /**
     * 토큰 갱신
     */
    refreshToken(): void {
        const refreshToken = this.getRefreshToken();
        if (refreshToken) {
            // 여기서 실제 토큰 갱신 API 호출 로직을 구현할 수 있습니다
            // 예: this.apiClient.refreshToken(refreshToken)
        }
    }
}

// 싱글톤 인스턴스 exportsetToken
export const cookieTokenManager = CookieTokenManager.getInstance();

// Server Component에서 사용하기 위한 헬퍼 함수들
export const getServerCookies = (
    headers: Headers | Record<string, string> | string | undefined
): string | undefined => {
    if (typeof headers === 'string') {
        return headers;
    }

    if (headers instanceof Headers) {
        return headers.get('cookie') || undefined;
    }

    if (headers && typeof headers === 'object' && 'cookie' in headers) {
        return headers.cookie;
    }

    return undefined;
};

/**
 * 쿠키 문자열을 객체로 파싱
 */
export const parseCookies = (
    cookieString: string | undefined
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

export const getTokenFromHeaders = (
    headers: Headers | Record<string, string> | string | undefined
): string | null => {
    const cookieString = getServerCookies(headers);
    const cookies = parseCookies(cookieString);
    return cookieTokenManager.getTokenFromServer(cookies);
};

export const isTokenValidFromHeaders = (
    headers: Headers | Record<string, string> | string | undefined
): boolean => {
    const cookieString = getServerCookies(headers);
    const cookies = parseCookies(cookieString);
    return cookieTokenManager.isTokenValidFromServer(cookies);
};

// Next.js App Router용 헬퍼 함수
export const getTokenFromAppRouter = async (): Promise<string | null> => {
    try {
        const { cookies: nextCookies } = await import('next/headers');
        const cookieStore = await nextCookies();
        const cookieString = cookieStore.toString();
        const cookies = parseCookies(cookieString);
        return cookieTokenManager.getTokenFromServer(cookies);
    } catch {
        return null;
    }
};

export const isTokenValidFromAppRouter = async (): Promise<boolean> => {
    try {
        const { cookies: nextCookies } = await import('next/headers');
        const cookieStore = await nextCookies();
        const cookieString = cookieStore.toString();
        const cookies = parseCookies(cookieString);
        return cookieTokenManager.isTokenValidFromServer(cookies);
    } catch {
        return false;
    }
};
