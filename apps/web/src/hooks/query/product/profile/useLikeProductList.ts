import {
    UseQueryOptions,
    keepPreviousData,
    useQuery,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { productProfile } from '@/api/product';
import { productProfileKeys } from '@/hooks/queryKeys';
import {
    GetLikeProductsParams,
    GetLikeProductsResponse,
} from '@/models/product/profile';

interface UseLikeProductListParams<T = GetLikeProductsResponse> {
    searchParams: GetLikeProductsParams;
    memberNo?: number;
    options?: Omit<
        UseQueryOptions<
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
    return useQuery({
        queryKey: productProfileKeys.likeProductList(searchParams),
        queryFn: async () => {
            const { data } = await productProfile.getLikeProducts(searchParams);

            return data;
        },
        placeholderData: keepPreviousData,
        ...options,
    });
};

export default useLikeProductList;
