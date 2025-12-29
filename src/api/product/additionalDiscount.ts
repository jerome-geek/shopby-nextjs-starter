import type { Options } from 'ky';

import request from '@/api/core/request';
import {
    GetAdditionalDiscountParams,
    GetAdditionalDiscountResponse,
} from '@/models/product/additionalDiscount';

const additionalDiscount = {
    /**
     * 추가할인 정보 조회하기
     *  - 상품번호로 추가할인 정보 조회하는 API입니다
     */
    getAdditionalDiscount: (
        searchParams: GetAdditionalDiscountParams,
        options?: Options
    ) => {
        return request.get<GetAdditionalDiscountResponse>(
            'additional-discounts/by-product-no',
            {
                searchParams: { ...searchParams },
                ...options,
            }
        );
    },
};

export default additionalDiscount;
