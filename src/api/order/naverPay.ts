import type { Options } from 'ky';

import { request } from '@/api/core/request';
import {
    WriteNaverPayOrderSheetData,
    RegisterWishListData,
    CheckNaverPayValidateData,
    CheckNaverPayValidateResponse,
} from '@/models/order/naverPay';

const naverPay = {
    /**
     * 네이버페이 주문서 생성하기
     * - 네이버페이 주문서를 생성하는 API 입니다.
     */
    writeNaverPayOrderSheet: (
        data: WriteNaverPayOrderSheetData,
        options?: Options,
    ) => {
        return request.post('payments/naver/orderSheet', {
            json: data,
            ...options,
        });
    },

    /**
     * 네이버페이 상품구매 검증하기
     * - 네이버페이 상품구매를 검증하는 API 입니다.
     */
    checkNaverPayValidate: (
        data: CheckNaverPayValidateData,
        options?: Options,
    ) => {
        return request.put<CheckNaverPayValidateResponse>(
            'payments/naver/validate',
            {
                json: data,
                ...options,
            },
        );
    },

    /**
     * 네이버페이 찜 등록하기
     * - 네이버페이 찜을 등록하는 API 입니다.
     */
    registerWishList: (data: RegisterWishListData, options?: Options) => {
        return request.post('payments/naver/wish-list', {
            json: data,
            ...options,
        });
    },
};

export default naverPay;
