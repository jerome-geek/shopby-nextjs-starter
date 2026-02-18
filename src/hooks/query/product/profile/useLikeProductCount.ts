import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { HTTPError } from 'ky';

import { productProfile } from '@/api/product';
import { productKeys } from '@/hooks/queryKeys';

interface UseLikeProductCountParams<T = { likedCount: number }> {
    memberNo: number;
    options?: Omit<
        UseQueryOptions<
            { likedCount: number },
            HTTPError<ShopByErrorResponse>,
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
            const data = await productProfile.getLikeProductsCount().json();

            return data;
        },
        enabled: memberNo !== 0,
        ...options,
    });
};

export default useLikeProductCount;
