import React from 'react';
import { useTranslation } from 'react-i18next';
import { useForm, Controller, FormProvider } from 'react-hook-form';
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
import { useDialog } from '@/hooks/utils';
import { phonePrefixType, PhonePrefixType } from '@/schema';
import { PHONE_PREFIX_NUMBER_LIST, ADDRESS_MEMO_LIST } from '@/const/form';
import { useQueryClient } from '@tanstack/react-query';
import { ErrorMessage } from '@/components/ui/form';
import { addressKeys } from '@/hooks/queryKeys';
import { includes } from '@fxts/core';

const schema = z.object({
    addressName: z.string().optional(),
    receiverName: z.string().min(1, '받으시는 분을 입력해주세요'),
    phonePrefix: z.string(),
    phoneMiddle: z
        .string()
        .min(3, '올바른 번호를 입력해주세요')
        .max(4, '올바른 번호를 입력해주세요'),
    phoneLast: z.string().length(4, '올바른 번호를 입력해주세요'),
    receiverZipCd: z.string().min(1, '주소를 검색해주세요'),
    receiverAddress: z.string().min(1),
    receiverJibunAddress: z.string(),
    receiverDetailAddress: z.string().min(1, '상세 주소를 입력해주세요'),
    deliveryRequest: z.string(),
    addressMemo: z.string().optional(),
    defaultYn: z.enum(['Y', 'N']),
});

const getShippingAddressFormSchema = ({
    isGlobalMall,
}: {
    isGlobalMall?: boolean;
} = {}) => {
    return z.object({
        receiverLastName: isGlobalMall ? z.string() : z.string().optional(),
        receiverJibunAddress: z.string(),
        defaultYn: z.enum(['Y', 'N']),
        receiverName: z.string({ error: '받으시는 분 이름을 입력해주세요.' }),
        addressType: z.enum([
            'BOOK',
            'RECENT',
            'RECURRING_PAYMENT',
            'RECURRING_PAYMENT_PRESENT',
        ]),
        customsIdNumber: z.string().nullable().optional(),
        countryCd: z.string().nullable().optional(),
        receiverZipCd: z
            .string({
                error: '우편번호를 입력해주세요.',
            })
            .nonempty('우편번호를 입력해주세요.'),
        addressMemo: z.string().optional(),
        receiverDetailAddress: z.string().nonempty('상세 주소를 입력해주세요.'),
        receiverCity: z.string().optional(),
        city: z.string().optional(),
        receiverMobileCountryCd: isGlobalMall
            ? z.string().nonempty('연락처 국가코드를 선택해주세요.')
            : z.string().nullable().optional(),
        receiverAddress: z.string().nonempty('주소를 입력해주세요.'),
        receiverState: z.string().optional(),
        addressName: z.string().nonempty('배송지명을 입력해주세요.'),
        // NOTE: (해외배송 / 글로벌결제 시 필수) 수령인 FirstName (nullable)
        receiverFirstName: isGlobalMall
            ? z.string().nonempty('이름을 입력해주세요.')
            : z.string().optional(),
        receiverContact1: z.object({
            prefix: z.string().nonempty('연락처를 입력해주세요.'),
            middle: isGlobalMall
                ? z.string().optional()
                : z.string().nonempty('연락처를 입력해주세요.'),
            suffix: isGlobalMall
                ? z.string().optional()
                : z.string().nonempty('연락처를 입력해주세요.'),
        }),
        receiverContact2: z
            .object({
                prefix: z.string().nonempty('연락처를 입력해주세요.'),
                middle: isGlobalMall
                    ? z.string().optional()
                    : z.string().nonempty('연락처를 입력해주세요.'),
                suffix: isGlobalMall
                    ? z.string().optional()
                    : z.string().nonempty('연락처를 입력해주세요.'),
            })
            .optional()
            .nullable(),
    });
};

type ShippingAddressSchemaTypes = z.infer<
    ReturnType<typeof getShippingAddressFormSchema>
>;
type ShippingAddressFormValues = z.infer<typeof schema>;

interface ShippingAddressCreateModalProps {
    isOpen: boolean;
    onClose: () => void;
    unmount: () => void;
    initialData?: Address;
    onSuccess?: () => void;
}

const ShippingAddressCreateModal = ({
    isOpen,
    onClose,
    unmount,
    initialData,
    onSuccess,
}: ShippingAddressCreateModalProps) => {
    const queryClient = useQueryClient();

    const { t } = useTranslation();

    const { openDialog } = useDialog();

    const isEditMode = !!initialData;

    const shippingAddressSchema = getShippingAddressFormSchema();

    const methods = useForm<ShippingAddressSchemaTypes>({
        resolver: zodResolver(shippingAddressSchema),
        defaultValues: {
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

    const {
        register,
        handleSubmit,
        control,
        setValue,
        watch,
        formState: { errors },
    } = methods;

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

    const {
        register: { mutate: registerMutate, isPending: isRegisterPending },
        update: { mutate: updateMutate, isPending: isUpdatePending },
    } = useShippingAddressMutation();

    const onSubmit = handleSubmit(
        (values) => {
            const data = {
                addressName: values.addressName || '',
                receiverName: values.receiverName,
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
                            onSuccess?.();
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
                            onSuccess?.();
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

    return (
        <FormProvider {...methods}>
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
                        onClick={onSubmit}
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
                            value={findAddressMemoOption(
                                addressMemoWatch ?? '',
                            )}
                            onChange={(e) => {
                                if (e?.value === t('직접 입력')) {
                                    setValue('addressMemo', '');
                                } else {
                                    setValue('addressMemo', e?.value ?? '');
                                }
                            }}
                            menuPortalTarget={
                                typeof window !== 'undefined'
                                    ? document.body
                                    : undefined
                            }
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
            </ModalLayout>
        </FormProvider>
    );
};

export default ShippingAddressCreateModal;
