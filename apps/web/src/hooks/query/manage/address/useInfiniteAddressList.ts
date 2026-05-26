import { useInfiniteQuery } from '@tanstack/react-query';

import {
    infiniteAddressListOptions,
    type UseInfiniteAddressListParams,
} from '@/entities/manage/address/queries';

const useInfiniteAddressList = (params: UseInfiniteAddressListParams) =>
    useInfiniteQuery(infiniteAddressListOptions(params));

export default useInfiniteAddressList;
