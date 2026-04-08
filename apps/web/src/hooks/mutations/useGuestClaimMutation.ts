import { useMutation, useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { useTranslation } from 'react-i18next';

import { guestClaim } from '@/api/claim';
import { guestOrderKeys } from '@/hooks/queryKeys';
import { useDialog } from '@/hooks/utils';
import type { CancelOptionsData } from '@/models/claim';
import type { CancelClaimData } from '@/models/claim/guest';
import type {
    CheckFreeGiftSatisfyData,
    RequestExchangeData,
    RequestReturnMultipleOptionsData,
} from '@/models/claim/member';

const useGuestClaimMutation = ({
    orderNo,
    orderOptionNo,
}: {
    orderNo?: string;
    orderOptionNo?: number;
} = {}) => {
    const { t } = useTranslation();

    const { openDialog } = useDialog();

    const queryClient = useQueryClient();

    const orderDetailInvalidate = () => {
        if (orderNo) {
            queryClient.invalidateQueries({
                queryKey: guestOrderKeys.detail(orderNo),
                refetchType: 'all',
            });
        }
    };

    const claimDetailInvalidate = () => {
        if (orderOptionNo) {
            queryClient.invalidateQueries({
                queryKey: guestOrderKeys.detailsByOrderOptionNo(orderOptionNo),
                refetchType: 'inactive',
            });
        }
    };

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
        requestCancelAll: useMutation({
            mutationFn: async ({
                orderNo,
                data,
            }: {
                orderNo: string;
                data: CancelClaimData;
            }) => await guestClaim.requestCancel(orderNo, data),
            onSuccess: () => {
                orderDetailInvalidate();
            },
            onError: (error) => {
                onErrorHandler(error);
            },
        }),

        requestCancelOptions: useMutation({
            mutationFn: async ({ data }: { data: CancelOptionsData }) => {
                await guestClaim.requestCancelOptions(data);
            },
            onSuccess: () => {
                orderDetailInvalidate();
                claimDetailInvalidate();
            },
            onError: (error) => {
                onErrorHandler(error);
            },
        }),

        requestReturnMultipleOptions: useMutation({
            mutationFn: async ({
                data,
            }: {
                data: RequestReturnMultipleOptionsData;
            }) => {
                await guestClaim.requestReturnMultipleOptions(data);
            },
            onSuccess: () => {
                orderDetailInvalidate();
                claimDetailInvalidate();
            },
            onError: (error) => {
                onErrorHandler(error);
            },
        }),

        requestExchange: useMutation({
            mutationFn: async ({
                orderOptionNo,
                data,
            }: {
                orderOptionNo: number;
                data: RequestExchangeData;
            }) => {
                await guestClaim.requestExchange(orderOptionNo, data);
            },
            onSuccess: () => {
                orderDetailInvalidate();
                claimDetailInvalidate();
            },
            onError: (error) => {
                onErrorHandler(error);
            },
        }),

        checkClaimValidation: useMutation({
            mutationFn: async ({ claimNo }: { claimNo: number }) =>
                await guestClaim.checkClaimValidation(claimNo),
            onError: (error) => {
                onErrorHandler(error);
            },
        }),

        withdrawClaimByClaimNo: useMutation({
            mutationFn: async ({ claimNo }: { claimNo: number }) =>
                await guestClaim.withdrawClaimByClaimNo(claimNo),
            onSuccess: () => {
                orderDetailInvalidate();
                claimDetailInvalidate();
            },
            onError: (error) => {
                onErrorHandler(error);
            },
        }),

        checkFreeGiftSatisfy: useMutation({
            mutationFn: async ({ data }: { data: CheckFreeGiftSatisfyData }) =>
                await guestClaim.checkFreeGiftSatisfy(data),
            onSuccess: (data) => data,
            onError: (error) => {
                onErrorHandler(error);
            },
        }),
    };
};

export default useGuestClaimMutation;
