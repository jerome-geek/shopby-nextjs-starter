import { oauth2 } from '@/api/auth';
import {
    cookieTokenManager,
    getRefreshTokenFromAppRouter,
    getTokenFromAppRouter,
} from '@/api/core/cookie';
import { PATHS } from '@/const/paths';
import ky, {
    AfterResponseHook,
    BeforeRequestHook,
    BeforeRetryHook,
    HTTPError,
} from 'ky';
import { redirect } from 'next/navigation';

export const DEFAULT_API_RETRY_BACKOFF_LIMIT = 3 * 1000;
export const DEFAULT_API_RETRY_LIMIT = 4;
export const DEFAULT_API_TIMEOUT = 10 * 1000;

export const logRequest: BeforeRequestHook = (request) => {
    if (process.env.NODE_ENV === 'development') {
        console.log('API Request:', request.url);
    }
};

export const logResponse: AfterResponseHook = (request, options, response) => {
    if (process.env.NODE_ENV === 'development') {
        console.log('API Response:', response.status, request.url);
    }
};

export const refreshToken: BeforeRetryHook = async ({ request, error }) => {
    const response = (error as HTTPError).response;

    // 401(Unauthorized) 혹은 400(Bad Request) 에러인 경우에만 토큰 갱신 시도 고려
    // 액세스 토큰이 만료되어 쿠키에서 사라진 경우, 일부 API는 400(Bad Request)을 반환할 수 있음
    if (response?.status !== 401 && response?.status !== 400) {
        return;
    }

    try {
        let currentAccessToken: string | null = null;
        let currentRefreshToken: string | null = null;

        if (typeof window !== 'undefined') {
            currentAccessToken = await cookieTokenManager.getToken();
            currentRefreshToken = await cookieTokenManager.getRefreshToken();
        } else {
            currentAccessToken = await getTokenFromAppRouter();
            currentRefreshToken = await getRefreshTokenFromAppRouter();
        }

        // 400 에러인데 액세스 토큰이 여전히 존재한다면, 단순한 요청 오류일 확률이 높음
        if (response?.status === 400 && currentAccessToken) {
            return;
        }

        if (!currentRefreshToken) {
            throw new Error('No refresh token available for update');
        }

        if (process.env.NODE_ENV === 'development') {
            console.log(
                '🚀 Attempting to Refresh Token due to status:',
                response.status
            );
        }

        // 1. 토큰 갱신 API 호출
        const refreshResponse = await oauth2
            .updateAccessToken({
                headers: {
                    'Shop-By-Authorization': `Bearer ${currentAccessToken || ''}`,
                    'Refresh-Token': currentRefreshToken,
                },
            })
            .json();

        // 2. 새로운 토큰 쿠키에 저장
        await cookieTokenManager.setToken({
            accessToken: refreshResponse.accessToken,
            refreshToken: refreshResponse.refreshToken,
            expiresIn: Number(refreshResponse.expiresIn),
            refreshTokenExpiresIn: Number(
                refreshResponse.refreshTokenExpiresIn
            ),
        });

        // 3. 재시도하는 요청의 헤더 갈아끼우기
        request.headers.set(
            'Shop-By-Authorization',
            `Bearer ${refreshResponse.accessToken}`
        );

        if (process.env.NODE_ENV === 'development') {
            console.log('🔄 Token Refreshed Successfully!');
        }
    } catch (refreshError) {
        if (process.env.NODE_ENV === 'development') {
            console.error('❌ Token Refresh Failed:', refreshError);
        }
        await cookieTokenManager.clearTokens();
        if (typeof window === 'undefined') {
            // 서버 사이드인 경우: 쿠키 삭제가 안 되므로 로그인 페이지로 강제 이동
            // redirect()는 Next.js에서 throw를 던져 렌더링을 중단하고 이동시킵니다.
            redirect(PATHS.AUTH.LOGIN);
        } else {
            // 클라이언트 사이드인 경우: 쿠키 삭제 후 홈이나 로그인으로 이동
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
