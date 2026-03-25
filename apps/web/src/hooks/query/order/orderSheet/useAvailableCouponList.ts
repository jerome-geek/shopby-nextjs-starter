import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { orderSheet } from '@/api/order';
import { orderSheetKeys } from '@/hooks/queryKeys';
import { ApplyCouponResponse } from '@/models/order';

interface UseAvailableCouponParams<T = ApplyCouponResponse> {
    orderSheetNo: string;
    memberNo?: number;
    searchParams?: { channelType: string };
    options?: Omit<
        UseQueryOptions<
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
    return useQuery({
        queryKey: orderSheetKeys.coupon(orderSheetNo, memberNo),
        queryFn: async () => {
            const { data } = await orderSheet.getAvailableCoupons(
                orderSheetNo,
                searchParams,
            );

            return data;
        },
        enabled: !!orderSheetNo && !!memberNo,
        ...options,
    });
};

export default useAvailableCouponList;
