import { AfterResponseHook, BeforeRequestHook } from 'ky';

const DEFAULT_API_RETRY_BACKOFF_LIMIT = 3 * 1000;
const DEFAULT_API_RETRY_LIMIT = 4;
const DEFAULT_API_TIMEOUT = 10 * 1000;

const logRequest: BeforeRequestHook = (request) => {
    console.log('Request:', request);
    if (process.env.NODE_ENV === 'development') {
        console.log('API Request:', request.url);
    }
};

const logResponse: AfterResponseHook = (request, options, response) => {
    console.log('Response:', response);
    if (process.env.NODE_ENV === 'development') {
        console.log('API Response:', response.status, request.url);
    }
};

export {
    DEFAULT_API_RETRY_BACKOFF_LIMIT,
    DEFAULT_API_RETRY_LIMIT,
    DEFAULT_API_TIMEOUT,
    logRequest,
    logResponse,
};

export class CookieTokenManager {
    private static instance: CookieTokenManager;
    private readonly TOKEN_KEY = 'Shop-By-Authorization';
    private readonly REFRESH_TOKEN_KEY = 'Refresh-Token';
    private readonly TOKEN_EXPIRY_KEY = 'token_expiry';

    // 환경별 설정
    private readonly isDevelopment = process.env.NODE_ENV === 'development';
    private readonly isProduction = process.env.NODE_ENV === 'production';

    private constructor() {}

    static getInstance(): CookieTokenManager {
        if (!CookieTokenManager.instance) {
            CookieTokenManager.instance = new CookieTokenManager();
        }
        return CookieTokenManager.instance;
    }

    /**
     * 클라이언트 사이드에서 쿠키 설정
     */
    private setCookieClient(
        name: string,
        value: string,
        options: {
            maxAge?: number;
            path?: string;
            secure?: boolean;
            sameSite?: string;
        } = {}
    ): void {
        if (typeof document === 'undefined') return;

        const {
            maxAge = 3600,
            path = '/',
            secure = this.isProduction, // 운영환경에서만 true, 개발환경에서는 false
            sameSite = 'lax', // 개발환경에서는 lax, 운영환경에서는 strict
        } = options;

        let cookieString = `${name}=${value}; path=${path}`;

        if (maxAge) {
            const expires = new Date();
            expires.setTime(expires.getTime() + maxAge * 1000);
            cookieString += `; expires=${expires.toUTCString()}`;
        }

        // 운영환경에서만 secure 플래그 추가
        if (secure && this.isProduction) {
            cookieString += '; secure';
        }

        // 환경별 sameSite 설정
        if (sameSite) {
            const finalSameSite = this.isProduction ? 'strict' : 'lax';
            cookieString += `; samesite=${finalSameSite}`;
        }

        document.cookie = cookieString;
    }

    /**
     * 클라이언트 사이드에서 쿠키 읽기
     */
    private getCookieClient(name: string): string | null {
        if (typeof document === 'undefined') return null;

        const cookies = document.cookie.split(';');
        for (const cookie of cookies) {
            const [cookieName, cookieValue] = cookie.trim().split('=');
            if (cookieName === name) {
                return cookieValue;
            }
        }
        return null;
    }

    /**
     * 클라이언트 사이드에서 쿠키 삭제
     */
    private deleteCookieClient(name: string, path: string = '/'): void {
        if (typeof document === 'undefined') return;

        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${path}`;
    }

    /**
     * 서버 사이드에서 쿠키 읽기
     */
    private getCookieServer(
        cookies: string | undefined,
        name: string
    ): string | null {
        if (!cookies) return null;

        const cookieArray = cookies.split(';');
        for (const cookie of cookieArray) {
            const [cookieName, cookieValue] = cookie.trim().split('=');
            if (cookieName === name) {
                return cookieValue;
            }
        }
        return null;
    }

    /**
     * 토큰을 쿠키에 저장 (클라이언트 사이드)
     */
    setToken(token: string, expiresIn: number = 3600): void {
        this.setCookieClient(this.TOKEN_KEY, token, { maxAge: expiresIn });
        this.setCookieClient(
            this.TOKEN_EXPIRY_KEY,
            (Date.now() + expiresIn * 1000).toString(),
            { maxAge: expiresIn }
        );
    }

    /**
     * 리프레시 토큰을 쿠키에 저장 (클라이언트 사이드)
     */
    setRefreshToken(refreshToken: string, expiresIn: number = 604800): void {
        this.setCookieClient(this.REFRESH_TOKEN_KEY, refreshToken, {
            maxAge: expiresIn,
        });
    }

    /**
     * 저장된 토큰 가져오기 (클라이언트 사이드)
     */
    getToken(): string | null {
        return this.getCookieClient(this.TOKEN_KEY);
    }

    /**
     * 저장된 리프레시 토큰 가져오기 (클라이언트 사이드)
     */
    getRefreshToken(): string | null {
        return this.getCookieClient(this.REFRESH_TOKEN_KEY);
    }

    /**
     * 서버 사이드에서 토큰 가져오기
     */
    getTokenFromServer(cookies: string | undefined): string | null {
        return this.getCookieServer(cookies, this.TOKEN_KEY);
    }

    /**
     * 서버 사이드에서 리프레시 토큰 가져오기
     */
    getRefreshTokenFromServer(cookies: string | undefined): string | null {
        return this.getCookieServer(cookies, this.REFRESH_TOKEN_KEY);
    }

    /**
     * 토큰 만료 여부 확인 (클라이언트 사이드)
     */
    isTokenExpired(): boolean {
        const expiryTime = this.getCookieClient(this.TOKEN_EXPIRY_KEY);
        if (!expiryTime) return true;

        return Date.now() > parseInt(expiryTime);
    }

    /**
     * 서버 사이드에서 토큰 만료 여부 확인
     */
    isTokenExpiredFromServer(cookies: string | undefined): boolean {
        const expiryTime = this.getCookieServer(cookies, this.TOKEN_EXPIRY_KEY);
        if (!expiryTime) return true;

        return Date.now() > parseInt(expiryTime);
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
    isTokenValidFromServer(cookies: string | undefined): boolean {
        const token = this.getTokenFromServer(cookies);
        return token !== null && !this.isTokenExpiredFromServer(cookies);
    }

    /**
     * 모든 토큰 제거
     */
    clearTokens(): void {
        this.deleteCookieClient(this.TOKEN_KEY);
        this.deleteCookieClient(this.REFRESH_TOKEN_KEY);
        this.deleteCookieClient(this.TOKEN_EXPIRY_KEY);
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

// 싱글톤 인스턴스 export
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

export const getTokenFromHeaders = (
    headers: Headers | Record<string, string> | string | undefined
): string | null => {
    const cookies = getServerCookies(headers);
    return cookieTokenManager.getTokenFromServer(cookies);
};

export const isTokenValidFromHeaders = (
    headers: Headers | Record<string, string> | string | undefined
): boolean => {
    const cookies = getServerCookies(headers);
    return cookieTokenManager.isTokenValidFromServer(cookies);
};

// Next.js App Router용 헬퍼 함수
export const getTokenFromAppRouter = async (): Promise<string | null> => {
    try {
        const { headers } = await import('next/headers');
        const headersList = await headers();
        return getTokenFromHeaders(headersList);
    } catch {
        return null;
    }
};

export const isTokenValidFromAppRouter = async (): Promise<boolean> => {
    try {
        const { headers } = await import('next/headers');
        const headersList = await headers();
        return isTokenValidFromHeaders(headersList);
    } catch {
        return false;
    }
};
