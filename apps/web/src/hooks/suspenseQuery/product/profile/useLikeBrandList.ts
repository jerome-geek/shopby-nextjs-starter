import {
    type UseSuspenseQueryOptions,
    useSuspenseQuery,
} from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { productProfile } from '@/api/product';
import { brandKeys } from '@/hooks/queryKeys';
import type {
    GetLikeBrandsParams,
    GetLikeBrandsResponse,
} from '@/models/product/profile';

interface UseLikeBrandListParams<T = GetLikeBrandsResponse> {
    memberNo: number;
    params: GetLikeBrandsParams;
    options?: Omit<
        UseSuspenseQueryOptions<
            GetLikeBrandsResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof brandKeys)['likeList']>
        >,
        'queryKey' | 'queryFn'
    >;
}

const useLikeBrandList = <T = GetLikeBrandsResponse>({
    memberNo,
    params,
    options,
}: UseLikeBrandListParams<T>) => {
    return useSuspenseQuery({
        queryKey: brandKeys.likeList(memberNo, params),
        queryFn: async () => {
            const { data } = await productProfile.getLikeBrands(params);

            return data;
        },
        ...options,
    });
};

export default useLikeBrandList;
