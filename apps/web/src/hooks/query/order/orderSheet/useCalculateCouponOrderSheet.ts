import {
    keepPreviousData,
    useQuery,
    UseQueryOptions,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { orderSheet } from '@/api/order';
import { orderSheetKeys } from '@/hooks/queryKeys';
import {
    GetAppliedCouponPriceData,
    GetAppliedCouponPriceResponse,
} from '@/models/order/orderSheet';
import { checkLogin } from '@/utils/users';

interface UseCalculateCouponOrderSheetParams<
    T = GetAppliedCouponPriceResponse,
> {
    orderSheetNo: string;
    searchParams: GetAppliedCouponPriceData;
    options?: Omit<
        UseQueryOptions<
            GetAppliedCouponPriceResponse,
            AxiosError<ShopByErrorResponse>,
            T,
            ReturnType<(typeof orderSheetKeys)['calculateCoupon']>
        >,
        'queryKey' | 'queryFn'
    >;
}

const useCalculateCouponOrderSheet = <T = GetAppliedCouponPriceResponse>({
    orderSheetNo,
    searchParams,
    options,
}: UseCalculateCouponOrderSheetParams<T>) => {
    return useQuery({
        queryKey: orderSheetKeys.calculateCoupon(orderSheetNo, searchParams),
        queryFn: async () => {
            const { data } = await orderSheet.getAppliedCouponPrice(
                orderSheetNo,
                searchParams,
            );

            return data;
        },
        placeholderData: keepPreviousData,
        ...options,
        enabled: (options?.enabled ?? true) && !!orderSheetNo && checkLogin(),
    });
};

export default useCalculateCouponOrderSheet;
