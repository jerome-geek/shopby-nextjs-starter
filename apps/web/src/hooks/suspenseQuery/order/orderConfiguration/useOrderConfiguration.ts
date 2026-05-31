import { useSuspenseQuery } from '@tanstack/react-query';

import {
    orderConfigurationSuspenseOptions,
    type UseOrderConfigurationSuspenseParams,
} from '@/entities/order/queries';
import type { GetOrderConfigsResponse } from '@/models/order/orderConfiguration';

const useOrderConfiguration = <T = GetOrderConfigsResponse>({
    options,
}: UseOrderConfigurationSuspenseParams<T> = {}) =>
    useSuspenseQuery(orderConfigurationSuspenseOptions({ options }));

export default useOrderConfiguration;
