import { type UseQueryOptions, useQuery } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { cart } from '@/api/order';
import type { GetCartCountResponse } from '@/models/order/cart';
import { cartKeys } from '@/hooks/queryKeys';
import { useAuth } from '@/hooks/useAuth';

interface UseCartCountParam<T = GetCartCountResponse> {
    options?: Omit<
        UseQueryOptions<
            GetCartCountResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof cartKeys)['count']>
        >,
        'queryKey' | 'queryFn'
    >;
}

const useCartCount = <T = GetCartCountResponse>({
    options,
}: UseCartCountParam<T> = {}) => {
    const isLogin = useAuth();

    return useQuery({
        queryKey: cartKeys.count(),
        queryFn: async () => {
            const { data } = await cart.getCartCount();

            return data;
        },
        ...options,
        enabled: (options?.enabled ?? true) && !!isLogin,
    });
};

export default useCartCount;
