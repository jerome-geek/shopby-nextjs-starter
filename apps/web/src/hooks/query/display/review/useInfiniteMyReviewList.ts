import { useInfiniteQuery } from '@tanstack/react-query';

import {
    infiniteMyReviewListOptions,
    type InfiniteMyReviewListOptionsParams,
} from '@/entities/display/review/queries';

const useInfiniteMyReviewList = (
    params: InfiniteMyReviewListOptionsParams,
) => {
    return useInfiniteQuery(infiniteMyReviewListOptions(params));
};

export default useInfiniteMyReviewList;
