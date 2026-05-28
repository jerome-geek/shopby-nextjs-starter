import { filter, isEmpty, map, pipe, toArray } from '@fxts/core';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/router';
import { useEffect, useMemo } from 'react';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import ClaimBankInfo from '@/components/mypage/claims/forms/bank-info';
import ClaimPriceInfo from '@/components/mypage/claims/forms/price-info';
import ClaimReason from '@/components/mypage/claims/forms/reason';
import ClaimOrderOptions from '@/components/mypage/claims/order-options';
import { Button } from '@/shared/ui/button';
import { PATHS } from '@/const/paths';
import {
    useGuestClaimMutation,
    useMemberClaimMutation,
} from '@/hooks/mutations';
import useGuestEstimate from '@/hooks/query/claim/guest/useGuestEstimate';
import useEstimate from '@/hooks/query/claim/member/useEstimate';
import { useAuth } from '@/hooks/useAuth';
import { useDialog } from '@/hooks/utils';
import type { GetOrderOptionDetailForClaimResponse } from '@/models/claim/member';
import {
    ClaimCancelSchemaType,
    createClaimCancelSchema,
} from '@/schema/claim.schema';

const CLAIM_TYPE = 'CANCEL' as const;

interface ClaimCancelFormProps {
    orderOptionData: GetOrderOptionDetailForClaimResponse;
}

export const ClaimCancelForm = ({ orderOptionData }: ClaimCancelFormProps) => {
    const { t } = useTranslation();
    const router = useRouter();
    const isLogin = useAuth();
    const { openAsyncDialog } = useDialog();

    const orderOptionNo = Number(router.query.orderOptionNo) || 0;
    const returnOrderNo = router.query.returnOrderNo as string | undefined;

    const claimCancelSchema = useMemo(
        () => createClaimCancelSchema(orderOptionData.payType ?? undefined),
        [orderOptionData.payType],
    );

    const methods = useForm<ClaimCancelSchemaType>({
        shouldFocusError: true,
        resolver: zodResolver(claimCancelSchema),
        defaultValues: {
            claimType: CLAIM_TYPE,
            refundsImmediately: true,
            saveBankAccountInfo: false,
            claimedProductOptions: [],
            bankAccountInfo: {
                bank: undefined,
                bankAccount: '',
                bankDepositorName: '',
                bankName: '',
            },
        },
    });

    const { handleSubmit, reset, control } = methods;

    const claimedProductOptions = useWatch({
        control,
        name: 'claimedProductOptions',
    });
    const claimReasonType = useWatch({ control, name: 'claimReasonType' });
    const responsibleObjectType = useWatch({
        control,
        name: 'responsibleObjectType',
    });

    const filteredClaimedProductOptions = useMemo(() => {
        return pipe(
            claimedProductOptions ?? [],
            filter((option) => option.isChecked),
            toArray,
        );
    }, [claimedProductOptions]);

    const estimateRequestData = {
        claimType: CLAIM_TYPE,
        claimReasonType,
        responsibleObjectType,
        productCnt: filteredClaimedProductOptions?.reduce(
            (acc, option) => acc + option.productCnt,
            0,
        ),
        claimedProductOptions: pipe(
            filteredClaimedProductOptions ?? [],
            map((option) => ({
                productCnt: option.productCnt,
                orderProductOptionNo: option.orderProductOptionNo,
            })),
            toArray,
        ),
    };

    const { data: memberEstimateData } = useEstimate({
        data: estimateRequestData,
        options: { enabled: !!isLogin },
    });

    const { data: guestEstimateData } = useGuestEstimate({
        data: estimateRequestData,
        options: { enabled: !isLogin },
    });
    const estimateData = isLogin ? memberEstimateData : guestEstimateData;

    const orderOptionList = useMemo(() => {
        return [
            orderOptionData.originalOption,
            ...(orderOptionData.claimableOptions || []),
        ];
    }, [orderOptionData]);

    useEffect(() => {
        reset((prev) => ({
            ...prev,
            claimedProductOptions: orderOptionList.map((option) => ({
                isChecked:
                    option.orderOptionNo ===
                    orderOptionData.originalOption.orderOptionNo,
                orderProductOptionNo: option.orderOptionNo,
                productCnt: option.orderCnt,
            })),
        }));
    }, [reset, orderOptionData, orderOptionList]);

    const {
        requestCancelOptions: {
            mutate: cancelOptionsMutate,
            isPending: isCancelOptionsPending,
        },
    } = useMemberClaimMutation({
        orderNo: orderOptionData.originalOption.orderNo,
        orderOptionNo,
    });

    const {
        requestCancelOptions: {
            mutate: guestCancelOptionsMutate,
            isPending: isGuestCancelOptionsPending,
        },
    } = useGuestClaimMutation({
        orderOptionNo,
        orderNo: orderOptionData.originalOption.orderNo,
    });

    const isPending = isLogin
        ? isCancelOptionsPending
        : isGuestCancelOptionsPending;

    const onSubmit = handleSubmit(async (data) => {
        const isAgree = await openAsyncDialog({
            message: t('해당 주문을 취소하시겠습니까?'),
            onCloseReturnValue: false,
            onConfirmReturnValue: true,
        });

        if (!isAgree) {
            return;
        }

        const cleaningSubmitData = {
            ...data,
            claimedProductOptions: data.claimedProductOptions.filter(
                (option) => option.isChecked,
            ),
        };

        const parsedData = {
            data: claimCancelSchema.parse(cleaningSubmitData),
        };

        const callback = {
            onSuccess: async () => {
                await openAsyncDialog({
                    message: t('주문 취소가 완료되었습니다.'),
                    onCloseReturnValue: false,
                    onConfirmReturnValue: true,
                });

                if (isLogin) {
                    router.replace(PATHS.MYPAGE.ORDERS.MAIN);
                    return;
                }

                if (returnOrderNo) {
                    router.replace(
                        `${PATHS.GUEST.ORDER.MAIN}/${returnOrderNo}`,
                    );
                } else {
                    router.back();
                }
            },
        };

        if (isLogin) {
            cancelOptionsMutate(parsedData, callback);
        } else {
            guestCancelOptionsMutate(parsedData, callback);
        }
    });

    return (
        <FormProvider {...methods}>
            <form
                onSubmit={onSubmit}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '60px',
                }}
            >
                <ClaimOrderOptions orderOptionList={orderOptionList} />

                <ClaimReason claimType={CLAIM_TYPE} orderOptionData={orderOptionData} />

                {estimateData && !isEmpty(filteredClaimedProductOptions) && (
                    <ClaimPriceInfo claimPriceData={estimateData} />
                )}

                <ClaimBankInfo
                    payType={orderOptionData.payType}
                    refundAccount={orderOptionData.refundAccount}
                    availableBanks={orderOptionData.availableBanks || []}
                />

                <div style={{ display: 'flex', gap: '12px' }}>
                    <Button
                        frame='outlined'
                        type='button'
                        onClick={() => router.back()}
                        style={{ flex: 1 }}
                    >
                        {t('돌아가기')}
                    </Button>
                    <Button
                        type='submit'
                        frame='solid'
                        variant='primary'
                        disabled={isPending}
                        style={{ flex: 1 }}
                    >
                        {t('취소신청')}
                    </Button>
                </div>
            </form>
        </FormProvider>
    );
};

export default ClaimCancelForm;
