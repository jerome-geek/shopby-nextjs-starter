import {
    InfiniteData,
    type UseInfiniteQueryOptions,
    keepPreviousData,
    useInfiniteQuery,
} from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { productSection } from '@/api/display';
import { productSectionKeys } from '@/hooks/queryKeys';
import type {
    GetProductSectionProductsParams,
    GetProductSectionProductsResponse,
} from '@/models/display/productSection';

export type InfiniteProductSectionPage = {
    data: GetProductSectionProductsResponse;
    pageNumber: number;
};

interface UseInfiniteProductSectionProductListParams {
    sectionId: string;
    searchParams: Omit<GetProductSectionProductsParams, 'pageNumber'>;
    options?: Omit<
        UseInfiniteQueryOptions<
            InfiniteProductSectionPage,
            AxiosError<ShopByErrorResponse>,
            InfiniteData<InfiniteProductSectionPage>,
            ReturnType<(typeof productSectionKeys)['infiniteProducts']>,
            number
        >,
        'queryKey' | 'queryFn' | 'initialPageParam' | 'getNextPageParam'
    >;
}

const useInfiniteProductSectionProductList = ({
    sectionId,
    searchParams,
    options,
}: UseInfiniteProductSectionProductListParams) => {
    return useInfiniteQuery({
        queryKey: productSectionKeys.infiniteProducts(sectionId, searchParams),
        queryFn: async ({ pageParam }) => {
            const { data } = await productSection.getProductSectionProductsById(
                sectionId,
                {
                    ...searchParams,
                    pageNumber: pageParam,
                },
            );

            return {
                data,
                pageNumber: pageParam,
            };
        },
        getNextPageParam: (lastPage, allPages) => {
            if (!searchParams.pageSize) {
                return;
            }

            const totalCount = lastPage.data?.productTotalCount ?? 0;

            return searchParams.pageSize * allPages.length < totalCount
                ? lastPage.pageNumber + 1
                : undefined;
        },
        initialPageParam: 1,
        placeholderData: keepPreviousData,
        ...options,
    });
};

export default useInfiniteProductSectionProductList;
