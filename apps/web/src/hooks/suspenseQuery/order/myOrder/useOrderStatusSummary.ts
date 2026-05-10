import { useSuspenseQuery } from '@tanstack/react-query';

import {
    orderStatusSummaryOptions,
    type OrderStatusSummaryOptionsParams,
} from '@/entities/order/queries';
import type { GetOrderStatusSummaryResponse } from '@/models/order/myOrder';

const useOrderStatusSummary = <T = GetOrderStatusSummaryResponse>(
    params: OrderStatusSummaryOptionsParams<T> = {},
) => {
    return useSuspenseQuery(orderStatusSummaryOptions(params));
};

export default useOrderStatusSummary;
