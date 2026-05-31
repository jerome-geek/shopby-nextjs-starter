import { useQuery } from '@tanstack/react-query';

import {
    orderDetailOptions,
    type OrderDetailOptionsParams,
} from '@/entities/order/queries';
import type { OrderDetailResponse } from '@/entities/order/model';

interface UseOrderDetailParams<T = OrderDetailResponse> {
    orderNo: string;
    memberNo?: number;
    searchParams?: OrderDetailOptionsParams<T>['searchParams'];
    options?: OrderDetailOptionsParams<T>['options'];
}

const useOrderDetail = <T = OrderDetailResponse>(
    params: UseOrderDetailParams<T>,
) => {
    return useQuery(orderDetailOptions(params));
};

export default useOrderDetail;
