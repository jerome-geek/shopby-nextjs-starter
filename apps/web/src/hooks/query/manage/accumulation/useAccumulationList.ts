import {
    keepPreviousData,
    useQuery,
    UseQueryOptions,
} from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { accumulation } from '@/api/manage';
import accumulationKeys from '@/hooks/queryKeys/accumulationKeys';
import type {
    GetAccumulationsParams,
    GetAccumulationsResponse,
} from '@/models/manage/accumulation';

interface UseAccumulationListParams<T = GetAccumulationsResponse> {
    searchParams?: GetAccumulationsParams;
    options?: Omit<
        UseQueryOptions<
            GetAccumulationsResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof accumulationKeys)['list']>
        >,
        'queryKey' | 'queryFn'
    >;
}

const useAccumulationList = <T = GetAccumulationsResponse>({
    searchParams,
    options,
}: UseAccumulationListParams<T>) => {
    return useQuery({
        queryKey: accumulationKeys.list(searchParams),
        queryFn: async () => {
            const { data } = await accumulation.getAccumulations(searchParams);

            return data;
        },
        placeholderData: keepPreviousData,
        ...options,
        enabled: options?.enabled ?? true,
    });
};

export default useAccumulationList;
