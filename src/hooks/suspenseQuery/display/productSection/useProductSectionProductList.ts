import {
    useSuspenseQuery,
    UseSuspenseQueryOptions,
} from '@tanstack/react-query';
import { HTTPError } from 'ky';

import { productSection } from '@/api/display';
import { productSectionKeys } from '@/hooks/queryKeys';
import {
    GetProductSectionProductsParams,
    GetProductSectionProductsResponse,
} from '@/models/display/productSection';

interface UseProductSectionProductList<T = GetProductSectionProductsResponse> {
    sectionId: string;
    searchParams: GetProductSectionProductsParams;
    options?: Omit<
        UseSuspenseQueryOptions<
            GetProductSectionProductsResponse,
            HTTPError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof productSectionKeys)['products']>
        >,
        'queryKey' | 'queryFn'
    >;
}

const useProductSectionProductList = <T = GetProductSectionProductsResponse>({
    sectionId,
    searchParams,
    options,
}: UseProductSectionProductList<T>) => {
    return useSuspenseQuery({
        queryKey: productSectionKeys.products(sectionId, searchParams),
        queryFn: async () => {
            const data = await productSection
                .getProductSectionProductsById(sectionId, searchParams)
                .json();

            return data;
        },
        ...options,
    });
};

export default useProductSectionProductList;
