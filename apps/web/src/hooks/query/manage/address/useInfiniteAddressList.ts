import {
    keepPreviousData,
    useInfiniteQuery,
    UseInfiniteQueryOptions,
} from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { address } from '@/api/manage';
import { addressKeys } from '@/hooks/queryKeys';
import type {
    SearchAddressParams,
    SearchAddressResponse,
} from '@/models/manage/address';

type AddressListPage = InfiniteResponse<SearchAddressResponse>;

interface UseInfiniteAddressListParams {
    searchParams: SearchAddressParams;
    options?: Omit<
        UseInfiniteQueryOptions<
            AddressListPage,
            AxiosError<ShopByErrorResponse>,
            InfiniteData<AddressListPage>,
            ReturnType<(typeof addressKeys)['searchInfiniteList']>,
            number
        >,
        'queryKey' | 'initialPageParam' | 'getNextPageParam'
    >;
}

const useInfiniteAddressList = ({
    searchParams,
    options,
}: UseInfiniteAddressListParams) => {
    return useInfiniteQuery({
        queryKey: addressKeys.searchInfiniteList(searchParams),
        queryFn: async ({ pageParam }) => {
            const { data } = await address.searchAddress({
                ...searchParams,
                pageNumber: pageParam,
            });

            return { data, pageNumber: pageParam };
        },
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPages) => {
            if (!searchParams.pageSize) {
                return;
            }

            return searchParams.pageSize * allPages.length <
                lastPage.data.totalCount
                ? lastPage.pageNumber + 1
                : undefined;
        },
        placeholderData: keepPreviousData,
        ...options,
        enabled: (options?.enabled ?? true) && !!searchParams.keyword,
    });
};

export default useInfiniteAddressList;
