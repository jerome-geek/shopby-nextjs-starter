import { isEmpty } from '@fxts/core';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { HTTPError } from 'ky';

import { productSection } from '@/api/display';
import { productSectionKeys } from '@/hooks/queryKeys';
import { GetProductSectionResponse } from '@/models/display/productSection';

interface UseProductSectionParams<T = GetProductSectionResponse> {
    sectionNo: number;
    options?: Omit<
        UseQueryOptions<
            GetProductSectionResponse,
            HTTPError<ShopByErrorResponse>,
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
            const response = await productSection
                .getProductSection(sectionNo)
                .json();

            return response;
        },
        enabled: !isEmpty(sectionNo),
        ...options,
    });
};

export default useProductSection;
