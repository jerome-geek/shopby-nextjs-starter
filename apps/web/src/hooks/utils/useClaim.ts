import { type MutateOptions } from '@tanstack/react-query';
import type { AxiosResponse } from 'axios';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';

import { NEXT_ACTION_MAP } from '@/const/label';
import { PATHS } from '@/const/paths';
import {
    useGuestClaimMutation,
    useGuestOrderMutation,
    useMemberClaimMutation,
    useMyOrderMutation,
} from '@/hooks/mutations';
import useDialog from '@/hooks/utils/useDialog';
import type { NextActionType } from '@/models';
import type { CancelClaimData } from '@/models/claim/guest';
import { useAuth } from '@/hooks/useAuth';

interface useClaimProps {
    nextActionType: NextActionType;
    orderOptionNo: number;
    orderNo: string;
    uri: string;
    claimNo: Nullable<number>;
    productNo: number;
    optionNo: number;
}

const useClaim = ({
    nextActionType,
    orderOptionNo,
    orderNo,
    productNo,
    optionNo,
    uri,
    claimNo,
}: useClaimProps) => {
    const { t } = useTranslation();

    const label = t(NEXT_ACTION_MAP[nextActionType]) ?? '';

    const router = useRouter();

    const { openDialog, openAsyncDialog } = useDialog();

    const isLogin = useAuth();

    const claimUrl = isLogin
        ? PATHS.MYPAGE.CLAIMS.REQUEST
        : PATHS.GUEST.CLAIMS.REQUEST;

    const {
        requestCancelAll: { mutate: requestCancelAllMutate },
        checkClaimValidation: { mutateAsync: checkClaimValidationMutateAsync },
        withdrawClaimByClaimNo: { mutate: withdrawClaimByClaimNoMutate },
    } = useMemberClaimMutation({
        orderNo,
        orderOptionNo,
    });

    const {
        requestCancelAll: { mutate: guestCancelAllMutate },
        checkClaimValidation: {
            mutateAsync: checkGuestClaimValidationMutateAsync,
        },
        withdrawClaimByClaimNo: { mutate: withdrawGuestClaimMutate },
    } = useGuestClaimMutation({
        orderNo,
        orderOptionNo,
    });

    const {
        confirmPurchase: { mutate: confirmPurchaseMutate },
        deliveryDone: { mutate: deliveryDoneMutate },
    } = useMyOrderMutation({
        orderNo,
        orderOptionNo,
    });

    const {
        confirmOrder: { mutate: guestConfirmPurchaseMutate },
        confirmDeliveryCompletion: { mutate: guestDeliveryDoneMutate },
    } = useGuestOrderMutation();

    // const { sendCancelAllEvent } = useAirbridgeEvent();

    const nextAction = () => {
        switch (nextActionType) {
            case 'CANCEL_ALL': {
                return async () => {
                    const isAgree = await openAsyncDialog({
                        message: t('전체 주문을 취소하시겠습니까?'),
                        onCloseReturnValue: false,
                        onConfirmReturnValue: true,
                    });

                    if (isAgree) {
                        const parseData = {
                            orderNo,
                            data: {
                                claimReasonType: 'OTHERS_BUYER' as const,
                                claimReasonDetail: '',
                                claimType: 'CANCEL' as const,
                                saveBankAccountInfo: false,
                                refundsImmediately: true,
                            },
                        };

                        const callback: MutateOptions<
                            AxiosResponse<unknown, unknown>,
                            Error,
                            { orderNo: string; data: CancelClaimData },
                            unknown
                        > = {
                            onSuccess: (_, variable) => {
                                openDialog({
                                    message: '전체 주문 취소가 완료되었습니다.',
                                });

                                // sendCancelAllEvent({
                                //     orderNo: variable.orderNo,
                                // });
                            },
                        };

                        if (isLogin) {
                            requestCancelAllMutate(parseData, callback);
                        } else {
                            guestCancelAllMutate(parseData, callback);
                        }
                    }
                };
            }

            case 'CANCEL': {
                return () =>
                    router.push({
                        pathname: claimUrl,
                        query: isLogin
                            ? {
                                  orderOptionNo: orderOptionNo.toString(),
                                  claimType: 'CANCEL',
                              }
                            : {
                                  orderOptionNo: orderOptionNo.toString(),
                                  claimType: 'CANCEL',
                                  returnOrderNo: orderNo,
                              },
                    });
            }

            case 'EXCHANGE': {
                return () => {
                    router.push({
                        pathname: claimUrl,
                        query: isLogin
                            ? {
                                  orderOptionNo: orderOptionNo.toString(),
                                  claimType: 'EXCHANGE',
                              }
                            : {
                                  orderOptionNo: orderOptionNo.toString(),
                                  claimType: 'EXCHANGE',
                                  returnOrderNo: orderNo,
                              },
                    });
                };
            }

            case 'RETURN': {
                return () => {
                    router.push({
                        pathname: claimUrl,
                        query: isLogin
                            ? {
                                  orderOptionNo: orderOptionNo.toString(),
                                  claimType: 'RETURN',
                              }
                            : {
                                  orderOptionNo: orderOptionNo.toString(),
                                  claimType: 'RETURN',
                                  returnOrderNo: orderNo,
                              },
                    });
                };
            }

            case 'WITHDRAW_CANCEL':
            case 'WITHDRAW_EXCHANGE':
            case 'WITHDRAW_RETURN': {
                return async () => {
                    if (!claimNo) {
                        return;
                    }

                    const isAgree = await openAsyncDialog({
                        message: t('클레임 신청을 철회하시겠습니까?'),
                        onCloseReturnValue: false,
                        onConfirmReturnValue: true,
                    });

                    if (!isAgree) {
                        return;
                    }

                    const { data } = await (() => {
                        if (isLogin) {
                            return checkClaimValidationMutateAsync({
                                claimNo,
                            });
                        }

                        return checkGuestClaimValidationMutateAsync({
                            claimNo,
                        });
                    })();

                    if (data.validationType !== 'WITHDRAWABLE') {
                        openDialog({
                            message: t('클레임 신청이 불가능합니다.'),
                        });
                        return;
                    }

                    // TODO: 성공일 경우 response.status === 204
                    const successCallback = {
                        onSuccess: () => {
                            openDialog({
                                message: t('클레임 신청이 철회되었습니다.'),
                            });
                        },
                    };

                    if (isLogin) {
                        withdrawClaimByClaimNoMutate(
                            {
                                claimNo,
                            },
                            successCallback,
                        );
                    } else {
                        withdrawGuestClaimMutate(
                            {
                                claimNo,
                            },
                            successCallback,
                        );
                    }
                };
            }

            case 'VIEW_DELIVERY': {
                return () => {
                    window.open(uri ?? '', '_blank');
                };
            }

            case 'VIEW_CLAIM': {
                return () => {
                    router.push(`${PATHS.MYPAGE.ORDERS.MAIN}/${orderNo}`);
                };
            }

            case 'DELIVERY_DONE': {
                return async () => {
                    const isAgree = await openAsyncDialog({
                        message: t('해당 상품을 배송완료 처리하시겠습니까?'),
                        onCloseReturnValue: false,
                        onConfirmReturnValue: true,
                    });

                    if (!isAgree) {
                        return;
                    }

                    const callback = {
                        onSuccess: () => {
                            openDialog({
                                message: t('배송완료 처리되었습니다.'),
                            });
                        },
                    };

                    if (isLogin) {
                        deliveryDoneMutate({ orderOptionNo }, callback);
                    } else {
                        guestDeliveryDoneMutate({ orderOptionNo }, callback);
                    }
                };
            }

            case 'CONFIRM_ORDER': {
                return async () => {
                    const isAgree = await openAsyncDialog({
                        message: t('해당 상품을 구매확정하시겠습니까?'),
                        onCloseReturnValue: false,
                        onConfirmReturnValue: true,
                    });

                    if (!isAgree) {
                        return;
                    }

                    const callback = {
                        onSuccess: () => {
                            openDialog({
                                message: t('구매확정 처리되었습니다.'),
                            });
                        },
                    };

                    if (isLogin) {
                        confirmPurchaseMutate({ orderOptionNo }, callback);
                    } else {
                        guestConfirmPurchaseMutate({ orderOptionNo }, callback);
                    }
                };
            }

            case 'WRITE_REVIEW': {
                return () => {
                    router.push(
                        `${PATHS.MYPAGE.REVIEWS.MAIN}/write/${productNo}?optionNo=${optionNo}&orderOptionNo=${orderOptionNo}`,
                    );
                };
            }

            default:
                return () => {};
        }
    };

    return { label, nextAction };
};

export default useClaim;
