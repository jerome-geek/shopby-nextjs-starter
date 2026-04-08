import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { terms } from '@/api/manage';
import { termsKeys } from '@/hooks/queryKeys';
import type { GetTermDetailByPostResponse } from '@/models/manage/terms';

interface UseTermDetailParams<T = GetTermDetailByPostResponse> {
    termsNo: number;
    options?: Omit<
        UseQueryOptions<
            GetTermDetailByPostResponse,
            AxiosError<ShopByErrorResponse>,
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
    return useQuery({
        queryKey: termsKeys.detail(termsNo),
        queryFn: async () => {
            const { data } = await terms.getTermDetail(termsNo);

            return data;
        },
        ...options,
    });
};

export default useTermDetail;
