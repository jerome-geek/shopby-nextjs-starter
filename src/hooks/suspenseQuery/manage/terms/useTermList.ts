import {
    UseSuspenseQueryOptions,
    useSuspenseQuery,
} from '@tanstack/react-query';
import { HTTPError } from 'ky';

import { terms } from '@/api/manage';
import { termsKeys } from '@/hooks/queryKeys';
import { GetTermListParams, GetTermListResponse } from '@/models/manage/terms';

interface UseTermListParams<T = GetTermListResponse> {
    searchParams: GetTermListParams;
    options?: Omit<
        UseSuspenseQueryOptions<
            GetTermListResponse,
            HTTPError<ShopByErrorResponse>,
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
    return useSuspenseQuery({
        queryKey: termsKeys.list(searchParams),
        queryFn: async () => {
            const data = await terms.getTermList(searchParams).json();

            return data;
        },
        staleTime: 1000 * 60 * 10,
        gcTime: 1000 * 60 * 10,
        ...options,
    });
};

export default useTermList;
