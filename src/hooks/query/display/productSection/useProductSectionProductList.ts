import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { productSection } from '@/api/display';
import {
    GetProductSectionProductsParams,
    GetProductSectionProductsResponse,
} from '@/models/display/productSection';
import { productSectionKeys } from '@/hooks/queryKeys';

interface UseProductSectionProductList<T = GetProductSectionProductsResponse> {
    sectionId: string;
    searchParams: GetProductSectionProductsParams;
    options?: Omit<
        UseQueryOptions<
            GetProductSectionProductsResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof productSectionKeys)['products']>
        >,
        'queryKey' | 'queryFn'
    >;
}

// TODO: id 또는 no로 조회할 수 있도록
const useProductSectionProductList = <T = GetProductSectionProductsResponse>({
    sectionId,
    searchParams,
    options,
}: UseProductSectionProductList<T>) => {
    return useQuery({
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
