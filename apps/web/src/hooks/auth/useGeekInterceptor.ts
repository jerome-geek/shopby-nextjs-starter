import axios from 'axios';
import { useEffect } from 'react';

import { geekRequest } from '@/api/core/geekRequest';
import { handle401Error } from '@/api/core/authInterceptor';
import { logOnDev } from '@/api/core/utils';
import { env } from '@/configs/env';
import { useHandleSessionExpired } from '@/hooks/auth/useHandleSessionExpired';
import { accessTokenCookie } from '@/utils/cookie';

const useGeekInterceptor = () => {
    const { handleSessionExpired } = useHandleSessionExpired();

    useEffect(() => {
        const requestInterceptor = geekRequest.interceptors.request.use(
            (config) => {
                const { url, method } = config;
                logOnDev(
                    `[GEEK] ${method?.toUpperCase()} ${url} | Request`,
                    '#30D158',
                );

                config.headers['appToken'] =
                    `Bearer ${env.NEXT_PUBLIC_GEEK_APP_TOKEN}`;

                const accessToken = accessTokenCookie.get();
                if (accessToken) {
                    config.headers['clientId'] = env.NEXT_PUBLIC_CLIENT_ID;
                    config.headers['Shop-By-Authorization'] =
                        `Bearer ${accessToken}`;
                    config.headers['shopApiUrl'] = '/profile';
                    config.headers['apiMethod'] = 'GET';
                }

                return config;
            },
        );

        const responseInterceptor = geekRequest.interceptors.response.use(
            (response) => {
                const { method, url } = response.config;
                logOnDev(
                    `[GEEK] ${method?.toUpperCase()} ${url} | ${response.status}`,
                );
                return response;
            },
            (error: unknown) => {
                if (!axios.isAxiosError(error)) {
                    return Promise.reject(error);
                }

                const status = error.response?.status;
                const { url, method } = error.config ?? {};
                logOnDev(
                    `[GEEK] ${method?.toUpperCase()} ${url} | Error ${status}`,
                    'red',
                );

                if (status === 401) {
                    return handle401Error(
                        error,
                        geekRequest,
                        handleSessionExpired,
                    );
                }

                return Promise.reject(error);
            },
        );

        return () => {
            geekRequest.interceptors.request.eject(requestInterceptor);
            geekRequest.interceptors.response.eject(responseInterceptor);
        };
    }, []);
};

export default useGeekInterceptor;
