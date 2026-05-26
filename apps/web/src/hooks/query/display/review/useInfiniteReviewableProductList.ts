import { useInfiniteQuery } from '@tanstack/react-query';

import {
    infiniteReviewableProductListOptions,
    type InfiniteReviewableProductListOptionsParams,
} from '@/entities/display/review/queries';

const useInfiniteReviewableProductList = (
    params: InfiniteReviewableProductListOptionsParams,
) => {
    return useInfiniteQuery(infiniteReviewableProductListOptions(params));
};

export default useInfiniteReviewableProductList;
