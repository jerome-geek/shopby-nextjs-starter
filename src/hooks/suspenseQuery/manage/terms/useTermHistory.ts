import {
    useSuspenseQuery,
    UseSuspenseQueryOptions,
} from '@tanstack/react-query';
import { HTTPError } from 'ky';

import { terms } from '@/api/manage';
import { termsKeys } from '@/hooks/queryKeys';
import {
    GetTermHistoryParams,
    GetTermsHistoryResponse,
} from '@/models/manage/terms';

interface UseTermHistoryParams<T = GetTermsHistoryResponse> {
    searchParams: GetTermHistoryParams;
    options?: Omit<
        UseSuspenseQueryOptions<
            GetTermsHistoryResponse,
            HTTPError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof termsKeys)['history']>
        >,
        'queryKey' | 'queryFn'
    >;
}

const useTermHistory = <T = GetTermsHistoryResponse>({
    searchParams,
    options,
}: UseTermHistoryParams<T>) => {
    return useSuspenseQuery({
        queryKey: termsKeys.history(searchParams),
        queryFn: async () => {
            const data = await terms.getTermHistory(searchParams).json();

            return data;
        },
        staleTime: 1000 * 60 * 10,
        gcTime: 1000 * 60 * 10,
        ...options,
    });
};

export default useTermHistory;
