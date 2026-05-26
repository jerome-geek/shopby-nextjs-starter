import { useQuery } from '@tanstack/react-query';

import {
    productReviewCommentListOptions,
    type ProductReviewCommentListOptionsParams,
} from '@/entities/display/review/queries';
import type { GetProductReviewCommentResponse } from '@/models/display/review';

const useProductReviewCommentList = <T = GetProductReviewCommentResponse>(
    params: ProductReviewCommentListOptionsParams<T>,
) => {
    return useQuery(productReviewCommentListOptions(params));
};

export default useProductReviewCommentList;
