import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { guestClaim } from '@/api/claim';
import { claimsKeys } from '@/hooks/queryKeys';
import type { GetClaimDetailByClaimNoResponse } from '@/models/claim/member';

interface UseClaimDetailParams<T = GetClaimDetailByClaimNoResponse> {
    claimNo: number;
    options?: Omit<
        UseQueryOptions<
            GetClaimDetailByClaimNoResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof claimsKeys)['guestDetail']>
        >,
        'queryKey' | 'queryFn'
    >;
}

const useGuestClaimDetail = <T = GetClaimDetailByClaimNoResponse>({
    claimNo,
    options,
}: UseClaimDetailParams<T>) => {
    return useQuery({
        queryKey: claimsKeys.guestDetail(claimNo),
        queryFn: async () => {
            const { data } = await guestClaim.getClaimDetailByClaimNo(claimNo);

            return data;
        },
        ...options,
        enabled: (options?.enabled ?? true) && !!claimNo,
    });
};

export default useGuestClaimDetail;
