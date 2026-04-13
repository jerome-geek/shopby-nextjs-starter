import {
    type UseSuspenseQueryOptions,
    useSuspenseQuery,
} from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { productInquiry } from '@/api/display';
import { productInquiryKeys } from '@/hooks/queryKeys';
import type {
    GetMyProductInquiriesParams,
    GetMyProductInquiriesResponse,
} from '@/models/display/productInquiry';

interface useProductInquiryListParams<T = GetMyProductInquiriesResponse> {
    searchParams: GetMyProductInquiriesParams;
    memberNo: number;
    options?: Omit<
        UseSuspenseQueryOptions<
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
    return useSuspenseQuery({
        queryKey: productInquiryKeys.myList(searchParams, memberNo),
        queryFn: async () => {
            const { data } = await productInquiry.getMyProductInquiries({
                ...searchParams,
            });
            return data;
        },
        ...options,
    });
};

export default useMyProductInquiryList;
