import {
    UseQueryOptions,
    keepPreviousData,
    useQuery,
} from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { productInquiry } from '@/api/display';
import type {
    GetMyProductInquiriesParams,
    GetMyProductInquiriesResponse,
} from '@/models/display/productInquiry';
import { productInquiryKeys } from '@/hooks/queryKeys';

interface useProductInquiryListParams<T = GetMyProductInquiriesResponse> {
    searchParams: GetMyProductInquiriesParams;
    memberNo: number;
    options?: Omit<
        UseQueryOptions<
            GetMyProductInquiriesResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof productInquiryKeys)['myList']>
        >,
        'queryKey' | 'queryFn'
    >;
}

const useMyProductInquiryList = <T = GetMyProductInquiriesResponse>({
    searchParams,
    memberNo,
    options,
}: useProductInquiryListParams<T>) => {
    return useQuery({
        queryKey: productInquiryKeys.myList(searchParams, memberNo),
        queryFn: async () => {
            const { data } =
                await productInquiry.getMyProductInquiries(searchParams);

            return data;
        },
        placeholderData: keepPreviousData,
        enabled: memberNo !== 0,
        ...options,
    });
};

export default useMyProductInquiryList;
