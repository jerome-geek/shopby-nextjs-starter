import { useQuery } from '@tanstack/react-query';

import {
    productReviewListOptions,
    UseProductReviewListParams,
} from '@/entities/display/review/queries';
import type { GetProductReviewListResponse } from '@/entities/display/model/review';

const useProductReviewList = <T = GetProductReviewListResponse>(
    params: UseProductReviewListParams<T>,
) => {
    return useQuery(productReviewListOptions(params));
};

export default useProductReviewList;
