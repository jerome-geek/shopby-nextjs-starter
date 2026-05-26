import { useSuspenseQuery } from '@tanstack/react-query';

import {
    collectionListSuspenseOptions,
    type UseCollectionListSuspenseParams,
} from '@/entities/shop/collection/queries';
import type { GetCollectionListResponse } from '@/models/shop/collection';

const useCollectionList = <T = GetCollectionListResponse>(
    params: UseCollectionListSuspenseParams<T> = {},
) => useSuspenseQuery(collectionListSuspenseOptions(params));

export default useCollectionList;
