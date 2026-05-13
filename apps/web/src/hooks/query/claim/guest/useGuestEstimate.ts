import { isEmpty } from '@fxts/core';
import {
    keepPreviousData,
    useQuery,
    type UseQueryOptions,
} from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { guestClaim } from '@/api/claim';
import { claimsKeys } from '@/hooks/queryKeys';
import { useAuth } from '@/hooks/useAuth';
import type { ClaimPriceInfo, EstimatedRefundPriceData } from '@/models/claim';

interface UseOrderOptionDetailForClaimProps<T = ClaimPriceInfo> {
    data: EstimatedRefundPriceData;
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
    data,
    options,
}: UseOrderOptionDetailForClaimProps<T>) => {
    const isLogin = useAuth();

    return useQuery({
        queryKey: claimsKeys.guestEstimate(data),
        queryFn: async () => {
            const response = await guestClaim.getRefundPrice(data);

            return response.data;
        },
        placeholderData: keepPreviousData,
        ...options,
        enabled:
            (options?.enabled ?? true) &&
            !isLogin &&
            !!data?.claimReasonType &&
            !isEmpty(data?.claimedProductOptions),
    });
};

export default useGuestOrderOptionEstimate;
