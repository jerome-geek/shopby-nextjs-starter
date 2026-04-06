import {
    InfiniteData,
    UseInfiniteQueryOptions,
    keepPreviousData,
    useInfiniteQuery,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { product } from '@/api/product';
import { productKeys } from '@/hooks/queryKeys';
import {
    ProductSearchParams,
    ProductsSearchResponse,
} from '@/models/product/product';

export type InfiniteProductPage = {
    data: ProductsSearchResponse;
    pageNumber: number;
};

interface UseInfiniteProductListParams {
    searchParams: ProductSearchParams;
    memberNo?: number;
    options?: Omit<
        UseInfiniteQueryOptions<
            InfiniteProductPage,
            AxiosError<ShopByErrorResponse>,
            InfiniteData<InfiniteProductPage>,
            ReturnType<(typeof productKeys)['infiniteList']>,
            number
        >,
        'queryKey' | 'queryFn' | 'initialPageParam' | 'getNextPageParam'
    >;
}

const useInfiniteProductList = ({
    searchParams,
    memberNo = 0,
    options,
}: UseInfiniteProductListParams) => {
    return useInfiniteQuery({
        queryKey: productKeys.infiniteList(memberNo, searchParams),
        queryFn: async ({ pageParam }) => {
            const { data } = await product.searchProducts({
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

export default useInfiniteProductList;
