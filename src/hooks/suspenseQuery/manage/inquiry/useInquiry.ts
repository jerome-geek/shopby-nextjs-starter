import {
    UseSuspenseQueryOptions,
    useSuspenseQuery,
} from '@tanstack/react-query';
import { HTTPError } from 'ky';

import { inquiry } from '@/api/manage';
import { inquiryKeys } from '@/hooks/queryKeys';
import { GetInquiryResponse } from '@/models/manage/inquiry';

interface UseInquiryParams<T = GetInquiryResponse> {
    inquiryNo: number;
    options?: Omit<
        UseSuspenseQueryOptions<
            GetInquiryResponse,
            HTTPError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof inquiryKeys)['detail']>
        >,
        'queryKey' | 'queryFn'
    >;
}

const useInquiry = <T = GetInquiryResponse>({
    inquiryNo,
    options,
}: UseInquiryParams<T>) => {
    return useSuspenseQuery({
        queryKey: inquiryKeys.detail(inquiryNo),
        queryFn: async () => {
            const data = await inquiry.getInquiry(inquiryNo).json();

            return data;
        },
        ...options,
    });
};

export default useInquiry;
