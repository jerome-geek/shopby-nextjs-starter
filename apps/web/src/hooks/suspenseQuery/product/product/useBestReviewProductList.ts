import { useSuspenseQuery } from '@tanstack/react-query';

import {
    bestReviewProductListOptions,
    type BestReviewProductListOptionsParams,
} from '@/entities/product/queries';
import type { GetBestReviewProductsResponse } from '@/models/product/product';

const useBestReviewProductList = <T = GetBestReviewProductsResponse>({
    searchParams,
    memberNo = 0,
    options,
}: BestReviewProductListOptionsParams<T>) => {
    return useSuspenseQuery(
        bestReviewProductListOptions({ searchParams, memberNo, options }),
    );
};

export default useBestReviewProductList;
