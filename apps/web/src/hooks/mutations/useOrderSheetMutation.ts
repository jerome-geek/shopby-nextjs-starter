import { useMutation } from '@tanstack/react-query';
import { getCookie } from 'cookies-next';
import { isAxiosError } from 'axios';
import { includes } from '@fxts/core';

import { orderSheet } from '@/api/order';
import { orderSheetKeys, ordersKeys } from '@/hooks/queryKeys';
import {
    CouponApplyData,
    GetAppliedCouponPriceData,
    GetCalculatedOrderSheetData,
    WriteOrderSheetData,
} from '@/models/order/orderSheet';
import { useDialog } from '@/hooks/utils';
// import { checkLogin } from '@/utils/users';
import { ORDER_ERROR_CODE } from '@/const/errorCode';
import { PATHS } from '@/const/paths';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/router';

const useOrderSheetMutation = () => {
    const isLogin = useAuth();

    const { openDialog, openAsyncDialog } = useDialog();

    const router = useRouter();

    // const { openKcpAuthRegister } = useSnsLogin();

    const onErrorHandler = (error: Error) => {
        openDialog({
            message: isAxiosError(error)
                ? error.response?.data.message
                : '알 수 없는 오류가 발생했습니다.',
        });
    };

    return {
        /** 주문서 작성하기 */
        write: useMutation({
            mutationKey: ordersKeys.write(),
            mutationFn: async ({
                data,
                type = 'purchase',
            }: {
                data: WriteOrderSheetData;
                type?: 'purchase' | 'gift';
            }) =>
                await orderSheet.writeOrderSheet({
                    ...data,
                    trackingKey:
                        (getCookie('trackingKey') as string) || undefined,
                }),
            onSuccess: ({ data }, { type }) => {
                if (type === 'gift') {
                    if (isLogin) {
                        router.push(
                            `${PATHS.ORDER.GIFT.MAIN}/${data.orderSheetNo}`,
                        );
                    } else {
                        router.push({
                            pathname: PATHS.AUTH.LOGIN,
                            query: {
                                returnUrl: `${PATHS.ORDER.GIFT.MAIN}/${data.orderSheetNo}`,
                                type: 'guestOrder',
                            },
                        });
                    }
                    return;
                }

                if (isLogin) {
                    router.push(`${PATHS.ORDER.MAIN}/${data.orderSheetNo}`);
                } else {
                    router.push({
                        pathname: PATHS.AUTH.LOGIN,
                        query: {
                            returnUrl: `${PATHS.ORDER.MAIN}/${data.orderSheetNo}`,
                            type: 'guestOrder',
                        },
                    });
                }
            },
            onError: async (error) => {
                if (isAxiosError(error)) {
                    if (
                        includes(
                            error.response?.data.code,
                            ORDER_ERROR_CODE.SOLD_OUT.CODES,
                        )
                    ) {
                        openDialog({
                            message: ORDER_ERROR_CODE.SOLD_OUT.MESSAGE,
                        });
                        return;
                    }

                    if (
                        includes(
                            error.response?.data.code,
                            ORDER_ERROR_CODE.NEED_AUTH.CODES,
                        )
                    ) {
                        const isAgree = await openAsyncDialog({
                            message: ORDER_ERROR_CODE.NEED_AUTH.MESSAGE,
                            onConfirmReturnValue: true,
                            onCloseReturnValue: false,
                        });

                        // if (isAgree) {
                        //     openKcpAuthRegister();
                        // }
                    } else {
                        onErrorHandler(error);
                    }
                    return;
                } else {
                    onErrorHandler(error);
                }
            },
        }),

        /** 쿠폰 및 배송지 정보가 적용된 금액 조회하기 */
        calculate: useMutation({
            mutationFn: async ({
                orderSheetNo,
                data,
            }: {
                orderSheetNo: string;
                data: GetCalculatedOrderSheetData;
            }) => await orderSheet.getCalculatedOrderSheet(orderSheetNo, data),
        }),

        /** 쿠폰 적용하기 */
        couponApply: useMutation({
            mutationFn: async ({
                orderSheetNo,
                data,
            }: {
                orderSheetNo: string;
                data: CouponApplyData;
            }) => await orderSheet.applyCoupon(orderSheetNo, data),
        }),

        /** 쿠폰적용금액 계산하기 */
        couponCalculate: useMutation({
            mutationKey: orderSheetKeys.couponApply(),
            mutationFn: async ({
                orderSheetNo,
                data,
            }: {
                orderSheetNo: string;
                data: GetAppliedCouponPriceData;
            }) => await orderSheet.getAppliedCouponPrice(orderSheetNo, data),
        }),

        /** 최대쿠폰적용금액 계산하기 */
        maxCouponCalculate: useMutation({
            mutationFn: async ({
                orderSheetNo,
                data,
            }: {
                orderSheetNo: string;
                data?: { channelType?: string };
            }) =>
                await orderSheet.getMaximumAppliedCouponPrice(
                    orderSheetNo,
                    data,
                ),
        }),
    };
};

export default useOrderSheetMutation;
