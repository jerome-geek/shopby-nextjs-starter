import { type UseQueryOptions, useQuery } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { shippingAddress } from '@/api/order';
import {
    GetPagedShippingAddressListResponse,
    GetPagedShippingAddressParams,
} from '@/models/order/shippingAddress';

interface UsePagedShippingAddressListParams<
    T = GetPagedShippingAddressListResponse,
> {
    memberNo: number;
    params: GetPagedShippingAddressParams;
    options?: Omit<
        UseQueryOptions<
            GetPagedShippingAddressListResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            [
                string,
                { memberNo: number; params: GetPagedShippingAddressParams },
            ]
        >,
        'queryKey' | 'queryFn'
    >;
}

const usePagedShippingAddressList = <T = GetPagedShippingAddressListResponse>({
    memberNo,
    params,
    options,
}: UsePagedShippingAddressListParams<T>) => {
    return useQuery({
        queryKey: ['shippingAddressList', { memberNo, params }],
        queryFn: async () => {
            const { data } = await shippingAddress.getPagedShippingAddressList(
                params,
            );

            return data;
        },
        ...options,
    });
};

export default usePagedShippingAddressList;
