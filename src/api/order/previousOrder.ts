import type { Options } from 'ky';
import qs from 'qs';

import { request } from '@/api/core/request';
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
    getPreviousOrders: (params: GetPreviousOrdersParams, options?: Options) => {
        return request.get<GetPreviousOrdersResponse>('previous-orders', {
            searchParams: qs.stringify(params, {
                arrayFormat: 'comma',
                allowDots: true,
            }),
            ...options,
        });
    },

    /**
     * 이전주문 상세조회
     */
    getPreviousOrder: (orderNo: string, options?: Options) => {
        return request.get<GetPreviousOrderResponse>(
            `previous-orders/${orderNo}`,
            {
                ...options,
            },
        );
    },

    /**
     * 비회원 이전주문 상세조회
     */
    getGuestPreviousOrder: (orderNo: string, options?: Options) => {
        return request.get<GetGuestPreviousOrderResponse>(
            `previous-orders/guest/${orderNo}`,
            {
                ...options,
            },
        );
    },

    /**
     * 이전주문 비회원 토큰 발급
     */
    issueGuestPreviousOrderToken: (
        orderNo: string,
        data: IssueGuestPreviousOrderTokenData,
        options?: Options,
    ) => {
        return request.post<IssueGuestPreviousOrderTokenResponse>(
            `previous-orders/guest/${orderNo}`,
            {
                json: data,
                ...options,
            },
        );
    },
};

export default previousOrder;
