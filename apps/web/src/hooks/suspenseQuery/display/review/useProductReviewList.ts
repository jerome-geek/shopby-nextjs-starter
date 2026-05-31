import { useSuspenseQuery } from '@tanstack/react-query';

import {
    productReviewListOptions,
    type UseProductReviewListParams,
} from '@/entities/display/review/queries';
import type { GetProductReviewListResponse } from '@/entities/display/model/review';

const useProductReviewList = <T = GetProductReviewListResponse>(
    params: UseProductReviewListParams<T>,
) => {
    return useSuspenseQuery({
        ...productReviewListOptions(params),
    });
};

export default useProductReviewList;
