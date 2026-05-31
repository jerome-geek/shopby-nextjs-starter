import { useQuery } from '@tanstack/react-query';

import {
    shippingAddressOptions,
    type UseShippingAddressParams,
} from '@/entities/order/queries';
import type { GetShippingAddressResponse } from '@/entities/order/model/shippingAddress';

const useShippingAddress = <T = GetShippingAddressResponse>(
    params: UseShippingAddressParams<T>,
) => useQuery(shippingAddressOptions(params));

export default useShippingAddress;
