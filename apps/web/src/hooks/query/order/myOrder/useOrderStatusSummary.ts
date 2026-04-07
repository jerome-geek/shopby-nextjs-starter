import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import myOrder from '@/api/order/myOrder';
import ordersKeys from '@/hooks/queryKeys/ordersKeys';
import type {
    GetOrderStatusSummaryParams,
    GetOrderStatusSummaryResponse,
} from '@/models/order/myOrder';

interface UseOrderStatusSummaryParams<T = GetOrderStatusSummaryResponse> {
    memberNo: number;
    searchParams?: GetOrderStatusSummaryParams;
    options?: Omit<
        UseQueryOptions<
            GetOrderStatusSummaryResponse,
            AxiosError<ShopByErrorResponse>,
            T
        >,
        'queryKey' | 'queryFn'
    >;
}

const useOrderStatusSummary = <T = GetOrderStatusSummaryResponse>({
    memberNo,
    searchParams = {},
    options,
}: UseOrderStatusSummaryParams<T>) => {
    return useQuery({
        queryKey: ordersKeys.summary(searchParams),
        queryFn: async () => {
            const { data } = await myOrder.getOrderStatusSummary(searchParams);
            return data;
        },
        enabled: memberNo > 0 && (options?.enabled ?? true),
        ...options,
    });
};

export default useOrderStatusSummary;
