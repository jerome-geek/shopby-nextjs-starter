import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { memberClaim } from '@/api/claim';
import { ordersKeys } from '@/hooks/queryKeys';
import {
    GetOrderOptionDetailForClaimParams,
    GetOrderOptionDetailForClaimResponse,
} from '@/models/claim/member';
import { checkLogin } from '@/utils/users';

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
        enabled: !!orderOptionNo && checkLogin(),
        ...options,
    });
};

export default useOrderOptionDetailForClaim;
