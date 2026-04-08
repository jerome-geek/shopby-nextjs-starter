import {
    type UseSuspenseQueryOptions,
    useSuspenseQuery,
} from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { productInquiry } from '@/api/display';
import { productInquiryKeys } from '@/hooks/queryKeys';
import type {
    GetProductInquiriesParams,
    GetProductInquiriesResponse,
} from '@/models/display/productInquiry';

interface UseProductInquiryListParams<T = GetProductInquiriesResponse> {
    productNo: number;
    searchParams?: GetProductInquiriesParams;
    options?: Omit<
        UseSuspenseQueryOptions<
            GetProductInquiriesResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof productInquiryKeys)['list']>
        >,
        'queryKey' | 'queryFn'
    >;
}

const useProductInquiryList = <T = GetProductInquiriesResponse>({
    productNo,
    searchParams,
    options,
}: UseProductInquiryListParams<T>) => {
    return useSuspenseQuery({
        queryKey: productInquiryKeys.list(productNo, searchParams),
        queryFn: async () => {
            const { data } = await productInquiry.getProductInquiries(
                productNo,
                searchParams,
            );
            return data;
        },
        ...options,
    });
};

export default useProductInquiryList;
