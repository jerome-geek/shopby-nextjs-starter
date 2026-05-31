import { useSuspenseQuery } from '@tanstack/react-query';

import {
    reviewableProductListOptions,
    type ReviewableProductListOptionsParams,
} from '@/entities/display/review/queries';
import type { GetReviewableProductsResponse } from '@/models/display/review';

const useReviewableProductList = <T = GetReviewableProductsResponse>(
    params: ReviewableProductListOptionsParams<T>,
) => {
    return useSuspenseQuery(reviewableProductListOptions(params));
};

export default useReviewableProductList;
