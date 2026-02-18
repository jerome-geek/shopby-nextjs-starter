import {
    keepPreviousData,
    useQuery,
    UseQueryOptions,
} from '@tanstack/react-query';
import { HTTPError } from 'ky';

import { product } from '@/api/product';
import { productKeys } from '@/hooks/queryKeys';
import {
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
            HTTPError<ShopByErrorResponse>,
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
            const data = await product
                .getProductSearchSummary(searchParams)
                .json();

            return data;
        },
        placeholderData: keepPreviousData,
        ...options,
    });
};

export default useProductSearchSummary;
