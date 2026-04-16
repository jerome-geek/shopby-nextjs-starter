import {
    keepPreviousData,
    useQuery,
    UseQueryOptions,
} from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { memberClaim } from '@/api/claim';
import type {
    GetClaimListParams,
    GetClaimListResponse,
} from '@/models/claim/member';
import claimsKeys from '@/hooks/queryKeys/claimsKeys';

interface UseMemberClaimListParams<T = GetClaimListResponse> {
    searchParams: GetClaimListParams;
    memberNo?: number;
    options?: Omit<
        UseQueryOptions<
            GetClaimListResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof claimsKeys)['list']>
        >,
        'queryKey' | 'queryFn'
    >;
}

const useMemberClaimList = <T = GetClaimListResponse>({
    searchParams,
    memberNo = 0,
    options,
}: UseMemberClaimListParams<T>) => {
    return useQuery({
        queryKey: claimsKeys.list(memberNo, searchParams),
        queryFn: async () => {
            const { data } = await memberClaim.getClaimList(searchParams);

            return data;
        },
        ...options,
        placeholderData: keepPreviousData,
        enabled: (options?.enabled ?? true) && memberNo !== 0,
    });
};

export default useMemberClaimList;
