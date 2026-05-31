import { useQuery } from '@tanstack/react-query';

import {
    cartListOptions,
    type UseCartListParams,
} from '@/entities/order/queries';
import { useAuth } from '@/hooks/useAuth';
import type { GetCartListResponse } from '@/models/order/cart';

const useCartList = <T = GetCartListResponse>({
    searchParams,
    options,
}: Omit<UseCartListParams<T>, 'isLogin'>) => {
    const isLogin = useAuth();

    return useQuery(cartListOptions({ isLogin: !!isLogin, searchParams, options }));
};

export default useCartList;
