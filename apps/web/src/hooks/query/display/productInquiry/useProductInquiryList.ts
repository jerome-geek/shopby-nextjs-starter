import {
    UseQueryOptions,
    keepPreviousData,
    useQuery,
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
        UseQueryOptions<
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
    return useQuery({
        queryKey: productInquiryKeys.list(productNo, searchParams),
        queryFn: async () => {
            const { data } = await productInquiry.getProductInquiries(
                productNo,
                searchParams,
            );

            return data;
        },
        placeholderData: keepPreviousData,
        ...options,
    });
};

export default useProductInquiryList;
