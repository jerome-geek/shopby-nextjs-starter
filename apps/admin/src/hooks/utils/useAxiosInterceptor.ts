import {
    AxiosError,
    AxiosResponse,
    HttpStatusCode,
    InternalAxiosRequestConfig,
} from 'axios';
import { useCallback, useLayoutEffect, useState } from 'react';

import { controller } from '@/api/core/controller';
import { request } from '@/api/core/request';
import { accessTokenManager } from '@/api/core/token';
import { logOnDev } from '@/api/core/utils';
import { PATHS } from '@/const/paths';
import { useDialog } from '@/hooks/utils';

const useAxiosInterceptor = () => {
    const { openAsyncDialog } = useDialog();

    const [isLoading, setisLoading] = useState(false);

    const requestHandler = async (config: InternalAxiosRequestConfig) => {
        logOnDev(
            `[API] ${config.method?.toUpperCase()} ${config.url} | Request`,
        );

        const accessToken = accessTokenManager.getToken();

        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }

        return config;
    };

    const responseHandler = (response: AxiosResponse) => {
        const { method, url } = response.config;
        const { status } = response;

        logOnDev(`[API] ${method?.toUpperCase()} ${url} | Request ${status}`);

        return response;
    };

    const requestErrorHandler = (error: unknown) => {
        console.error(error);
    };

    const responseErrorHandler = async (error: unknown) => {
        console.log('🚀 ~ responseErrorHandler ~ error:', error);
        if (!(error instanceof AxiosError)) {
            return Promise.reject(error);
        }

        if (controller.signal.aborted) {
            return new Promise(() => {});
        }

        const { message } = error;
        const { method, url } = error.config as InternalAxiosRequestConfig;

        const statusText = error.response?.statusText ?? '';
        const status = error.response?.status ?? '';

        logOnDev(
            `[API] ${method?.toUpperCase()} ${url} | Error ${status} ${statusText} | ${message}`,
        );

        const { Unauthorized } = HttpStatusCode;

        switch (error.response?.status) {
            case Unauthorized: {
                controller.abort('token-expiration');

                if (error.config?.url !== '/common/auth/logout') {
                    await openAsyncDialog({
                        message:
                            '로그인 상태가 만료되었습니다.<br /> 다시 로그인해주세요.',
                        iconType: 'auth',
                        onConfirmReturnValue: true,
                        onCloseReturnValue: false,
                    });
                }

                accessTokenManager.clearToken();

                const searchParams = new URLSearchParams(
                    window.location.search,
                );
                const returnUrl =
                    searchParams.get('returnUrl') ||
                    `${window.location.pathname}${window.location.search}`;

                const url = `${PATHS.AUTH.LOGIN}?returnUrl=${encodeURIComponent(
                    returnUrl,
                )}`;

                window.location.replace(url);

                return new Promise(() => {});
            }
            default: {
                return Promise.reject(error);
            }
        }
    };

    const setupInterceptors = useCallback(() => {
        const requestInterceptor = request.interceptors.request.use(
            (config) => requestHandler(config),
            requestErrorHandler,
        );
        const responseInterceptor = request.interceptors.response.use(
            responseHandler,
            (error) => responseErrorHandler(error),
        );
        setisLoading(true);

        return {
            requestInterceptor,
            responseInterceptor,
        };
    }, []);

    // Remove interceptors
    const ejectInterceptors = (
        requestInterceptor: number,
        responseInterceptor: number,
    ) => {
        request.interceptors.request.eject(requestInterceptor);
        request.interceptors.response.eject(responseInterceptor);
    };

    useLayoutEffect(() => {
        const { requestInterceptor, responseInterceptor } = setupInterceptors();

        return () => {
            ejectInterceptors(requestInterceptor, responseInterceptor);
        };
    }, [setupInterceptors]);

    return {
        isLoading,
    };
};

export default useAxiosInterceptor;
