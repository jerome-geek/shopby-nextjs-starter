import {
    InfiniteData,
    type UseInfiniteQueryOptions,
    keepPreviousData,
    useInfiniteQuery,
} from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { product } from '@/api/product';
import { productKeys } from '@/hooks/queryKeys';
import type {
    GetBestSellerProductsParams,
    GetBestSellerProductsResponse,
} from '@/models/product/product';

export type InfiniteBestSellerPage = {
    data: GetBestSellerProductsResponse;
    pageNumber: number;
};

interface UseInfiniteBestSellerProductListParams {
    searchParams: GetBestSellerProductsParams;
    memberNo?: number;
    options?: Omit<
        UseInfiniteQueryOptions<
            InfiniteBestSellerPage,
            AxiosError<ShopByErrorResponse>,
            InfiniteData<InfiniteBestSellerPage>,
            ReturnType<(typeof productKeys)['infiniteBestList']>,
            number
        >,
        'queryKey' | 'queryFn' | 'initialPageParam' | 'getNextPageParam'
    >;
}

const useInfiniteBestSellerProductList = ({
    searchParams,
    memberNo = 0,
    options,
}: UseInfiniteBestSellerProductListParams) => {
    return useInfiniteQuery({
        queryKey: productKeys.infiniteBestList(memberNo, searchParams),
        queryFn: async ({ pageParam }) => {
            const { data } = await product.getBestSellerProducts({
                ...searchParams,
                pageNumber: pageParam,
            });

            return {
                data,
                pageNumber: pageParam,
            };
        },
        getNextPageParam: (lastPage, allPages) => {
            if (!searchParams.pageSize) {
                return;
            }

            const totalCount = lastPage.data?.totalCount ?? 0;

            return searchParams.pageSize * allPages.length < totalCount
                ? lastPage.pageNumber + 1
                : undefined;
        },
        initialPageParam: 1,
        placeholderData: keepPreviousData,
        ...options,
    });
};

export default useInfiniteBestSellerProductList;
