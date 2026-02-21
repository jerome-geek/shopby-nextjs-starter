import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { mall } from '@/api/admin';
import { GetMallResponse } from '@/models/admin/mall';

interface useMallParams<T = GetMallResponse> {
    options?: Omit<
        UseQueryOptions<
            GetMallResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            [string]
        >,
        'queryKey' | 'queryFn'
    >;
}

const useMall = ({ options }: useMallParams = {}) => {
    return useQuery({
        queryKey: ['mallInfo'],
        queryFn: async () => {
            const { data } = await mall.getMall();

            return data;
        },
        staleTime: 1000 * 60 * 10,
        gcTime: 1000 * 60 * 10,
        ...options,
    });
};

export default useMall;
