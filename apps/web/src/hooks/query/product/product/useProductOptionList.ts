import { useSearchParams } from 'next/navigation';
import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { productOptionListOptions } from '@/entities/product/queries';
import { productKeys } from '@/hooks/queryKeys';
import type {
    GetProductOptionParams,
    ProductOptionResponse,
} from '@/entities/product/model/productOption';

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

    const mergedSearchParams = {
        ...(preview && { preview }),
        ...searchParams,
    };

    return useQuery(
        productOptionListOptions({
            productNo,
            memberNo,
            searchParams: mergedSearchParams,
            options,
        }),
    );
};

export default useProductOptionList;
