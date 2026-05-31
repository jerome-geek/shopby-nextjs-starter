import { useQuery } from '@tanstack/react-query';

import {
    myReviewListOptions,
    type MyReviewListOptionsParams,
} from '@/entities/display/review/queries';
import type { GetMyProductReviewsResponse } from '@/models/display/review';

const useMyReviewList = <T = GetMyProductReviewsResponse>(
    params: MyReviewListOptionsParams<T>,
) => {
    return useQuery(myReviewListOptions(params));
};

export default useMyReviewList;
