import { useQuery } from '@tanstack/react-query';

import {
    cartPriceOptions,
    type UseCartPriceParams,
} from '@/entities/order/queries';
import { useAuth } from '@/hooks/useAuth';
import type { GetSelectedCartPriceResponse } from '@/models/order/cart';

const useCartPrice = <T = GetSelectedCartPriceResponse>({
    searchParams,
    options,
}: Omit<UseCartPriceParams<T>, 'isLogin'>) => {
    const isLogin = useAuth();

    return useQuery(cartPriceOptions({ isLogin: !!isLogin, searchParams, options }));
};

export default useCartPrice;
