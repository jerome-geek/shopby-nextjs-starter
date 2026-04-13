import axios from 'axios';
import qs from 'qs';

import { controller } from '@/api/core/controller';
import { DEFAULT_API_TIMEOUT, defaultHeaders } from '@/api/core/utils';

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
