import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { orderConfiguration } from '@/api/order';
import { GetOrderConfigsResponse } from '@/models/order/orderConfiguration';

interface UseOrderConfigurationParams<T = GetOrderConfigsResponse> {
    options?: Omit<
        UseQueryOptions<
            GetOrderConfigsResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            [string]
        >,
        'queryKey' | 'queryFn'
    >;
}

const useOrderConfiguration = <T = GetOrderConfigsResponse>({
    options,
}: UseOrderConfigurationParams<T> = {}) => {
    return useQuery({
        queryKey: ['orderConfiguration'],
        queryFn: async () => {
            const { data } = await orderConfiguration.getOrderConfigs();

            return data;
        },
        ...options,
    });
};

export default useOrderConfiguration;
