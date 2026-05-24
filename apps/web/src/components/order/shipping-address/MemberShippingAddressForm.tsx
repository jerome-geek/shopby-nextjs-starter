import { overlay } from 'overlay-kit';
import { useState } from 'react';
import { Controller, useFormContext, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { AddressSearchBottomSheet } from '@/components/bottom-sheet/address-search';
import { AddressSearchModal } from '@/components/modal';
import { DeliveryRequestForm } from '@/components/order/shipping-address/DeliveryRequestForm';
import * as styles from '@/components/order/shipping-address/GuestShippingAddressForm/index.css';
import {
    InputCheckbox,
    InputField,
    InputFieldContainer,
    InputLabel,
    Select,
} from '@/components/ui/input';
import { PHONE_PREFIX_NUMBER_LIST } from '@/const/form';
import { useResponsive } from '@/hooks/utils';
import { PaymentReserveSchemaType } from '@/schema';
import { ErrorMessage } from '@/shared/components/form';

const MemberShippingAddressForm = () => {
    const { t } = useTranslation();
    const { isMobile } = useResponsive();
    const { register, setValue, control } =
        useFormContext<PaymentReserveSchemaType>();

    const ordererName = useWatch({ control, name: 'orderer.ordererName' });
    const ordererContact1Prefix = useWatch({
        control,
        name: 'orderer.ordererContact1.prefix',
    });
    const ordererContact1Middle = useWatch({
        control,
        name: 'orderer.ordererContact1.middle',
    });
    const ordererContact1Suffix = useWatch({
        control,
        name: 'orderer.ordererContact1.suffix',
    });
    const receiverZipCd = useWatch({
        control,
        name: 'shippingAddress.receiverZipCd',
    });
    const receiverAddress = useWatch({
        control,
        name: 'shippingAddress.receiverAddress',
    });

    const [isSameAsOrderer, setIsSameAsOrderer] = useState(false);

    const handleSameAsOrderer = () => {
        if (isSameAsOrderer) {
            setValue('shippingAddress.receiverName', '');
            setValue('shippingAddress.receiverContact1', {
                prefix: '010',
                middle: '',
                suffix: '',
            });
        } else {
            setValue('shippingAddress.receiverName', ordererName ?? '');
            setValue(
                'shippingAddress.receiverContact1.prefix',
                ordererContact1Prefix,
            );
            setValue(
                'shippingAddress.receiverContact1.middle',
                ordererContact1Middle,
            );
            setValue(
                'shippingAddress.receiverContact1.suffix',
                ordererContact1Suffix,
            );
        }

        setIsSameAsOrderer((prev) => !prev);
    };

    const handleAddressSearch = () => {
        overlay.open((props) =>
            isMobile ? (
                <AddressSearchBottomSheet
                    {...props}
                    onSelect={(data) => {
                        setValue(
                            'shippingAddress.receiverZipCd',
                            data.receiverZipCd,
                            { shouldValidate: true },
                        );
                        setValue(
                            'shippingAddress.receiverAddress',
                            data.receiverAddress,
                            { shouldValidate: true },
                        );
                        setValue(
                            'shippingAddress.receiverJibunAddress',
                            data.receiverJibunAddress,
                        );
                    }}
                />
            ) : (
                <AddressSearchModal
                    {...props}
                    onSelect={(data) => {
                        setValue(
                            'shippingAddress.receiverZipCd',
                            data.receiverZipCd,
                            { shouldValidate: true },
                        );
                        setValue(
                            'shippingAddress.receiverAddress',
                            data.receiverAddress,
                            { shouldValidate: true },
                        );
                        setValue(
                            'shippingAddress.receiverJibunAddress',
                            data.receiverJibunAddress,
                        );
                    }}
                />
            ),
        );
    };

    return (
        <div className={styles.formContent}>
            <div className={styles.ordererInfoRow}>
                <InputCheckbox
                    id='sameAsOrderer'
                    checked={isSameAsOrderer}
                    onCheckedChange={handleSameAsOrderer}
                />
                <label
                    htmlFor='sameAsOrderer'
                    style={{
                        fontSize: '14px',
                    }}
                >
                    {t('주문자 정보 사용')}
                </label>
            </div>

            <InputFieldContainer>
                <InputLabel isRequired>{t('받으시는 분')}</InputLabel>
                <InputField
                    placeholder={t('이름을 입력해주세요')}
                    {...register('shippingAddress.receiverName')}
                />
                <ErrorMessage name='shippingAddress.receiverName' />
            </InputFieldContainer>

            <InputFieldContainer>
                <InputLabel isRequired>{t('휴대폰 번호')}</InputLabel>
                <div className={styles.phoneInputGroup}>
                    <Controller
                        control={control}
                        name='shippingAddress.receiverContact1.prefix'
                        render={({ field: { value, onChange, ...rest } }) => (
                            <Select
                                {...rest}
                                options={PHONE_PREFIX_NUMBER_LIST}
                                value={
                                    PHONE_PREFIX_NUMBER_LIST.find(
                                        (option) => option.value === value,
                                    ) || PHONE_PREFIX_NUMBER_LIST[0]
                                }
                                onChange={(option) => {
                                    if (option) {
                                        onChange(option.value);
                                    }
                                }}
                            />
                        )}
                    />
                    <InputField
                        placeholder='0000'
                        maxLength={4}
                        inputMode='numeric'
                        {...register('shippingAddress.receiverContact1.middle')}
                    />
                    <InputField
                        placeholder='0000'
                        maxLength={4}
                        inputMode='numeric'
                        {...register('shippingAddress.receiverContact1.suffix')}
                    />
                </div>
                <ErrorMessage name='shippingAddress.receiverContact1' />
            </InputFieldContainer>

            <InputFieldContainer>
                <InputLabel isRequired>{t('배송지')}</InputLabel>
                <div className={styles.fieldRow}>
                    <InputField
                        placeholder={t('우편번호')}
                        style={{ flex: 1 }}
                        readOnly
                        value={receiverZipCd}
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
                    value={receiverAddress}
                />
                <InputField
                    placeholder={t('상세 주소를 입력해주세요')}
                    style={{ marginTop: '8px' }}
                    {...register('shippingAddress.receiverDetailAddress')}
                />
                <ErrorMessage name='shippingAddress.receiverZipCd' />
                <ErrorMessage name='shippingAddress.receiverDetailAddress' />
            </InputFieldContainer>

            <DeliveryRequestForm />
        </div>
    );
};

export default MemberShippingAddressForm;
