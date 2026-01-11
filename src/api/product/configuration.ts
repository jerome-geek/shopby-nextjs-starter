import type { Options } from 'ky';

import { request } from '@/api/core/request';
import { GetNaverShoppingConfigurationResponse } from '@/models/product/configuration';

const configuration = {
    /**
     * 네이버 쇼핑 설정정보 조회
     */
    getNaverShoppingConfiguration: (options?: Options) => {
        return request.get<GetNaverShoppingConfigurationResponse>(
            'products/configuration/naver-shopping',
            {
                ...options,
            },
        );
    },
};

export default configuration;
