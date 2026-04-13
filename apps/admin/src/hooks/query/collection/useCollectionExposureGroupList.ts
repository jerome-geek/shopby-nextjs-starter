import {
    UseQueryOptions,
    keepPreviousData,
    useQuery,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';

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
            ReturnType<(typeof collectionKeys)['list']>
        >,
        'queryKey' | 'queryFn'
    >;
}

const useCollectionExposureGroupList = <T = CollectionExposureGroupResponse>({
    params,
    options,
}: UseCollectionExposureGroupListParams<T>) => {
    return useQuery({
        queryKey: collectionKeys.list(params),
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
