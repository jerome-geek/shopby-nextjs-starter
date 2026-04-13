import {
    UseQueryOptions,
    keepPreviousData,
    useQuery,
} from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { cart } from '@/api/order';
import { cartKeys } from '@/hooks/queryKeys';
import type { GetCartListParams, GetCartListResponse } from '@/models/order/cart';
import { useAuth } from '@/hooks/useAuth';

interface UseCartListParams<T = GetCartListResponse> {
    searchParams?: GetCartListParams;
    options?: Omit<
        UseQueryOptions<
            GetCartListResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof cartKeys)['list']>
        >,
        'queryKey' | 'queryFn'
    >;
}

const useCartList = <T = GetCartListResponse>({
    searchParams,
    options,
}: UseCartListParams<T>) => {
    const isLogin = useAuth();

    return useQuery({
        queryKey: cartKeys.list(searchParams),
        queryFn: async () => {
            const { data } = await cart.getCartList(searchParams);

            return data;
        },
        placeholderData: keepPreviousData,
        staleTime: 10 * 1000,
        refetchOnWindowFocus: true,
        ...options,
        enabled: (options?.enabled ?? true) && !!isLogin,
    });
};

export default useCartList;
