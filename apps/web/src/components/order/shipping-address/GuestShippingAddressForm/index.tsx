import { overlay } from 'overlay-kit';
import { useState } from 'react';
import { Controller, Path, useFormContext, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { AddressSearchModal } from '@/components/modal';
import { InputCheckbox } from '@/components/ui';
import InputField from '@/components/ui/input/field';
import InputFieldContainer from '@/components/ui/input/FieldContainer';
import { InputLabel } from '@/components/ui/input/label';
import Select from '@/components/ui/select';
import { PHONE_PREFIX_NUMBER_LIST } from '@/const/form';
import { PaymentReserveSchemaType } from '@/schema';
import * as styles from './index.css';
import { AddressSearchBottomSheet } from '@/components/bottom-sheet/address-search';
import { useResponsive } from '@/hooks/utils';

const DELIVERY_REQUEST_DIRECT = 'DIRECT';

const GuestShippingAddressForm = () => {
    const { t } = useTranslation();

    const { isMobile } = useResponsive();

    const { register, setValue, watch, control } =
        useFormContext<PaymentReserveSchemaType>();

    // UI 전용 상태: 배송 요청사항 셀렉트 선택값
    const [deliveryRequest, setDeliveryRequest] = useState(
        DELIVERY_REQUEST_DIRECT,
    );

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

    // 개별 필드가 바뀔 때마다 receiverContact1에 하이픈 없이 합침
    const receiverZipCd = useWatch({
        control,
        name: 'shippingAddress.receiverZipCd',
    });
    const receiverAddress = useWatch({
        control,
        name: 'shippingAddress.receiverAddress',
    });

    console.log('🚀 ~ GuestShippingAddressForm ~ ordererName:', ordererName);

    const [isSameAsOrderer, setIsSameAsOrderer] = useState(false);

    const deliveryRequestOptions = [
        { value: DELIVERY_REQUEST_DIRECT, label: t('직접 입력') },
        { value: 'DOOR', label: t('문 앞에 놓아주세요') },
        { value: 'SECURITY', label: t('경비실에 맡겨주세요') },
        { value: 'BOX', label: t('택배함에 넣어주세요') },
    ];

    const setAddressMemo = (memo: string) =>
        setValue(
            'shippingAddress.addressMemo' as Path<PaymentReserveSchemaType>,
            memo,
        );

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
                        );
                        setValue(
                            'shippingAddress.receiverAddress',
                            data.receiverAddress,
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
                        );
                        setValue(
                            'shippingAddress.receiverAddress',
                            data.receiverAddress,
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

    const handleDeliveryRequestChange = (
        option: (typeof deliveryRequestOptions)[number] | null,
    ) => {
        if (!option) return;

        const { value } = option;
        setDeliveryRequest(value);
        if (value !== DELIVERY_REQUEST_DIRECT) {
            setAddressMemo(option.label);
        } else {
            setAddressMemo('');
        }
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
                                        (o) => o.value === value,
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
            </InputFieldContainer>

            <InputFieldContainer>
                <InputLabel>{t('배송 요청사항')}</InputLabel>
                <Select
                    options={deliveryRequestOptions}
                    defaultValue={deliveryRequestOptions[0]}
                    onChange={handleDeliveryRequestChange}
                />
                {deliveryRequest === DELIVERY_REQUEST_DIRECT && (
                    <InputField
                        placeholder={t('배송지 메모를 입력해주세요')}
                        style={{ marginTop: '8px' }}
                        onChange={(e) => setAddressMemo(e.target.value)}
                    />
                )}
            </InputFieldContainer>
        </div>
    );
};

export default GuestShippingAddressForm;
