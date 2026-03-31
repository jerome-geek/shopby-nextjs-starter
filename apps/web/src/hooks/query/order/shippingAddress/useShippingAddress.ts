import { isEmpty } from '@fxts/core';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { shippingAddress } from '@/api/order';
import addressKeys from '@/hooks/queryKeys/addressKeys';
import { GetShippingAddressResponse } from '@/models/order/shippingAddress';

interface UseShippingAddressParams<T = GetShippingAddressResponse> {
    addressNo: number;
    options?: Omit<
        UseQueryOptions<
            GetShippingAddressResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof addressKeys)['detail']>
        >,
        'queryKey' | 'queryFn'
    >;
}

const useShippingAddress = <T = GetShippingAddressResponse>({
    addressNo,
    options,
}: UseShippingAddressParams<T>) => {
    return useQuery({
        queryKey: addressKeys.detail(addressNo),
        queryFn: async () => {
            const { data } = await shippingAddress.getShippingAddress(
                addressNo,
            );

            return data;
        },
        enabled: !isEmpty(addressNo),
        ...options,
    });
};

export default useShippingAddress;
