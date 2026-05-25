import { useSuspenseQuery } from '@tanstack/react-query';

import {
    likeProductCountOptions,
    type LikeProductCountOptionsParams,
} from '@/entities/product/profile/queries';

const useLikeProductCount = <T = { likedCount: number }>({
    memberNo,
    options,
}: LikeProductCountOptionsParams<T>) => {
    return useSuspenseQuery(likeProductCountOptions({ memberNo, options }));
};

export default useLikeProductCount;
