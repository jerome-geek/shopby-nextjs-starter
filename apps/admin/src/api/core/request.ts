import axios from 'axios';
import qs from 'qs';

import { controller } from '@/api/core/controller';
import { DEFAULT_API_TIMEOUT, defaultHeaders } from '@/api/core/utils';

export const request = axios.create({
    baseURL: import.meta.env.VITE_ADMIN_API_BASE_URL,
    headers: defaultHeaders(),
    signal: controller.signal,
    paramsSerializer: (params) => {
        return qs.stringify(params, {
            arrayFormat: 'comma',
            allowDots: true,
        });
    },
});

request.defaults.timeout = DEFAULT_API_TIMEOUT;
