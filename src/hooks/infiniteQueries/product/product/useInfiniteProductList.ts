import {
    InfiniteData,
    UseInfiniteQueryOptions,
    keepPreviousData,
    useInfiniteQuery,
} from '@tanstack/react-query';
import { HTTPError } from 'ky';

import { product } from '@/api/product';
import { productKeys } from '@/hooks/queryKeys';
import {
    ProductSearchParams,
    ProductsSearchResponse,
} from '@/models/product/product';

type ProductInfiniteResponse = {
    data: ProductsSearchResponse;
    pageNumber: number;
};

interface UseInfiniteProductListParams<
    TData = InfiniteData<ProductInfiniteResponse>,
> {
    searchParams: ProductSearchParams;
    memberNo?: number;
    initialPageParam?: number;
    options?: Omit<
        UseInfiniteQueryOptions<
            ProductInfiniteResponse,
            HTTPError<ShopByErrorResponse>,
            TData,
            ReturnType<(typeof productKeys)['infiniteList']>,
            number
        >,
        'queryKey' | 'queryFn' | 'initialPageParam' | 'getNextPageParam'
    >;
}

const useInfiniteProductList = <TData = InfiniteData<ProductInfiniteResponse>>({
    searchParams,
    memberNo = 0,
    initialPageParam,
    options,
}: UseInfiniteProductListParams<TData>) => {
    return useInfiniteQuery({
        queryKey: productKeys.infiniteList(memberNo, searchParams),
        queryFn: async ({ pageParam }) => {
            const data = await product
                .searchProducts({
                    ...searchParams,
                    pageNumber: pageParam,
                })
                .json();

            return {
                data,
                pageNumber: pageParam,
            };
        },
        getNextPageParam: (lastPage, allPages) => {
            if (!searchParams.pageSize) {
                return;
            }

            return searchParams.pageSize * allPages.length <
                lastPage.data.totalCount
                ? lastPage.pageNumber + 1
                : undefined;
        },
        initialPageParam: initialPageParam ?? searchParams.pageNumber ?? 1,
        placeholderData: keepPreviousData,
        ...options,
    });
};

export default useInfiniteProductList;
