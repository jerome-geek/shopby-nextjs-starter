import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { terms } from '@/api/manage';
import { termsKeys } from '@/hooks/queryKeys';
import { GetTermListParams, GetTermListResponse } from '@/models/manage/terms';

interface UseTermListParams<T = GetTermListResponse> {
    searchParams: GetTermListParams;
    options?: Omit<
        UseQueryOptions<
            GetTermListResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof termsKeys)['list']>
        >,
        'queryKey' | 'queryFn'
    >;
}

const useTermList = <T = GetTermListResponse>({
    searchParams,
    options,
}: UseTermListParams<T>) => {
    return useQuery({
        queryKey: termsKeys.list(searchParams),
        queryFn: async () => {
            const { data } = await terms.getTermList(searchParams);

            return data;
        },
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10,
        ...options,
    });
};

export default useTermList;
