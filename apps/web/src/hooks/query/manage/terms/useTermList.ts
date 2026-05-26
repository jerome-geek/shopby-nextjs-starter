import { useQuery } from '@tanstack/react-query';

import {
    termListOptions,
    type UseTermListParams,
} from '@/entities/manage/terms/queries';
import type { GetTermListResponse } from '@/models/manage/terms';

const useTermList = <T = GetTermListResponse>(params: UseTermListParams<T>) =>
    useQuery(termListOptions(params));

export default useTermList;
