import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import limitKeys from '@/hooks/queryKeys/limitKeys';
import { limit } from '@/api/limit';
import { ExceptionsResponse } from '@/model/limit';

interface UseExceptionListParams<T = ExceptionsResponse> {
    options?: Omit<
        UseQueryOptions<
            ExceptionsResponse,
            AxiosError,
            T,
            ReturnType<(typeof limitKeys)['exceptionLists']>
        >,
        'queryKey' | 'queryFn'
    >;
}

const useExceptionList = <T = ExceptionsResponse>({
    options,
}: UseExceptionListParams<T> = {}) => {
    return useQuery({
        queryKey: limitKeys.exceptionLists(),
        queryFn: async () => {
            const { data } = await limit.getExceptionList();

            return data;
        },
        ...options,
    });
};

export default useExceptionList;
