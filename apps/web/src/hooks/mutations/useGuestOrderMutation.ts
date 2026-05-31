import { includes } from '@fxts/core';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { guestOrder } from '@/api/order';
import { guestOrderKeys } from '@/hooks/queryKeys';
import useApiError from '@/hooks/useApiError';
import type {
    UpdateDeliveryInfoData,
    UpdateDeliveryInfoParams,
} from '@/models/order/guestOrder';

const useGuestOrderMutation = () => {
    const queryClient = useQueryClient();

    const { handleErrorToast } = useApiError();

    const onMutationSuccess = () => {
        return queryClient.invalidateQueries({
            predicate: (query) => {
                return includes(query.queryKey[0], [...guestOrderKeys.all]);
            },
        });
    };

    const onMutationError = (error: Error) => {
        handleErrorToast(error);
    };

    return {
        confirmOrder: useMutation({
            mutationFn: async ({ orderOptionNo }: { orderOptionNo: number }) =>
                await guestOrder.confirmOrder(orderOptionNo),
            onSuccess: onMutationSuccess,
            onError: onMutationError,
        }),

        confirmDeliveryCompletion: useMutation({
            mutationFn: async ({ orderOptionNo }: { orderOptionNo: number }) =>
                await guestOrder.confirmDeliveryCompletion(orderOptionNo),
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
                searchParams: UpdateDeliveryInfoParams;
                data: UpdateDeliveryInfoData;
            }) =>
                await guestOrder.updateDeliveryInfo(
                    orderNo,
                    searchParams,
                    data,
                ),
            onSuccess: onMutationSuccess,
            onError: onMutationError,
        }),
    };
};

export default useGuestOrderMutation;
