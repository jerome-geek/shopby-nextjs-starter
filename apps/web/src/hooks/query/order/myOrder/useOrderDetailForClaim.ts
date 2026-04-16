import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { myOrder } from '@/api/order';
import ordersKeys from '@/hooks/queryKeys/ordersKeys';
import type { ClaimType } from '@/models';
import type { OrderDetailResponse } from '@/models/order';

interface UseOrderDetailForClaimParams<T = OrderDetailResponse> {
    orderNo: string;
    memberNo?: number;
    searchParams?: { claimType: ClaimType };
    options?: Omit<
        UseQueryOptions<
            OrderDetailResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof ordersKeys)['detailsByOrderNo']>
        >,
        'queryKey' | 'queryFn'
    >;
}

const useOrderDetailForClaim = <T = OrderDetailResponse>({
    orderNo,
    memberNo = 0,
    searchParams,
    options,
}: UseOrderDetailForClaimParams<T>) => {
    return useQuery({
        queryKey: ordersKeys.detailsByOrderNo(orderNo, memberNo, searchParams),
        queryFn: async () => {
            const { data } = await myOrder.getOrderDetailForClaim(
                orderNo,
                searchParams,
            );
            return data;
        },
        ...options,
    });
};

export default useOrderDetailForClaim;
