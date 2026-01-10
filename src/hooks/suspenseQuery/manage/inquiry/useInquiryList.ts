import {
    UseSuspenseQueryOptions,
    useSuspenseQuery,
} from '@tanstack/react-query';
import { HTTPError } from 'ky';

import { inquiry } from '@/api/manage';
import { inquiryKeys } from '@/hooks/queryKeys';
import {
    GetInquiriesParams,
    GetInquiriesResponse,
} from '@/models/manage/inquiry';

interface UseInquiryListParams<T = GetInquiriesResponse> {
    searchParams: GetInquiriesParams;
    options?: Omit<
        UseSuspenseQueryOptions<
            GetInquiriesResponse,
            HTTPError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof inquiryKeys)['list']>
        >,
        'queryKey' | 'queryFn'
    >;
}

const useInquiryList = <T = GetInquiriesResponse>({
    searchParams,
    options,
}: UseInquiryListParams<T>) => {
    return useSuspenseQuery({
        queryKey: inquiryKeys.list(searchParams),
        queryFn: async () => {
            const data = await inquiry.getInquiries(searchParams).json();

            return data;
        },
        ...options,
    });
};

export default useInquiryList;
