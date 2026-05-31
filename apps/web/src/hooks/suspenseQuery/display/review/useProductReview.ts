import { useSuspenseQuery } from '@tanstack/react-query';

import {
    productReviewDetailOptions,
    type ProductReviewDetailOptionsParams,
} from '@/entities/display/review/queries';
import type { GetProductReviewResponse } from '@/models/display/review';

const useProductReview = <T = GetProductReviewResponse>(
    params: ProductReviewDetailOptionsParams<T>,
) => {
    return useSuspenseQuery(productReviewDetailOptions(params));
};

export default useProductReview;
