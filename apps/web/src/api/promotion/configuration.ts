import type { AxiosRequestConfig } from 'axios';

import { shopbyRequest } from '@/api/core/request';
import type { GetCouponConfigurationResponse } from '@/models/promotion/configuration';

const configuration = {
    getConfig: (options?: AxiosRequestConfig) => {
        return shopbyRequest<GetCouponConfigurationResponse>({
            method: 'GET',
            url: '/promotions/configurations',
            ...options,
        });
    },
};

export default configuration;
