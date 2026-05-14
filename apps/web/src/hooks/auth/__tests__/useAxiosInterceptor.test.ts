import type { InternalAxiosRequestConfig } from 'axios';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { bindAxiosInterceptorHandlers } from '@/hooks/auth/useAxiosInterceptor';

const mocks = vi.hoisted(() => ({
    requestUse: vi.fn(() => 1),
    responseUse: vi.fn(() => 2),
    handle400Error: vi.fn(),
    handle401Error: vi.fn(),
    accessTokenGet: vi.fn(),
    guestTokenGet: vi.fn(),
    refreshTokenGet: vi.fn(),
}));

vi.mock('@/api/core/request', () => ({
    shopbyRequest: {
        interceptors: {
            request: {
                use: mocks.requestUse,
            },
            response: {
                use: mocks.responseUse,
            },
        },
    },
}));

vi.mock('@/api/core/authInterceptor', () => ({
    handle400Error: mocks.handle400Error,
    handle401Error: mocks.handle401Error,
}));

vi.mock('@/api/core/utils', () => ({
    isGuestRequest: (url?: string) => url?.includes('/guest') ?? false,
    isUpdateOauth2Request: (url?: string, method?: string) =>
        url === '/oauth2' && method?.toUpperCase() === 'PUT',
    logOnDev: vi.fn(),
}));

vi.mock('@/utils/cookie', () => ({
    accessTokenCookie: {
        get: mocks.accessTokenGet,
    },
    guestTokenCookie: {
        get: mocks.guestTokenGet,
    },
    refreshTokenCookie: {
        get: mocks.refreshTokenGet,
    },
}));

vi.mock('@/hooks/auth/useHandleSessionExpired', () => ({
    useHandleSessionExpired: vi.fn(() => ({
        handleSessionExpired: vi.fn(),
        handleGuestLoginExpired: vi.fn(),
    })),
}));

type RequestInterceptor = (
    config: InternalAxiosRequestConfig,
) => InternalAxiosRequestConfig;

type ResponseErrorInterceptor = (error: unknown) => Promise<unknown>;

describe('useAxiosInterceptor', () => {
    beforeEach(() => {
        mocks.handle400Error.mockReset();
        mocks.handle401Error.mockReset();
        mocks.accessTokenGet.mockReset();
        mocks.guestTokenGet.mockReset();
        mocks.refreshTokenGet.mockReset();
    });

    const getRequestInterceptor = () =>
        mocks.requestUse.mock.calls[0][0] as RequestInterceptor;

    const getResponseErrorInterceptor = () =>
        mocks.responseUse.mock.calls[0][1] as ResponseErrorInterceptor;

    const createConfig = (
        config: Partial<InternalAxiosRequestConfig>,
    ): InternalAxiosRequestConfig =>
        ({
            method: 'GET',
            url: '/products',
            headers: {},
            ...config,
        }) as InternalAxiosRequestConfig;

    const createAxiosError = (status: number, url = '/profile') => ({
        isAxiosError: true,
        response: { status },
        config: {
            method: 'GET',
            url,
            headers: {},
        },
        toJSON: () => ({}),
    });

    describe('interceptor 등록', () => {
        it('모듈 로드 시 interceptor를 한 번 등록한다', () => {
            expect(mocks.requestUse).toHaveBeenCalledTimes(1);
            expect(mocks.responseUse).toHaveBeenCalledTimes(1);
        });
    });

    describe('request interceptor — 헤더 주입', () => {
        it('게스트 요청에는 guestToken 헤더를 주입한다', () => {
            const requestInterceptor = getRequestInterceptor();
            mocks.guestTokenGet.mockReturnValue('guest-token');

            const config = requestInterceptor(
                createConfig({ url: '/guest/orders' }),
            );

            expect(config.headers.guestToken).toBe('guest-token');
            expect(mocks.accessTokenGet).not.toHaveBeenCalled();
        });

        it('게스트 토큰이 없으면 guestToken 헤더를 주입하지 않는다', () => {
            const requestInterceptor = getRequestInterceptor();
            mocks.guestTokenGet.mockReturnValue(undefined);

            const config = requestInterceptor(
                createConfig({ url: '/guest/orders' }),
            );

            expect(config.headers.guestToken).toBeUndefined();
        });

        it('일반 요청에는 access token 헤더를 주입한다', () => {
            const requestInterceptor = getRequestInterceptor();
            mocks.accessTokenGet.mockReturnValue('access-token');

            const config = requestInterceptor(createConfig({ url: '/profile' }));

            expect(config.headers['Shop-By-Authorization']).toBe(
                'Bearer access-token',
            );
        });

        it('액세스 토큰이 없으면 인증 헤더를 주입하지 않는다', () => {
            const requestInterceptor = getRequestInterceptor();
            mocks.accessTokenGet.mockReturnValue(undefined);

            const config = requestInterceptor(createConfig({ url: '/profile' }));

            expect(config.headers['Shop-By-Authorization']).toBeUndefined();
        });

        it('토큰 갱신 요청에는 refresh token 헤더도 주입한다', () => {
            const requestInterceptor = getRequestInterceptor();
            mocks.accessTokenGet.mockReturnValue('access-token');
            mocks.refreshTokenGet.mockReturnValue('refresh-token');

            const config = requestInterceptor(
                createConfig({ method: 'PUT', url: '/oauth2' }),
            );

            expect(config.headers['Shop-By-Authorization']).toBe(
                'Bearer access-token',
            );
            expect(config.headers['Refresh-Token']).toBe('refresh-token');
        });
    });

    describe('response interceptor — 에러 처리', () => {
        it('AxiosError가 아닌 에러는 그대로 reject한다', async () => {
            const responseErrorInterceptor = getResponseErrorInterceptor();
            const error = new Error('network error');

            await expect(responseErrorInterceptor(error)).rejects.toThrow(
                'network error',
            );
            expect(mocks.handle400Error).not.toHaveBeenCalled();
            expect(mocks.handle401Error).not.toHaveBeenCalled();
        });

        it('400 응답은 주입된 비회원 만료 핸들러를 통해 처리한다', async () => {
            const responseErrorInterceptor = getResponseErrorInterceptor();
            const handleGuestLoginExpired = vi.fn();

            bindAxiosInterceptorHandlers({
                handleSessionExpired: vi.fn(),
                handleGuestLoginExpired,
            });
            mocks.handle400Error.mockImplementation(
                async (_error: unknown, onExpire: () => void) => onExpire(),
            );

            await responseErrorInterceptor(createAxiosError(400, '/guest/orders'));

            expect(mocks.handle400Error).toHaveBeenCalledTimes(1);
            expect(handleGuestLoginExpired).toHaveBeenCalledTimes(1);
        });

        it('400 응답에서 handle400Error가 reject하면 에러가 전파된다', async () => {
            const responseErrorInterceptor = getResponseErrorInterceptor();
            const originalError = createAxiosError(400, '/guest/orders');

            mocks.handle400Error.mockRejectedValue(originalError);

            await expect(
                responseErrorInterceptor(originalError),
            ).rejects.toEqual(originalError);
        });

        it('401 응답은 주입된 세션 만료 핸들러를 통해 처리한다', async () => {
            const responseErrorInterceptor = getResponseErrorInterceptor();
            const handleSessionExpired = vi.fn();

            bindAxiosInterceptorHandlers({
                handleSessionExpired,
                handleGuestLoginExpired: vi.fn(),
            });
            mocks.handle401Error.mockImplementation(
                async (
                    _error: unknown,
                    _instance: unknown,
                    onExpire: () => void,
                ) => onExpire(),
            );

            await responseErrorInterceptor(createAxiosError(401));

            expect(mocks.handle401Error).toHaveBeenCalledTimes(1);
            expect(handleSessionExpired).toHaveBeenCalledTimes(1);
        });

        it('400도 401도 아닌 에러는 그대로 reject한다', async () => {
            const responseErrorInterceptor = getResponseErrorInterceptor();
            const error = createAxiosError(500);

            await expect(responseErrorInterceptor(error)).rejects.toEqual(error);
            expect(mocks.handle400Error).not.toHaveBeenCalled();
            expect(mocks.handle401Error).not.toHaveBeenCalled();
        });
    });
});
