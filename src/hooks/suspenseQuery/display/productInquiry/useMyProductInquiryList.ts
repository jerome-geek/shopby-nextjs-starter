import {
    UseSuspenseQueryOptions,
    useSuspenseQuery,
} from '@tanstack/react-query';
import { HTTPError } from 'ky';

import { productInquiry } from '@/api/display';
import { productInquiryKeys } from '@/hooks/queryKeys';
import {
    GetMyProductInquiriesParams,
    GetMyProductInquiriesResponse,
} from '@/models/display/productInquiry';

interface useProductInquiryListParams<T = GetMyProductInquiriesResponse> {
    searchParams: GetMyProductInquiriesParams;
    memberNo: number;
    options?: Omit<
        UseSuspenseQueryOptions<
            GetMyProductInquiriesResponse,
            HTTPError<ShopByErrorResponse>,
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
            const data = await productInquiry
                .getMyProductInquiries({
                    ...searchParams,
                })
                .json();

            return data;
        },
        ...options,
    });
};

export default useMyProductInquiryList;
