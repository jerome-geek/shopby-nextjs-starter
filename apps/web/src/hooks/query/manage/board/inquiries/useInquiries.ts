import {
    UseQueryOptions,
    keepPreviousData,
    useQuery,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { inquiry } from '@/api/manage';
import {
    GetInquiriesParams,
    GetInquiriesResponse,
} from '@/models/manage/inquiry';

interface UseInquiriesParams<T = GetInquiriesResponse> {
    searchParams: GetInquiriesParams;
    options?: Omit<
        UseQueryOptions<
            GetInquiriesResponse,
            AxiosError,
            T,
            [
                string,
                {
                    searchParams: GetInquiriesParams;
                },
            ]
        >,
        'queryKey'
    >;
}

const useInquiries = <T = GetInquiriesResponse>({
    searchParams,
    options,
}: UseInquiriesParams<T>) => {
    return useQuery({
        queryKey: ['inquiry', { searchParams }],
        queryFn: async () => {
            const { data } = await inquiry.getInquiries({
                ...searchParams,
            });

            return data;
        },
        placeholderData: keepPreviousData,
        ...options,
    });
};

export default useInquiries;
