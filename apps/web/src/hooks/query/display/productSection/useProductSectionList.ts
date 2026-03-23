import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { productSection } from '@/api/display';
import { productSectionKeys } from '@/hooks/queryKeys';
import { GetProductSectionsResponse } from '@/models/display/productSection';

interface UseProductSectionListParams<T = GetProductSectionsResponse> {
    options?: Omit<
        UseQueryOptions<
            GetProductSectionsResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof productSectionKeys)['lists']>
        >,
        'queryKey' | 'queryFn'
    >;
}

const useProductSectionList = <T = GetProductSectionsResponse>({
    options,
}: UseProductSectionListParams<T> = {}) => {
    return useQuery({
        queryKey: productSectionKeys.lists(),
        queryFn: async () => {
            const { data } = await productSection.getProductSections();

            return data;
        },
        staleTime: 1000 * 60 * 60,
        gcTime: 1000 * 60 * 60,
        ...options,
    });
};

export default useProductSectionList;
