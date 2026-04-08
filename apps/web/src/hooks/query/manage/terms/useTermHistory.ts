import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { terms } from '@/api/manage';
import { termsKeys } from '@/hooks/queryKeys';
import {
    GetTermHistoryParams,
    GetTermsHistoryResponse,
} from '@/models/manage/terms';

interface UseTermHistoryParams<T = GetTermsHistoryResponse> {
    searchParams: GetTermHistoryParams;
    options?: Omit<
        UseQueryOptions<
            GetTermsHistoryResponse,
            AxiosError<ShopByErrorResponse>,
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
    return useQuery({
        queryKey: termsKeys.history(searchParams),
        queryFn: async () => {
            const { data } = await terms.getTermHistory(searchParams);

            return data;
        },
        ...options,
    });
};

export default useTermHistory;
