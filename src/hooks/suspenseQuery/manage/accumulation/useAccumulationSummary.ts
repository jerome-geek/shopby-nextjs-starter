import {
    useSuspenseQuery,
    UseSuspenseQueryOptions,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { accumulation } from '@/api/manage';
import accumulationKeys from '@/hooks/queryKeys/accumulationKeys';
import {
    GetAccumulationSummaryParams,
    GetAccumulationSummaryResponse,
} from '@/models/manage/accumulation';

interface UseAccumulationSummaryParams<T = GetAccumulationSummaryResponse> {
    memberNo?: number;
    searchParams?: GetAccumulationSummaryParams;
    options?: Omit<
        UseSuspenseQueryOptions<
            GetAccumulationSummaryResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof accumulationKeys)['summaryDetail']>
        >,
        'queryKey' | 'queryFn'
    >;
}

const useAccumulationSummary = <T = GetAccumulationSummaryResponse>({
    memberNo = 0,
    searchParams,
    options,
}: UseAccumulationSummaryParams<T>) => {
    return useSuspenseQuery({
        queryKey: accumulationKeys.summaryDetail(memberNo, searchParams),
        queryFn: async () => {
            const { data } = await accumulation.getAccumulationSummary(
                searchParams,
            );

            return data;
        },
        ...options,
    });
};

export default useAccumulationSummary;
