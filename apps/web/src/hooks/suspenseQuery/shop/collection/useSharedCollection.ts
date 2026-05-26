import { useSuspenseQuery } from '@tanstack/react-query';

import {
    sharedCollectionSuspenseOptions,
    type UseSharedCollectionSuspenseParams,
} from '@/entities/shop/collection/queries';
import type { GetSharedRecipeCollectionResponse } from '@/models/shop/collection';

const useSharedCollection = <T = GetSharedRecipeCollectionResponse>(
    params: UseSharedCollectionSuspenseParams<T>,
) => useSuspenseQuery(sharedCollectionSuspenseOptions(params));

export default useSharedCollection;
