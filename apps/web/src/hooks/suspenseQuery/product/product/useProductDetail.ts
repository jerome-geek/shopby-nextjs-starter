import {
    useSuspenseQuery,
    type UseSuspenseQueryOptions,
} from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { parseAsBoolean, parseAsStringLiteral, useQueryStates } from 'nuqs';

import { CHANNEL_TYPES } from '@/entities/product/constants';
import { productDetailOptions } from '@/entities/product/queries';
import { productKeys } from '@/hooks/queryKeys';
import type { ProductDetailResponse } from '@/models/product/product';

interface UseProductDetailParams<T = ProductDetailResponse> {
    productNo: number;
    options?: Omit<
        UseSuspenseQueryOptions<
            ProductDetailResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof productKeys)['detail']>
        >,
        'queryKey' | 'queryFn'
    >;
}

const productSearchParamsSchema = {
    channelType: parseAsStringLiteral(CHANNEL_TYPES),
    preview: parseAsBoolean.withDefault(false),
};

const useProductDetail = <T = ProductDetailResponse>({
    productNo,
    options,
}: UseProductDetailParams<T>) => {
    const [{ channelType, preview }] = useQueryStates(
        productSearchParamsSchema,
    );

    const searchParams = {
        ...(channelType && { channelType }),
        ...(preview && { preview }),
    };

    return useSuspenseQuery(
        productDetailOptions({ productNo, searchParams, options }),
    );
};

export default useProductDetail;
