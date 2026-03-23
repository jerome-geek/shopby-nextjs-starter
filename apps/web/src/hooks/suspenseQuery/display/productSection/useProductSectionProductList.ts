import {
    useSuspenseQuery,
    UseSuspenseQueryOptions,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';

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
            AxiosError<ShopByErrorResponse>,
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
            const { data } = await productSection.getProductSectionProductsById(
                sectionId,
                searchParams,
            );

            return data;
        },
        ...options,
    });
};

export default useProductSectionProductList;
