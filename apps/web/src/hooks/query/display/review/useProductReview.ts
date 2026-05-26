import { useQuery } from '@tanstack/react-query';

import {
    productReviewDetailOptions,
    type ProductReviewDetailOptionsParams,
} from '@/entities/display/review/queries';
import type { GetProductReviewResponse } from '@/models/display/review';

const useProductReview = <T = GetProductReviewResponse>(
    params: ProductReviewDetailOptionsParams<T>,
) => {
    return useQuery(productReviewDetailOptions(params));
};

export default useProductReview;
