import type { Options } from 'ky';
import qs from 'qs';

import { request } from '@/api/core/request';
import {
    GetAdditionalDiscountByProductNosParams,
    GetAdditionalDiscountByProductNosResponse,
    GetAdditionalDiscountParams,
    GetAdditionalDiscountResponse,
} from '@/models/product/additionalDiscount';

const additionalDiscount = {
    /**
     * 추가할인 정보 조회하기
     *  - 상품번호로 추가할인 정보 조회하는 API입니다
     */
    getAdditionalDiscount: (
        params: GetAdditionalDiscountParams,
        options?: Options,
    ) => {
        return request.get<GetAdditionalDiscountResponse>(
            'additional-discounts/by-product-no',
            {
                searchParams: qs.stringify(params),
                ...options,
            },
        );
    },

    /**
     * 추가할인 정보 조회하기
     *  - 상품번호로 추가할인 정보 조회하는 API입니다
     *  - 상품번호 최대개수는 200건 입니다.
     */
    getAdditionalDiscountByProductNos: (
        params: GetAdditionalDiscountByProductNosParams,
        options?: Options,
    ) => {
        return request.get<GetAdditionalDiscountByProductNosResponse>(
            'additional-discounts/by-product-nos',
            {
                searchParams: qs.stringify(params, { arrayFormat: 'comma' }),
                ...options,
            },
        );
    },
};

export default additionalDiscount;
