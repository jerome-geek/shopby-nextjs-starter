import { useSuspenseQuery } from '@tanstack/react-query';

import {
    collectionExposureGroupOptions,
    type CollectionExposureGroupParams,
} from '@/entities/shop/collection/queries';
import type { CollectionExposureGroupResponse } from '@/models/shop/collection';

const useCollectionExposureGroup = <T = CollectionExposureGroupResponse>(
    params: CollectionExposureGroupParams<T>,
) => {
    return useSuspenseQuery(collectionExposureGroupOptions(params));
};

export default useCollectionExposureGroup;
