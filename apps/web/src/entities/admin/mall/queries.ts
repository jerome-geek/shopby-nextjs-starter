import { queryOptions, type UseQueryOptions } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { mall } from '@/api/admin';
import { mallKeys } from '@/hooks/queryKeys';
import type { GetMallResponse } from '@/models/admin/mall';

export interface MallOptionsParams<T = GetMallResponse> {
    options?: Omit<
        UseQueryOptions<
            GetMallResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            typeof mallKeys.all
        >,
        'queryKey' | 'queryFn'
    >;
}

export const mallOptions = <T = GetMallResponse>({
    options,
}: MallOptionsParams<T> = {}) => {
    return queryOptions({
        queryKey: mallKeys.all,
        queryFn: async () => {
            const { data } = await mall.getMall();
            return data;
        },
        staleTime: 1000 * 60 * 10,
        gcTime: 1000 * 60 * 10,
        ...options,
    });
};
