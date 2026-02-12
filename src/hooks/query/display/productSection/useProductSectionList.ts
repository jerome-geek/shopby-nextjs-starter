import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { HTTPError } from 'ky';

import { productSection } from '@/api/display';
import { productSectionKeys } from '@/hooks/queryKeys';
import { GetProductSectionsResponse } from '@/models/display/productSection';

interface UseProductSectionListParams<T = GetProductSectionsResponse> {
    options?: Omit<
        UseQueryOptions<
            GetProductSectionsResponse,
            HTTPError<ShopByErrorResponse>,
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
            const response = await productSection.getProductSections().json();

            return response;
        },
        staleTime: 1000 * 60 * 60,
        gcTime: 1000 * 60 * 60,
        ...options,
    });
};

export default useProductSectionList;
