import {
    useSuspenseQuery,
    UseSuspenseQueryOptions,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { orderConfiguration } from '@/api/order';
import { ordersKeys } from '@/hooks/queryKeys';
import { GetOrderConfigsResponse } from '@/models/order/orderConfiguration';

interface UseOrderConfigurationParams<T = GetOrderConfigsResponse> {
    options?: Omit<
        UseSuspenseQueryOptions<
            GetOrderConfigsResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof ordersKeys)['config']>
        >,
        'queryKey' | 'queryFn'
    >;
}

const useOrderConfiguration = <T = GetOrderConfigsResponse>({
    options,
}: UseOrderConfigurationParams<T> = {}) => {
    return useSuspenseQuery({
        queryKey: ordersKeys.config(),
        queryFn: async () => {
            const { data } = await orderConfiguration.getOrderConfigs();

            return data;
        },
        staleTime: 60 * 60 * 1000,
        gcTime: 2 * 60 * 60 * 1000,
        ...options,
    });
};

export default useOrderConfiguration;
