import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { inquiry } from '@/api/manage';
import { inquiryKeys } from '@/hooks/queryKeys';
import { GetInquiryConfigResponse } from '@/models/manage/inquiry';

interface UseInquiryConfigParams<T = GetInquiryConfigResponse> {
    options?: Omit<
        UseQueryOptions<
            GetInquiryConfigResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof inquiryKeys)['config']>
        >,
        'queryKey' | 'queryFn'
    >;
}

const useInquiryConfig = <T = GetInquiryConfigResponse>({
    options,
}: UseInquiryConfigParams<T> = {}) => {
    return useQuery({
        queryKey: inquiryKeys.config(),
        queryFn: async () => {
            const { data } = await inquiry.getInquiryConfig();

            return data;
        },
        staleTime: 60 * 60 * 1000,
        gcTime: 2 * 60 * 60 * 1000,
        ...options,
    });
};

export default useInquiryConfig;
