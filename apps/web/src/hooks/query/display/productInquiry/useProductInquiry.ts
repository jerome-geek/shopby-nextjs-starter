import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { productInquiry } from '@/api/display';
import { productInquiryKeys } from '@/hooks/queryKeys';
import { GetProductInquiryResponse } from '@/models/display/productInquiry';

interface useProductInquiryParams<T = GetProductInquiryResponse> {
    productNo: number;
    inquiryNo: number;
    options?: Omit<
        UseQueryOptions<
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
}: useProductInquiryParams<T>) => {
    return useQuery({
        queryKey: productInquiryKeys.detail(productNo, inquiryNo),
        queryFn: async () => {
            const { data } = await productInquiry.getProductInquiry(
                productNo,
                inquiryNo,
            );

            return data;
        },
        enabled: inquiryNo !== 0 && productNo !== 0,
        ...options,
    });
};

export default useProductInquiry;
