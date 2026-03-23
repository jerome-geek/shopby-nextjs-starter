import { isEmpty } from '@fxts/core';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { productSection } from '@/api/display';
import { productSectionKeys } from '@/hooks/queryKeys';
import { GetProductSectionResponse } from '@/models/display/productSection';

interface UseProductSectionParams<T = GetProductSectionResponse> {
    sectionNo: number;
    options?: Omit<
        UseQueryOptions<
            GetProductSectionResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof productSectionKeys)['detail']>
        >,
        'queryKey' | 'queryFn'
    >;
}

const useProductSection = <T = GetProductSectionResponse>({
    sectionNo,
    options,
}: UseProductSectionParams<T>) => {
    return useQuery({
        queryKey: productSectionKeys.detail(sectionNo),
        queryFn: async () => {
            const { data } = await productSection.getProductSection(sectionNo);

            return data;
        },
        enabled: !isEmpty(sectionNo),
        ...options,
    });
};

export default useProductSection;
