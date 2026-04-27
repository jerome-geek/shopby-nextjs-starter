import {
    type UseSuspenseQueryOptions,
    useSuspenseQuery,
} from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { productProfile } from '@/api/product';
import { productProfileKeys } from '@/hooks/queryKeys';
import type {
    GetLikeProductsParams,
    GetLikeProductsResponse,
} from '@/models/product/profile';

interface UseLikeProductListParams<T = GetLikeProductsResponse> {
    searchParams: GetLikeProductsParams;
    memberNo?: number;
    options?: Omit<
        UseSuspenseQueryOptions<
            GetLikeProductsResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof productProfileKeys)['likeProductList']>
        >,
        'queryKey' | 'queryFn'
    >;
}

const useLikeProductList = <T = GetLikeProductsResponse>({
    searchParams,
    options,
}: UseLikeProductListParams<T>) => {
    return useSuspenseQuery({
        queryKey: productProfileKeys.likeProductList(searchParams),
        queryFn: async () => {
            const { data } = await productProfile.getLikeProducts(searchParams);

            return data;
        },
        ...options,
    });
};

export default useLikeProductList;
