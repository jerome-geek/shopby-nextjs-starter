import {
    type UseSuspenseQueryOptions,
    useSuspenseQuery,
} from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { productSection } from '@/api/display';
import { productSectionKeys } from '@/hooks/queryKeys';
import type { GetProductSectionByIdResponse } from '@/models/display/productSection';

interface UseProductSectionByIdParams<T = GetProductSectionByIdResponse> {
    sectionId: string;
    options?: Omit<
        UseSuspenseQueryOptions<
            GetProductSectionByIdResponse,
            AxiosError<ShopByErrorResponse>,
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
            const { data } =
                await productSection.getProductSectionById(sectionId);

            return data;
        },
        ...options,
    });
};

export default useProductSectionById;
