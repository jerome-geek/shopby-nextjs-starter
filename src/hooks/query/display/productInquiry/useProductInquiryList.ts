import {
    UseQueryOptions,
    keepPreviousData,
    useQuery,
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
        UseQueryOptions<
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
    return useQuery({
        queryKey: productInquiryKeys.list(productNo, searchParams),
        queryFn: async () => {
            const response = await productInquiry
                .getProductInquiries(productNo, searchParams)
                .json();

            return response;
        },
        placeholderData: keepPreviousData,
        ...options,
    });
};

export default useProductInquiryList;
