import { useQuery } from '@tanstack/react-query';

import {
    orderConfigurationOptions,
    type UseOrderConfigurationParams,
} from '@/entities/order/queries';
import type { GetOrderConfigsResponse } from '@/entities/order/model/orderConfiguration';

const useOrderConfiguration = <T = GetOrderConfigsResponse>({
    options,
}: UseOrderConfigurationParams<T> = {}) =>
    useQuery(orderConfigurationOptions({ options }));

export default useOrderConfiguration;
