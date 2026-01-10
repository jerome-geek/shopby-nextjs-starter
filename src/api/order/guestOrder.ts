import type { Options } from 'ky';
import qs from 'qs';

import { request } from '@/api/core';
import { ClaimType, OrderRequestType } from '@/models';
import { OrderDetailResponse, TokenIssueData } from '@/models/order';
import {
    GetCartData,
    GetCartParams,
    GetCartResponse,
    SendPasswordByEmailParams,
    UpdateDeliveryInfoData,
    RequestCashReceiptResponse,
    UpdateDeliveryInfoParams,
    UpdateCashReceiptResponse,
} from '@/models/order/guestOrder';
import {
    GetOrderDetailParams,
    RequestCashReceiptData,
} from '@/models/order/myOrder';

const guestOrder = {
    /**
     * 비회원 장바구니 계산하기
     *  - 비회원의 장바구니금액 및 합배송 상품을 계산하여 목록을 가져오는 API 입니다
     *  - 쇼핑몰배송의 경우, 파트너명을 '쇼핑몰배송'으로 내려줍니다
     */
    getCart: (data: GetCartData, params?: GetCartParams, options?: Options) => {
        return request.post<GetCartResponse>('guest/cart', {
            json: data,
            searchParams: qs.stringify(params, {
                arrayFormat: 'comma',
                allowDots: true,
            }),
            ...options,
        });
    },

    /**
     * 비회원 주문 상세 조회하
     *  - 비회원 주문의 상세정보를 조회하는 API 입니다
     */
    getOrderDetail: (
        orderNo: string,
        params?: GetOrderDetailParams,
        options?: Options
    ) => {
        return request.get<OrderDetailResponse>(`guest/orders/${orderNo}`, {
            searchParams: qs.stringify(params, {
                arrayFormat: 'comma',
                allowDots: true,
            }),
            ...options,
        });
    },

    /**
     * 비회원 주문 토근 발급하기
     *  - 주문번호, 패스워드, 이름, 핸드폰번호, 이메일로 주문 상세를 조회하는 API 입니다
     */
    issueOrderToken: (
        orderNo: string,
        data: TokenIssueData,
        options?: Options
    ) => {
        return request.post<OrderDetailResponse>(`guest/orders/${orderNo}`, {
            json: data,
            ...options,
        });
    },

    /**
     * 비회원 상품 주문 구매확정 처리하기
     *  - 배송중, 배송완료 상태의 상품주문을 구매확정 처리하는 API 입니다
     */
    confirmOrder: (orderOptionNo: number, options?: Options) => {
        return request.put<OrderDetailResponse>(
            `guest/order-options/${orderOptionNo}/confirm`,
            {
                ...options,
            }
        );
    },

    /**
     * 비회원 상품 주문 배송완료 처리하기
     *  - 배송중 상태의 상품주문을 배송완료 처리하는 API 입니다
     */
    confirmDeliveryCompletion: (orderOptionNo: number, options?: Options) => {
        return request.put<OrderDetailResponse>(
            `guest/order-options/${orderOptionNo}/delivery-done`,
            {
                ...options,
            }
        );
    },

    /**
     * 현금영수증 신청정보 수정 (무통장 입금 주문)
     *  - 현금영수증 발급을 신청한 무통장입금 주문의 현금영수증 신청 정보를 수정하는 API입니다.
     *  - 주문이 입금 대기상태인 경우에만 수정 가능합니다.
     */
    updateCashReceipt: (
        orderNo: string,
        data: RequestCashReceiptData,
        options?: Options
    ) => {
        return request.put<UpdateCashReceiptResponse>(
            `guest/orders/${orderNo}/cashReceipt`,
            {
                json: data,
                ...options,
            }
        );
    },

    /**
     * 비회원 현금영수증 신청하기
     *  - 구매자가 무통장입금 주문에 대하여 현금영수증을 발급하는 API 입니다
     */
    requestCashReceipt: (
        orderNo: string,
        data: RequestCashReceiptData,
        options?: Options
    ) => {
        return request.post<RequestCashReceiptResponse>(
            `guest/orders/${orderNo}/cashReceipt`,
            {
                json: data,
                ...options,
            }
        );
    },

    /**
     * 비회원 주문 상세 조회하기 (클레임 상세사유 포함)
     *  - 주문번호, 토큰으로 상세 데이터를 조회하는 API 입니다
     *  - 클레임 상세사유를 포함합니다
     */
    getGuestOrderDetail: (
        // guestToken: string,
        orderNo: string,
        params?: {
            orderRequestType?: OrderRequestType;
            claimType?: ClaimType;
        },
        options?: Options
    ) => {
        return request.get<OrderDetailResponse>(
            `guest/orders/${orderNo}/claim`,
            {
                searchParams: qs.stringify(params, {
                    arrayFormat: 'comma',
                    allowDots: true,
                }),
                ...options,
            }
        );
    },

    /**
     * 비회원 주문단위 배송정보 수정하기
     *  - 주문번호에 속한 배송정보를 일괄 수정하는 API 입니다
     */
    updateDeliveryInfo: (
        orderNo: string,
        params: UpdateDeliveryInfoParams,
        data: UpdateDeliveryInfoData,
        options?: Options
    ) => {
        return request.put<OrderDetailResponse>(
            `guest/orders/${orderNo}/deliveries`,
            {
                json: data,
                searchParams: qs.stringify(params, {
                    arrayFormat: 'comma',
                    allowDots: true,
                }),
                ...options,
            }
        );
    },

    /**
     * 비회원 초기화된 주문 패스워드 전송하기
     *  - 비밀번호를 분실한 사용자를 위해서 주문번호를 이용해 패스워드를 초기화 시키고, 입력한 e-mail 또는 sms로 초기화된 비밀번호를 전달하는 API 입니다.
     *  - 주문번호 외의 주문자명, 핸드폰번호, 이메일 등으로 추가 인증 처리를 하기 위해서는 설정 정보를 변경해야 하며, 해당 설정 정보는 샵바이 관리자에게 문의하여 수정 가능합니다
     */
    sendPasswordByEmail: (
        orderNo: string,
        params: SendPasswordByEmailParams,
        options?: Options
    ) => {
        return request.get<OrderDetailResponse>(
            `guest/orders/${orderNo}/forgot-password`,
            {
                searchParams: qs.stringify(params, {
                    arrayFormat: 'comma',
                    allowDots: true,
                }),
                ...options,
            }
        );
    },
};

export default guestOrder;
