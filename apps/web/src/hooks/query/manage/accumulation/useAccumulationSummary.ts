import {
    keepPreviousData,
    useQuery,
    UseQueryOptions,
} from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { accumulation } from '@/api/manage';
import accumulationKeys from '@/hooks/queryKeys/accumulationKeys';
import {
    GetAccumulationSummaryParams,
    GetAccumulationSummaryResponse,
} from '@/models/manage/accumulation';

interface UseAccumulationSummaryParams<T = GetAccumulationSummaryResponse> {
    searchParams?: GetAccumulationSummaryParams;
    options?: Omit<
        UseQueryOptions<
            GetAccumulationSummaryResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof accumulationKeys)['summaryDetail']>
        >,
        'queryKey' | 'queryFn'
    >;
}

const useAccumulationSummary = <T = GetAccumulationSummaryResponse>({
    searchParams,
    options,
}: UseAccumulationSummaryParams<T> = {}) => {
    return useQuery({
        queryKey: accumulationKeys.summaryDetail(searchParams),
        queryFn: async () => {
            const { data } =
                await accumulation.getAccumulationSummary(searchParams);

            return data;
        },
        placeholderData: keepPreviousData,
        ...options,
    });
};

export default useAccumulationSummary;
