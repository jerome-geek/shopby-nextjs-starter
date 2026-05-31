import { useMutation, useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { useTranslation } from 'react-i18next';

import { memberClaim } from '@/api/claim';
import { claimsKeys, ordersKeys } from '@/hooks/queryKeys';
import { useDialog } from '@/hooks/utils';
import type { CancelOptionsData } from '@/models/claim';
import type { CancelClaimData } from '@/models/claim/guest';
import type {
    CheckFreeGiftSatisfyData,
    RequestExchangeData,
    RequestReturnMultipleOptionsData,
} from '@/models/claim/member';

interface UseMemberClaimMutationProps {
    orderNo?: string;
    orderOptionNo?: number;
}

const useMemberClaimMutation = ({
    orderNo,
    orderOptionNo,
}: UseMemberClaimMutationProps = {}) => {
    const { t } = useTranslation();

    const { openDialog } = useDialog();

    const queryClient = useQueryClient();

    const orderListInvalidate = () => {
        return queryClient.invalidateQueries({
            queryKey: ordersKeys.lists(),
        });
    };

    const orderDetailInvalidate = () => {
        if (orderNo) {
            return queryClient.invalidateQueries({
                predicate: (query) =>
                    query.queryKey[0] === ordersKeys.all[0] &&
                    query.queryKey[1] === 'detail' &&
                    query.queryKey[2] === orderNo,
            });
        }

        return Promise.resolve();
    };

    const claimListInvalidate = () => {
        return queryClient.invalidateQueries({
            queryKey: claimsKeys.lists(),
        });
    };

    const claimDetailInvalidate = () => {
        if (orderOptionNo) {
            return queryClient.invalidateQueries({
                queryKey: ordersKeys.detailsByOrderOptionNo(orderOptionNo),
            });
        }

        return Promise.resolve();
    };

    const invalidateClaimMutationQueries = () => {
        return Promise.all([
            orderListInvalidate(),
            orderDetailInvalidate(),
            claimListInvalidate(),
            claimDetailInvalidate(),
        ]);
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
            onSuccess: async () => {
                await Promise.all([
                    orderListInvalidate(),
                    claimListInvalidate(),
                ]);
            },
            onError: (error) => {
                onErrorHandler(error);
            },
        }),

        requestCancelOptions: useMutation({
            mutationFn: async ({ data }: { data: CancelOptionsData }) => {
                await memberClaim.requestCancelOptions(data);
            },
            onSuccess: async () => {
                await invalidateClaimMutationQueries();
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
            onSuccess: async () => {
                await invalidateClaimMutationQueries();
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
            onSuccess: async () => {
                await invalidateClaimMutationQueries();
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
            onSuccess: async () => {
                await invalidateClaimMutationQueries();
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
