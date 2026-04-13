import {
    keepPreviousData,
    useQuery,
    type UseQueryOptions,
} from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { product } from '@/api/product';
import { productKeys } from '@/hooks/queryKeys';
import type {
    GetProductSearchSummaryParams,
    GetProductSearchSummaryResponse,
} from '@/models/product/product';

export interface useProductSearchSummaryParams<
    T = GetProductSearchSummaryResponse,
> {
    searchParams: GetProductSearchSummaryParams;
    memberNo?: number;
    options?: Omit<
        UseQueryOptions<
            GetProductSearchSummaryResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof productKeys)['summary']>
        >,
        'queryKey' | 'queryFn'
    >;
}

const useProductSearchSummary = <T = GetProductSearchSummaryResponse>({
    searchParams,
    options,
}: useProductSearchSummaryParams<T>) => {
    return useQuery({
        queryKey: productKeys.summary(searchParams),
        queryFn: async () => {
            const { data } =
                await product.getProductSearchSummary(searchParams);

            return data;
        },
        placeholderData: keepPreviousData,
        ...options,
    });
};

export default useProductSearchSummary;
