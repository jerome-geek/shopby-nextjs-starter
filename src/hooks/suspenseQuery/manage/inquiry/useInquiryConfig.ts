import {
    useSuspenseQuery,
    UseSuspenseQueryOptions,
} from '@tanstack/react-query';
import { HTTPError } from 'ky';

import { inquiry } from '@/api/manage';
import { inquiryKeys } from '@/hooks/queryKeys';
import { GetInquiryConfigResponse } from '@/models/manage/inquiry';

interface UseInquiryConfigParams<T = GetInquiryConfigResponse> {
    options?: Omit<
        UseSuspenseQueryOptions<
            GetInquiryConfigResponse,
            HTTPError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof inquiryKeys)['config']>
        >,
        'queryKey' | 'queryFn'
    >;
}

const useInquiryConfig = <T = GetInquiryConfigResponse>({
    options,
}: UseInquiryConfigParams<T> = {}) => {
    return useSuspenseQuery({
        queryKey: inquiryKeys.config(),
        queryFn: async () => {
            const data = await inquiry.getInquiryConfig().json();

            return data;
        },
        staleTime: 60 * 60 * 1000,
        gcTime: 2 * 60 * 60 * 1000,
        ...options,
    });
};

export default useInquiryConfig;
