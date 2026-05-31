import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { FieldErrors, FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import laterShippingInput from '@/entities/order/api/laterShippingInput';
import Seo from '@/shared/components/common/seo';
import { Button } from '@/shared/ui/button';
import { PATHS } from '@/const/paths';
import { GiftOrderProductList } from '@/features/order/components/gift-order-product-list';
import * as styles from '@/features/order/components/gift-shipping-address-content/index.css';
import { GiftShippingInfo } from '@/features/order/components/gift-shipping-info';
import { useLaterInputOrder } from '@/hooks/suspenseQuery/order/laterShippingInput';
import { useToast } from '@/hooks/ui';
import useApiError from '@/hooks/useApiError';
import { useGlobal } from '@/hooks/utils';
import type { UpdateShippingData } from '@/entities/order/model/laterShippingInput';
import {
    laterShippingInputSchema,
    type LaterShippingInputSchemaType,
} from '@/entities/order/schema/later-shipping-input';

interface GiftShippingAddressContentProps {
    encryptedShippingNo: string;
}

const normalizeLaterInputAddressValue = (value?: string | null) => {
    if (!value || value === '-') {
        return '';
    }

    return value;
};

const giftShippingDefaultValues: LaterShippingInputSchemaType = {
    receiverName: '',
    receiverFirstName: '',
    receiverLastName: '',
    receiverContact1: '',
    receiverZipCd: '',
    receiverAddress: '',
    receiverDetailAddress: '',
    receiverJibunAddress: '',
    receiverCity: '',
    receiverState: '',
    deliveryMemo: '',
};

export const GiftShippingAddressContent = ({
    encryptedShippingNo,
}: GiftShippingAddressContentProps) => {
    const { t } = useTranslation();
    const router = useRouter();
    const { addToast } = useToast();
    const { isKorean } = useGlobal();

    const { handleErrorToast } = useApiError();

    const { data: laterInputOrderData } = useLaterInputOrder({
        encryptedShippingNo,
    });

    const methods = useForm<LaterShippingInputSchemaType>({
        resolver: zodResolver(laterShippingInputSchema),
        defaultValues: giftShippingDefaultValues,
    });

    const { reset, handleSubmit } = methods;

    useEffect(() => {
        if (!laterInputOrderData) {
            return;
        }

        const receiverContact1 =
            laterInputOrderData.shippingAddress.receiverContact1?.replace(
                /-/g,
                '',
            ) ?? '';

        const [receiverFirstName = '', receiverLastName = ''] =
            laterInputOrderData.shippingAddress.receiverName?.split(' ') ?? [];

        reset(
            {
                receiverName:
                    laterInputOrderData.shippingAddress.receiverName ?? '',
                receiverFirstName,
                receiverLastName,
                receiverContact1,
                receiverZipCd: normalizeLaterInputAddressValue(
                    laterInputOrderData.shippingAddress.receiverZipCd,
                ),
                receiverAddress: normalizeLaterInputAddressValue(
                    laterInputOrderData.shippingAddress.receiverAddress,
                ),
                receiverDetailAddress: normalizeLaterInputAddressValue(
                    laterInputOrderData.shippingAddress.receiverDetailAddress,
                ),
                receiverJibunAddress: normalizeLaterInputAddressValue(
                    laterInputOrderData.shippingAddress.receiverJibunAddress,
                ),
                receiverCity:
                    laterInputOrderData.shippingAddress.receiverCity ?? '',
                receiverState:
                    laterInputOrderData.shippingAddress.receiverState ?? '',
                countryCd:
                    laterInputOrderData.shippingAddress.countryCd || undefined,
                deliveryMemo:
                    laterInputOrderData.deliveryMemo ??
                    laterInputOrderData.memo ??
                    '',
            },
            { keepDirtyValues: true },
        );
    }, [laterInputOrderData, reset]);

    const { mutateAsync: updateShippingMutateAsync, isPending } = useMutation({
        mutationFn: async (data: LaterShippingInputSchemaType) => {
            const parsed = laterShippingInputSchema.parse(data);
            const submitData: UpdateShippingData = {
                receiverName: isKorean
                    ? parsed.receiverName || ''
                    : `${parsed.receiverFirstName} ${parsed.receiverLastName}`.trim(),
                receiverZipCd: parsed.receiverZipCd,
                receiverDetailAddress: parsed.receiverDetailAddress,
                receiverAddress: parsed.receiverAddress,
                receiverContact1: parsed.receiverContact1,
                receiverJibunAddress: parsed.receiverJibunAddress,
                deliveryMemo: parsed.deliveryMemo,
                receiverCity: parsed.receiverCity,
                receiverState: parsed.receiverState,
                receiverFirstName: parsed.receiverFirstName,
                receiverLastName: parsed.receiverLastName,
                receiverMobileCountryCd: parsed.receiverMobileCountryCd,
                countryCd: parsed.countryCd as UpdateShippingData['countryCd'],
            };

            await laterShippingInput.updateShippings(
                { encryptedShippingNo },
                submitData,
            );
        },
    });

    const onInvalidSubmit = (
        errors: FieldErrors<LaterShippingInputSchemaType>,
    ) => {
        console.error('[gift-shipping] validation failed', errors);
    };

    const onSubmit = handleSubmit(async (data) => {
        try {
            await updateShippingMutateAsync(data);
            addToast({
                message: t('선물배송지 입력이 완료됐습니다.'),
                variant: 'success',
            });
            router.push(PATHS.MAIN);
        } catch (error) {
            handleErrorToast(error);
        }
    }, onInvalidSubmit);

    const ordererName = laterInputOrderData?.orderer?.ordererName || t('고객');

    return (
        <FormProvider {...methods}>
            <Seo title={t('선물 배송지 입력')} />

            <form className={styles.form} onSubmit={onSubmit}>
                <section className={styles.giftInfoContainer}>
                    <div className={styles.titleContainer}>
                        <h1 className={styles.title}>
                            {t(
                                '{{ordererName}} 님이 보낸 선물을 어디로 배송할까요?',
                                { ordererName },
                            )}
                        </h1>
                    </div>

                    <GiftOrderProductList
                        orderOptionsGroupByPartner={
                            laterInputOrderData.orderOptionsGroupByPartner
                        }
                    />
                </section>

                <GiftShippingInfo />

                <div className={styles.buttonContainer}>
                    <Button
                        type='submit'
                        frame='solid'
                        variant='primary'
                        className={styles.submitButton}
                        disabled={isPending}
                    >
                        {t('확인')}
                    </Button>
                </div>
            </form>
        </FormProvider>
    );
};
