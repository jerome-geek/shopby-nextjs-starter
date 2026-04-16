import type { AxiosRequestConfig } from 'axios';

import { shopbyRequest } from '@/api/core/request';
import type {
    ReservePaymentData,
    ReservePaymentResponse,
} from '@/models/order/purchase';

const purchase = {
    /**
     * 주문 예약하기
     *  - 주문을 예약하는 API 입니다.
     */
    reservePayment: (
        data: ReservePaymentData,
        options?: AxiosRequestConfig,
    ) => {
        return shopbyRequest<ReservePaymentResponse>({
            method: 'POST',
            url: '/payments/reserve',
            data,
            ...options,
        });
    },
};

export default purchase;
