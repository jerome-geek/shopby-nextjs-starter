import { isEmpty } from '@fxts/core';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { HTTPError } from 'ky';

import { productProfile } from '@/api/product';
import {
    GetLikeBrandsResponse,
    GetLikeBrandsParams,
} from '@/models/product/profile';
import { brandKeys } from '@/hooks/queryKeys';

interface UseLikeBrandListParams<T = GetLikeBrandsResponse> {
    memberNo: number;
    params: GetLikeBrandsParams;
    options?: Omit<
        UseQueryOptions<
            GetLikeBrandsResponse,
            HTTPError<ShopByErrorResponse>,
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
    return useQuery({
        queryKey: brandKeys.likeList(memberNo, params),
        queryFn: async () => {
            const data = await productProfile.getLikeBrands(params).json();

            return data;
        },
        enabled: !isEmpty(memberNo),
        ...options,
    });
};

export default useLikeBrandList;
