import { useQuery } from '@tanstack/react-query';

import {
    publicCollectionSearchOptions,
    type UsePublicCollectionSearchParams,
} from '@/entities/shop/collection/queries';
import type { SearchCollectionsResponse } from '@/models/shop/collection';

const usePublicCollectionSearch = <T = SearchCollectionsResponse>(
    params: UsePublicCollectionSearchParams<T>,
) => useQuery(publicCollectionSearchOptions(params));

export default usePublicCollectionSearch;
