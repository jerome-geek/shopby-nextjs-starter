import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { shippingAddress } from '@/api/order';
import { GetShippingAddressListResponse } from '@/models/order/shippingAddress';
import addressKeys from '@/hooks/queryKeys/addressKeys';

interface UseShippingAddressListParams<T = GetShippingAddressListResponse> {
    options?: Omit<
        UseQueryOptions<
            GetShippingAddressListResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof addressKeys)['noPagingList']>
        >,
        'queryKey' | 'queryFn'
    >;
}

const useShippingAddressList = <T = GetShippingAddressListResponse>({
    options,
}: UseShippingAddressListParams<T> = {}) => {
    return useQuery({
        queryKey: addressKeys.noPagingList(),
        queryFn: async () => {
            const { data } = await shippingAddress.getShippingAddressList();

            return data;
        },
        ...options,
    });
};

export default useShippingAddressList;
