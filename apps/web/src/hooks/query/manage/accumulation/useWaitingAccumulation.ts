import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { accumulation } from '@/api/manage';
import accumulationKeys from '@/hooks/queryKeys/accumulationKeys';
import { GetExpectAccumulationResponse } from '@/models/manage/accumulation';

interface UseWaitingAccumulationParams<T = GetExpectAccumulationResponse> {
    options?: Omit<
        UseQueryOptions<
            GetExpectAccumulationResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof accumulationKeys)['waitingDetail']>
        >,
        'queryKey' | 'queryFn'
    >;
}

const useWaitingAccumulation = <T = GetExpectAccumulationResponse>({
    options,
}: UseWaitingAccumulationParams<T>) => {
    return useQuery({
        queryKey: accumulationKeys.waitingDetail(),
        queryFn: async () => {
            const { data } = await accumulation.getExpectAccumulation();

            return data;
        },
        ...options,
    });
};

export default useWaitingAccumulation;
