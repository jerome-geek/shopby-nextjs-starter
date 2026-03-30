import React from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { overlay } from 'overlay-kit';

import * as styles from './ShippingAddressCreateModal.css';
import InputField from '@/components/ui/input/field';
import InputFieldContainer from '@/components/ui/input/FieldContainer';
import { InputLabel } from '@/components/ui/input/label';
import InputCheckbox from '@/components/ui/input/Checkbox';
import Select from '@/components/ui/select';
import ModalLayout from '@/components/layout/modal';
import AddressSearchModal from '@/components/modal/AddressSearch';
import useShippingAddressMutation from '@/hooks/mutations/useShippingAddressMutation';
import { Address } from '@/models/order/shippingAddress';

const schema = z.object({
    addressName: z.string().optional(),
    receiverName: z.string().min(1, '받으시는 분을 입력해주세요'),
    phonePrefix: z.string(),
    phoneMiddle: z
        .string()
        .min(3, '올바른 번호를 입력해주세요')
        .max(4, '올바른 번호를 입력해주세요'),
    phoneLast: z
        .string()
        .length(4, '올바른 번호를 입력해주세요'),
    receiverZipCd: z.string().min(1, '주소를 검색해주세요'),
    receiverAddress: z.string().min(1),
    receiverJibunAddress: z.string(),
    receiverDetailAddress: z.string().min(1, '상세 주소를 입력해주세요'),
    deliveryRequest: z.string(),
    addressMemo: z.string().optional(),
    defaultYn: z.enum(['Y', 'N']),
});

type ShippingAddressFormValues = z.infer<typeof schema>;

const phonePrefixOptions = [
    { value: '010', label: '010' },
    { value: '011', label: '011' },
    { value: '016', label: '016' },
    { value: '017', label: '017' },
    { value: '019', label: '019' },
];

const DELIVERY_REQUEST_DIRECT = 'DIRECT';

interface ShippingAddressCreateModalProps {
    isOpen: boolean;
    onClose: () => void;
    unmount: () => void;
    initialData?: Address;
    onSuccess?: () => void;
}

const parsePhone = (contact: string) => {
    const parts = contact.split('-');
    return {
        prefix: parts[0] || '010',
        middle: parts[1] || '',
        last: parts[2] || '',
    };
};

const ShippingAddressCreateModal = ({
    isOpen,
    onClose,
    unmount,
    initialData,
    onSuccess,
}: ShippingAddressCreateModalProps) => {
    const { t } = useTranslation();
    const { register: registerAddress, update } = useShippingAddressMutation();
    const isEditMode = !!initialData;

    const parsedPhone = initialData?.receiverContact1
        ? parsePhone(initialData.receiverContact1)
        : { prefix: '010', middle: '', last: '' };

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<ShippingAddressFormValues>({
        resolver: zodResolver(schema),
        defaultValues: {
            addressName: initialData?.addressName ?? '',
            receiverName: initialData?.receiverName ?? '',
            phonePrefix: parsedPhone.prefix,
            phoneMiddle: parsedPhone.middle,
            phoneLast: parsedPhone.last,
            receiverZipCd: initialData?.receiverZipCd ?? '',
            receiverAddress: initialData?.receiverAddress ?? '',
            receiverJibunAddress: initialData?.receiverJibunAddress ?? '',
            receiverDetailAddress: initialData?.receiverDetailAddress ?? '',
            deliveryRequest: DELIVERY_REQUEST_DIRECT,
            addressMemo: initialData?.addressMemo ?? '',
            defaultYn: initialData?.defaultYn ?? 'N',
        },
    });

    const deliveryRequest = watch('deliveryRequest');
    const defaultYn = watch('defaultYn');
    const receiverZipCd = watch('receiverZipCd');
    const receiverAddress = watch('receiverAddress');

    const deliveryRequestOptions = [
        { value: DELIVERY_REQUEST_DIRECT, label: t('직접 입력') },
        { value: 'DOOR', label: t('문 앞에 놓아주세요') },
        { value: 'SECURITY', label: t('경비실에 맡겨주세요') },
        { value: 'BOX', label: t('택배함에 넣어주세요') },
    ];

    const handleAddressSearch = () => {
        overlay.open(
            ({
                isOpen: isSearchOpen,
                close: closeSearch,
                unmount: unmountSearch,
            }) => (
                <AddressSearchModal
                    isOpen={isSearchOpen}
                    close={closeSearch}
                    unmount={unmountSearch}
                    onSelect={(data) => {
                        setValue('receiverZipCd', data.receiverZipCd, {
                            shouldValidate: true,
                        });
                        setValue('receiverAddress', data.receiverAddress);
                        setValue(
                            'receiverJibunAddress',
                            data.receiverJibunAddress,
                        );
                    }}
                />
            ),
        );
    };

    const onSubmit = (values: ShippingAddressFormValues) => {
        const addressMemo =
            values.deliveryRequest === DELIVERY_REQUEST_DIRECT
                ? (values.addressMemo ?? '')
                : (deliveryRequestOptions.find(
                      (o) => o.value === values.deliveryRequest,
                  )?.label ?? '');

        const data = {
            addressName: values.addressName ?? '',
            receiverName: values.receiverName,
            receiverContact1: `${values.phonePrefix}${values.phoneMiddle}${values.phoneLast}`,
            receiverZipCd: values.receiverZipCd,
            receiverAddress: values.receiverAddress,
            receiverJibunAddress: values.receiverJibunAddress,
            receiverDetailAddress: values.receiverDetailAddress,
            addressMemo,
            defaultYn: values.defaultYn,
            addressType: 'BOOK' as const,
        };

        if (isEditMode) {
            update.mutate(
                { addressNo: initialData.addressNo, data },
                {
                    onSuccess: () => {
                        onSuccess?.();
                        onClose();
                    },
                },
            );
        } else {
            registerAddress.mutate(
                { data },
                {
                    onSuccess: () => {
                        onSuccess?.();
                        onClose();
                    },
                },
            );
        }
    };

    const isPending = registerAddress.isPending || update.isPending;

    return (
        <ModalLayout
            isOpen={isOpen}
            close={onClose}
            unmount={unmount}
            title={t(isEditMode ? '배송지 수정' : '신규 배송지 등록')}
            size='medium'
            footerButtonList={[
                <button
                    key='cancel-btn'
                    type='button'
                    className={styles.cancelButton}
                    onClick={onClose}
                >
                    {t('취소하기')}
                </button>,
                <button
                    key='submit-btn'
                    type='button'
                    className={styles.submitButton}
                    disabled={isPending}
                    onClick={handleSubmit(onSubmit)}
                >
                    {t(isEditMode ? '수정하기' : '등록하기')}
                </button>,
            ]}
        >
            <div className={styles.formContent}>
                <div className={styles.checkboxGroup}>
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                        }}
                    >
                        <InputCheckbox
                            id='defaultYn'
                            checked={defaultYn === 'Y'}
                            onCheckedChange={(checked) =>
                                setValue('defaultYn', checked ? 'Y' : 'N')
                            }
                        />
                        <label
                            htmlFor='defaultYn'
                            style={{ fontSize: '14px', cursor: 'pointer' }}
                        >
                            {t('기본 배송지로 설정')}
                        </label>
                    </div>
                </div>

                <InputFieldContainer>
                    <InputLabel>{t('배송지명')}</InputLabel>
                    <InputField
                        placeholder={t('예: 집, 회사')}
                        {...register('addressName')}
                    />
                </InputFieldContainer>

                <InputFieldContainer>
                    <InputLabel isRequired>{t('받으시는 분')}</InputLabel>
                    <InputField
                        placeholder={t('이름을 입력해주세요')}
                        {...register('receiverName')}
                    />
                </InputFieldContainer>

                <InputFieldContainer>
                    <InputLabel isRequired>{t('휴대폰 번호')}</InputLabel>
                    <div className={styles.phoneInputGroup}>
                        <div style={{ width: '120px', flexShrink: 0 }}>
                            <Select
                                options={phonePrefixOptions}
                                defaultValue={phonePrefixOptions.find(
                                    (o) => o.value === parsedPhone.prefix,
                                )}
                                onChange={(option) =>
                                    setValue(
                                        'phonePrefix',
                                        (option as { value: string }).value,
                                    )
                                }
                            />
                        </div>
                        <InputField
                            placeholder='0000'
                            maxLength={4}
                            inputMode='numeric'
                            {...register('phoneMiddle')}
                        />
                        <InputField
                            placeholder='0000'
                            maxLength={4}
                            inputMode='numeric'
                            {...register('phoneLast')}
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
                        {...register('receiverDetailAddress')}
                    />
                </InputFieldContainer>

                <InputFieldContainer>
                    <InputLabel>{t('배송 요청사항')}</InputLabel>
                    <Select
                        options={deliveryRequestOptions}
                        defaultValue={deliveryRequestOptions[0]}
                        onChange={(option) =>
                            setValue(
                                'deliveryRequest',
                                (option as { value: string }).value,
                            )
                        }
                    />
                    {deliveryRequest === DELIVERY_REQUEST_DIRECT && (
                        <InputField
                            placeholder={t('배송지 메모를 입력해주세요')}
                            style={{ marginTop: '8px' }}
                            {...register('addressMemo')}
                        />
                    )}
                </InputFieldContainer>
            </div>
        </ModalLayout>
    );
};

export default ShippingAddressCreateModal;
