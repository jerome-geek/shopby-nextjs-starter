import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { coupon } from '@/api/promotion';
import { couponKeys } from '@/hooks/queryKeys';
import type {
    GetIssuableCouponsByProductNoParams,
    GetIssuableCouponsByProductNoResponse,
} from '@/models/promotion/coupon';

interface UseCouponListByProductNoParams<
    T = GetIssuableCouponsByProductNoResponse,
> {
    productNo: number;
    memberNo?: number;
    searchParams?: GetIssuableCouponsByProductNoParams;
    options?: Omit<
        UseQueryOptions<
            GetIssuableCouponsByProductNoResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof couponKeys)['listByProductNo']>
        >,
        'queryKey' | 'queryFn'
    >;
}

const useCouponListByProductNo = <T = GetIssuableCouponsByProductNoResponse>({
    productNo,
    memberNo = 0,
    searchParams,
    options,
}: UseCouponListByProductNoParams<T>) => {
    return useQuery({
        queryKey: couponKeys.listByProductNo(productNo, memberNo, searchParams),
        queryFn: async () => {
            const { data } = await coupon.getIssuableCouponsByProductNo(
                productNo,
                searchParams,
            );

            return data;
        },
        ...options,
    });
};

export default useCouponListByProductNo;
