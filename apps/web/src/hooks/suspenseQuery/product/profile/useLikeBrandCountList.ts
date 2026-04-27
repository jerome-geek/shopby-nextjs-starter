import {
    type UseSuspenseQueryOptions,
    useSuspenseQuery,
} from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { productProfile } from '@/api/product';
import { productKeys } from '@/hooks/queryKeys';
import type {
    GetLikeBrandsCountParams,
    GetLikeBrandsCountResponse,
} from '@/models/product/profile';

interface UseLikeBrandCountListParams<T = GetLikeBrandsCountResponse> {
    searchParams: GetLikeBrandsCountParams;
    options?: Omit<
        UseSuspenseQueryOptions<
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
    return useSuspenseQuery({
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
