import {
    UseSuspenseQueryOptions,
    useSuspenseQuery,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { collection } from '@/api/collection';
import { collectionKeys } from '@/hooks/queryKeys';
import { CollectionExposureGroupDetailResponse } from '@/model/collection';

interface UseCollectionExposureGroupDetailParams<
    T = CollectionExposureGroupDetailResponse,
> {
    groupSno: number;
    options?: Omit<
        UseSuspenseQueryOptions<
            CollectionExposureGroupDetailResponse,
            AxiosError,
            T,
            ReturnType<(typeof collectionKeys)['groupDetail']>
        >,
        'queryKey' | 'queryFn'
    >;
}

const useCollectionExposureGroupDetail = <
    T = CollectionExposureGroupDetailResponse,
>({
    groupSno,
    options,
}: UseCollectionExposureGroupDetailParams<T>) => {
    return useSuspenseQuery({
        queryKey: collectionKeys.groupDetail(groupSno),
        queryFn: async () => {
            const { data } = await collection.getCollectionExposureGroup(
                groupSno,
            );

            return data;
        },
        ...options,
    });
};

export default useCollectionExposureGroupDetail;
