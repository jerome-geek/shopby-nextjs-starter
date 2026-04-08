import {
    UseSuspenseQueryOptions,
    useSuspenseQuery,
} from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { productInquiry } from '@/api/display';
import { productInquiryKeys } from '@/hooks/queryKeys';
import type { GetProductInquiryResponse } from '@/models/display/productInquiry';

interface UseProductInquiryParams<T = GetProductInquiryResponse> {
    productNo: number;
    inquiryNo: number;
    options?: Omit<
        UseSuspenseQueryOptions<
            GetProductInquiryResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof productInquiryKeys)['detail']>
        >,
        'queryKey' | 'queryFn'
    >;
}

const useProductInquiry = <T = GetProductInquiryResponse>({
    productNo,
    inquiryNo,
    options,
}: UseProductInquiryParams<T>) => {
    return useSuspenseQuery({
        queryKey: productInquiryKeys.detail(productNo, inquiryNo),
        queryFn: async () => {
            const { data } = await productInquiry.getProductInquiry(
                productNo,
                inquiryNo,
            );
            return data;
        },
        ...options,
    });
};

export default useProductInquiry;
