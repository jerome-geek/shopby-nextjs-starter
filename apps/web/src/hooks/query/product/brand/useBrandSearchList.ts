import {
    keepPreviousData,
    useQuery,
    type UseQueryOptions,
} from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { brand } from '@/api/product';
import { brandKeys } from '@/hooks/queryKeys';
import type {
    SearchBrandResponse,
    SearchBrandsParams,
} from '@/models/product/brand';

export interface UseBrandSearchListParams<T = SearchBrandResponse> {
    searchParams: SearchBrandsParams;
    options?: Omit<
        UseQueryOptions<
            SearchBrandResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof brandKeys)['search']>
        >,
        'queryKey' | 'queryFn'
    >;
}

const useBrandSearchList = <T = SearchBrandResponse>({
    searchParams,
    options,
}: UseBrandSearchListParams<T>) => {
    return useQuery({
        queryKey: brandKeys.search(searchParams),
        queryFn: async () => {
            const { data } = await brand.searchBrands(searchParams);

            return data;
        },
        placeholderData: keepPreviousData,
        ...options,
    });
};

export default useBrandSearchList;
