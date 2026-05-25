import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { guestOrderOptionDetailForClaimOptions } from '@/entities/claim/queries';
import { useAuth } from '@/hooks/useAuth';
import type {
    GetOrderOptionDetailForClaimParams,
    GetOrderOptionDetailForClaimResponse,
} from '@/models/claim/member';

interface UseGuestOrderOptionDetailForClaimProps<
    T = GetOrderOptionDetailForClaimResponse,
> {
    orderOptionNo: number;
    searchParams: GetOrderOptionDetailForClaimParams;
    options?: Omit<
        UseQueryOptions<
            GetOrderOptionDetailForClaimResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof guestOrderKeys)['detailsByOrderOptionNo']>
        >,
        'queryKey' | 'queryFn'
    >;
}

const useGuestOrderOptionDetailForClaim = <
    T = GetOrderOptionDetailForClaimResponse,
>({
    orderOptionNo,
    searchParams,
    options,
}: UseGuestOrderOptionDetailForClaimProps<T>) => {
    const isLogin = useAuth();

    return useQuery({
        ...guestOrderOptionDetailForClaimOptions({
            orderOptionNo,
            searchParams,
            options,
        }),
        enabled: !!orderOptionNo && !isLogin,
    });
};

export default useGuestOrderOptionDetailForClaim;
