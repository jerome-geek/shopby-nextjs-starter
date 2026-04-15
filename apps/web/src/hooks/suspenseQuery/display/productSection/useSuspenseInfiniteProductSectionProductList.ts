import { useSuspenseInfiniteQuery } from '@tanstack/react-query';

import { productSection } from '@/api/display';
import type { InfiniteProductSectionPage } from '@/hooks/query/display/productSection/useInfiniteProductSectionProductList';
import { productSectionKeys } from '@/hooks/queryKeys';
import type { GetProductSectionProductsParams } from '@/models/display/productSection';

interface UseSuspenseInfiniteProductSectionProductListParams {
    sectionId: string;
    searchParams: Omit<GetProductSectionProductsParams, 'pageNumber'>;
}

const useSuspenseInfiniteProductSectionProductList = ({
    sectionId,
    searchParams,
}: UseSuspenseInfiniteProductSectionProductListParams) => {
    return useSuspenseInfiniteQuery({
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
            } as InfiniteProductSectionPage;
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
    });
};

export default useSuspenseInfiniteProductSectionProductList;
