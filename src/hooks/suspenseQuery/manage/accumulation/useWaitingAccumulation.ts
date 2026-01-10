import {
    useSuspenseQuery,
    UseSuspenseQueryOptions,
} from '@tanstack/react-query';
import { HTTPError } from 'ky';

import { accumulation } from '@/api/manage';
import { accumulationKeys } from '@/hooks/queryKeys';
import { GetExpectAccumulationResponse } from '@/models/manage/accumulation';

interface UseWaitingAccumulationParams<T = GetExpectAccumulationResponse> {
    memberNo?: number;
    options?: Omit<
        UseSuspenseQueryOptions<
            GetExpectAccumulationResponse,
            HTTPError<ShopByErrorResponse>,
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
            const data = await accumulation.getExpectAccumulation().json();

            return data;
        },
        ...options,
    });
};

export default useWaitingAccumulation;
