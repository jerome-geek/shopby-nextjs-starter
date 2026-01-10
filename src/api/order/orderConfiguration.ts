import type { Options } from 'ky';

import { request } from '@/api/core';
import { GetOrderConfigsResponse } from '@/models/order/orderConfiguration';

const orderConfiguration = {
    /**
     * 주문 설정 값 가져오기
     *  - 주문 설정값을 조회하는 API 입니다
     */
    getOrderConfigs: (options?: Options) => {
        return request.get<GetOrderConfigsResponse>('order-configs', {
            ...options,
        });
    },
};

export default orderConfiguration;
