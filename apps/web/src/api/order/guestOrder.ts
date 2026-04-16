import type { AxiosRequestConfig } from 'axios';

import { shopbyRequest } from '@/api/core/request';
import type { ClaimType, OrderRequestType } from '@/models';
import type { OrderDetailResponse, TokenIssueData } from '@/models/order';
import type {
    GetCartData,
    GetCartParams,
    GetCartResponse,
    RequestCashReceiptResponse,
    SendPasswordByEmailParams,
    UpdateCashReceiptResponse,
    UpdateDeliveryInfoData,
    UpdateDeliveryInfoParams,
} from '@/models/order/guestOrder';
import type {
    GetOrderDetailParams,
    RequestCashReceiptData,
} from '@/models/order/myOrder';

const guestOrder = {
    /**
     * 비회원 장바구니 계산하기
     *  - 비회원의 장바구니금액 및 합배송 상품을 계산하여 목록을 가져오는 API 입니다
     *  - 쇼핑몰배송의 경우, 파트너명을 '쇼핑몰배송'으로 내려줍니다
     */
    getCart: (
        data: GetCartData,
        params?: GetCartParams,
        options?: AxiosRequestConfig,
    ) => {
        return shopbyRequest<GetCartResponse>({
            method: 'POST',
            url: '/guest/cart',
            data,
            params,
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
        options?: AxiosRequestConfig,
    ) => {
        return shopbyRequest<OrderDetailResponse>({
            method: 'GET',
            url: `/guest/orders/${orderNo}`,
            params,
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
        options?: AxiosRequestConfig,
    ) => {
        return shopbyRequest<OrderDetailResponse>({
            method: 'POST',
            url: `/guest/orders/${orderNo}`,
            data,
            ...options,
        });
    },

    /**
     * 비회원 상품 주문 구매확정 처리하기
     *  - 배송중, 배송완료 상태의 상품주문을 구매확정 처리하는 API 입니다
     */
    confirmOrder: (orderOptionNo: number, options?: AxiosRequestConfig) => {
        return shopbyRequest<OrderDetailResponse>({
            method: 'PUT',
            url: `/guest/order-options/${orderOptionNo}/confirm`,
            ...options,
        });
    },

    /**
     * 비회원 상품 주문 배송완료 처리하기
     *  - 배송중 상태의 상품주문을 배송완료 처리하는 API 입니다
     */
    confirmDeliveryCompletion: (
        orderOptionNo: number,
        options?: AxiosRequestConfig,
    ) => {
        return shopbyRequest<OrderDetailResponse>({
            method: 'PUT',
            url: `/guest/order-options/${orderOptionNo}/delivery-done`,
            ...options,
        });
    },

    /**
     * 현금영수증 신청정보 수정 (무통장 입금 주문)
     *  - 현금영수증 발급을 신청한 무통장입금 주문의 현금영수증 신청 정보를 수정하는 API입니다.
     *  - 주문이 입금 대기상태인 경우에만 수정 가능합니다.
     */
    updateCashReceipt: (
        orderNo: string,
        data: RequestCashReceiptData,
        options?: AxiosRequestConfig,
    ) => {
        return shopbyRequest<UpdateCashReceiptResponse>({
            method: 'PUT',
            url: `/guest/orders/${orderNo}/cashReceipt`,
            data,
            ...options,
        });
    },

    /**
     * 비회원 현금영수증 신청하기
     *  - 구매자가 무통장입금 주문에 대하여 현금영수증을 발급하는 API 입니다
     */
    requestCashReceipt: (
        orderNo: string,
        data: RequestCashReceiptData,
        options?: AxiosRequestConfig,
    ) => {
        return shopbyRequest<RequestCashReceiptResponse>({
            method: 'POST',
            url: `/guest/orders/${orderNo}/cashReceipt`,
            data,
            ...options,
        });
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
        options?: AxiosRequestConfig,
    ) => {
        return shopbyRequest<OrderDetailResponse>({
            method: 'GET',
            url: `/guest/orders/${orderNo}/claim`,
            params,
            ...options,
        });
    },

    /**
     * 비회원 주문단위 배송정보 수정하기
     *  - 주문번호에 속한 배송정보를 일괄 수정하는 API 입니다
     */
    updateDeliveryInfo: (
        orderNo: string,
        params: UpdateDeliveryInfoParams,
        data: UpdateDeliveryInfoData,
        options?: AxiosRequestConfig,
    ) => {
        return shopbyRequest({
            method: 'PUT',
            url: `/guest/orders/${orderNo}/deliveries`,
            data,
            params,
            ...options,
        });
    },

    /**
     * 비회원 초기화된 주문 패스워드 전송하기
     *  - 비밀번호를 분실한 사용자를 위해서 주문번호를 이용해 패스워드를 초기화 시키고, 입력한 e-mail 또는 sms로 초기화된 비밀번호를 전달하는 API 입니다.
     *  - 주문번호 외의 주문자명, 핸드폰번호, 이메일 등으로 추가 인증 처리를 하기 위해서는 설정 정보를 변경해야 하며, 해당 설정 정보는 샵바이 관리자에게 문의하여 수정 가능합니다
     */
    sendPasswordByEmail: (
        orderNo: string,
        params: SendPasswordByEmailParams,
        options?: AxiosRequestConfig,
    ) => {
        return shopbyRequest({
            method: 'GET',
            url: `/guest/orders/${orderNo}/forgot-password`,
            params,
            ...options,
        });
    },
};

export default guestOrder;
