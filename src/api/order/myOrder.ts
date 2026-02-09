import type { Options } from 'ky';
import qs from 'qs';

import { request } from '@/api/core/request';
import {
    GetOrderDetailForClaimParams,
    GetOrderDetailForClaimResponse,
    GetOrderDetailParams,
    GetOrderDetailResponse,
    GetOrderListParams,
    GetOrderListResponse,
    GetOrderOptionStatusParams,
    GetOrderOptionStatusResponse,
    GetOrderSpecificationResponse,
    GetOrderStatusSummaryParams,
    GetOrderStatusSummaryResponse,
    GetOrderSummaryParams,
    GetOrderSummaryResponse,
    GetPaymentReceiptUrlResponse,
    GetPreviousOrdersSummaryParams,
    GetPreviousOrdersSummaryResponse,
    GetSimpleReceiptUrlResponse,
    ModifyCashReceiptData,
    ModifyCashReceiptResponse,
    RequestCashReceiptData,
    RequestCashReceiptResponse,
    UpdateDeliveryInformationData,
    UpdateDeliveryInformationParams,
} from '@/models/order/myOrder';

const myOrder = {
    /**
     * 주문 리스트 조회하기
     *  - 시작일 종료일 사이의 주문리스트를 조회하는 API 입니다.
     */
    getOrderList: (params: GetOrderListParams, options?: Options) => {
        return request.get<GetOrderListResponse>('profile/orders', {
            searchParams: qs.stringify(params, {
                arrayFormat: 'comma',
                allowDots: true,
            }),
            ...options,
        });
    },

    /**
     * 주문 상세 조회하기
     *  - 주문번호로 상세 데이터를 조회하는 API 입니다.
     */
    getOrderDetail: (
        orderNo: string,
        params?: GetOrderDetailParams,
        options?: Options,
    ) => {
        return request.get<GetOrderDetailResponse>(
            `profile/orders/${orderNo}`,
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
     * 마이페이지용 이전주문 수량 조회하기
     *  - 시작일 종료일 사이의 이전주문 수량을 조회하는 API 입니다.
     *  - 시작일과 종료일을 입력하지 않으면 최근 3개월의 이전주문 수량이 조회됩니다.
     */
    getPreviousOrdersSummary: (
        params?: GetPreviousOrdersSummaryParams,
        options?: Options,
    ) => {
        return request.get<GetPreviousOrdersSummaryResponse>(
            'profile/previous-orders/summary',
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
     * 상태별 주문 옵션별 수량 조회하기
     *  - 시작일 종료일 사이의 상태별 주문 옵션별 수량을 조회하는 API 입니다.
     *  - 옵션별로 카운트 합니다.
     */
    getOrderOptionStatus: (
        params: GetOrderOptionStatusParams,
        options?: Options,
    ) => {
        return request.get<GetOrderOptionStatusResponse>(
            'profile/order-options/summary/status',
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
     * 상품 주문 구매 확정하기
     *  - 배송중, 배송완료 상태의 상태주문을 구매확정 처리하는 API 입니다.
     */
    confirmPurchase: (orderOptionNo: number, options?: Options) => {
        return request.put(`profile/order-options/${orderOptionNo}/confirm`, {
            ...options,
        });
    },

    /**
     * 상품 주문 배송완료 처리하기
     *  - 배송중 상태의 상품주문을 배송완료 처리하는 API 입니다.
     */
    processDeliveryDone: (orderOptionNo: number, options?: Options) => {
        return request.put(
            `profile/order-options/${orderOptionNo}/delivery-done`,
            {
                ...options,
            },
        );
    },

    /**
     * 주문 상태별 주문 수량 및 금액 조회하기
     *  - 시작일 종료일 사이의 상태별 주문 옵션별 수량을 조회하는 API 입니다.
     *  - 옵션별로 카운트 합니다.
     */
    getOrderSummary: (params: GetOrderSummaryParams, options?: Options) => {
        return request.get<GetOrderSummaryResponse>(
            'profile/orders/summary/amount',
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
     * 주문 상태별 주문 수량 조회하기
     * - 시작일 종료일 사이의 주문 상태별 주문 옵션별 수량을 조회하는 API 입니다.
     * - 옵션별로 카운트 합니다.
     */
    getOrderStatusSummary: (
        params: GetOrderStatusSummaryParams,
        options?: Options,
    ) => {
        return request.get<GetOrderStatusSummaryResponse>(
            'profile/orders/summary/status',
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
     * 현금영수증 신청정보 수정 (무통장 입금 주문)
     *  - 현금영수증 발급을 신청한 무통장입금 주문의 현금영수증 신청 정보를 수정하는 API입니다.
     *  - 주문이 입금 대기상태인 경우에만 수정 가능합니다.
     */
    modifyCashReceipt: (
        orderNo: string,
        data?: ModifyCashReceiptData,
        options?: Options,
    ) => {
        return request.put<ModifyCashReceiptResponse>(
            `profile/orders/${orderNo}/cashReceipt`,
            {
                json: data,
                ...options,
            },
        );
    },

    /**
     * 현금영수증 신청하기
     *  - 구매자가 결제완료된 주문의 현금영수증을 발급하는 API입니다.
     */
    requestCashReceipt: (
        orderNo: string,
        data?: RequestCashReceiptData,
        options?: Options,
    ) => {
        return request.post<RequestCashReceiptResponse>(
            `profile/orders/${orderNo}/cashReceipt`,
            {
                json: data,
                ...options,
            },
        );
    },

    /**
     * 전체 주문취소를 위한 주문 상세 조회하기 (클레임 상세사유 포함)
     *  - 주문번호로 상세 데이터를 조회하는 API 입니다.
     *  - 클레임 상세사유를 포합합니다.
     */
    getOrderDetailForClaim: (
        orderNo: string,
        params?: GetOrderDetailForClaimParams,
        options?: Options,
    ) => {
        return request.get<GetOrderDetailForClaimResponse>(
            `profile/orders/${orderNo}/claim`,
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
     * 주문단위 배송정보 수정하기
     * - 주문번호에 속한 배송정보를 일괄 수정하는 API 입니다.
     * - 지역별 배송비가 변경되는 주소로는 배송정보를 변경할 수 없습니다. 지역별 배송비는 receiverJibunAddress로 입력되는 지번주소를 기준으로 판단합니다.
     */
    updateDeliveryInformation: (
        orderNo: string,
        params?: UpdateDeliveryInformationParams,
        data?: UpdateDeliveryInformationData,
        options?: Options,
    ) => {
        return request.put(`profile/orders/${orderNo}/deliveries`, {
            json: data,
            searchParams: qs.stringify(params, {
                arrayFormat: 'comma',
                allowDots: true,
            }),
            ...options,
        });
    },

    /**
     * 결제 영수증 조회
     */
    getPaymentReceiptUrl: (orderNo: string, options?: Options) => {
        return request.get<GetPaymentReceiptUrlResponse>(
            `profile/orders/${orderNo}/payment-receipt-url`,
            {
                ...options,
            },
        );
    },

    /**
     * 간이 영수증 조회
     */
    getSimpleReceiptUrl: (orderNo: string, options?: Options) => {
        return request.get<GetSimpleReceiptUrlResponse>(
            `profile/orders/${orderNo}/simple-receipt-url`,
            {
                ...options,
            },
        );
    },

    /**
     * 거래 명세서 조회 (주문 기준)
     */
    getOrderSpecification: (orderNo: string, options?: Options) => {
        return request.get<GetOrderSpecificationResponse>(
            `profile/orders/${orderNo}/specification`,
            {
                ...options,
            },
        );
    },

    /**
     * [샵바이 스탠다드 전용] 현금영수증 취소하기
     * - 구매자가 현금영수증 발행된 주문의 현금영수증 발행 취소하는 API입니다.
     */
    cancelCashReceipt: (orderNo: string, options?: Options) => {
        return request.post<RequestCashReceiptResponse>(
            `profile/orders/${orderNo}/cashReceipt/cancel`,
            {
                ...options,
            },
        );
    },
};

export default myOrder;
