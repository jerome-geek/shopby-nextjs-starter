import { overlay } from 'overlay-kit';
import { useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { AddressSearchBottomSheet } from '@/shared/overlay/address-search/bottom-sheet';
import type { AddressRegister } from '@/shared/overlay/address-search/content';
import { AddressSearchModal } from '@/shared/overlay/address-search/modal';
import {
    InputField,
    InputFieldContainer,
    InputLabel,
    Select,
} from '@/shared/ui/input';
import { ADDRESS_MEMO_LIST } from '@/const/form';
import * as styles from '@/features/order/components/gift-shipping-info/index.css';
import { useResponsive } from '@/hooks/utils';
import type { LaterShippingInputSchemaType } from '@/entities/order/schema/later-shipping-input';
import { ErrorMessage } from '@/shared/components/form';

const isPresetDeliveryMemo = (memo?: string | null) =>
    ADDRESS_MEMO_LIST.some(
        (item) => item.value === memo && item.value !== '직접 입력',
    );

export const GiftShippingInfo = () => {
    const { t } = useTranslation();
    const { isMobile } = useResponsive();

    const { register, setValue, control } =
        useFormContext<LaterShippingInputSchemaType>();

    const deliveryMemoWatch = useWatch({ control, name: 'deliveryMemo' });

    const [isDirectInputMode, setIsDirectInputMode] = useState(false);

    const findDeliveryMemoOption = (memo?: string | null) => {
        if (!memo?.trim()) {
            return undefined;
        }

        return (
            ADDRESS_MEMO_LIST.find((item) => item.value === memo) ||
            ADDRESS_MEMO_LIST.find((item) => item.value === '직접 입력')
        );
    };

    const hasCustomDeliveryMemo =
        !!deliveryMemoWatch?.trim() && !isPresetDeliveryMemo(deliveryMemoWatch);

    const showCustomMemoInput =
        hasCustomDeliveryMemo ||
        (isDirectInputMode && !deliveryMemoWatch?.trim());

    const selectedDeliveryMemoOption =
        isDirectInputMode && !deliveryMemoWatch?.trim()
            ? ADDRESS_MEMO_LIST.find((item) => item.value === '직접 입력')
            : findDeliveryMemoOption(deliveryMemoWatch);

    const handleAddressSelect = (data: AddressRegister) => {
        setValue('receiverZipCd', data.receiverZipCd, {
            shouldDirty: true,
            shouldValidate: true,
        });
        setValue('receiverAddress', data.receiverAddress, {
            shouldDirty: true,
            shouldValidate: true,
        });
        setValue('receiverJibunAddress', data.receiverJibunAddress, {
            shouldDirty: true,
        });
    };

    const handleAddressSearch = () => {
        overlay.open((props) =>
            isMobile ? (
                <AddressSearchBottomSheet
                    {...props}
                    onSelect={handleAddressSelect}
                />
            ) : (
                <AddressSearchModal {...props} onSelect={handleAddressSelect} />
            ),
        );
    };

    return (
        <section className={styles.container}>
            <h2 className={styles.title}>{t('배송지 정보')}</h2>

            <InputFieldContainer>
                <InputLabel isRequired>{t('받으시는 분')}</InputLabel>
                <InputField
                    placeholder={t('받으시는 분을 입력해 주세요.')}
                    {...register('receiverName')}
                />
                <ErrorMessage name='receiverName' />
            </InputFieldContainer>

            <InputFieldContainer>
                <InputLabel isRequired>{t('휴대폰 번호')}</InputLabel>
                <InputField
                    type='tel'
                    placeholder={t('‘-’없이 입력해 주세요.')}
                    {...register('receiverContact1')}
                />
                <ErrorMessage name='receiverContact1' />
            </InputFieldContainer>

            <InputFieldContainer>
                <InputLabel isRequired>{t('주소')}</InputLabel>
                <div className={styles.fieldRow}>
                    <InputField
                        placeholder={t('우편번호')}
                        style={{ flex: 1 }}
                        readOnly
                        {...register('receiverZipCd')}
                    />
                    <button
                        type='button'
                        className={styles.postcodeButton}
                        onClick={handleAddressSearch}
                    >
                        {t('우편번호 찾기')}
                    </button>
                </div>
                <InputField
                    placeholder={t('기본 주소')}
                    style={{ marginTop: '8px' }}
                    readOnly
                    {...register('receiverAddress')}
                />
                <InputField
                    placeholder={t('상세 주소를 입력해주세요')}
                    style={{ marginTop: '8px' }}
                    {...register('receiverDetailAddress')}
                />
                <ErrorMessage name='receiverZipCd' />
                <ErrorMessage name='receiverAddress' />
                <ErrorMessage name='receiverDetailAddress' />
            </InputFieldContainer>

            <InputFieldContainer>
                <InputLabel>{t('배송 요청사항')}</InputLabel>
                <Select
                    placeholder={t('배송시 요청사항을 선택해 주세요.')}
                    options={ADDRESS_MEMO_LIST}
                    menuPlacement='top'
                    menuPosition='fixed'
                    menuPortalTarget={
                        typeof document !== 'undefined'
                            ? document.body
                            : undefined
                    }
                    getOptionLabel={(option) => t(option.label)}
                    getOptionValue={(option) => option.value}
                    value={selectedDeliveryMemoOption}
                    onChange={(opt) => {
                        if (opt?.value === '직접 입력') {
                            setIsDirectInputMode(true);
                            setValue('deliveryMemo', '', {
                                shouldDirty: true,
                                shouldValidate: true,
                            });
                            return;
                        }

                        setIsDirectInputMode(false);
                        setValue('deliveryMemo', opt?.value ?? '', {
                            shouldDirty: true,
                            shouldValidate: true,
                        });
                    }}
                />
                {showCustomMemoInput && (
                    <InputField
                        placeholder={t('배송지 메모를 입력해주세요')}
                        style={{ marginTop: '8px' }}
                        {...register('deliveryMemo')}
                    />
                )}
                <ErrorMessage name='deliveryMemo' />
            </InputFieldContainer>
        </section>
    );
};
