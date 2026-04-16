import {
    UseQueryOptions,
    keepPreviousData,
    useQuery,
} from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { address } from '@/api/manage';
import { addressKeys } from '@/hooks/queryKeys';
import type {
    SearchAddressParams,
    SearchAddressResponse,
} from '@/models/manage/address';

interface UseAddressParams<T = SearchAddressResponse> {
    params: SearchAddressParams;
    options?: Omit<
        UseQueryOptions<
            SearchAddressResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof addressKeys)['searchList']>
        >,
        'queryKey' | 'queryFn'
    >;
}

const useAddressList = <T = SearchAddressResponse>({
    params,
    options,
}: UseAddressParams<T>) => {
    return useQuery({
        queryKey: addressKeys.searchList(params),
        queryFn: async () => {
            const { data } = await address.searchAddress(params);

            return data;
        },
        enabled: !!params.keyword,
        placeholderData: keepPreviousData,
        ...options,
    });
};

export default useAddressList;
