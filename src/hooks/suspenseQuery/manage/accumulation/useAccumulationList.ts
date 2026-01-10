import {
    useSuspenseQuery,
    UseSuspenseQueryOptions,
} from '@tanstack/react-query';
import { HTTPError } from 'ky';

import { accumulation } from '@/api/manage';
import { accumulationKeys } from '@/hooks/queryKeys';
import {
    GetAccumulationsParams,
    GetAccumulationsResponse,
} from '@/models/manage/accumulation';

interface UseAccumulationListParams<T = GetAccumulationsResponse> {
    memberNo?: number;
    searchParams?: GetAccumulationsParams;
    options?: Omit<
        UseSuspenseQueryOptions<
            GetAccumulationsResponse,
            HTTPError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof accumulationKeys)['list']>
        >,
        'queryKey' | 'queryFn'
    >;
}

const useAccumulationList = <T = GetAccumulationsResponse>({
    memberNo = 0,
    searchParams,
    options,
}: UseAccumulationListParams<T>) => {
    return useSuspenseQuery({
        queryKey: accumulationKeys.list(memberNo, searchParams),
        queryFn: async () => {
            const data = await accumulation
                .getAccumulations(searchParams)
                .json();

            return data;
        },
        ...options,
    });
};

export default useAccumulationList;
