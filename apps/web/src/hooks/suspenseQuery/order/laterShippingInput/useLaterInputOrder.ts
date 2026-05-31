import {
    useSuspenseQuery,
    type UseSuspenseQueryOptions,
} from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import laterShippingInput from '@/api/order/laterShippingInput';
import { laterShippingInputKeys } from '@/hooks/queryKeys';
import type { OrderDetailResponse } from '@/models/order';
import type { GetLaterOrderDetailParams } from '@/models/order/laterShippingInput';

interface UseLaterInputOrderParams<T = OrderDetailResponse> {
    encryptedShippingNo: string;
    params?: GetLaterOrderDetailParams;
    options?: Omit<
        UseSuspenseQueryOptions<
            OrderDetailResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<typeof laterShippingInputKeys.orderDetail>
        >,
        'queryKey' | 'queryFn'
    >;
}

export const useLaterInputOrder = <T = OrderDetailResponse>({
    encryptedShippingNo,
    params = {},
    options,
}: UseLaterInputOrderParams<T>) => {
    return useSuspenseQuery({
        queryKey: laterShippingInputKeys.orderDetail(
            encryptedShippingNo,
            params,
        ),
        queryFn: async () => {
            const { data } = await laterShippingInput.getOrderDetail(
                { encryptedShippingNo },
                params,
            );

            return data;
        },
        ...options,
    });
};
