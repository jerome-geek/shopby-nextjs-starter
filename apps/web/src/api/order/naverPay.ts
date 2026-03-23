import type { AxiosRequestConfig } from 'axios';

import { shopbyRequest } from '@/api/core/request';
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
        options?: AxiosRequestConfig,
    ) => {
        return shopbyRequest({
            method: 'POST',
            url: '/payments/naver/orderSheet',
            data,
            ...options,
        });
    },

    /**
     * 네이버페이 상품구매 검증하기
     * - 네이버페이 상품구매를 검증하는 API 입니다.
     */
    checkNaverPayValidate: (
        data: CheckNaverPayValidateData,
        options?: AxiosRequestConfig,
    ) => {
        return shopbyRequest<CheckNaverPayValidateResponse>({
            method: 'PUT',
            url: '/payments/naver/validate',
            data,
            ...options,
        });
    },

    /**
     * 네이버페이 찜 등록하기
     * - 네이버페이 찜을 등록하는 API 입니다.
     */
    registerWishList: (
        data: RegisterWishListData,
        options?: AxiosRequestConfig,
    ) => {
        return shopbyRequest({
            method: 'POST',
            url: '/payments/naver/wish-list',
            data,
            ...options,
        });
    },
};

export default naverPay;
