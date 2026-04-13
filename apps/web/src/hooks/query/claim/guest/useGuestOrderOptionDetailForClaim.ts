import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { guestClaim } from '@/api/claim';
import { guestOrderKeys } from '@/hooks/queryKeys';
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
        queryKey: guestOrderKeys.detailsByOrderOptionNo(
            orderOptionNo,
            searchParams,
        ),
        queryFn: async () => {
            const { data } = await guestClaim.getContentsForClaim(
                orderOptionNo,
                searchParams,
            );

            return data;
        },
        enabled: !!orderOptionNo && !isLogin,
        ...options,
    });
};

export default useGuestOrderOptionDetailForClaim;
