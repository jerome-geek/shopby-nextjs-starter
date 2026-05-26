import { useQuery } from '@tanstack/react-query';

import {
    expirationAccumulationListOptions,
    type UseExpirationAccumulationListParams,
} from '@/entities/manage/accumulation/queries';
import type { GetExpirationAccumulationListResponse } from '@/models/manage/accumulation';

const useExpirationAccumulationList = <
    T = GetExpirationAccumulationListResponse,
>(
    params: UseExpirationAccumulationListParams<T>,
) => useQuery(expirationAccumulationListOptions(params));

export default useExpirationAccumulationList;
