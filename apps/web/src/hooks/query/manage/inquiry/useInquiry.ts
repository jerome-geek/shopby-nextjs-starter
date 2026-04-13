import { type UseQueryOptions, useQuery } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { inquiry } from '@/api/manage';
import { inquiryKeys } from '@/hooks/queryKeys';
import type { GetInquiryResponse } from '@/models/manage/inquiry';

interface UseInquiryParams<T = GetInquiryResponse> {
    inquiryNo: number;
    options?: Omit<
        UseQueryOptions<
            GetInquiryResponse,
            AxiosError<ShopByErrorResponse>,
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
    return useQuery({
        queryKey: inquiryKeys.detail(inquiryNo),
        queryFn: async () => {
            const { data } = await inquiry.getInquiry(inquiryNo);

            return data;
        },
        enabled: !!inquiryNo,
        ...options,
    });
};

export default useInquiry;
