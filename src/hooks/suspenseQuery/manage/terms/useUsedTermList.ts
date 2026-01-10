import {
    useSuspenseQuery,
    UseSuspenseQueryOptions,
} from '@tanstack/react-query';
import { HTTPError } from 'ky';

import { terms } from '@/api/manage';
import { termsKeys } from '@/hooks/queryKeys';
import {
    GetUsedTermsParams,
    GetUsedTermsResponse,
} from '@/models/manage/terms';

interface UseUsedTermListParams<T = GetUsedTermsResponse> {
    searchParams: GetUsedTermsParams;
    options?: Omit<
        UseSuspenseQueryOptions<
            GetUsedTermsResponse,
            HTTPError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof termsKeys)['usedTerm']>
        >,
        'queryKey' | 'queryFn'
    >;
}

const useUsedTermList = <T = GetUsedTermsResponse>({
    searchParams,
    options,
}: UseUsedTermListParams<T>) => {
    return useSuspenseQuery({
        queryKey: termsKeys.usedTerm(searchParams),
        queryFn: async () => {
            const data = await terms.getUsedTerms(searchParams).json();

            return data;
        },
        ...options,
    });
};

export default useUsedTermList;
