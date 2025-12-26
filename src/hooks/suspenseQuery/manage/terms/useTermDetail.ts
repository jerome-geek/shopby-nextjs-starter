import {
    useSuspenseQuery,
    UseSuspenseQueryOptions,
} from '@tanstack/react-query';
import { HTTPError } from 'ky';

import { terms } from '@/api/manage';
import { termsKeys } from '@/hooks/queryKeys';
import { GetTermDetailByPostResponse } from '@/models/manage/terms';

interface UseTermDetailParams<T = GetTermDetailByPostResponse> {
    termsNo: number;
    options?: Omit<
        UseSuspenseQueryOptions<
            GetTermDetailByPostResponse,
            HTTPError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof termsKeys)['detail']>
        >,
        'queryKey' | 'queryFn'
    >;
}

const useTermDetail = <T = GetTermDetailByPostResponse>({
    termsNo,
    options,
}: UseTermDetailParams<T>) => {
    return useSuspenseQuery({
        queryKey: termsKeys.detail(termsNo),
        queryFn: async () => {
            const data = await terms.getTermDetail(termsNo).json();

            return data;
        },
        staleTime: 1000 * 60 * 10,
        gcTime: 1000 * 60 * 10,
        ...options,
    });
};

export default useTermDetail;
