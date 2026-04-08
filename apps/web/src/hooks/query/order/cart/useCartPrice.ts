import {
    UseQueryOptions,
    keepPreviousData,
    useQuery,
} from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { isEmpty } from '@fxts/core';

import { cart } from '@/api/order';
import { cartKeys } from '@/hooks/queryKeys';
import {
    GetSelectedCartPriceParams,
    GetSelectedCartPriceResponse,
} from '@/models/order/cart';
import { useAuth } from '@/hooks/useAuth';

interface UseCartPriceParams<T = GetSelectedCartPriceResponse> {
    searchParams: GetSelectedCartPriceParams;
    options?: Omit<
        UseQueryOptions<
            GetSelectedCartPriceResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof cartKeys)['price']>
        >,
        'queryKey' | 'queryFn'
    >;
}

const useCartPrice = <T = GetSelectedCartPriceResponse>({
    searchParams,
    options,
}: UseCartPriceParams<T>) => {
    const isLogin = useAuth();

    return useQuery({
        queryKey: cartKeys.price(searchParams),
        queryFn: async () => {
            const { data } = await cart.getSelectedCartPrice(searchParams);

            return data;
        },
        placeholderData: keepPreviousData,
        ...options,
        enabled:
            (options?.enabled ?? true) &&
            !!isLogin &&
            !isEmpty(searchParams.cartNo),
    });
};

export default useCartPrice;
