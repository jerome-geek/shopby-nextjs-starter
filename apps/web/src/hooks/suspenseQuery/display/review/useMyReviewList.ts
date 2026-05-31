import { useSuspenseQuery } from '@tanstack/react-query';

import {
    myReviewListOptions,
    type MyReviewListOptionsParams,
} from '@/entities/display/review/queries';
import type { GetMyProductReviewsResponse } from '@/entities/display/model/review';

const useMyReviewList = <T = GetMyProductReviewsResponse>(
    params: MyReviewListOptionsParams<T>,
) => {
    return useSuspenseQuery(myReviewListOptions(params));
};

export default useMyReviewList;
