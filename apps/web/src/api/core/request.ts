import axios from 'axios';
import qs from 'qs';

import { controller } from '@/api/core/controller';
import { DEFAULT_API_TIMEOUT, defaultHeaders } from '@/api/core/utils';
import { env } from '@/configs/env';

const shopbyRequest = axios.create({
    baseURL: env.NEXT_PUBLIC_SHOPBY_BASE_URL,
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
