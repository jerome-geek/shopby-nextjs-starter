import { useQuery } from '@tanstack/react-query';

import {
    cartCountOptions,
    type UseCartCountParams,
} from '@/entities/order/queries';
import { useAuth } from '@/hooks/useAuth';
import type { GetCartCountResponse } from '@/entities/order/model/cart';

const useCartCount = <T = GetCartCountResponse>({
    options,
}: Omit<UseCartCountParams<T>, 'isLogin'> = {}) => {
    const isLogin = useAuth();

    return useQuery(cartCountOptions({ isLogin: !!isLogin, options }));
};

export default useCartCount;
