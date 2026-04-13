import { includes } from '@fxts/core';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { coupon } from '@/api/promotion';
import { couponKeys } from '@/hooks/queryKeys';

const useCouponMutation = () => {
    const queryClient = useQueryClient();

    return {
        issue: useMutation({
            mutationFn: async ({ couponNo }: { couponNo: number }) =>
                await coupon.issueCoupon(couponNo),
            onSettled: async (_, error) => {
                if (!error) {
                    await queryClient.invalidateQueries({
                        predicate: (query) =>
                            includes(query.queryKey[0], [...couponKeys.all]),
                    });
                }
            },
        }),

        issueByPromotionCode: useMutation({
            mutationFn: async ({ promotionCode }: { promotionCode: string }) =>
                await coupon.issueCouponByPromotionCode(promotionCode),
            onSettled: async (_, error) => {
                if (!error) {
                    await queryClient.invalidateQueries({
                        predicate: (query) =>
                            includes(query.queryKey[0], [...couponKeys.all]),
                    });
                }
            },
        }),

        issueByEventNo: useMutation({
            mutationFn: async ({ eventNo }: { eventNo: number }) =>
                await coupon.issueEventCoupons(eventNo),
            onSettled: async (_, error) => {
                if (!error) {
                    await queryClient.invalidateQueries({
                        predicate: (query) =>
                            includes(query.queryKey[0], [...couponKeys.all]),
                    });
                }
            },
        }),

        issueByProductNo: useMutation({
            mutationKey: couponKeys.issueByProductNo(),
            mutationFn: async ({ productNo }: { productNo: number }) =>
                await coupon.issueProductCoupons(productNo),
            onSettled: async (_, error) => {
                if (!error) {
                    await queryClient.invalidateQueries({
                        predicate: (query) =>
                            includes(query.queryKey[0], [...couponKeys.all]),
                    });
                }
            },
        }),
    };
};

export default useCouponMutation;
