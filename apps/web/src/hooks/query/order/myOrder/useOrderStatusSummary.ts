import { useQuery } from '@tanstack/react-query';

import {
    orderStatusSummaryOptions,
    type OrderStatusSummaryOptionsParams,
} from '@/entities/order/queries';
import type { GetOrderStatusSummaryResponse } from '@/models/order/myOrder';

interface UseOrderStatusSummaryParams<T = GetOrderStatusSummaryResponse> {
    memberNo: number;
    searchParams?: OrderStatusSummaryOptionsParams<T>['searchParams'];
    options?: OrderStatusSummaryOptionsParams<T>['options'];
}

const useOrderStatusSummary = <T = GetOrderStatusSummaryResponse>(
    params: UseOrderStatusSummaryParams<T>,
) => {
    return useQuery(orderStatusSummaryOptions(params));
};

export default useOrderStatusSummary;
