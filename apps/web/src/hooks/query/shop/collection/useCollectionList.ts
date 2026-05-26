import { useQuery } from '@tanstack/react-query';

import {
    collectionListOptions,
    type UseCollectionListParams,
} from '@/entities/shop/collection/queries';
import type { GetCollectionListResponse } from '@/models/shop/collection';

const useCollectionList = <T = GetCollectionListResponse>(
    params: UseCollectionListParams<T> = {},
) => useQuery(collectionListOptions(params));

export default useCollectionList;
