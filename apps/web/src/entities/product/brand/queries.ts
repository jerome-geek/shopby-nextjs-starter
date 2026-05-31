import { queryOptions, type UseQueryOptions } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { brand } from '@/entities/product/api';
import { brandKeys } from '@/hooks/queryKeys';
import type {
    SearchBrandResponse,
    SearchBrandsParams,
} from '@/entities/product/model/brand';

export interface BrandSearchListOptionsParams<T = SearchBrandResponse> {
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

export const brandSearchListOptions = <T = SearchBrandResponse>({
    searchParams,
    options,
}: BrandSearchListOptionsParams<T>) => {
    return queryOptions({
        queryKey: brandKeys.search(searchParams),
        queryFn: async () => {
            const { data } = await brand.searchBrands(searchParams);
            return data;
        },
        ...options,
    });
};
