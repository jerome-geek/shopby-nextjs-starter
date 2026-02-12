import {
    UseSuspenseQueryOptions,
    useSuspenseQuery,
} from '@tanstack/react-query';
import { HTTPError } from 'ky';

import { productSection } from '@/api/display';
import { productSectionKeys } from '@/hooks/queryKeys';
import { GetProductSectionsResponse } from '@/models/display/productSection';

interface UseProductSectionListParams<T = GetProductSectionsResponse> {
    options?: Omit<
        UseSuspenseQueryOptions<
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
    return useSuspenseQuery({
        queryKey: productSectionKeys.lists(),
        queryFn: async () => {
            const data = await productSection.getProductSections().json();

            return data;
        },
        staleTime: 1000 * 60 * 60,
        gcTime: 1000 * 60 * 60,
        ...options,
    });
};

export default useProductSectionList;
