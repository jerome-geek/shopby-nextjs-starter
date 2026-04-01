import axios, { InternalAxiosRequestConfig } from 'axios';
import qs from 'qs';

import {
    DEFAULT_API_TIMEOUT,
    defaultHeaders,
    isUpdateOauth2Request,
    logOnDev,
} from '@/api/core/utils';
import {
    accessTokenCookie,
    memberCookie,
    refreshTokenCookie,
} from '@/utils/cookie';
import { controller } from '@/api/core/controller';

const shopbyRequest = axios.create({
    baseURL: process.env.NEXT_PUBLIC_SHOPBY_BASE_URL,
    headers: defaultHeaders(),
    signal: controller.signal,
    paramsSerializer: (params) => {
        return qs.stringify(params, {
            arrayFormat: 'comma',
            allowDots: true,
        });
    },
});

shopbyRequest.defaults.timeout = DEFAULT_API_TIMEOUT;

export { shopbyRequest };
