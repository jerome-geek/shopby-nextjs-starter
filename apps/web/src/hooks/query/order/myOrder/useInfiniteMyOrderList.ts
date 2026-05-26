import { useInfiniteQuery } from '@tanstack/react-query';

import {
    infiniteMyOrderListOptions,
    type UseInfiniteMyOrderListParams,
} from '@/entities/order/queries';

const useInfiniteMyOrderList = (params: UseInfiniteMyOrderListParams) =>
    useInfiniteQuery(infiniteMyOrderListOptions(params));

export default useInfiniteMyOrderList;
