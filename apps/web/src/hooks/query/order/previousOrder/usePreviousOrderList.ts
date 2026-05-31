import { useQuery } from '@tanstack/react-query';

import {
    previousOrderListOptions,
    type UsePreviousOrderListParams,
} from '@/entities/order/queries';
import type { GetPreviousOrdersResponse } from '@/models/order/previousOrder';

const usePreviousOrderList = <T = GetPreviousOrdersResponse>(
    params: UsePreviousOrderListParams<T>,
) => useQuery(previousOrderListOptions(params));

export default usePreviousOrderList;
