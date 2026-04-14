import {
    useSuspenseQuery,
    type UseSuspenseQueryOptions,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { collection } from '@/api/shop';
import { collectionKeys } from '@/hooks/queryKeys';
import type { CollectionExposureGroupResponse } from '@/models/shop/collection';

interface UseCollectionExposureGroupParams<
    T = CollectionExposureGroupResponse,
> {
    groupId: string;
    options?: Omit<
        UseSuspenseQueryOptions<
            CollectionExposureGroupResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof collectionKeys)['exposureGroup']>
        >,
        'queryKey' | 'queryFn'
    >;
}

const useCollectionExposureGroup = <T = CollectionExposureGroupResponse>({
    groupId,
    options,
}: UseCollectionExposureGroupParams<T>) => {
    return useSuspenseQuery({
        queryKey: collectionKeys.exposureGroup(groupId),
        queryFn: async () => {
            const { data } = await collection.getCollectionExposureGroup(
                groupId,
            );

            return data;
        },
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10,
        ...options,
    });
};

export default useCollectionExposureGroup;
