import {
    keepPreviousData,
    useInfiniteQuery,
    UseInfiniteQueryOptions,
} from '@tanstack/react-query';
import { HTTPError } from 'ky';

import { product } from '@/api/product';
import { productKeys } from '@/hooks/queryKeys';
import {
    GetBestSellerProductsParams,
    GetBestSellerProductsResponse,
} from '@/models/product/product';

type BestSellerProductInfiniteResponse = {
    data: GetBestSellerProductsResponse;
    pageNumber: number;
};

interface UseInfiniteBestSellerProductListParams<
    TData = InfiniteData<BestSellerProductInfiniteResponse>,
> {
    searchParams: GetBestSellerProductsParams;
    memberNo?: number;
    initialPageParam?: number;
    options?: Omit<
        UseInfiniteQueryOptions<
            BestSellerProductInfiniteResponse,
            HTTPError<ShopByErrorResponse>,
            TData,
            ReturnType<(typeof productKeys)['infiniteBestList']>,
            number
        >,
        'queryKey' | 'queryFn' | 'initialPageParam' | 'getNextPageParam'
    >;
}

const useInfiniteBestSellerProductList = <
    TData = InfiniteData<BestSellerProductInfiniteResponse>,
>({
    searchParams,
    memberNo = 0,
    initialPageParam,
    options,
}: UseInfiniteBestSellerProductListParams<TData>) => {
    return useInfiniteQuery({
        queryKey: productKeys.infiniteBestList(memberNo, searchParams),
        queryFn: async ({ pageParam }) => {
            const data = await product
                .getBestSellerProducts({
                    ...searchParams,
                    pageNumber: pageParam,
                })
                .json();

            return {
                data,
                pageNumber: pageParam,
            };
        },
        getNextPageParam: (lastPage) => {
            const {
                data: { pageCount },
                pageNumber,
            } = lastPage;

            if (pageNumber < pageCount) {
                return pageNumber + 1;
            }

            return undefined;
        },
        initialPageParam: initialPageParam ?? searchParams.pageNumber ?? 1,
        placeholderData: keepPreviousData,
        ...options,
    });
};

export default useInfiniteBestSellerProductList;
