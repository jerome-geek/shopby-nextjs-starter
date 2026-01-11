import type { Options } from 'ky';
import qs from 'qs';

import { request } from '@/api/core/request';
import { ApplyCouponParams, ApplyCouponResponse } from '@/models/order';
import {
    CouponApplyData,
    CouponApplyResponse,
    GetAppliedCouponPriceData,
    GetAppliedCouponPriceResponse,
    GetCalculatedOrderSheetData,
    GetCalculatedOrderSheetResponse,
    GetMaximumAppliedCouponPriceData,
    GetMaximumAppliedCouponPriceResponse,
    GetOrderSheetParams,
    GetOrderSheetResponse,
    WriteOrderSheetData,
    WriteOrderSheetResponse,
} from '@/models/order/orderSheet';

const orderSheet = {
    /**
     * 주문서 작성하기
     *  - 주문을 진행 할 상품정보를 전달하는 API 입니다
     *  - 주문서 페이지 진입전에 실행합니다
     *  - 비회원 주문인 경우 accessToken을 null로 보냅니다
     */
    writeOrderSheet: (data: WriteOrderSheetData, options?: Options) => {
        return request.post<WriteOrderSheetResponse>('order-sheets', {
            json: data,
            ...options,
        });
    },

    /**
     * 주문서 조회하기
     *  - 주문서 번호를 이용하여 주문상품정보를 조회하는 API 입니다
     *  - 비회원 주문인 경우, accessToken을 null로 보냅니다
     */
    getOrderSheet: (
        orderSheetNo: string,
        params?: GetOrderSheetParams,
        options?: Options,
    ) => {
        return request.get<GetOrderSheetResponse>(
            `order-sheets/${orderSheetNo}`,
            {
                searchParams: qs.stringify(params, {
                    arrayFormat: 'comma',
                    allowDots: true,
                }),
                ...options,
            },
        );
    },

    /**
     * 쿠폰 및 배송지 정보가 적용된 금액 조회하기
     *  - 쿠폰 및 배송비 계산이 적용된 주문서 금액을 조회하는 API 입니다
     *  - 비회원 주문인 경우 accessToken을 null로 보냅니다
     *  - jibunAddress를 입력해줘야 지역별 추가배송비 계산이 가능합니다
     */
    getCalculatedOrderSheet: (
        orderSheetNo: string,
        data: GetCalculatedOrderSheetData,
        options?: Options,
    ) => {
        return request.post<GetCalculatedOrderSheetResponse>(
            `order-sheets/${orderSheetNo}/calculate`,
            {
                json: data,
                ...options,
            },
        );
    },

    /**
     * 적용할 수 있는 쿠폰 정보 조회하기
     *  - 해당 주문에 적용할 수 있는 쿠폰을 조회하는 API 입니다
     */
    getAvailableCoupons: (
        orderSheetNo: string,
        params?: ApplyCouponParams,
        options?: Options,
    ) => {
        return request.get<ApplyCouponResponse>(
            `order-sheets/${orderSheetNo}/coupons`,
            {
                searchParams: qs.stringify(params, {
                    arrayFormat: 'comma',
                    allowDots: true,
                }),
                ...options,
            },
        );
    },

    /**
     * 쿠폰 적용하기
     *  - 해당 주문서에 선택된 쿠폰을 적용하는 API 입니다
     */
    applyCoupon: (
        orderSheetNo: string,
        data: CouponApplyData,
        options?: Options,
    ) => {
        return request.post<CouponApplyResponse>(
            `order-sheets/${orderSheetNo}/coupons/apply`,
            {
                json: data,
                ...options,
            },
        );
    },

    /**
     * 쿠폰적용금액 계산하기
     *  - 쿠폰을 적용한 금액을 미리 조회하는 API 입니다
     */
    getAppliedCouponPrice: (
        orderSheetNo: string,
        data: GetAppliedCouponPriceData,
        options?: Options,
    ) => {
        return request.post<GetAppliedCouponPriceResponse>(
            `order-sheets/${orderSheetNo}/coupons/calculate`,
            {
                json: data,
                ...options,
            },
        );
    },

    /**
     * 최대쿠폰적용금액 계산하기
     *  - 해당 주문서에서 최대로 할인 받을 수 있는 상품쿠폰을 계산하는 API 입니다
     *  - 장바구니 쿠폰은 계산에서 제외됩니다
     */
    getMaximumAppliedCouponPrice: (
        orderSheetNo: string,
        data?: GetMaximumAppliedCouponPriceData,
        options?: Options,
    ) => {
        return request.post<GetMaximumAppliedCouponPriceResponse>(
            `order-sheets/${orderSheetNo}/coupons/maximum`,
            {
                json: data,
                ...options,
            },
        );
    },
};

export default orderSheet;
