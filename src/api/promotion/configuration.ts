import type { Options } from 'ky';

import { request } from '@/api/core';
import { GetCouponConfigurationResponse } from '@/models/promotion/configuration';

const configuration = {
    getConfig: (options?: Options) => {
        return request.get<GetCouponConfigurationResponse>(
            'promotions/configurations',
            {
                ...options,
            }
        );
    },
};

export default configuration;
