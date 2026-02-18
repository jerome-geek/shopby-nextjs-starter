import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { HTTPError } from 'ky';

import { additionalDiscount } from '@/api/product';
import {
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
            HTTPError<ShopByErrorResponse>,
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
            const data = await additionalDiscount
                .getAdditionalDiscountByProductNos(searchParams)
                .json();

            return data;
        },
        ...options,
    });
};

export default useAdditionalDiscountByProductNos;
