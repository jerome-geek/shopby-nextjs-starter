import { isEmpty, map, pipe, toArray } from '@fxts/core';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/router';
import { useEffect, useMemo } from 'react';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import storageImage from '@/api/storage/image';
import LoadingWrapper from '@/components/common/loading-wrapper';
import ClaimPriceInfo from '@/components/mypage/claims/forms/price-info';
import ClaimReason from '@/components/mypage/claims/forms/reason';
import ClaimReturnWay from '@/components/mypage/claims/forms/return-way';
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
import { useDialog, useGlobal } from '@/hooks/utils';
import type { RequestReturnMultipleOptionsData } from '@/models/claim/member';
import {
    claimReturnSchema,
    ClaimReturnSchemaType,
} from '@/schema/claim.schema';

const CLAIM_TYPE = 'RETURN' as const;

export const ClaimReturnForm = () => {
    const { t } = useTranslation();
    const router = useRouter();
    const isLogin = useAuth();
    const { openAsyncDialog } = useDialog();
    const { isKorean } = useGlobal();

    const orderOptionNo = Number(router.query.orderOptionNo) || 0;
    const returnOrderNo = router.query.returnOrderNo as string | undefined;

    const methods = useForm<ClaimReturnSchemaType>({
        shouldFocusError: true,
        resolver: zodResolver(claimReturnSchema),
        defaultValues: {
            claimType: CLAIM_TYPE,
            saveBankAccountInfo: false,
            returnWayType: 'SELLER_COLLECT',
        },
    });

    const { handleSubmit, reset, getValues, watch, control } = methods;

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
        returnWayType: watch('returnWayType'),
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

    const isNullAddress = isFetched
        ? orderOptionData?.returnAddress === null
        : true;

    useEffect(() => {
        if (!orderOptionData) return;

        reset((prev) => ({
            ...prev,
            saveBankAccountInfo:
                orderOptionData.payType === 'ACCOUNT' ||
                orderOptionData.payType === 'VIRTUAL_ACCOUNT' ||
                orderOptionData.payType === 'ESCROW_VIRTUAL_ACCOUNT',
            claimedProductOptions: orderOptionList.map((option) => ({
                isChecked:
                    option.orderOptionNo ===
                    orderOptionData.originalOption.orderOptionNo,
                orderProductOptionNo: option.orderOptionNo,
                productCnt: option.orderCnt,
            })),
        }));

        const returnAddress = orderOptionData.returnAddress;
        if (returnAddress) {
            reset((prev) => ({
                ...prev,
                returnAddress: {
                    receiverLastName:
                        returnAddress.shippingEtcInfo?.receiverLastName || '',
                    receiverFirstName:
                        returnAddress.shippingEtcInfo?.receiverFirstName || '',
                    receiverName: returnAddress.receiverName || '',
                    receiverJibunAddress:
                        returnAddress.receiverJibunAddress ||
                        returnAddress.receiverAddress ||
                        '',
                    countryCd: returnAddress.countryCd || '',
                    receiverZipCd: returnAddress.receiverZipCd || '',
                    receiverAddress: returnAddress.receiverAddress || '',
                    receiverDetailAddress:
                        returnAddress.receiverDetailAddress ?? '',
                    receiverContact1: returnAddress.receiverContact1 || '',
                    receiverContact2: returnAddress.receiverContact2 || '',
                    deliveryMemo: returnAddress.deliveryMemo ?? '',
                    receiverCity: returnAddress.receiverCity || '',
                    receiverState: returnAddress.receiverState || '',
                    receiverMobileCountryCd:
                        returnAddress.receiverMobileCountryCd || '',
                },
            }));
        }
    }, [reset, orderOptionData, orderOptionList]);

    const {
        requestReturnMultipleOptions: {
            mutate: requestReturnMutate,
            isPending: isReturnPending,
        },
    } = useMemberClaimMutation({
        orderOptionNo,
        orderNo: orderOptionData?.originalOption.orderNo,
    });

    const {
        requestReturnMultipleOptions: {
            mutate: guestRequestReturnMutate,
            isPending: isGuestReturnPending,
        },
    } = useGuestClaimMutation({
        orderOptionNo,
        orderNo: orderOptionData?.originalOption.orderNo,
    });

    const isPending = isLogin ? isReturnPending : isGuestReturnPending;

    const onSubmit = handleSubmit(async (data) => {
        const isAgree = await openAsyncDialog({
            message: t('해당 주문을 반품하시겠습니까?'),
            onCloseReturnValue: false,
            onConfirmReturnValue: true,
        });

        if (!isAgree) return;

        let claimImageUrls: string[] = [];
        const uploadImageFiles = getValues('uploadImageFiles');

        if (!isEmpty(uploadImageFiles)) {
            const responses = await Promise.all(
                (uploadImageFiles ?? []).map((image) => {
                    const formData = new FormData();
                    formData.append('file', image as Blob);
                    return storageImage.uploadImage({ data: formData });
                }),
            );
            claimImageUrls = pipe(
                responses,
                map((r) => r.data.imageUrl),
                toArray,
            );
        }

        const submitData = claimReturnSchema.parse(data);

        const cleanedSubmitData = {
            ...submitData,
            claimImageUrls,
            returnAddress: submitData.returnAddress
                ? {
                      ...submitData.returnAddress,
                      receiverName: isKorean
                          ? (submitData.returnAddress.receiverName ?? '')
                          : `${submitData.returnAddress.receiverLastName ?? ''}${submitData.returnAddress.receiverFirstName ?? ''}`,
                  }
                : null,
            claimedProductOptions: submitData.claimedProductOptions.filter(
                (option) => option.isChecked,
            ),
        };

        const parsedData = {
            orderOptionNo: Number(orderOptionNo),
            data: cleanedSubmitData as RequestReturnMultipleOptionsData,
        };

        const callback = {
            onSuccess: async () => {
                await openAsyncDialog({
                    message: t('반품 신청이 완료되었습니다.'),
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
            requestReturnMutate(parsedData, callback);
        } else {
            guestRequestReturnMutate(parsedData, callback);
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
                        isFileUploadEnabled
                    />

                    {estimateData && (
                        <ClaimPriceInfo claimPriceData={estimateData} />
                    )}

                    {!isNullAddress && (
                        <ClaimReturnWay
                            orderOptionNo={orderOptionNo}
                            claimType={CLAIM_TYPE}
                        />
                    )}

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
                            {t('반품신청')}
                        </Button>
                    </div>
                </div>
            </form>
        </FormProvider>
    );
};

export default ClaimReturnForm;
