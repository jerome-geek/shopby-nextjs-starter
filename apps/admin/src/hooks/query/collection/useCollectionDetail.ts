import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { collection } from '@/api/collection';
import { collectionKeys } from '@/hooks/queryKeys';
import { GetCollectionResponse } from '@/model/collection';

interface UseCollectionDetailParams<T = GetCollectionResponse> {
    sno: number;
    options?: Omit<
        UseQueryOptions<
            GetCollectionResponse,
            AxiosError,
            T,
            ReturnType<(typeof collectionKeys)['detail']>
        >,
        'queryKey' | 'queryFn'
    >;
}

const useCollectionDetail = <T = GetCollectionResponse>({
    sno,
    options,
}: UseCollectionDetailParams<T>) => {
    return useQuery({
        queryKey: collectionKeys.detail(sno),
        queryFn: async () => {
            const { data } = await collection.getCollection(sno);

            return data;
        },
        ...options,
    });
};

export default useCollectionDetail;
