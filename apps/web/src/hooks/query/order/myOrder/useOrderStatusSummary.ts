import { useQuery } from '@tanstack/react-query';

import {
    orderStatusSummaryOptions,
    type OrderStatusSummaryOptionsParams,
} from '@/entities/order/queries';
import type {
    GetOrderStatusSummaryResponse,
} from '@/models/order/myOrder';

interface UseOrderStatusSummaryParams<T = GetOrderStatusSummaryResponse> {
    memberNo: number;
    searchParams?: OrderStatusSummaryOptionsParams<T>['searchParams'];
    options?: OrderStatusSummaryOptionsParams<T>['options'];
}

const useOrderStatusSummary = <T = GetOrderStatusSummaryResponse>({
    memberNo,
    searchParams,
    options,
}: UseOrderStatusSummaryParams<T>) => {
    const { enabled, ...queryOptions } = options ?? {};

    return useQuery(
        orderStatusSummaryOptions({
            searchParams,
            options: {
                ...queryOptions,
                enabled: memberNo > 0 && (enabled ?? true),
            },
        }),
    );
};

export default useOrderStatusSummary;
