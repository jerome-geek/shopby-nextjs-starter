import type { AxiosRequestConfig } from 'axios';

import { shopbyRequest } from '@/api/core/request';
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
        options?: AxiosRequestConfig,
    ) => {
        return shopbyRequest<GetAdditionalDiscountResponse>({
            method: 'GET',
            url: 'additional-discounts/by-product-no',
            params,
            ...options,
        });
    },

    /**
     * 추가할인 정보 조회하기
     *  - 상품번호로 추가할인 정보 조회하는 API입니다
     *  - 상품번호 최대개수는 200건 입니다.
     */
    getAdditionalDiscountByProductNos: (
        params: GetAdditionalDiscountByProductNosParams,
        options?: AxiosRequestConfig,
    ) => {
        return shopbyRequest<GetAdditionalDiscountByProductNosResponse>({
            method: 'GET',
            url: 'additional-discounts/by-product-nos',
            params,
            ...options,
        });
    },
};

export default additionalDiscount;
