import { useQuery } from '@tanstack/react-query';

import {
    termHistoryOptions,
    type UseTermHistoryParams,
} from '@/entities/manage/terms/queries';
import type { GetTermsHistoryResponse } from '@/models/manage/terms';

const useTermHistory = <T = GetTermsHistoryResponse>(
    params: UseTermHistoryParams<T>,
) => useQuery(termHistoryOptions(params));

export default useTermHistory;
