import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/router';
import { useEffect, useMemo } from 'react';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import LoadingWrapper from '@/components/common/loading-wrapper';
import ClaimBankInfo from '@/components/mypage/claims/forms/bank-info';
import ClaimPriceInfo from '@/components/mypage/claims/forms/price-info';
import ClaimReason from '@/components/mypage/claims/forms/reason';
import ClaimOrderOptions from '@/components/mypage/claims/order-options';
import { Button } from '@/components/ui/button';
import { PATHS } from '@/const/paths';
import {
    useGuestClaimMutation,
    useMemberClaimMutation,
} from '@/hooks/mutations';
import useGuestOrderOptionDetailForClaim from '@/hooks/query/claim/guest/useGuestOrderOptionDetailForClaim';
import useGuestOrderOptionEstimate from '@/hooks/query/claim/guest/useGuestOrderOptionEstimate';
import useOrderOptionDetailForClaim from '@/hooks/query/claim/member/useOrderOptionDetailForClaim';
import useOrderOptionEstimate from '@/hooks/query/claim/member/useOrderOptionEstimate';
import { useAuth } from '@/hooks/useAuth';
import { useDialog } from '@/hooks/utils';
import {
    ClaimCancelSchemaType,
    createClaimCancelSchema,
} from '@/schema/claim.schema';

const CLAIM_TYPE = 'CANCEL' as const;

export const ClaimCancelForm = () => {
    const { t } = useTranslation();
    const router = useRouter();
    const isLogin = useAuth();
    const { openAsyncDialog } = useDialog();

    const orderOptionNo = Number(router.query.orderOptionNo) || 0;
    const returnOrderNo = router.query.returnOrderNo as string | undefined;

    const { data: memberData, isFetched: isMemberFetched } =
        useOrderOptionDetailForClaim({
            orderOptionNo,
            searchParams: { claimType: CLAIM_TYPE },
            options: { enabled: !!orderOptionNo && !!isLogin },
        });

    const { data: guestData, isFetched: isGuestFetched } =
        useGuestOrderOptionDetailForClaim({
            orderOptionNo,
            searchParams: { claimType: CLAIM_TYPE },
            options: { enabled: !!orderOptionNo && !isLogin },
        });

    const orderOptionData = isLogin ? memberData : guestData;

    const claimCancelSchema = useMemo(
        () => createClaimCancelSchema(orderOptionData?.payType ?? undefined),
        [orderOptionData?.payType],
    );

    const methods = useForm<ClaimCancelSchemaType>({
        shouldFocusError: true,
        resolver: zodResolver(claimCancelSchema),
        defaultValues: {
            claimType: CLAIM_TYPE,
            refundsImmediately: true,
            saveBankAccountInfo: false,
            claimedProductOptions: [],
        },
    });

    const { handleSubmit, reset, watch, control } = methods;

    const isFetched = isLogin ? isMemberFetched : isGuestFetched;

    const claimedProductOptions = useWatch({
        control,
        name: 'claimedProductOptions',
    });

    const estimateSearchParams = {
        claimType: CLAIM_TYPE,
        claimReasonType: watch('claimReasonType'),
        responsibleObjectType: watch('responsibleObjectType'),
        productCnt: claimedProductOptions?.[0]?.productCnt?.toString() ?? '1',
    };

    const { data: memberEstimateData } = useOrderOptionEstimate({
        orderOptionNo,
        searchParams: estimateSearchParams,
        options: { enabled: isFetched && !!isLogin },
    });

    const { data: guestEstimateData } = useGuestOrderOptionEstimate({
        orderOptionNo,
        searchParams: estimateSearchParams,
        options: { enabled: isFetched && !isLogin },
    });

    const estimateData = isLogin ? memberEstimateData : guestEstimateData;

    const orderOptionList = useMemo(() => {
        if (!orderOptionData) return [];
        return [
            orderOptionData.originalOption,
            ...(orderOptionData.claimableOptions || []),
        ];
    }, [orderOptionData]);

    useEffect(() => {
        if (!orderOptionData) return;

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
        orderNo: orderOptionData?.originalOption.orderNo,
        orderOptionNo,
    });

    const {
        requestCancelOptions: {
            mutate: guestCancelOptionsMutate,
            isPending: isGuestCancelOptionsPending,
        },
    } = useGuestClaimMutation({
        orderOptionNo,
        orderNo: orderOptionData?.originalOption.orderNo,
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
                    gap: '40px',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '60px',
                    }}
                >
                    <LoadingWrapper isLoading={!isFetched} isLoadedAnimation>
                        <ClaimOrderOptions orderOptionList={orderOptionList} />
                    </LoadingWrapper>

                    <ClaimReason
                        orderOptionNo={orderOptionNo}
                        claimType={CLAIM_TYPE}
                    />

                    {estimateData && (
                        <ClaimPriceInfo claimPriceData={estimateData} />
                    )}

                    <ClaimBankInfo
                        payType={orderOptionData?.payType}
                        refundAccount={orderOptionData?.refundAccount}
                        availableBanks={orderOptionData?.availableBanks || []}
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
                </div>
            </form>
        </FormProvider>
    );
};

export default ClaimCancelForm;
