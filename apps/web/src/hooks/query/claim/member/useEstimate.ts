import { isEmpty } from '@fxts/core';
import {
    keepPreviousData,
    useQuery,
    UseQueryOptions,
} from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { memberClaim } from '@/api/claim';
import { claimsKeys } from '@/hooks/queryKeys';
import { useAuth } from '@/hooks/useAuth';
import type { ClaimPriceInfo, EstimatedRefundPriceData } from '@/models/claim';

interface UseEstimateProps<T = ClaimPriceInfo> {
    data: EstimatedRefundPriceData;
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
    data,
    options,
}: UseEstimateProps<T>) => {
    const isLogin = useAuth();

    return useQuery({
        queryKey: claimsKeys.estimate(data),
        queryFn: async () => {
            const response = await memberClaim.getEstimatedRefundPrice(data);

            return response.data;
        },
        placeholderData: keepPreviousData,
        ...options,
        enabled:
            (options?.enabled ?? true) &&
            !!data?.claimReasonType &&
            !!isLogin &&
            !isEmpty(data?.claimedProductOptions),
    });
};

export default useOrderOptionEstimate;
