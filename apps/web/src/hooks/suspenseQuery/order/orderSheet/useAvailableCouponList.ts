import {
    type UseSuspenseQueryOptions,
    useSuspenseQuery,
} from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { orderSheet } from '@/api/order';
import { orderSheetKeys } from '@/hooks/queryKeys';
import type { ApplyCouponResponse } from '@/models/order';

interface UseAvailableCouponParams<T = ApplyCouponResponse> {
    orderSheetNo: string;
    memberNo?: number;
    searchParams?: { channelType: string };
    options?: Omit<
        UseSuspenseQueryOptions<
            ApplyCouponResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof orderSheetKeys)['coupon']>
        >,
        'queryKey' | 'queryFn'
    >;
}

const useAvailableCouponList = <T = ApplyCouponResponse>({
    orderSheetNo,
    searchParams,
    memberNo,
    options,
}: UseAvailableCouponParams<T>) => {
    return useSuspenseQuery({
        queryKey: orderSheetKeys.coupon(orderSheetNo, memberNo),
        queryFn: async () => {
            const { data } = await orderSheet.getAvailableCoupons(
                orderSheetNo,
                searchParams,
            );

            return data;
        },
        ...options,
    });
};

export default useAvailableCouponList;
