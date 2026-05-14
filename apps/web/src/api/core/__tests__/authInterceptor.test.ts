import type { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { handle401Error } from '@/api/core/authInterceptor';

const mocks = vi.hoisted(() => ({
    accessTokenSet: vi.fn(),
}));

vi.mock('@/api/core/utils', () => ({
    isGuestRequest: (url?: string) => url?.includes('/guest') ?? false,
    isUpdateOauth2Request: (url?: string, method?: string) =>
        url === '/oauth2' && method?.toUpperCase() === 'PUT',
}));

vi.mock('@/utils/cookie', () => ({
    accessTokenCookie: {
        set: mocks.accessTokenSet,
    },
}));

type RetryableConfig = InternalAxiosRequestConfig & { _retry?: boolean };
type MockAxiosInstance = AxiosInstance & ReturnType<typeof vi.fn>;

const createConfig = (url: string): RetryableConfig =>
    ({
        method: 'GET',
        url,
        headers: {},
    }) as RetryableConfig;

const createAxiosError = (config: RetryableConfig): AxiosError =>
    ({
        isAxiosError: true,
        config,
        response: {
            status: 401,
        },
        toJSON: () => ({}),
    }) as AxiosError;

const deferred = <T>() => {
    let resolve!: (value: T) => void;
    let reject!: (reason?: unknown) => void;
    const promise = new Promise<T>((resolvePromise, rejectPromise) => {
        resolve = resolvePromise;
        reject = rejectPromise;
    });

    return {
        promise,
        resolve,
        reject,
    };
};

describe('handle401Error', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('동시 401 요청은 하나의 토큰 갱신만 수행하고, 대기 요청들을 새 토큰으로 재시도한다', async () => {
        const refresh = deferred<{
            data: {
                accessToken: string;
                expiresIn: number;
            };
        }>();
        const retriedResponses = new Map<string, unknown>([
            ['/profile', { data: 'profile' }],
            ['/cart', { data: 'cart' }],
            ['/orders', { data: 'orders' }],
        ]);

        const instance = vi.fn((config: RetryableConfig) => {
            return Promise.resolve(retriedResponses.get(config.url ?? ''));
        }) as MockAxiosInstance;

        instance.request = vi.fn((config: RetryableConfig) => {
            expect(config).toEqual({
                method: 'PUT',
                url: '/oauth2',
            });
            return refresh.promise;
        }) as MockAxiosInstance['request'];

        const onSessionExpired = vi.fn();
        const profileConfig = createConfig('/profile');
        const cartConfig = createConfig('/cart');
        const ordersConfig = createConfig('/orders');

        const profilePromise = handle401Error(
            createAxiosError(profileConfig),
            instance,
            onSessionExpired,
        );
        const cartPromise = handle401Error(
            createAxiosError(cartConfig),
            instance,
            onSessionExpired,
        );
        const ordersPromise = handle401Error(
            createAxiosError(ordersConfig),
            instance,
            onSessionExpired,
        );

        expect(instance.request).toHaveBeenCalledTimes(1);
        expect(instance).not.toHaveBeenCalled();

        refresh.resolve({
            data: {
                accessToken: 'new-access-token',
                expiresIn: 1800,
            },
        });

        await expect(profilePromise).resolves.toEqual({ data: 'profile' });
        await expect(cartPromise).resolves.toEqual({ data: 'cart' });
        await expect(ordersPromise).resolves.toEqual({ data: 'orders' });

        expect(mocks.accessTokenSet).toHaveBeenCalledWith(
            'new-access-token',
            1800,
        );
        expect(onSessionExpired).not.toHaveBeenCalled();
        expect(instance).toHaveBeenCalledTimes(3);

        expect(profileConfig._retry).toBe(true);
        expect(profileConfig.headers['Shop-By-Authorization']).toBe(
            'Bearer new-access-token',
        );
        expect(cartConfig.headers['Shop-By-Authorization']).toBe(
            'Bearer new-access-token',
        );
        expect(ordersConfig.headers['Shop-By-Authorization']).toBe(
            'Bearer new-access-token',
        );
    });
});
