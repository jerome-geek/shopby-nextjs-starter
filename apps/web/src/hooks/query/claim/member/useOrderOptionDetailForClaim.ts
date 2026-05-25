import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { memberOrderOptionDetailForClaimOptions } from '@/entities/claim/queries';
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
        ...memberOrderOptionDetailForClaimOptions({
            orderOptionNo,
            searchParams,
            options,
        }),
        enabled: !!orderOptionNo && !!isLogin,
    });
};

export default useOrderOptionDetailForClaim;
