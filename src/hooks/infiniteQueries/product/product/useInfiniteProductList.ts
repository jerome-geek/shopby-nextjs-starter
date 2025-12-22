import {
    UseInfiniteQueryOptions,
    keepPreviousData,
    useInfiniteQuery,
    InfiniteData,
} from '@tanstack/react-query';

import { product } from '@/api/product';
import { productKeys } from '@/hooks/queryKeys';
import {
    ProductSearchParams,
    ProductsSearchResponse,
} from '@/models/product/product';
import { HTTPError } from 'ky';

// type ProductListPage = InfiniteResponse<ProductsSearchResponse>;

type ProductInfiniteResponse = {
    data: ProductsSearchResponse;
    pageNumber: number;
};

interface UseInfiniteProductListParams {
    searchParams: ProductSearchParams;
    memberNo?: number;
    initialPageParam?: number;
    options?: Omit<
        UseInfiniteQueryOptions<
            ProductInfiniteResponse,
            HTTPError<ShopByErrorResponse>,
            ProductsSearchResponse,
            ReturnType<(typeof productKeys)['infiniteList']>,
            number
        >,
        'queryKey' | 'queryFn' | 'initialPageParam' | 'getNextPageParam'
    >;
}

const useInfiniteProductList = ({
    searchParams,
    memberNo = 0,
    initialPageParam,
    options,
}: UseInfiniteProductListParams) => {
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
        // lastPage = TQueryFnData
        getNextPageParam: (lastPage) => {
            console.log('🚀 ~ useInfiniteProductList ~ lastPage:', lastPage);
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

export default useInfiniteProductList;
