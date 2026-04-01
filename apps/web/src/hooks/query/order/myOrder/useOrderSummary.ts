import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import myOrder from '@/api/order/myOrder';
import type {
    GetOrderSummaryParams,
    GetOrderSummaryResponse,
} from '@/models/order/myOrder';

interface UseOrderSummaryParams<T = GetOrderSummaryResponse> {
    memberNo: number;
    searchParams: GetOrderSummaryParams;
    options?: Omit<
        UseQueryOptions<
            GetOrderSummaryResponse,
            AxiosError<ShopByErrorResponse>,
            T
        >,
        'queryKey' | 'queryFn'
    >;
}

const useOrderSummary = <T = GetOrderSummaryResponse>({
    memberNo,
    searchParams,
    options,
}: UseOrderSummaryParams<T>) => {
    return useQuery({
        queryKey: ['orders', 'summary', 'amount', searchParams],
        queryFn: async () => {
            const { data } = await myOrder.getOrderSummary(searchParams);
            return data;
        },
        enabled: memberNo > 0 && (options?.enabled ?? true),
        ...options,
    });
};

export default useOrderSummary;

