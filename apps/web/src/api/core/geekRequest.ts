import axios from 'axios';
import qs from 'qs';

import { DEFAULT_API_TIMEOUT, logOnDev } from '@/api/core/utils';
import { controller } from '@/api/core/controller';
import { env } from '@/configs/env';

const geekRequest = axios.create({
    baseURL: env.NEXT_PUBLIC_GEEK_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        // 핵심: 브라우저인 척 해서 CloudFront 방화벽을 뚫습니다.
        'User-Agent':
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
    },
    signal: controller.signal,
    paramsSerializer: (params) => {
        return qs.stringify(params, {
            arrayFormat: 'comma',
            allowDots: true,
        });
    },
});

geekRequest.defaults.timeout = DEFAULT_API_TIMEOUT;

geekRequest.interceptors.request.use(
    (config) => {
        logOnDev(
            `[API] ${config.method?.toUpperCase()} ${config.url} | Request`,
            '#00D8FF',
        );
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

export { geekRequest };
