import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { memberClaim } from '@/api/claim';
import { ordersKeys } from '@/hooks/queryKeys';
import type {
    GetOrderOptionDetailForClaimParams,
    GetOrderOptionDetailForClaimResponse,
} from '@/models/claim/member';
import { useAuth } from '@/hooks/useAuth';

interface UseOrderOptionDetailForClaimProps<
    T = GetOrderOptionDetailForClaimResponse,
> {
    orderOptionNo: number;
    searchParams: GetOrderOptionDetailForClaimParams;
    options?: Omit<
        UseQueryOptions<
            GetOrderOptionDetailForClaimResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof ordersKeys)['detailsByOrderOptionNo']>
        >,
        'queryKey' | 'queryFn'
    >;
}

const useOrderOptionDetailForClaim = <
    T = GetOrderOptionDetailForClaimResponse,
>({
    orderOptionNo,
    searchParams,
    options,
}: UseOrderOptionDetailForClaimProps<T>) => {
    const isLogin = useAuth();

    return useQuery({
        queryKey: ordersKeys.detailsByOrderOptionNo(
            orderOptionNo,
            searchParams,
        ),
        queryFn: async () => {
            const { data } = await memberClaim.getOrderOptionDetailForClaim(
                orderOptionNo,
                searchParams,
            );

            return data;
        },
        enabled: !!orderOptionNo && !!isLogin,
        ...options,
    });
};

export default useOrderOptionDetailForClaim;
