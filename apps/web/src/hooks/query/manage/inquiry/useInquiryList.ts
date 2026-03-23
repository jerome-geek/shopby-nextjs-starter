import {
    UseQueryOptions,
    keepPreviousData,
    useQuery,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { inquiry } from '@/api/manage';
import { inquiryKeys } from '@/hooks/queryKeys';
import {
    GetInquiriesParams,
    GetInquiriesResponse,
} from '@/models/manage/inquiry';

interface UseInquiryListParams<T = GetInquiriesResponse> {
    searchParams: GetInquiriesParams;
    options?: Omit<
        UseQueryOptions<
            GetInquiriesResponse,
            AxiosError<ShopByErrorResponse>,
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
    return useQuery({
        queryKey: inquiryKeys.list(searchParams),
        queryFn: async () => {
            const { data } = await inquiry.getInquiries(searchParams);

            return data;
        },
        placeholderData: keepPreviousData,
        ...options,
    });
};

export default useInquiryList;
