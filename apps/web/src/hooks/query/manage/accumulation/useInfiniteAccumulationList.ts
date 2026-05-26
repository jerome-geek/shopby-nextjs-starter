import { useInfiniteQuery } from '@tanstack/react-query';

import {
    infiniteAccumulationListOptions,
    type UseInfiniteAccumulationListParams,
} from '@/entities/manage/accumulation/queries';

const useInfiniteAccumulationList = (
    params: UseInfiniteAccumulationListParams,
) => useInfiniteQuery(infiniteAccumulationListOptions(params));

export default useInfiniteAccumulationList;
