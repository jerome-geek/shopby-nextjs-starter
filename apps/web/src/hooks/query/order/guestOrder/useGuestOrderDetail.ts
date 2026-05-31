import { useQuery } from '@tanstack/react-query';

import {
    guestOrderDetailQueryOptions,
    type UseGuestOrderDetailQueryParams,
} from '@/entities/order/queries';
import { useAuth } from '@/hooks/useAuth';
import type { OrderDetailResponse } from '@/entities/order/model';

const useGuestOrderDetail = <T = OrderDetailResponse>({
    orderNo,
    params,
    options,
}: Omit<UseGuestOrderDetailQueryParams<T>, 'isLogin'>) => {
    const isLogin = useAuth();

    return useQuery(
        guestOrderDetailQueryOptions({ orderNo, isLogin: !!isLogin, params, options }),
    );
};

export default useGuestOrderDetail;
