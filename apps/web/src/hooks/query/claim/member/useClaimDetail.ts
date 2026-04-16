import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import member from '@/api/claim/member';
import type { GetClaimDetailByClaimNoResponse } from '@/models/claim/member';
import claimsKeys from '@/hooks/queryKeys/claimsKeys';

interface UseClaimDetailParams<T = GetClaimDetailByClaimNoResponse> {
    claimNo: number;
    memberNo?: number;
    options?: Omit<
        UseQueryOptions<
            GetClaimDetailByClaimNoResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof claimsKeys)['detail']>
        >,
        'queryKey' | 'queryFn'
    >;
}

const useClaimDetail = <T = GetClaimDetailByClaimNoResponse>({
    claimNo,
    memberNo = 0,
    options,
}: UseClaimDetailParams<T>) => {
    return useQuery({
        queryKey: claimsKeys.detail(claimNo, memberNo),
        queryFn: async () => {
            const { data } = await member.getClaimDetailByClaimNo(claimNo);

            return data;
        },
        enabled: !!claimNo,
        ...options,
    });
};

export default useClaimDetail;
