import { queryOptions, type UseQueryOptions } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { collection } from '@/api/shop';
import { collectionKeys } from '@/hooks/queryKeys';
import type { CollectionExposureGroupResponse } from '@/models/shop/collection';

export interface CollectionExposureGroupParams<
    T = CollectionExposureGroupResponse,
> {
    groupId: string;
    options?: Omit<
        UseQueryOptions<
            CollectionExposureGroupResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof collectionKeys)['exposureGroup']>
        >,
        'queryKey' | 'queryFn'
    >;
}

export const collectionExposureGroupOptions = <
    T = CollectionExposureGroupResponse,
>({
    groupId,
    options,
}: CollectionExposureGroupParams<T>) =>
    queryOptions({
        queryKey: collectionKeys.exposureGroup(groupId),
        queryFn: async () => {
            const { data } =
                await collection.getCollectionExposureGroup(groupId);

            return data;
        },
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10,
        ...options,
    });
