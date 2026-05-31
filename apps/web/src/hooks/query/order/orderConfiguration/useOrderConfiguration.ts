import { useQuery } from '@tanstack/react-query';

import {
    orderConfigurationOptions,
    type UseOrderConfigurationParams,
} from '@/entities/order/queries';
import type { GetOrderConfigsResponse } from '@/models/order/orderConfiguration';

const useOrderConfiguration = <T = GetOrderConfigsResponse>({
    options,
}: UseOrderConfigurationParams<T> = {}) =>
    useQuery(orderConfigurationOptions({ options }));

export default useOrderConfiguration;
