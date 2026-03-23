import { isEmpty } from '@fxts/core';
import {
    UseQueryOptions,
    keepPreviousData,
    useQuery,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { productSection } from '@/api/display';
import { productSectionKeys } from '@/hooks/queryKeys';
import { GetProductSectionByIdResponse } from '@/models/display/productSection';

interface UseProductSectionByIdParams<T = GetProductSectionByIdResponse> {
    sectionId: string;
    options?: Omit<
        UseQueryOptions<
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
    return useQuery({
        queryKey: productSectionKeys.detail(sectionId),
        queryFn: async () => {
            const { data } =
                await productSection.getProductSectionById(sectionId);

            return data;
        },
        enabled: !isEmpty(sectionId),
        placeholderData: keepPreviousData,
        ...options,
    });
};

export default useProductSectionById;
