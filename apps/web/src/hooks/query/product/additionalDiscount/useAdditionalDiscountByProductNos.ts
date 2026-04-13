import { type UseQueryOptions, useQuery } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { additionalDiscount } from '@/api/product';
import type {
    GetAdditionalDiscountByProductNosParams,
    GetAdditionalDiscountByProductNosResponse,
} from '@/models/product/additionalDiscount';

interface UseAdditionalDiscountByProductNosParams<
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

const useAdditionalDiscountByProductNos = <
    T = GetAdditionalDiscountByProductNosResponse,
>({
    searchParams,
    options,
}: UseAdditionalDiscountByProductNosParams<T>) => {
    return useQuery({
        queryKey: ['additionalDiscountByProductNos', { searchParams }],
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

export default useAdditionalDiscountByProductNos;
