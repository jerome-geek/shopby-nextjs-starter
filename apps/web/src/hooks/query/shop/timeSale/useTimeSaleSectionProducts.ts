import {
    keepPreviousData,
    useQuery,
    type UseQueryOptions,
} from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { timeSale } from '@/api/shop';
import { timeSaleKeys } from '@/hooks/queryKeys';
import type {
    GetTimeSaleSectionProductsParams,
    TimeSaleSectionProductsResponse,
} from '@/models/shop/timeSale';

interface UseTimeSaleSectionProductsParams {
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

const useTimeSaleSectionProducts = ({
    sectionNo,
    searchParams,
    options,
}: UseTimeSaleSectionProductsParams) => {
    return useQuery({
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
};

export default useTimeSaleSectionProducts;
