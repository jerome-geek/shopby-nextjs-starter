import type { Options } from 'ky';

import { request } from '@/api/core/request';
import { GetCustomPropertiesResponse } from '@/models/product/customProperty';

const customProperty = {
    /**
     * 상품 항목 조회하기
     *  - 상품 항목을 조회하는 API입니다
     *  - 사용여부 = Y 인 상품 항목만 조회합니다.
     */
    getCustomProperties: (options?: Options) => {
        return request.get<GetCustomPropertiesResponse>(
            'products/custom-properties',
            {
                ...options,
            },
        );
    },
};

export default customProperty;
