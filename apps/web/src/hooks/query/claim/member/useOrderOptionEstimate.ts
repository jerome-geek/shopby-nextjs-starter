import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { memberClaim } from '@/api/claim';
import claimsKeys from '@/hooks/queryKeys/claimsKeys';
import { ClaimPriceInfo } from '@/models/claim';
import { GetClaimOptionPriceParams } from '@/models/claim/guest';
import { useAuth } from '@/hooks/useAuth';

interface UseOrderOptionDetailForClaimProps<T = ClaimPriceInfo> {
    orderOptionNo: number;
    searchParams: GetClaimOptionPriceParams;
    options?: Omit<
        UseQueryOptions<
            ClaimPriceInfo,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof claimsKeys)['estimate']>
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
        queryKey: claimsKeys.estimate(orderOptionNo, searchParams),
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
