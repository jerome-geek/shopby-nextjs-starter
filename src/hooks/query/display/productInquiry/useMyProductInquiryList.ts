import {
    UseQueryOptions,
    keepPreviousData,
    useQuery,
} from '@tanstack/react-query';
import { HTTPError } from 'ky';

import { productInquiry } from '@/api/display';
import {
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
    return useQuery({
        queryKey: productInquiryKeys.myList(searchParams, memberNo),
        queryFn: async () => {
            const response = await productInquiry
                .getMyProductInquiries({
                    ...searchParams,
                })
                .json();

            return response;
        },
        placeholderData: keepPreviousData,
        enabled: memberNo !== 0,
        ...options,
    });
};

export default useMyProductInquiryList;
