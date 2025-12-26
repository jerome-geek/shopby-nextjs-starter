import {
    useSuspenseQuery,
    UseSuspenseQueryOptions,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { accumulation } from '@/api/manage';
import accumulationKeys from '@/hooks/queryKeys/accumulationKeys';
import { GetExpectAccumulationResponse } from '@/models/manage/accumulation';

interface UseWaitingAccumulationParams<T = GetExpectAccumulationResponse> {
    memberNo?: number;
    options?: Omit<
        UseSuspenseQueryOptions<
            GetExpectAccumulationResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof accumulationKeys)['waitingDetail']>
        >,
        'queryKey' | 'queryFn'
    >;
}

const useWaitingAccumulation = <T = GetExpectAccumulationResponse>({
    memberNo,
    options,
}: UseWaitingAccumulationParams<T>) => {
    return useSuspenseQuery({
        queryKey: accumulationKeys.waitingDetail(memberNo),
        queryFn: async () => {
            const { data } = await accumulation.getExpectAccumulation();

            return data;
        },
        ...options,
    });
};

export default useWaitingAccumulation;
