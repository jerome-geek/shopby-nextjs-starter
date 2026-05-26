import { useQuery } from '@tanstack/react-query';

import {
    termListV2Options,
    type UseTermListV2Params,
} from '@/entities/manage/terms/queries';
import type { GetTermListResponse } from '@/models/manage/terms';

const useTermListV2 = <T = GetTermListResponse>(
    params: UseTermListV2Params<T>,
) => useQuery(termListV2Options(params));

export default useTermListV2;
