import { useQuery } from '@tanstack/react-query';

import {
    addressListOptions,
    type UseAddressListParams,
} from '@/entities/manage/address/queries';
import type { SearchAddressResponse } from '@/models/manage/address';

const useAddressList = <T = SearchAddressResponse>(
    params: UseAddressListParams<T>,
) => useQuery(addressListOptions(params));

export default useAddressList;
