import {
    type UseSuspenseQueryOptions,
    useSuspenseQuery,
} from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { productProfile } from '@/api/product';
import { productProfileKeys } from '@/hooks/queryKeys';
import type {
    GetMemberLikeBrandListParams,
    GetMemberLikeBrandListResponse,
} from '@/models/product/profile';

interface UseMemberLikeBrandListParams<T = GetMemberLikeBrandListResponse> {
    memberNo?: number;
    searchParams?: GetMemberLikeBrandListParams;
    options?: Omit<
        UseSuspenseQueryOptions<
            GetMemberLikeBrandListResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof productProfileKeys)['likeBrandList']>
        >,
        'queryKey' | 'queryFn'
    >;
}

const useMemberLikeBrandList = <T = GetMemberLikeBrandListResponse>({
    memberNo = 0,
    searchParams,
    options,
}: UseMemberLikeBrandListParams<T> = {}) => {
    return useSuspenseQuery({
        queryKey: productProfileKeys.likeBrandList(memberNo, searchParams),
        queryFn: async () => {
            const { data } =
                await productProfile.getMemberLikeBrandList(searchParams);

            return data;
        },

        ...options,
    });
};

export default useMemberLikeBrandList;
