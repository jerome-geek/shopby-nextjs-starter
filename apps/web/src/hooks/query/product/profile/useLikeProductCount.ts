import { type UseQueryOptions, useQuery } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { productProfile } from '@/api/product';
import { productKeys } from '@/hooks/queryKeys';

interface UseLikeProductCountParams<T = { likedCount: number }> {
    memberNo: number;
    options?: Omit<
        UseQueryOptions<
            { likedCount: number },
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof productKeys)['likeCount']>
        >,
        'queryKey' | 'queryFn'
    >;
}

const useLikeProductCount = <T = { likedCount: number }>({
    memberNo,
    options,
}: UseLikeProductCountParams<T>) => {
    return useQuery({
        queryKey: productKeys.likeCount(memberNo),
        queryFn: async () => {
            const { data } = await productProfile.getLikeProductsCount();

            return data;
        },
        enabled: memberNo !== 0,
        ...options,
    });
};

export default useLikeProductCount;
