import { queryOptions, type UseQueryOptions } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { additionalDiscount } from '@/api/product';
import type {
    GetAdditionalDiscountByProductNosParams,
    GetAdditionalDiscountByProductNosResponse,
    GetAdditionalDiscountParams,
    GetAdditionalDiscountResponse,
} from '@/models/product/additionalDiscount';

export interface AdditionalDiscountOptionsParams<
    T = GetAdditionalDiscountResponse,
> {
    searchParams: GetAdditionalDiscountParams;
    options?: Omit<
        UseQueryOptions<
            GetAdditionalDiscountResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            [string, { searchParams: GetAdditionalDiscountParams }]
        >,
        'queryKey' | 'queryFn'
    >;
}

export const additionalDiscountOptions = <T = GetAdditionalDiscountResponse>({
    searchParams,
    options,
}: AdditionalDiscountOptionsParams<T>) => {
    return queryOptions({
        queryKey: ['additionalDiscount', { searchParams }] as [
            string,
            { searchParams: GetAdditionalDiscountParams },
        ],
        queryFn: async () => {
            const { data } =
                await additionalDiscount.getAdditionalDiscount(searchParams);
            return data;
        },
        ...options,
    });
};

export interface AdditionalDiscountByProductNosOptionsParams<
    T = GetAdditionalDiscountByProductNosResponse,
> {
    searchParams: GetAdditionalDiscountByProductNosParams;
    options?: Omit<
        UseQueryOptions<
            GetAdditionalDiscountByProductNosResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            [string, { searchParams: GetAdditionalDiscountByProductNosParams }]
        >,
        'queryKey' | 'queryFn'
    >;
}

export const additionalDiscountByProductNosOptions = <
    T = GetAdditionalDiscountByProductNosResponse,
>({
    searchParams,
    options,
}: AdditionalDiscountByProductNosOptionsParams<T>) => {
    return queryOptions({
        queryKey: ['additionalDiscountByProductNos', { searchParams }] as [
            string,
            { searchParams: GetAdditionalDiscountByProductNosParams },
        ],
        queryFn: async () => {
            const { data } =
                await additionalDiscount.getAdditionalDiscountByProductNos(
                    searchParams,
                );
            return data;
        },
        ...options,
    });
};
