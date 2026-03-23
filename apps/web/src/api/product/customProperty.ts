import type { AxiosRequestConfig } from 'axios';

import { shopbyRequest } from '@/api/core/request';
import { GetCustomPropertiesResponse } from '@/models/product/customProperty';

const customProperty = {
    /**
     * 상품 항목 조회하기
     *  - 상품 항목을 조회하는 API입니다
     *  - 사용여부 = Y 인 상품 항목만 조회합니다.
     */
    getCustomProperties: (options?: AxiosRequestConfig) => {
        return shopbyRequest<GetCustomPropertiesResponse>({
            method: 'GET',
            url: '/products/custom-properties',
            ...options,
        });
    },
};

export default customProperty;
