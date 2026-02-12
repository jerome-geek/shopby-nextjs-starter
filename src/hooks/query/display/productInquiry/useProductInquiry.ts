import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { HTTPError } from 'ky';

import { productInquiry } from '@/api/display';
import { productInquiryKeys } from '@/hooks/queryKeys';
import { GetProductInquiryResponse } from '@/models/display/productInquiry';

interface useProductInquiryParams<T = GetProductInquiryResponse> {
    productNo: number;
    inquiryNo: number;
    options?: Omit<
        UseQueryOptions<
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
}: useProductInquiryParams<T>) => {
    return useQuery({
        queryKey: productInquiryKeys.detail(productNo, inquiryNo),
        queryFn: async () => {
            const response = await productInquiry
                .getProductInquiry(productNo, inquiryNo)
                .json();

            return response;
        },
        enabled: inquiryNo !== 0 && productNo !== 0,
        ...options,
    });
};

export default useProductInquiry;
