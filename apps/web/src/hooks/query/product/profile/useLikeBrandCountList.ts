import { type UseQueryOptions, useQuery } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { productProfile } from '@/api/product';
import { productKeys } from '@/hooks/queryKeys';
import {
    GetLikeBrandsCountParams,
    GetLikeBrandsCountResponse,
} from '@/models/product/profile';

interface UseLikeBrandCountListParams<T = GetLikeBrandsCountResponse> {
    searchParams: GetLikeBrandsCountParams;
    options?: Omit<
        UseQueryOptions<
            GetLikeBrandsCountResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof productKeys)['likeBrandCountList']>
        >,
        'queryKey' | 'queryFn'
    >;
}

const useLikeBrandCountList = <T = GetLikeBrandsCountResponse>({
    searchParams,
    options,
}: UseLikeBrandCountListParams<T>) => {
    return useQuery({
        queryKey: productKeys.likeBrandCountList(searchParams),
        queryFn: async () => {
            const { data } =
                await productProfile.getLikeBrandsCount(searchParams);

            return data;
        },
        ...options,
    });
};

export default useLikeBrandCountList;
