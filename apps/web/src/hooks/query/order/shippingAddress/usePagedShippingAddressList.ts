import { useQuery } from '@tanstack/react-query';

import {
    pagedShippingAddressListOptions,
    type UsePagedShippingAddressListParams,
} from '@/entities/order/queries';
import type { GetPagedShippingAddressListResponse } from '@/entities/order/model/shippingAddress';

const usePagedShippingAddressList = <T = GetPagedShippingAddressListResponse>(
    params: UsePagedShippingAddressListParams<T>,
) => useQuery(pagedShippingAddressListOptions(params));

export default usePagedShippingAddressList;
