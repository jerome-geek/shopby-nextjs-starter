import { useQuery } from '@tanstack/react-query';

import {
    productReviewListV2Options,
    UseProductReviewListV2Params,
} from '@/entities/display/review/queries';
import { GetProductReviewListV2Response } from '@/models/display/review';

const useProductReviewListV2 = <T = GetProductReviewListV2Response>(
    params: UseProductReviewListV2Params<T>,
) => {
    return useQuery(productReviewListV2Options(params));
};

export default useProductReviewListV2;
