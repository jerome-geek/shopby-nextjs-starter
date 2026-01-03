import { oauth2 } from '@/api/auth';
import {
    cookieTokenManager,
    getRefreshTokenFromAppRouter,
    getTokenFromAppRouter,
} from '@/api/core/cookie';
import ky, {
    AfterResponseHook,
    BeforeRequestHook,
    BeforeRetryHook,
    HTTPError,
} from 'ky';

export const DEFAULT_API_RETRY_BACKOFF_LIMIT = 3 * 1000;
export const DEFAULT_API_RETRY_LIMIT = 4;
export const DEFAULT_API_TIMEOUT = 10 * 1000;

export const logRequest: BeforeRequestHook = (request) => {
    console.log('Request:', request);
    if (process.env.NODE_ENV === 'development') {
        console.log('API Request:', request.url);
    }
};

export const logResponse: AfterResponseHook = (request, options, response) => {
    console.log('Response:', response);
    if (process.env.NODE_ENV === 'development') {
        console.log('API Response:', response.status, request.url);
    }
};

// 토큰 갱신 중인지 확인하는 플래그 (중복 요청 방지용 - 필요 시 전역 상태 관리 고려)
// let isRefreshing = false;

export const refreshToken: BeforeRetryHook = async ({ request, error }) => {
    const response = (error as HTTPError).response;
    // 401 에러가 아니면 패스 (일반 에러는 기본 재시도 로직 따름)
    if (response?.status !== 401) {
        return;
    }

    try {
        let currentAccessToken: string | null = null;
        let currentRefreshToken: string | null = null;

        // 환경에 따라 토큰 가져오는 방식 분기
        if (typeof window !== 'undefined') {
            // Client Side
            currentAccessToken = cookieTokenManager.getToken();
            currentRefreshToken = cookieTokenManager.getRefreshToken();
        } else {
            // Server Side (App Router)
            currentAccessToken = await getTokenFromAppRouter();
            currentRefreshToken = await getRefreshTokenFromAppRouter();
        }

        if (process.env.NODE_ENV === 'development') {
            console.log('🚀 Refreshing Token...');
            console.log('Is Client:', typeof window !== 'undefined');
            console.log('Current Access Token:', currentAccessToken);
            console.log('Current Refresh Token:', currentRefreshToken);
        }

        if (!currentAccessToken || !currentRefreshToken) {
            throw new Error('No tokens available for refresh');
        }

        // 1. 토큰 갱신 API 호출
        // *주의: 여기서 사용하는 request는 이미 실패한 요청의 ky 인스턴스가 아닐 수 있음.
        // 순환 참조나 무한 루프를 방지하기 위해 별도의 ky 인스턴스나 fetch를 쓰는 것이 안전할 수 있지만,
        // 현재 구조상 oauth2.updateAccessToken()이 내부적으로 같은 request 모듈을 쓰면
        // 그 안에서도 401이 터져서 무한 루프에 빠질 위험이 있음.
        // 따라서 oauth2.updateAccessToken 호출 시에는 hooks를 비활성화하거나 해야 함.

        // 하지만 여기서는 간단한 구현을 위해 호출. (실제로는 updateAccessToken 내부에서 401 발생 시 hook이동작하지 않도록 옵션 처리 필요)
        const refreshResponse = await oauth2
            .updateAccessToken({
                headers: {
                    'Shop-By-Authorization': `Bearer ${currentAccessToken}`,
                    'Refresh-Token': currentRefreshToken,
                },
                hooks: {
                    beforeRetry: [], // 재시도 훅 비활성화 (무한 루프 방지)
                    beforeRequest: [], // 요청 전 훅 비활성화 (헤더 덮어쓰기 방지)
                    afterResponse: [], // 응답 후 훅 비활성화
                },
            })
            .json();
        console.log('🚀 ~ refreshToken ~ refreshResponse:', refreshResponse);

        if (process.env.NODE_ENV === 'development') {
            console.log('🚀 Token Refreshed:', refreshResponse);
        }

        // 2. 새로운 토큰 쿠키에 저장
        cookieTokenManager.setToken({
            accessToken: refreshResponse.accessToken,
            refreshToken: refreshResponse.refreshToken,
            expiresIn: Number(refreshResponse.expiresIn), // API 응답 타입 확인 필요 (보통 number)
            refreshTokenExpiresIn: Number(
                refreshResponse.refreshTokenExpiresIn
            ),
        });

        // 3. 재시도하는 요청의 헤더 갈아끼우기
        request.headers.set(
            'Authorization',
            `Bearer ${refreshResponse.accessToken}`
        );

        // 4. 로그 (개발 환경)
        if (process.env.NODE_ENV === 'development') {
            console.log('🔄 Token Refreshed Successfully!');
        }

        // 5. 리턴값이 없으면 Ky는 갱신된 request로 재시도를 수행함
    } catch (refreshError) {
        // 6. 토큰 갱신 실패 시 -> 재시도 중단 및 로그아웃 처리 등
        if (process.env.NODE_ENV === 'development') {
            console.error('❌ Token Refresh Failed:', refreshError);
        }

        // 토큰 삭제 (로그아웃 처리)
        cookieTokenManager.clearTokens();

        // Ky에게 재시도 중단을 알림
        return ky.stop;
    }
};
