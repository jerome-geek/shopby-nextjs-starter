import {
    UseSuspenseQueryOptions,
    useSuspenseQuery,
} from '@tanstack/react-query';
import { HTTPError } from 'ky';

import { productSection } from '@/api/display';
import { productSectionKeys } from '@/hooks/queryKeys';
import { GetProductSectionByIdResponse } from '@/models/display/productSection';

interface UseProductSectionByIdParams<T = GetProductSectionByIdResponse> {
    sectionId: string;
    options?: Omit<
        UseSuspenseQueryOptions<
            GetProductSectionByIdResponse,
            HTTPError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof productSectionKeys)['detail']>
        >,
        'queryKey' | 'queryFn'
    >;
}

const useProductSectionById = <T = GetProductSectionByIdResponse>({
    sectionId,
    options,
}: UseProductSectionByIdParams<T>) => {
    return useSuspenseQuery({
        queryKey: productSectionKeys.detail(sectionId),
        queryFn: async () => {
            const data = await productSection
                .getProductSectionById(sectionId)
                .json();

            return data;
        },
        ...options,
    });
};

export default useProductSectionById;
