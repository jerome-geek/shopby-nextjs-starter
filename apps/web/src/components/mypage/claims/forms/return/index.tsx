import { filter, isEmpty, map, pipe, toArray } from '@fxts/core';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/router';
import { useEffect, useMemo } from 'react';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import storageImage from '@/api/storage/image';
import ClaimBankInfo from '@/components/mypage/claims/forms/bank-info';
import ClaimPriceInfo from '@/components/mypage/claims/forms/price-info';
import ClaimReason from '@/components/mypage/claims/forms/reason';
import ClaimReturnWay from '@/components/mypage/claims/forms/return-way';
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
import { useDialog, useGlobal } from '@/hooks/utils';
import type {
    GetOrderOptionDetailForClaimResponse,
    RequestReturnMultipleOptionsData,
} from '@/models/claim/member';
import {
    ClaimReturnSchemaType,
    createClaimReturnSchema,
} from '@/schema/claim.schema';

const CLAIM_TYPE = 'RETURN' as const;

interface ClaimReturnFormProps {
    orderOptionData: GetOrderOptionDetailForClaimResponse;
}

export const ClaimReturnForm = ({ orderOptionData }: ClaimReturnFormProps) => {
    const { t } = useTranslation();
    const router = useRouter();
    const isLogin = useAuth();
    const { openAsyncDialog } = useDialog();
    const { isKorean } = useGlobal();

    const orderOptionNo = Number(router.query.orderOptionNo) || 0;
    const returnOrderNo = router.query.returnOrderNo as string | undefined;

    /** payType을 클로저로 캡처한 스키마 — form 데이터에는 포함되지 않음 */
    const claimReturnSchema = useMemo(
        () => createClaimReturnSchema(orderOptionData.payType ?? undefined),
        [orderOptionData.payType],
    );

    const methods = useForm<ClaimReturnSchemaType>({
        shouldFocusError: true,
        resolver: zodResolver(claimReturnSchema),
        defaultValues: {
            claimType: CLAIM_TYPE,
            saveBankAccountInfo: false,
            returnWayType: 'SELLER_COLLECT',
            bankAccountInfo: {
                bank: undefined,
                bankAccount: '',
                bankDepositorName: '',
                bankName: '',
            },
        },
    });

    const { handleSubmit, reset, getValues, control } = methods;

    const claimedProductOptions = useWatch({
        control,
        name: 'claimedProductOptions',
    });
    const claimReasonType = useWatch({ control, name: 'claimReasonType' });
    const responsibleObjectType = useWatch({
        control,
        name: 'responsibleObjectType',
    });
    const returnWayType = useWatch({ control, name: 'returnWayType' });

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
        returnWayType,
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

    const isNullAddress = orderOptionData.returnAddress === null;

    useEffect(() => {
        reset(
            (prev) => ({
                ...prev,
                claimedProductOptions: orderOptionList.map((option) => ({
                    isChecked:
                        option.orderOptionNo ===
                        orderOptionData.originalOption.orderOptionNo,
                    orderProductOptionNo: option.orderOptionNo,
                    productCnt: option.orderCnt,
                })),
            }),
            {
                keepFieldsRef: true,
            },
        );

        const returnAddress = orderOptionData.returnAddress;
        if (returnAddress) {
            reset(
                (prev) => ({
                    ...prev,
                    returnAddress: {
                        receiverLastName:
                            returnAddress.shippingEtcInfo?.receiverLastName ||
                            '',
                        receiverFirstName:
                            returnAddress.shippingEtcInfo?.receiverFirstName ||
                            '',
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
                        receiverCity: returnAddress.receiverCity || '',
                        receiverState: returnAddress.receiverState || '',
                        receiverMobileCountryCd:
                            returnAddress.receiverMobileCountryCd || '',
                    },
                }),
                {
                    keepFieldsRef: true,
                },
            );
        }
    }, [reset, orderOptionData, orderOptionList]);

    const {
        requestReturnMultipleOptions: {
            mutate: requestReturnMutate,
            isPending: isReturnPending,
        },
    } = useMemberClaimMutation({
        orderOptionNo,
        orderNo: orderOptionData.originalOption.orderNo,
    });

    const {
        requestReturnMultipleOptions: {
            mutate: guestRequestReturnMutate,
            isPending: isGuestReturnPending,
        },
    } = useGuestClaimMutation({
        orderOptionNo,
        orderNo: orderOptionData.originalOption.orderNo,
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
                          ? submitData.returnAddress.receiverName ?? ''
                          : `${
                                submitData.returnAddress.receiverLastName ?? ''
                            }${
                                submitData.returnAddress.receiverFirstName ?? ''
                            }`,
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
                    <ClaimOrderOptions orderOptionList={orderOptionList} />

                    <ClaimReason
                        claimType={CLAIM_TYPE}
                        isFileUploadEnabled
                        orderOptionData={orderOptionData}
                    />

                    {estimateData &&
                        !isEmpty(filteredClaimedProductOptions) && (
                            <ClaimPriceInfo claimPriceData={estimateData} />
                        )}

                    {!isNullAddress && (
                        <ClaimReturnWay orderOptionData={orderOptionData} />
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
                            {t('반품신청')}
                        </Button>
                    </div>
                </div>
            </form>
        </FormProvider>
    );
};

export default ClaimReturnForm;
