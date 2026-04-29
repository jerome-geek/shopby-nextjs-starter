import { includes } from '@fxts/core';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { overlay } from 'overlay-kit';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { AddressSearchBottomSheet } from '@/components/bottom-sheet/address-search';
import { BottomSheetLayout, ModalLayout } from '@/components/layout';
import { AddressSearchModal } from '@/components/modal';
import * as styles from '@/components/order/shipping-address/ShippingAddressCreateModal.css';
import { Button } from '@/components/ui';
import { ErrorMessage } from '@/components/ui/form';
import {
    InputCheckbox,
    InputField,
    InputFieldContainer,
    InputLabel,
    Select,
} from '@/components/ui/input';
import { ADDRESS_MEMO_LIST, PHONE_PREFIX_NUMBER_LIST } from '@/const/form';
import useShippingAddressMutation from '@/hooks/mutations/useShippingAddressMutation';
import { addressKeys } from '@/hooks/queryKeys';
import { useDialog, useGlobal, useResponsive } from '@/hooks/utils';
import type { Address } from '@/models/order/shippingAddress';
import {
    getRegisterShippingAddressSchema,
    type RegisterShippingAddressSchemaType,
} from '@/schema/shippingAddress.schema';

interface ShippingAddressCreateModalProps {
    isOpen: boolean;
    onClose: () => void;
    unmount: () => void;
    initialData?: Address;
}

const ShippingAddressCreateModal = ({
    isOpen,
    onClose,
    unmount,
    initialData,
}: ShippingAddressCreateModalProps) => {
    const queryClient = useQueryClient();

    const { t } = useTranslation();

    const { isMobile } = useResponsive();

    const { openDialog } = useDialog();

    const isEditMode = !!initialData;

    const { isKorean } = useGlobal();
    const registerShippingAddressSchema = getRegisterShippingAddressSchema({
        isGlobalMall: !isKorean,
    });

    const methods = useForm<RegisterShippingAddressSchemaType>({
        resolver: zodResolver(registerShippingAddressSchema),
        defaultValues: {
            countryCd: 'KR',
            addressType: 'BOOK',
            defaultYn: initialData?.defaultYn ?? 'N',
            addressName: initialData?.addressName ?? '',
            receiverName: initialData?.receiverName ?? '',
            receiverZipCd: initialData?.receiverZipCd ?? '',
            receiverAddress: initialData?.receiverAddress ?? '',
            receiverJibunAddress: initialData?.receiverJibunAddress ?? '',
            receiverDetailAddress: initialData?.receiverDetailAddress ?? '',
            addressMemo: initialData?.addressMemo ?? '',
            receiverContact1: initialData?.receiverContact1
                ? {
                      prefix: initialData.receiverContact1.slice(0, 3),
                      middle:
                          initialData.receiverContact1.length === 11
                              ? initialData.receiverContact1.slice(3, 7)
                              : initialData.receiverContact1.slice(3, 6),
                      suffix: initialData.receiverContact1.slice(-4),
                  }
                : {
                      prefix: '010',
                      middle: '',
                      suffix: '',
                  },
        },
    });

    const { register, handleSubmit, control, setValue, watch } = methods;

    const addressMemoWatch = watch('addressMemo');
    const receiverZipCd = watch('receiverZipCd');
    const receiverAddress = watch('receiverAddress');

    const findAddressMemoOption = (memo: string) => {
        return (
            ADDRESS_MEMO_LIST.find((item) => item.value === memo) ||
            ADDRESS_MEMO_LIST.find((item) => item.label === t('직접 입력'))
        );
    };

    const handleAddressSearch = () => {
        overlay.open((props) =>
            isMobile ? (
                <AddressSearchBottomSheet
                    {...props}
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
            ) : (
                <AddressSearchModal
                    {...props}
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

    const {
        register: { mutate: registerMutate, isPending: isRegisterPending },
        update: { mutate: updateMutate, isPending: isUpdatePending },
    } = useShippingAddressMutation();

    const onSubmit = handleSubmit(
        (values) => {
            const data = {
                addressName: values.addressName || '',
                receiverName: values.receiverName || '',
                receiverContact1: `${values.receiverContact1.prefix}${values.receiverContact1.middle}${values.receiverContact1.suffix}`,
                receiverZipCd: values.receiverZipCd,
                receiverAddress: values.receiverAddress,
                receiverJibunAddress: values.receiverJibunAddress,
                receiverDetailAddress: values.receiverDetailAddress,
                addressMemo: values.addressMemo || '',
                defaultYn: values.defaultYn,
                addressType: 'BOOK' as const,
            };

            if (isEditMode) {
                updateMutate(
                    { addressNo: initialData.addressNo, data },
                    {
                        onSuccess: () => {
                            onClose();
                        },
                    },
                );
            } else {
                registerMutate(
                    { data },
                    {
                        onSuccess: () => {
                            queryClient.invalidateQueries({
                                predicate: (query) =>
                                    includes(query.queryKey[0], [
                                        ...addressKeys.all,
                                    ]),
                            });

                            openDialog({ message: '배송지가 등록되었습니다.' });
                            onClose();
                        },
                    },
                );
            }
        },
        (errors) => {
            console.log('🚀 ~ ShippingAddressCreateModal ~ errors:', errors);
            const firstError = Object.values(errors).flatMap((error) => {
                if (error.message) return [error.message];
                if (typeof error === 'object') {
                    return Object.values(error)
                        .map((e: any) => e?.message)
                        .filter(Boolean);
                }
                return [];
            })[0];

            if (firstError) {
                openDialog({
                    message: firstError as string,
                });
            }
        },
    );

    const isPending = isRegisterPending || isUpdatePending;

    const footerButtonList = [
        <Button
            key='cancel-btn'
            type='button'
            frame='outlined'
            variant='secondary'
            onClick={onClose}
        >
            {t('취소하기')}
        </Button>,
        <Button
            key='submit-btn'
            frame='solid'
            variant='apple'
            disabled={isPending}
            onClick={onSubmit}
        >
            {t(isEditMode ? '수정하기' : '등록하기')}
        </Button>,
    ];

    const formContent = (
        <div className={styles.formContent}>
            <div className={styles.checkboxGroup}>
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                    }}
                >
                    <Controller
                        name='defaultYn'
                        control={control}
                        render={({ field }) => (
                            <InputCheckbox
                                id='defaultYn'
                                checked={field.value === 'Y'}
                                onCheckedChange={(checked) =>
                                    field.onChange(checked ? 'Y' : 'N')
                                }
                            />
                        )}
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
                <ErrorMessage name='addressName' />
            </InputFieldContainer>

            <InputFieldContainer>
                <InputLabel isRequired>{t('받으시는 분')}</InputLabel>
                <InputField
                    placeholder={t('이름을 입력해주세요')}
                    {...register('receiverName')}
                />
                <ErrorMessage name='receiverName' />
            </InputFieldContainer>

            <InputFieldContainer>
                <InputLabel isRequired>{t('휴대폰 번호')}</InputLabel>
                <div className={styles.phoneInputGroup}>
                    <div style={{ width: '120px', flexShrink: 0 }}>
                        <Controller
                            name='receiverContact1.prefix'
                            control={control}
                            render={({
                                field: { value, onChange, ...rest },
                            }) => (
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
                    </div>
                    <div style={{ flex: 1 }}>
                        <InputField
                            placeholder='0000'
                            maxLength={4}
                            inputMode='numeric'
                            {...register('receiverContact1.middle')}
                        />
                    </div>
                    <div style={{ flex: 1 }}>
                        <InputField
                            placeholder='0000'
                            maxLength={4}
                            inputMode='numeric'
                            {...register('receiverContact1.suffix')}
                        />
                    </div>
                </div>
                <ErrorMessage name='receiverContact1.middle' />
                <ErrorMessage name='receiverContact1.suffix' />
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
                <ErrorMessage name='receiverZipCd' />
                <ErrorMessage name='receiverDetailAddress' />
            </InputFieldContainer>

            <InputFieldContainer>
                <InputLabel>{t('배송 요청사항')}</InputLabel>
                <Select
                    placeholder={t('배송시 요청사항을 선택해 주세요.')}
                    options={ADDRESS_MEMO_LIST}
                    getOptionLabel={(option) => t(option.label)}
                    getOptionValue={(option) => option.value}
                    value={findAddressMemoOption(addressMemoWatch ?? '')}
                    onChange={(e) => {
                        if (e?.value === t('직접 입력')) {
                            setValue('addressMemo', '');
                        } else {
                            setValue('addressMemo', e?.value ?? '');
                        }
                    }}
                    menuPosition='fixed'
                    menuShouldBlockScroll
                    {...(!isMobile && {
                        menuPortalTarget:
                            typeof window !== 'undefined'
                                ? document.body
                                : undefined,
                    })}
                />
                {(!addressMemoWatch ||
                    !ADDRESS_MEMO_LIST.find(
                        (item) => t(item.value) === addressMemoWatch,
                    )) && (
                    <InputField
                        placeholder={t('배송지 메모')}
                        style={{ marginTop: '8px' }}
                        {...register('addressMemo')}
                    />
                )}
            </InputFieldContainer>
        </div>
    );

    return (
        <FormProvider {...methods}>
            {isMobile ? (
                <BottomSheetLayout
                    isOpen={isOpen}
                    close={onClose}
                    unmount={unmount}
                    title={t(isEditMode ? '배송지 수정' : '신규 배송지 등록')}
                    type='fullscreen'
                    footerButtonList={footerButtonList}
                >
                    {formContent}
                </BottomSheetLayout>
            ) : (
                <ModalLayout
                    isOpen={isOpen}
                    close={onClose}
                    unmount={unmount}
                    title={t(isEditMode ? '배송지 수정' : '신규 배송지 등록')}
                    size='medium'
                    footerButtonList={footerButtonList}
                >
                    {formContent}
                </ModalLayout>
            )}
        </FormProvider>
    );
};

export default ShippingAddressCreateModal;
