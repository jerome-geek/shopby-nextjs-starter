import { useQuery } from '@tanstack/react-query';

import {
    likeProductCountOptions,
    type LikeProductCountOptionsParams,
} from '@/entities/product/profile/queries';

const useLikeProductCount = <T = { likedCount: number }>({
    memberNo,
    options,
}: LikeProductCountOptionsParams<T>) => {
    return useQuery({
        ...likeProductCountOptions({ memberNo, options }),
        enabled: memberNo !== 0,
    });
};

export default useLikeProductCount;
