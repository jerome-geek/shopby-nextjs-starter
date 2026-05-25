import { isEmpty, map, pipe, toArray } from '@fxts/core';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/router';
import { useEffect, useMemo } from 'react';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import storageImage from '@/api/storage/image';
import ClaimExchangeAddress from '@/components/mypage/claims/forms/exchange-address';
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
import { useGuestOrderOptionEstimate } from '@/hooks/query/claim/guest';
import { useOrderOptionEstimate } from '@/hooks/query/claim/member';
import { useAuth } from '@/hooks/useAuth';
import { useDialog, useGlobal } from '@/hooks/utils';
import type {
    GetOrderOptionDetailForClaimResponse,
    RequestExchangeData,
} from '@/models/claim/member';
import {
    claimExchangeSchema,
    ClaimExchangeSchemaType,
} from '@/schema/claim.schema';

const CLAIM_TYPE = 'EXCHANGE' as const;

interface ClaimExchangeFormProps {
    orderOptionData: GetOrderOptionDetailForClaimResponse;
}

export const ClaimExchangeForm = ({
    orderOptionData,
}: ClaimExchangeFormProps) => {
    const { t } = useTranslation();
    const router = useRouter();
    const isLogin = useAuth();
    const { openAsyncDialog } = useDialog();
    const { isKorean } = useGlobal();

    const orderOptionNo = Number(router.query.orderOptionNo) || 0;
    const returnOrderNo = router.query.returnOrderNo as string | undefined;

    const methods = useForm<ClaimExchangeSchemaType>({
        shouldFocusError: true,
        resolver: zodResolver(claimExchangeSchema),
        defaultValues: {
            claimType: CLAIM_TYPE,
            saveBankAccountInfo: false,
            returnWayType: 'SELLER_COLLECT',
        },
    });

    const { handleSubmit, reset, control, getValues } = methods;

    const claimedProductOptions = useWatch({
        control,
        name: 'claimedProductOptions',
    });
    const claimReasonType = useWatch({ control, name: 'claimReasonType' });
    const productCnt = useWatch({ control, name: 'productCnt' });
    const responsibleObjectType = useWatch({
        control,
        name: 'responsibleObjectType',
    });
    const returnWayType = useWatch({ control, name: 'returnWayType' });

    const estimateSearchParams = {
        claimType: CLAIM_TYPE,
        claimReasonType,
        productCnt: productCnt?.toString() ?? '1',
        exchangeOptionNo: orderOptionData.originalOption.optionNo?.toString(),
        exchangeProductNo: orderOptionData.originalOption.productNo?.toString(),
        exchangeCnt: claimedProductOptions?.[0]?.productCnt?.toString(),
        responsibleObjectType,
        returnWayType,
    };

    const { data: memberEstimateData } = useOrderOptionEstimate({
        orderOptionNo,
        searchParams: estimateSearchParams,
        options: { enabled: !!isLogin },
    });

    const { data: guestEstimateData } = useGuestOrderOptionEstimate({
        orderOptionNo,
        searchParams: estimateSearchParams,
        options: { enabled: !isLogin },
    });

    const estimateData = isLogin ? memberEstimateData : guestEstimateData;

    const orderOptionList = useMemo(() => {
        return [
            orderOptionData.originalOption,
            ...(orderOptionData.claimableOptions || []),
        ];
    }, [orderOptionData]);

    // NOTE: 이후에 교환출고정보가 필요한 경우 해당 조건으로 변경
    // const hasReturnAddress = orderOptionData.returnAddress !== null;
    const hasReturnAddress = null;
    const hasExchangeAddress = orderOptionData.exchangeAddress !== null;

    useEffect(() => {
        reset((prev) => ({
            ...prev,
            productCnt: orderOptionData.originalOption.orderCnt,
            exchangeOption: {
                inputTexts: orderOptionData.originalOption.inputs,
                orderCnt: orderOptionData.originalOption.orderCnt,
                optionNo: orderOptionData.originalOption.optionNo,
                productNo: orderOptionData.originalOption.productNo,
                additionalProductNo:
                    orderOptionData.originalOption.additionalProductNo,
            },
            claimedProductOptions: orderOptionList.map((option) => ({
                isChecked:
                    option.orderOptionNo ===
                    orderOptionData.originalOption.orderOptionNo,
                orderProductOptionNo: option.orderOptionNo,
                productCnt: option.orderCnt,
            })),
            returnAddress: orderOptionData.returnAddress
                ? {
                      receiverLastName:
                          orderOptionData.returnAddress?.shippingEtcInfo
                              ?.receiverLastName || '',
                      receiverFirstName:
                          orderOptionData.returnAddress?.shippingEtcInfo
                              ?.receiverFirstName || '',
                      receiverName:
                          orderOptionData.returnAddress.receiverName || '',
                      receiverJibunAddress:
                          orderOptionData.returnAddress.receiverJibunAddress ||
                          orderOptionData.returnAddress.receiverAddress ||
                          '',
                      countryCd: orderOptionData.returnAddress.countryCd || '',
                      receiverZipCd:
                          orderOptionData.returnAddress.receiverZipCd || '',
                      receiverAddress:
                          orderOptionData.returnAddress.receiverAddress || '',
                      receiverDetailAddress:
                          orderOptionData.returnAddress.receiverDetailAddress ??
                          '',
                      receiverContact1:
                          orderOptionData.returnAddress.receiverContact1 || '',
                      receiverContact2:
                          orderOptionData.returnAddress.receiverContact2 || '',
                      receiverCity:
                          orderOptionData.returnAddress.receiverCity || '',
                      receiverState:
                          orderOptionData.returnAddress.receiverState || '',
                      receiverMobileCountryCd:
                          orderOptionData.returnAddress
                              .receiverMobileCountryCd || '',
                  }
                : prev.returnAddress,
            exchangeAddress: orderOptionData.exchangeAddress
                ? {
                      receiverLastName:
                          orderOptionData.exchangeAddress?.shippingEtcInfo
                              ?.receiverLastName || '',
                      receiverFirstName:
                          orderOptionData.exchangeAddress?.shippingEtcInfo
                              ?.receiverFirstName || '',
                      receiverName:
                          orderOptionData.exchangeAddress.receiverName || '',
                      receiverJibunAddress:
                          orderOptionData.exchangeAddress
                              .receiverJibunAddress ||
                          orderOptionData.exchangeAddress.receiverAddress ||
                          '',
                      countryCd:
                          orderOptionData.exchangeAddress.countryCd || '',
                      receiverZipCd:
                          orderOptionData.exchangeAddress.receiverZipCd || '',
                      receiverAddress:
                          orderOptionData.exchangeAddress.receiverAddress || '',
                      receiverDetailAddress:
                          orderOptionData.exchangeAddress
                              .receiverDetailAddress ?? '',
                      receiverContact1:
                          orderOptionData.exchangeAddress.receiverContact1 ||
                          '',
                      receiverContact2:
                          orderOptionData.exchangeAddress.receiverContact2 ||
                          '',
                      deliveryMemo:
                          orderOptionData.exchangeAddress.deliveryMemo ?? '',
                      receiverCity:
                          orderOptionData.exchangeAddress.receiverCity || '',
                      receiverState:
                          orderOptionData.exchangeAddress.receiverState || '',
                      receiverMobileCountryCd:
                          orderOptionData.exchangeAddress
                              .receiverMobileCountryCd || '',
                  }
                : prev.exchangeAddress,
        }));
    }, [reset, orderOptionData, orderOptionList]);

    const {
        requestExchange: {
            mutate: requestExchangeMutate,
            isPending: isExchangePending,
        },
    } = useMemberClaimMutation({
        orderOptionNo,
        orderNo: orderOptionData.originalOption.orderNo,
    });

    const {
        requestExchange: {
            mutate: guestRequestExchangeMutate,
            isPending: isGuestExchangePending,
        },
    } = useGuestClaimMutation({
        orderOptionNo,
        orderNo: orderOptionData.originalOption.orderNo,
    });

    const isPending = isLogin ? isExchangePending : isGuestExchangePending;

    const onSubmit = handleSubmit(async (data) => {
        const isAgree = await openAsyncDialog({
            message: t('해당 주문을 교환하시겠습니까?'),
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

        const submitData = claimExchangeSchema.parse(data);

        const productCnt =
            submitData.claimedProductOptions?.[0]?.productCnt ??
            orderOptionData.originalOption.orderCnt ??
            1;

        const cleanedSubmitData = {
            ...submitData,
            returnAddress: submitData.returnAddress
                ? {
                      ...submitData.returnAddress,
                      receiverName: isKorean
                          ? (submitData.returnAddress.receiverName ?? '')
                          : `${
                                submitData.returnAddress.receiverLastName ?? ''
                            }${
                                submitData.returnAddress.receiverFirstName ?? ''
                            }`,
                  }
                : null,
            exchangeAddress: submitData.exchangeAddress
                ? {
                      ...submitData.exchangeAddress,
                      receiverName: isKorean
                          ? (submitData.exchangeAddress.receiverName ?? '')
                          : `${
                                submitData.exchangeAddress.receiverLastName ??
                                ''
                            }${
                                submitData.exchangeAddress.receiverFirstName ??
                                ''
                            }`,
                  }
                : null,
            exchangeOption: {
                ...submitData.exchangeOption,
                orderCnt: productCnt,
            },
            productCnt,
            claimImageUrls,
            claimedProductOptions: submitData.claimedProductOptions.filter(
                (option) => option.isChecked,
            ),
        };
        const parsedData = {
            orderOptionNo: Number(orderOptionNo),
            data: cleanedSubmitData as RequestExchangeData,
        };

        const callback = {
            onSuccess: async () => {
                await openAsyncDialog({
                    message: t('교환 신청이 완료되었습니다.'),
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
            requestExchangeMutate(parsedData, callback);
        } else {
            guestRequestExchangeMutate(parsedData, callback);
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
                        isFileUploadEnabled={!!hasReturnAddress}
                        orderOptionData={orderOptionData}
                    />

                    {estimateData && (
                        <ClaimPriceInfo claimPriceData={estimateData} />
                    )}

                    {hasReturnAddress && (
                        <ClaimReturnWay orderOptionData={orderOptionData} />
                    )}

                    {hasExchangeAddress && (
                        <ClaimExchangeAddress
                            orderOptionData={orderOptionData}
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
                            {t('교환신청')}
                        </Button>
                    </div>
                </div>
            </form>
        </FormProvider>
    );
};

export default ClaimExchangeForm;
