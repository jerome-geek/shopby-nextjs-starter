import { useQuery } from '@tanstack/react-query';

import {
    sharedCollectionOptions,
    type UseSharedCollectionParams,
} from '@/entities/shop/collection/queries';
import type { GetSharedRecipeCollectionResponse } from '@/models/shop/collection';

const useSharedCollection = <T = GetSharedRecipeCollectionResponse>(
    params: UseSharedCollectionParams<T>,
) => useQuery(sharedCollectionOptions(params));

export default useSharedCollection;
