import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { additionalDiscount } from '@/api/product';
import {
    GetAdditionalDiscountParams,
    GetAdditionalDiscountResponse,
} from '@/models/product/additionalDiscount';

interface UseAdditionalDiscountParams<T = GetAdditionalDiscountResponse> {
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

const useAdditionalDiscount = <T = GetAdditionalDiscountResponse>({
    searchParams,
    options,
}: UseAdditionalDiscountParams<T>) => {
    return useQuery({
        queryKey: ['additionalDiscount', { searchParams }],
        queryFn: async () => {
            const { data } =
                await additionalDiscount.getAdditionalDiscount(searchParams);

            return data;
        },
        ...options,
    });
};

export default useAdditionalDiscount;
