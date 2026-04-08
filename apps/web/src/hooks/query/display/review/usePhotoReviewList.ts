import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { review } from '@/api/display';
import { reviewKeys } from '@/hooks/queryKeys';
import {
    GetPhotoReviewListParams,
    GetPhotoReviewListResponse,
} from '@/models/display/review';

interface UsePhotoReviewListProps<T = GetPhotoReviewListResponse> {
    productNo: number;
    searchParams?: GetPhotoReviewListParams;
    options?: Omit<
        UseQueryOptions<
            GetPhotoReviewListResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof reviewKeys)['photoList']>
        >,
        'queryKey' | 'queryFn'
    >;
}

const usePhotoReviewList = <T = GetPhotoReviewListResponse>({
    productNo,
    searchParams,
    options,
}: UsePhotoReviewListProps<T>) => {
    return useQuery({
        queryKey: reviewKeys.photoList(productNo, searchParams),
        queryFn: async () => {
            const { data } = await review.getPhotoReviewList(
                productNo,
                searchParams,
            );
            return data;
        },
        ...options,
    });
};

export default usePhotoReviewList;
