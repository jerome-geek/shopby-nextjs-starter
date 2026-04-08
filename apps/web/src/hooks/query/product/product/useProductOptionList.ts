import { useSearchParams } from 'next/navigation';
import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { productOption } from '@/api/product';
import { productKeys } from '@/hooks/queryKeys';
import type {
    GetProductOptionParams,
    ProductOptionResponse,
} from '@/models/product/productOption';

export interface UseProductOptionListParams<T = ProductOptionResponse> {
    productNo: number;
    memberNo?: number;
    searchParams?: GetProductOptionParams;
    options?: Omit<
        UseQueryOptions<
            ProductOptionResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof productKeys)['option']>
        >,
        'queryKey' | 'queryFn'
    >;
}

const useProductOptionList = <T = ProductOptionResponse>({
    productNo,
    memberNo = 0,
    searchParams,
    options,
}: UseProductOptionListParams<T>) => {
    const query = useSearchParams();
    const preview = query.get('preview') === 'true';

    return useQuery({
        queryKey: productKeys.option(productNo, memberNo, searchParams),
        queryFn: async () => {
            const { data } = await productOption.getProductOption(productNo, {
                ...(preview && { preview }),
                ...searchParams,
            });

            return data;
        },
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10,
        ...options,
    });
};

export default useProductOptionList;
