import type { AxiosRequestConfig } from 'axios';

import { shopbyRequest } from '@/api/core/request';
import type {
    GetFreeGiftConditionByOrderAmountParams,
    GetFreeGiftConditionByOrderAmountResponse,
    GetFreeGiftConditionResponse,
} from '@/entities/product/model/freeGift';

const freeGift = {
    /**
     * 사은품 지급가능한 조건 조회하기 (주문금액기준)
     *  - 주문금액에 해당하는 지급가능한 조건 조회하는 API입니다
     *  - orderAmt(주문금액)을 입력하면 해당 주문금액에 맞는 조건만 조회됩니다
     *  - orderAmt(주문금액)을 입력하지 않으면 모든 조건을 조회합니다
     */
    getFreeGiftConditionByOrderAmount: (
        params: GetFreeGiftConditionByOrderAmountParams,
        options?: AxiosRequestConfig,
    ) => {
        return shopbyRequest<GetFreeGiftConditionByOrderAmountResponse>({
            method: 'GET',
            url: '/free-gift-condition/order-amount',
            params,
            ...options,
        });
    },

    /**
     *  사은품 지급가능한 조건 조회하기
     *   - 상품번호에 해당하는 지급가능한 조건 조회하는 API입니다.
     */
    getFreeGiftCondition: (productNo: number, options?: AxiosRequestConfig) => {
        return shopbyRequest<GetFreeGiftConditionResponse>({
            method: 'GET',
            url: `/free-gift-condition/${productNo}`,
            ...options,
        });
    },
};

export default freeGift;
