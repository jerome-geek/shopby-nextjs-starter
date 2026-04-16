import {
    UseQueryOptions,
    keepPreviousData,
    useQuery,
} from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { collection } from '@/api/collection';
import { collectionKeys } from '@/hooks/queryKeys';
import {
    CollectionExposureGroupResponse,
    GetCollectionExposureGroupsParams,
} from '@/model/collection';

interface UseCollectionExposureGroupListParams<
    T = CollectionExposureGroupResponse,
> {
    params: GetCollectionExposureGroupsParams;
    options?: Omit<
        UseQueryOptions<
            CollectionExposureGroupResponse,
            AxiosError,
            T,
            ReturnType<(typeof collectionKeys)['groupList']>
        >,
        'queryKey' | 'queryFn'
    >;
}

const useCollectionExposureGroupList = <T = CollectionExposureGroupResponse>({
    params,
    options,
}: UseCollectionExposureGroupListParams<T>) => {
    return useQuery({
        queryKey: collectionKeys.groupList(params),
        queryFn: async () => {
            const { data } = await collection.getCollectionExposureGroups(
                params,
            );

            return data;
        },
        placeholderData: keepPreviousData,
        ...options,
    });
};

export default useCollectionExposureGroupList;
