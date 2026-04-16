import type { AxiosRequestConfig } from 'axios';

import { shopbyRequest } from '@/api/core/request';
import type { GetNaverShoppingConfigurationResponse } from '@/models/product/configuration';

const configuration = {
    /**
     * 네이버 쇼핑 설정정보 조회
     */
    getNaverShoppingConfiguration: (options?: AxiosRequestConfig) => {
        return shopbyRequest<GetNaverShoppingConfigurationResponse>({
            method: 'GET',
            url: '/products/configuration/naver-shopping',
            ...options,
        });
    },
};

export default configuration;
