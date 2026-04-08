import { useMutation, useQueryClient } from '@tanstack/react-query';
import { istype AxiosError } from 'axios';
import { useTranslation } from 'react-i18next';

import { memberClaim } from '@/api/claim';
import { useDialog } from '@/hooks/utils';
import type { CancelOptionsData } from '@/models/claim';
import type { CancelClaimData } from '@/models/claim/guest';
import {
    CheckFreeGiftSatisfyData,
    RequestExchangeData,
    RequestReturnMultipleOptionsData,
} from '@/models/claim/member';
import { ordersKeys, claimsKeys } from '@/hooks/queryKeys';

const useMemberClaimMutation = ({
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

    const claimListInvalidate = () => {
        queryClient.invalidateQueries({
            queryKey: claimsKeys.lists(),
            refetchType: 'all',
        });
    };

    const claimDetailInvalidate = () => {
        if (orderOptionNo) {
            queryClient.invalidateQueries({
                queryKey: ordersKeys.detailsByOrderOptionNo(orderOptionNo),
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
            }) => await memberClaim.requestCancel(orderNo, data),
            onSuccess: () => {
                orderListInvalidate();
                claimListInvalidate();
            },
            onError: (error) => {
                onErrorHandler(error);
            },
        }),

        requestCancelOptions: useMutation({
            mutationFn: async ({ data }: { data: CancelOptionsData }) => {
                await memberClaim.requestCancelOptions(data);
            },
            onSuccess: () => {
                orderListInvalidate();
                orderDetailInvalidate();
                claimListInvalidate();
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
                await memberClaim.requestReturnMultipleOptions(data);
            },
            onSuccess: () => {
                orderListInvalidate();
                orderDetailInvalidate();
                claimListInvalidate();
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
                await memberClaim.requestExchange(orderOptionNo, data);
            },
            onSuccess: () => {
                orderListInvalidate();
                orderDetailInvalidate();
                claimListInvalidate();
                claimDetailInvalidate();
            },
            onError: (error) => {
                onErrorHandler(error);
            },
        }),

        checkClaimValidation: useMutation({
            mutationFn: async ({ claimNo }: { claimNo: number }) =>
                await memberClaim.checkClaimValidation(claimNo),
            onError: (error) => {
                onErrorHandler(error);
            },
        }),

        withdrawClaimByClaimNo: useMutation({
            mutationFn: async ({ claimNo }: { claimNo: number }) =>
                await memberClaim.withdrawClaimByClaimNo(claimNo),
            onSuccess: () => {
                orderListInvalidate();
                orderDetailInvalidate();
                claimListInvalidate();
                claimDetailInvalidate();
            },
            onError: (error) => {
                onErrorHandler(error);
            },
        }),

        checkFreeGiftSatisfy: useMutation({
            mutationFn: async ({ data }: { data: CheckFreeGiftSatisfyData }) =>
                await memberClaim.checkFreeGiftSatisfy(data),
            onSuccess: (data) => data,
            onError: (error) => {
                onErrorHandler(error);
            },
        }),
    };
};

export default useMemberClaimMutation;
