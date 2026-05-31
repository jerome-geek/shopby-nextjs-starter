import { useSuspenseQuery } from '@tanstack/react-query';

import {
    photoReviewListOptions,
    type PhotoReviewListOptionsParams,
} from '@/entities/display/review/queries';
import type { GetPhotoReviewListResponse } from '@/entities/display/model/review';

const usePhotoReviewList = <T = GetPhotoReviewListResponse>(
    params: PhotoReviewListOptionsParams<T>,
) => {
    return useSuspenseQuery(photoReviewListOptions(params));
};

export default usePhotoReviewList;
