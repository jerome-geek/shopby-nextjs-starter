import { useQuery } from '@tanstack/react-query';

import {
    shippingAddressListOptions,
    type UseShippingAddressListParams,
} from '@/entities/order/queries';
import type { GetShippingAddressListResponse } from '@/models/order/shippingAddress';

const useShippingAddressList = <T = GetShippingAddressListResponse>({
    options,
}: UseShippingAddressListParams<T> = {}) =>
    useQuery(shippingAddressListOptions({ options }));

export default useShippingAddressList;
