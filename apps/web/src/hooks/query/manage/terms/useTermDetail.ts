import { useQuery } from '@tanstack/react-query';

import {
    termDetailOptions,
    type UseTermDetailParams,
} from '@/entities/manage/terms/queries';
import type { GetTermDetailByPostResponse } from '@/models/manage/terms';

const useTermDetail = <T = GetTermDetailByPostResponse>(
    params: UseTermDetailParams<T>,
) => useQuery(termDetailOptions(params));

export default useTermDetail;
