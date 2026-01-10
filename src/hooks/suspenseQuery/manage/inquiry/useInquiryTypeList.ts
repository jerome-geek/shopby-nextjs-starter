import {
    useSuspenseQuery,
    UseSuspenseQueryOptions,
} from '@tanstack/react-query';
import { HTTPError } from 'ky';

import { inquiry } from '@/api/manage';
import { inquiryKeys } from '@/hooks/queryKeys';
import {
    GetInquiryTypesParams,
    GetInquiryTypesResponse,
} from '@/models/manage/inquiry';

interface UseInquiryTypeListParams<T = GetInquiryTypesResponse> {
    searchParams?: GetInquiryTypesParams;
    options?: Omit<
        UseSuspenseQueryOptions<
            GetInquiryTypesResponse,
            HTTPError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof inquiryKeys)['types']>
        >,
        'queryKey' | 'queryFn'
    >;
}

const useInquiryTypeList = <T = GetInquiryTypesResponse>({
    searchParams,
    options,
}: UseInquiryTypeListParams<T> = {}) => {
    return useSuspenseQuery({
        queryKey: inquiryKeys.types(searchParams),
        queryFn: async () => {
            const data = await inquiry.getInquiryTypes(searchParams).json();

            return data;
        },
        ...options,
    });
};

export default useInquiryTypeList;
