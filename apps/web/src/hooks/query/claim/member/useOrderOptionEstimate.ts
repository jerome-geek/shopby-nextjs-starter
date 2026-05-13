import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { memberClaim } from '@/api/claim';
import { claimsKeys } from '@/hooks/queryKeys';
import { useAuth } from '@/hooks/useAuth';
import type { ClaimPriceInfo } from '@/models/claim';
import type { GetClaimOptionPriceParams } from '@/models/claim/guest';

interface UseOrderOptionDetailForClaimProps<T = ClaimPriceInfo> {
    orderOptionNo: number;
    searchParams: GetClaimOptionPriceParams;
    options?: Omit<
        UseQueryOptions<
            ClaimPriceInfo,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof claimsKeys)['orderOptionEstimate']>
        >,
        'queryKey' | 'queryFn'
    >;
}

const useOrderOptionEstimate = <T = ClaimPriceInfo>({
    orderOptionNo,
    searchParams,
    options,
}: UseOrderOptionDetailForClaimProps<T>) => {
    const isLogin = useAuth();

    return useQuery({
        queryKey: claimsKeys.orderOptionEstimate(orderOptionNo, searchParams),
        queryFn: async () => {
            const { data } = await memberClaim.getClaimOptionPrice(
                Number(orderOptionNo),
                searchParams,
            );

            return data;
        },
        ...options,
        enabled:
            (options?.enabled ?? true) &&
            !!orderOptionNo &&
            !!isLogin &&
            !!searchParams?.claimReasonType,
    });
};

export default useOrderOptionEstimate;
