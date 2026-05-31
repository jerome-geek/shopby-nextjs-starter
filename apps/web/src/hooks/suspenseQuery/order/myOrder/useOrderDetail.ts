import { useSuspenseQuery } from '@tanstack/react-query';

import {
    orderDetailOptions,
    type OrderDetailOptionsParams,
} from '@/entities/order/queries';
import type { OrderDetailResponse } from '@/entities/order/model';

const useOrderDetail = <T = OrderDetailResponse>(
    params: OrderDetailOptionsParams<T>,
) => {
    return useSuspenseQuery(orderDetailOptions(params));
};

export default useOrderDetail;
