import {
    UseSuspenseQueryOptions,
    useSuspenseQuery,
} from '@tanstack/react-query';
import { HTTPError } from 'ky';

import { productInquiry } from '@/api/display';
import { productInquiryKeys } from '@/hooks/queryKeys';
import {
    GetProductInquiriesParams,
    GetProductInquiriesResponse,
} from '@/models/display/productInquiry';

interface UseProductInquiryListParams<T = GetProductInquiriesResponse> {
    productNo: number;
    searchParams?: GetProductInquiriesParams;
    options?: Omit<
        UseSuspenseQueryOptions<
            GetProductInquiriesResponse,
            HTTPError<ShopByErrorResponse>,
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
            const data = await productInquiry
                .getProductInquiries(productNo, searchParams)
                .json();

            return data;
        },
        ...options,
    });
};

export default useProductInquiryList;
