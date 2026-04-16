import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { guestClaim } from '@/api/claim';
import { claimsKeys } from '@/hooks/queryKeys';
import type { ClaimPriceInfo } from '@/models/claim';
import type { GetClaimOptionPriceParams } from '@/models/claim/guest';
import { useAuth } from '@/hooks/useAuth';

interface UseOrderOptionDetailForClaimProps<T = ClaimPriceInfo> {
    orderOptionNo: number;
    searchParams: GetClaimOptionPriceParams;
    options?: Omit<
        UseQueryOptions<
            ClaimPriceInfo,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof claimsKeys)['guestEstimate']>
        >,
        'queryKey' | 'queryFn'
    >;
}

const useGuestOrderOptionEstimate = <T = ClaimPriceInfo>({
    orderOptionNo,
    searchParams,
    options,
}: UseOrderOptionDetailForClaimProps<T>) => {
    const isLogin = useAuth();

    return useQuery({
        queryKey: claimsKeys.guestEstimate(orderOptionNo, searchParams),
        queryFn: async () => {
            const { data } = await guestClaim.getClaimOptionPrice(
                orderOptionNo,
                searchParams,
            );

            return data;
        },
        ...options,
        enabled:
            (options?.enabled ?? true) &&
            !!orderOptionNo &&
            !isLogin &&
            !!searchParams?.claimReasonType,
    });
};

export default useGuestOrderOptionEstimate;
