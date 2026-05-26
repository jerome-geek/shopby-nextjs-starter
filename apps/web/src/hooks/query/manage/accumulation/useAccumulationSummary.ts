import { useQuery } from '@tanstack/react-query';

import {
    accumulationSummaryOptions,
    type UseAccumulationSummaryParams,
} from '@/entities/manage/accumulation/queries';
import type { GetAccumulationSummaryResponse } from '@/models/manage/accumulation';

const useAccumulationSummary = <T = GetAccumulationSummaryResponse>(
    params: UseAccumulationSummaryParams<T> = {},
) => useQuery(accumulationSummaryOptions(params));

export default useAccumulationSummary;
