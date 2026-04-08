import { includes } from '@fxts/core';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { istype AxiosError } from 'axios';
import { useTranslation } from 'react-i18next';

import { myOrder } from '@/api/order';
import { ordersKeys } from '@/hooks/queryKeys';
import { useDialog } from '@/hooks/utils';
import type { RequestCashReceiptData } from '@/models/order/myOrder';

const useMyOrderMutation = ({
    orderNo,
    orderOptionNo,
}: {
    orderNo?: string;
    orderOptionNo?: number;
} = {}) => {
    const { t } = useTranslation();

    const { openDialog } = useDialog();

    const queryClient = useQueryClient();

    const orderListInvalidate = () => {
        queryClient.invalidateQueries({
            queryKey: ordersKeys.lists(),
            refetchType: 'all',
        });
    };

    const orderDetailInvalidate = () => {
        if (orderNo) {
            queryClient.invalidateQueries({
                queryKey: ordersKeys.details(),
                refetchType: 'all',
            });
        }
    };

    const onErrorHandler = (error: Error) => {
        openDialog({
            message: t(
                isAxiosError(error)
                    ? error.response?.data.message
                    : t('알 수 없는 오류가 발생했습니다.'),
            ),
        });
    };

    return {
        confirmPurchase: useMutation({
            mutationFn: async ({ orderOptionNo }: { orderOptionNo: number }) =>
                await myOrder.confirmPurchase(orderOptionNo),
            onSuccess: () => {
                orderListInvalidate();
                orderDetailInvalidate();
            },
            onError: (error) => {
                onErrorHandler(error);
            },
        }),

        deliveryDone: useMutation({
            mutationFn: async ({ orderOptionNo }: { orderOptionNo: number }) =>
                await myOrder.processDeliveryDone(orderOptionNo),
            onSuccess: () => {
                orderListInvalidate();
                orderDetailInvalidate();
            },
            onError: (error) => {
                onErrorHandler(error);
            },
        }),

        registerCashReceipt: useMutation({
            mutationFn: async ({
                orderNo,
                data,
            }: {
                orderNo: string;
                data: RequestCashReceiptData;
            }) => await myOrder.requestCashReceipt(orderNo, data),
            onError: (error) => {
                onErrorHandler(error);
            },
            onSettled: async (_, error) => {
                if (!error) {
                    await queryClient.invalidateQueries({
                        predicate: (query) =>
                            includes(query.queryKey[0], [...ordersKeys.all]),
                    });
                }
            },
        }),

        modifyCashReceipt: useMutation({
            mutationFn: async ({
                orderNo,
                data,
            }: {
                orderNo: string;
                data: RequestCashReceiptData;
            }) => await myOrder.modifyCashReceipt(orderNo, data),
            onError: (error) => {
                onErrorHandler(error);
            },
            onSettled: async (_, error) => {
                if (!error) {
                    await queryClient.invalidateQueries({
                        predicate: (query) =>
                            includes(query.queryKey[0], [...ordersKeys.all]),
                    });
                }
            },
        }),
    };
};

export default useMyOrderMutation;
