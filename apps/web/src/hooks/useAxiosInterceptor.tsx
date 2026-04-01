import axios, { HttpStatusCode, type InternalAxiosRequestConfig } from 'axios';
import { useEffect, useRef, useState } from 'react';

import { controller } from '@/api/core/controller';
import { shopbyRequest } from '@/api/core/request';
import {
    isGuestRequest,
    isUpdateOauth2Request,
    logOnDev,
} from '@/api/core/utils';
import { PATHS } from '@/const/paths';
import useMyApp from '@/hooks/myapp/useMyApp';
import { useDialog } from '@/hooks/utils';
import type { UpdateAccessTokenResponse } from '@/models/auth/oauth2';
import {
    accessTokenCookie,
    guestTokenCookie,
    memberCookie,
    refreshTokenCookie,
} from '@/utils/cookie';

type RefreshCallback = (token: string) => void;
type RetryableConfig = InternalAxiosRequestConfig & { _retry?: boolean };

const TOKEN_REFRESH_TIMEOUT = 10_000;

const useAxiosInterceptor = () => {
    const [isReady, setIsReady] = useState(false);

    const { openAsyncDialog } = useDialog();
    const { handleSendRefreshTokenExpired } = useMyApp();

    // NOTE : useEffect 의존성 배열이 비어 있어도 항상 최신 함수를 실행하기 위해 ref에 저장
    const openAsyncDialogRef = useRef(openAsyncDialog);
    openAsyncDialogRef.current = openAsyncDialog;

    const handleSendRefreshTokenExpiredRef = useRef(
        handleSendRefreshTokenExpired,
    );
    handleSendRefreshTokenExpiredRef.current = handleSendRefreshTokenExpired;

    const isRefreshing = useRef(false);
    const refreshQueue = useRef<RefreshCallback[]>([]);

    useEffect(() => {
        // ─── Queue Helpers ────────────────────────────────────────────────────
        const notifySuccess = (newToken: string) => {
            refreshQueue.current.forEach((callback) => callback(newToken));
            refreshQueue.current = [];
        };

        const notifyFailure = () => {
            refreshQueue.current.forEach((callback) => callback(''));
            refreshQueue.current = [];
        };

        // ─── Session Expiry ───────────────────────────────────────────────────
        const handleSessionExpired = async () => {
            controller.abort('refresh-token-expiration');

            memberCookie.clearAll();

            if (
                typeof window !== 'undefined' &&
                window.myapp?.helpers.isMyApp() &&
                window.myapp?.handler?.send
            ) {
                handleSendRefreshTokenExpiredRef.current();
                return;
            }

            await openAsyncDialogRef.current({
                message: '로그인 세션이 만료되었습니다.',
                description: '다시 로그인해주세요.',
                onConfirmReturnValue: true,
                onCloseReturnValue: false,
            });

            const searchParams = new URLSearchParams(window.location.search);
            const returnUrl =
                searchParams.get('returnUrl') ||
                `${window.location.pathname}${window.location.search}`;

            const url = `${PATHS.AUTH.LOGIN}?returnUrl=${encodeURIComponent(
                returnUrl,
            )}`;
            window.location.replace(url);
        };

        // ─── Request Interceptor ──────────────────────────────────────────────
        const requestInterceptor = shopbyRequest.interceptors.request.use(
            (config) => {
                const { url, method } = config;
                logOnDev(
                    `[API] ${method?.toUpperCase()} ${url} | Request`,
                    '#FF9F0A',
                );

                // 게스트 엔드포인트: 게스트 토큰 사용
                if (isGuestRequest(url, method)) {
                    const guestToken = guestTokenCookie.get();
                    if (guestToken) {
                        config.headers[
                            'Shop-By-Authorization'
                        ] = `Bearer ${guestToken}`;
                    }
                    return config;
                }

                // 일반 요청: 액세스 토큰 사용
                const accessToken = accessTokenCookie.get();
                if (accessToken) {
                    config.headers[
                        'Shop-By-Authorization'
                    ] = `Bearer ${accessToken}`;
                }

                // 토큰 갱신 요청: Refresh-Token 헤더 추가
                if (isUpdateOauth2Request(url, method)) {
                    const refreshToken = refreshTokenCookie.get();
                    if (refreshToken) {
                        config.headers['Refresh-Token'] = refreshToken;
                    }
                }

                return config;
            },
        );

        // ─── Response Interceptor ─────────────────────────────────────────────
        const responseInterceptor = shopbyRequest.interceptors.response.use(
            (response) => {
                const { method, url } = response.config;
                logOnDev(
                    `[API] ${method?.toUpperCase()} ${url} | ${
                        response.status
                    }`,
                );
                return response;
            },
            async (error: unknown) => {
                if (!axios.isAxiosError(error)) {
                    return Promise.reject(error);
                }

                const status = error.response?.status;
                const originalRequest = error.config as RetryableConfig;
                const { url, method } = originalRequest;

                logOnDev(
                    `[API] ${method?.toUpperCase()} ${url} | Error ${status}`,
                    'red',
                );

                if (status !== HttpStatusCode.Unauthorized) {
                    return Promise.reject(error);
                }

                // 갱신 요청 자체가 401 → 리프레시 토큰 만료
                if (isUpdateOauth2Request(url, method)) {
                    notifyFailure();
                    await handleSessionExpired();
                    return new Promise(() => {});
                }

                // 게스트 요청 → 토큰 갱신 불필요
                if (isGuestRequest(url, method)) {
                    return Promise.reject(error);
                }

                // 이미 재시도한 요청 → 세션 만료
                if (originalRequest._retry) {
                    await handleSessionExpired();
                    return new Promise(() => {});
                }

                // 갱신 진행 중 → 큐에서 대기
                if (isRefreshing.current) {
                    return new Promise<unknown>((resolve, reject) => {
                        refreshQueue.current.push((newToken) => {
                            if (!newToken) {
                                reject(error);
                                return;
                            }
                            originalRequest.headers[
                                'Shop-By-Authorization'
                            ] = `Bearer ${newToken}`;
                            resolve(shopbyRequest(originalRequest));
                        });
                    });
                }

                originalRequest._retry = true;
                isRefreshing.current = true;

                try {
                    const { data } = await Promise.race([
                        shopbyRequest.request<UpdateAccessTokenResponse>({
                            method: 'PUT',
                            url: '/oauth2',
                        }),
                        new Promise<never>((_, reject) =>
                            setTimeout(
                                () => reject(new Error('토큰 갱신 시간 초과')),
                                TOKEN_REFRESH_TIMEOUT,
                            ),
                        ),
                    ]);

                    accessTokenCookie.set(data.accessToken, data.expiresIn);
                    notifySuccess(data.accessToken);

                    originalRequest.headers[
                        'Shop-By-Authorization'
                    ] = `Bearer ${data.accessToken}`;

                    return shopbyRequest(originalRequest);
                } catch {
                    notifyFailure();
                    await handleSessionExpired();
                    return new Promise(() => {});
                } finally {
                    isRefreshing.current = false;
                }
            },
        );

        setIsReady(true);

        return () => {
            shopbyRequest.interceptors.request.eject(requestInterceptor);
            shopbyRequest.interceptors.response.eject(responseInterceptor);
        };
    }, []);

    return {
        isReady,
    };
};

export default useAxiosInterceptor;
