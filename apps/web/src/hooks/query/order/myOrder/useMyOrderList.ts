import { useQuery } from '@tanstack/react-query';

import {
    myOrderListOptions,
    type UseMyOrderListParams,
} from '@/entities/order/queries';
import type { GetOrderListResponse } from '@/entities/order/model/myOrder';

const useMyOrderList = <T = GetOrderListResponse>(
    params: UseMyOrderListParams<T>,
) => useQuery(myOrderListOptions(params));

export default useMyOrderList;
