import { useQuery } from '@tanstack/react-query';

import {
    waitingAccumulationOptions,
    type UseWaitingAccumulationParams,
} from '@/entities/manage/accumulation/queries';
import type { GetExpectAccumulationResponse } from '@/models/manage/accumulation';

const useWaitingAccumulation = <T = GetExpectAccumulationResponse>(
    params: UseWaitingAccumulationParams<T> = {},
) => useQuery(waitingAccumulationOptions(params));

export default useWaitingAccumulation;
