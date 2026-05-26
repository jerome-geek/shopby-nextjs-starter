import {
    keepPreviousData,
    queryOptions,
    type UseQueryOptions,
} from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { timeSale } from '@/api/shop';
import { timeSaleKeys } from '@/hooks/queryKeys';
import type {
    GetTimeSaleSectionProductsParams,
    TimeSaleSectionProductsResponse,
} from '@/models/shop/timeSale';

export interface UseTimeSaleSectionProductsParams {
    sectionNo: number;
    searchParams: Omit<GetTimeSaleSectionProductsParams, 'pageNumber'>;
    options?: Omit<
        UseQueryOptions<
            TimeSaleSectionProductsResponse,
            AxiosError<ShopByErrorResponse>,
            TimeSaleSectionProductsResponse,
            ReturnType<(typeof timeSaleKeys)['sectionProducts']>
        >,
        'queryKey' | 'queryFn'
    >;
}

export const timeSaleSectionProductsOptions = ({
    sectionNo,
    searchParams,
    options,
}: UseTimeSaleSectionProductsParams) =>
    queryOptions({
        queryKey: timeSaleKeys.sectionProducts(sectionNo, searchParams),
        queryFn: async () => {
            const { data } = await timeSale.getTimeSaleSectionProducts(
                sectionNo,
                {
                    ...searchParams,
                    pageNumber: 1,
                },
            );

            return data;
        },
        placeholderData: keepPreviousData,
        ...options,
    });
