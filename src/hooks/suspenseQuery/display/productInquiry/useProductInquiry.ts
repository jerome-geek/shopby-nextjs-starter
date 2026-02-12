import {
    UseSuspenseQueryOptions,
    useSuspenseQuery,
} from '@tanstack/react-query';
import { HTTPError } from 'ky';

import { productInquiry } from '@/api/display';
import { productInquiryKeys } from '@/hooks/queryKeys';
import { GetProductInquiryResponse } from '@/models/display/productInquiry';

interface UseProductInquiryParams<T = GetProductInquiryResponse> {
    productNo: number;
    inquiryNo: number;
    options?: Omit<
        UseSuspenseQueryOptions<
            GetProductInquiryResponse,
            HTTPError<ShopByErrorResponse>,
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
            const data = await productInquiry
                .getProductInquiry(productNo, inquiryNo)
                .json();

            return data;
        },
        ...options,
    });
};

export default useProductInquiry;
