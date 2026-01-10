import type { Options } from 'ky';

import { request } from '@/api/core';
import {
    ReservePaymentData,
    ReservePaymentResponse,
} from '@/models/order/purchase';

const purchase = {
    /**
     * 주문 예약하기
     *  - 주문을 예약하는 API 입니다.
     */
    reservePayment: (data: ReservePaymentData, options?: Options) => {
        return request.post<ReservePaymentResponse>('payments/reserve', {
            json: data,
            ...options,
        });
    },
};

export default purchase;
