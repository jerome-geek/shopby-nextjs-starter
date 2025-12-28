import {
    useSuspenseQuery,
    UseSuspenseQueryOptions,
} from '@tanstack/react-query';
import { HTTPError } from 'ky';

import { mall } from '@/api/admin';
import { GetMallResponse } from '@/models/admin/mall';

interface useMallParams<T = GetMallResponse> {
    options?: Omit<
        UseSuspenseQueryOptions<
            GetMallResponse,
            HTTPError<ShopByErrorResponse>,
            T,
            [string]
        >,
        'queryKey' | 'queryFn'
    >;
}

const useMall = ({ options }: useMallParams = {}) => {
    return useSuspenseQuery({
        queryKey: ['mallInfo'],
        queryFn: async () => {
            const data = await mall.getMall().json();

            return data;
        },
        staleTime: 1000 * 60 * 10,
        gcTime: 1000 * 60 * 10,
        ...options,
    });
};

export default useMall;
