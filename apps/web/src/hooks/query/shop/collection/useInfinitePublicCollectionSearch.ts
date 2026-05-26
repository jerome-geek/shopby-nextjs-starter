import { useInfiniteQuery } from '@tanstack/react-query';

import {
    infinitePublicCollectionSearchOptions,
    type UseInfinitePublicCollectionSearchParams,
} from '@/entities/shop/collection/queries';

const useInfinitePublicCollectionSearch = (
    params: UseInfinitePublicCollectionSearchParams,
) => useInfiniteQuery(infinitePublicCollectionSearchOptions(params));

export default useInfinitePublicCollectionSearch;
