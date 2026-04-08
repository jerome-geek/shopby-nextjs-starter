import { useMutation } from '@tanstack/react-query';
import { istype AxiosError } from 'axios';
import { useTranslation } from 'react-i18next';

import { guestOrder } from '@/api/order';
import { useDialog } from '@/hooks/utils';

const useGuestOrderMutation = () => {
    const { t } = useTranslation();

    const { openDialog } = useDialog();

    const onErrorHandler = (error: Error) => {
        openDialog({
            message: t(
                isAxiosError(error)
                    ? error.response?.data.message
                    : '알 수 없는 오류가 발생했습니다.',
            ),
        });
    };

    return {
        confirmOrder: useMutation({
            mutationFn: async ({ orderOptionNo }: { orderOptionNo: number }) =>
                await guestOrder.confirmOrder(orderOptionNo),
            onError: (error) => {
                onErrorHandler(error);
            },
        }),

        confirmDeliveryCompletion: useMutation({
            mutationFn: async ({ orderOptionNo }: { orderOptionNo: number }) =>
                await guestOrder.confirmDeliveryCompletion(orderOptionNo),
            onError: (error) => {
                onErrorHandler(error);
            },
        }),
    };
};

export default useGuestOrderMutation;
