import { useQuery } from '@tanstack/react-query';

import {
    accumulationListOptions,
    type UseAccumulationListParams,
} from '@/entities/manage/accumulation/queries';
import type { GetAccumulationsResponse } from '@/models/manage/accumulation';

const useAccumulationList = <T = GetAccumulationsResponse>(
    params: UseAccumulationListParams<T>,
) => useQuery(accumulationListOptions(params));

export default useAccumulationList;
