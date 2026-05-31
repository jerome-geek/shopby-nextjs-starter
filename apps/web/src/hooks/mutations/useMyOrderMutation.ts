import { includes } from '@fxts/core';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { myOrder } from '@/entities/order/api';
import { ordersKeys } from '@/hooks/queryKeys';
import useApiError from '@/hooks/useApiError';
import type {
    RequestCashReceiptData,
    UpdateDeliveryInformationData,
    UpdateDeliveryInformationParams,
} from '@/entities/order/model/myOrder';

export const useMyOrderMutation = () => {
    const queryClient = useQueryClient();

    const { handleErrorToast } = useApiError();

    const onMutationSuccess = () => {
        return queryClient.invalidateQueries({
            predicate: (query) => {
                return includes(query.queryKey[0], [...ordersKeys.all]);
            },
        });
    };

    const onMutationError = (error: Error) => {
        handleErrorToast(error);
    };

    return {
        confirmPurchase: useMutation({
            mutationFn: async ({ orderOptionNo }: { orderOptionNo: number }) =>
                await myOrder.confirmPurchase(orderOptionNo),
            onSuccess: onMutationSuccess,
            onError: onMutationError,
        }),

        deliveryDone: useMutation({
            mutationFn: async ({ orderOptionNo }: { orderOptionNo: number }) =>
                await myOrder.processDeliveryDone(orderOptionNo),
            onSuccess: onMutationSuccess,
            onError: onMutationError,
        }),

        registerCashReceipt: useMutation({
            mutationFn: async ({
                orderNo,
                data,
            }: {
                orderNo: string;
                data: RequestCashReceiptData;
            }) => await myOrder.requestCashReceipt(orderNo, data),
            onSuccess: onMutationSuccess,
            onError: onMutationError,
        }),

        modifyCashReceipt: useMutation({
            mutationFn: async ({
                orderNo,
                data,
            }: {
                orderNo: string;
                data: RequestCashReceiptData;
            }) => await myOrder.modifyCashReceipt(orderNo, data),
            onSuccess: onMutationSuccess,
            onError: onMutationError,
        }),

        updateDeliveryInfo: useMutation({
            mutationFn: async ({
                orderNo,
                searchParams,
                data,
            }: {
                orderNo: string;
                searchParams: UpdateDeliveryInformationParams;
                data: UpdateDeliveryInformationData;
            }) =>
                await myOrder.updateDeliveryInformation(
                    orderNo,
                    searchParams,
                    data,
                ),
            onSuccess: onMutationSuccess,
            onError: onMutationError,
        }),
    };
};

export default useMyOrderMutation;
