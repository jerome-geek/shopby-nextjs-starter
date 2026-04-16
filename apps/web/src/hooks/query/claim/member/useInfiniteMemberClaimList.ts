import {
    InfiniteData,
    UseInfiniteQueryOptions,
    keepPreviousData,
    useInfiniteQuery,
} from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { memberClaim } from '@/api/claim';
import claimsKeys from '@/hooks/queryKeys/claimsKeys';
import type {
    GetClaimListParams,
    GetClaimListResponse,
} from '@/models/claim/member';

interface UseInfiniteMemberClaimListParams {
    memberNo: number;
    searchParams: GetClaimListParams;
    options?: Omit<
        UseInfiniteQueryOptions<
            GetClaimListResponse,
            AxiosError<ShopByErrorResponse>,
            InfiniteData<GetClaimListResponse>,
            ReturnType<(typeof claimsKeys)['infiniteList']>,
            number
        >,
        'queryKey' | 'initialPageParam' | 'getNextPageParam' | 'queryFn'
    >;
}

const useInfiniteMemberClaimList = ({
    memberNo,
    searchParams,
    options,
}: UseInfiniteMemberClaimListParams) => {
    return useInfiniteQuery({
        queryKey: claimsKeys.infiniteList(memberNo, searchParams),
        queryFn: async ({ pageParam = 1 }: { pageParam: number }) => {
            const { data } = await memberClaim.getClaimList({
                ...searchParams,
                pageNumber: pageParam,
            });

            return data;
        },
        getNextPageParam: (lastPage, allPages) => {
            const pageSize = searchParams.pageSize || 10;
            const totalCount = lastPage.totalCount || 0;
            const hasNextPage = pageSize * allPages.length < totalCount;

            return hasNextPage ? allPages.length + 1 : undefined;
        },
        placeholderData: keepPreviousData,
        initialPageParam: 1,
        ...options,
        enabled: (options?.enabled ?? true) && memberNo !== 0,
    });
};

export default useInfiniteMemberClaimList;
