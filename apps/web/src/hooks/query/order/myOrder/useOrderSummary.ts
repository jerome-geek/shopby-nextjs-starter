import { useQuery } from '@tanstack/react-query';

import {
    orderSummaryOptions,
    type UseOrderSummaryParams,
} from '@/entities/order/queries';
import type { GetOrderSummaryResponse } from '@/entities/order/model/myOrder';

const useOrderSummary = <T = GetOrderSummaryResponse>(
    params: UseOrderSummaryParams<T>,
) => useQuery(orderSummaryOptions(params));

export default useOrderSummary;
