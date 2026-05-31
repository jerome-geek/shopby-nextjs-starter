import type { AxiosRequestConfig } from 'axios';

import { shopbyRequest } from '@/api/core/request';
import type { GetOrderConfigsResponse } from '@/entities/order/model/orderConfiguration';

const orderConfiguration = {
    /**
     * 주문 설정 값 가져오기
     *  - 주문 설정값을 조회하는 API 입니다
     */
    getOrderConfigs: (options?: AxiosRequestConfig) => {
        return shopbyRequest<GetOrderConfigsResponse>({
            method: 'GET',
            url: 'order-configs',
            ...options,
        });
    },
};

export default orderConfiguration;
