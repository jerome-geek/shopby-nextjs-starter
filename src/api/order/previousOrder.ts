import type { AxiosRequestConfig } from 'axios';

import { shopbyRequest } from '@/api/core/request';
import {
    GetGuestPreviousOrderResponse,
    GetPreviousOrderResponse,
    GetPreviousOrdersParams,
    GetPreviousOrdersResponse,
    IssueGuestPreviousOrderTokenData,
    IssueGuestPreviousOrderTokenResponse,
} from '@/models/order/previousOrder';

const previousOrder = {
    /**
     * 이전주문 검색
     */
    getPreviousOrders: (
        params: GetPreviousOrdersParams,
        options?: AxiosRequestConfig,
    ) => {
        return shopbyRequest<GetPreviousOrdersResponse>({
            method: 'GET',
            url: '/previous-orders',
            params,
            ...options,
        });
    },

    /**
     * 이전주문 상세조회
     */
    getPreviousOrder: (orderNo: string, options?: AxiosRequestConfig) => {
        return shopbyRequest<GetPreviousOrderResponse>({
            method: 'GET',
            url: `/previous-orders/${orderNo}`,
            ...options,
        });
    },

    /**
     * 비회원 이전주문 상세조회
     */
    getGuestPreviousOrder: (orderNo: string, options?: AxiosRequestConfig) => {
        return shopbyRequest<GetGuestPreviousOrderResponse>({
            method: 'GET',
            url: `/previous-orders/guest/${orderNo}`,
            ...options,
        });
    },

    /**
     * 이전주문 비회원 토큰 발급
     */
    issueGuestPreviousOrderToken: (
        orderNo: string,
        data: IssueGuestPreviousOrderTokenData,
        options?: AxiosRequestConfig,
    ) => {
        return shopbyRequest<IssueGuestPreviousOrderTokenResponse>({
            method: 'POST',
            url: `/previous-orders/guest/${orderNo}`,
            data,
            ...options,
        });
    },
};

export default previousOrder;
