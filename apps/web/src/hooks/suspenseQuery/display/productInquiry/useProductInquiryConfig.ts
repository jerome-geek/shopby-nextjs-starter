import {
    useSuspenseQuery,
    type UseSuspenseQueryOptions,
} from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { productInquiry } from '@/api/display';
import { productInquiryKeys } from '@/hooks/queryKeys';
import type { GetProductInquiryConfigResponse } from '@/models/display/productInquiry';

interface UseProductInquiryConfigParams<T = GetProductInquiryConfigResponse> {
    options?: Omit<
        UseSuspenseQueryOptions<
            GetProductInquiryConfigResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof productInquiryKeys)['config']>
        >,
        'queryKey' | 'queryFn'
    >;
}

const useProductInquiryConfig = <T = GetProductInquiryConfigResponse>({
    options,
}: UseProductInquiryConfigParams<T> = {}) => {
    return useSuspenseQuery({
        queryKey: productInquiryKeys.config(),
        queryFn: async () => {
            const { data } = await productInquiry.getConfig();

            return data;
        },
        staleTime: 60 * 60 * 1000,
        gcTime: 2 * 60 * 60 * 1000,
        ...options,
    });
};

export default useProductInquiryConfig;
