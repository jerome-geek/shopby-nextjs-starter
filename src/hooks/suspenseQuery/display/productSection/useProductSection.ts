import {
    UseSuspenseQueryOptions,
    useSuspenseQuery,
} from '@tanstack/react-query';
import { HTTPError } from 'ky';

import { productSection } from '@/api/display';
import { productSectionKeys } from '@/hooks/queryKeys';
import { GetProductSectionResponse } from '@/models/display/productSection';

interface UseProductSectionParams<T = GetProductSectionResponse> {
    sectionNo: number;
    options?: Omit<
        UseSuspenseQueryOptions<
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
    return useSuspenseQuery({
        queryKey: productSectionKeys.detail(sectionNo),
        queryFn: async () => {
            const data = await productSection
                .getProductSection(sectionNo)
                .json();

            return data;
        },
        ...options,
    });
};

export default useProductSection;
