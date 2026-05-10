import { queryOptions, type UseQueryOptions } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { myOrder } from '@/api/order';
import ordersKeys from '@/hooks/queryKeys/ordersKeys';
import type {
    GetOrderStatusSummaryParams,
    GetOrderStatusSummaryResponse,
} from '@/models/order/myOrder';

export interface OrderStatusSummaryOptionsParams<
    T = GetOrderStatusSummaryResponse,
> {
    searchParams?: GetOrderStatusSummaryParams;
    options?: Omit<
        UseQueryOptions<
            GetOrderStatusSummaryResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof ordersKeys)['summary']>
        >,
        'queryKey' | 'queryFn'
    >;
}

export const orderStatusSummaryOptions = <
    T = GetOrderStatusSummaryResponse,
>({
    searchParams,
    options,
}: OrderStatusSummaryOptionsParams<T> = {}) => {
    return queryOptions({
        queryKey: ordersKeys.summary(searchParams),
        queryFn: async () => {
            const { data } = await myOrder.getOrderStatusSummary(searchParams);
            return data;
        },
        ...options,
    });
};
