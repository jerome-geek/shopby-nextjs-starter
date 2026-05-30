import { find } from '@fxts/core';
import { zodResolver } from '@hookform/resolvers/zod';
import { isAxiosError } from 'axios';
import { useRouter } from 'next/router';
import { overlay } from 'overlay-kit';
import { useEffect } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { address } from '@/api/manage';
import { AddressSearchBottomSheet } from '@/components/bottom-sheet/address-search';
import { AddressSearchModal } from '@/components/modal';
import * as styles from '@/features/mypage/common/mypage-form/index.css';
import { Button } from '@/shared/ui/button';
import {
    InputCheckbox,
    InputContainer,
    InputField,
    InputFieldContainer,
    InputLabel,
    Select,
} from '@/shared/ui/input';
import {
    ADDRESS_MEMO_LIST,
    MOBILE_COUNTRY_CODE_LIST,
    PHONE_PREFIX_NUMBER_LIST,
    STATE_LIST,
} from '@/const/form';
import { PATHS } from '@/const/paths';
import { useShippingAddressMutation } from '@/hooks/mutations';
import { useShippingAddress } from '@/hooks/query/order/shippingAddress';
import { useToast } from '@/hooks/ui';
import { useDialog, useGlobal, useResponsive } from '@/hooks/utils';
import type { CountryCdType } from '@/models';
import type {
    Address,
    RegisterShippingAddressData,
} from '@/models/order/shippingAddress';
import {
    shippingAddressSchema,
    ShippingAddressSchemaType,
} from '@/schema/shippingAddress.schema';
import { ErrorMessage } from '@/shared/components/form';
import { parseKrPhoneParts } from '@/utils/phone';

export interface AddressWriteFormProps {
    addressNo?: number;
}

export const AddressWriteForm = ({ addressNo = 0 }: AddressWriteFormProps) => {
    const { t } = useTranslation();
    const router = useRouter();
    const { isKorean, defaultMobileCountryCode, countryCd } = useGlobal();
    const { openDialog } = useDialog();
    const { addToast } = useToast();

    const { isMobile } = useResponsive();

    const isModify = !!addressNo;
    const mode = isModify ? 'update' : 'register';

    const { data: shippingAddressData } = useShippingAddress({
        addressNo,
        options: {
            enabled: isModify,
        },
    });

    const methods = useForm<ShippingAddressSchemaType>({
        resolver: zodResolver(shippingAddressSchema),
        defaultValues: {
            defaultYn: 'N',
            countryCd,
            receiverMobileCountryCd: defaultMobileCountryCode,
            addressType: 'BOOK',
            customsIdNumber: '',
            addressName: '',
            receiverName: '',
            receiverLastName: '',
            receiverFirstName: '',
            receiverZipCd: '',
            receiverAddress: '',
            receiverJibunAddress: '',
            receiverDetailAddress: '',
            receiverState: '',
            receiverCity: '',
            receiverContact1: {
                prefix: PHONE_PREFIX_NUMBER_LIST[0]!.value,
                middle: '',
                suffix: '',
            },
            receiverContact2: '',
            addressMemo: '',
        },
    });

    const {
        control,
        register,
        handleSubmit,
        setValue,
        watch,
        reset,
        getValues,
        formState: { isSubmitting, errors },
    } = methods;

    const countryCdWatch = watch('countryCd');
    const addressMemoWatch = watch('addressMemo');

    useEffect(() => {
        if (!shippingAddressData) {
            return;
        }

        const a = shippingAddressData as Address;

        const receiverContact1 = parseKrPhoneParts({
            receiverContact1: a.receiverContact1,
            isKorean,
        });

        reset({
            addressType: 'BOOK',
            defaultYn: a.defaultYn,
            countryCd: a.countryCd ?? countryCd,
            receiverMobileCountryCd:
                a.receiverMobileCountryCd ?? defaultMobileCountryCode,
            customsIdNumber: a.customsIdNumber ?? null,
            addressName: a.addressName ?? null,
            receiverName: a.receiverName ?? null,
            receiverLastName: a.lastName ?? '',
            receiverFirstName: a.firstName ?? '',
            receiverZipCd: a.receiverZipCd ?? '',
            receiverAddress: a.receiverAddress ?? '',
            receiverJibunAddress: a.receiverJibunAddress ?? '',
            receiverDetailAddress: a.receiverDetailAddress ?? '',
            receiverState: a.state ?? '',
            receiverCity: a.city ?? '',
            receiverContact1,
            receiverContact2: a.receiverContact2 ?? null,
            addressMemo: a.addressMemo ?? null,
        });
    }, [
        shippingAddressData,
        reset,
        isKorean,
        countryCd,
        defaultMobileCountryCode,
    ]);

    const findAddressMemoOption = (memo: string) =>
        ADDRESS_MEMO_LIST.find((item) => item.value === memo) ||
        ADDRESS_MEMO_LIST.find((item) => item.value === '직접 입력');

    const addressRegister = (next: {
        receiverJibunAddress: string;
        receiverAddress: string;
        receiverZipCd: string;
    }) => {
        setValue('receiverJibunAddress', next.receiverJibunAddress, {
            shouldValidate: true,
        });
        setValue('receiverAddress', next.receiverAddress, {
            shouldValidate: true,
        });
        setValue('receiverZipCd', next.receiverZipCd, {
            shouldValidate: true,
        });
    };

    const onOpenAddressSearchModal = () => {
        overlay.open((props) =>
            isMobile ? (
                <AddressSearchBottomSheet
                    {...props}
                    onSelect={(data) => {
                        addressRegister(data);
                    }}
                />
            ) : (
                <AddressSearchModal
                    {...props}
                    onSelect={(data) => {
                        addressRegister(data);
                    }}
                />
            ),
        );
    };

    const onCountryClick = (value: CountryCdType) => {
        setValue('receiverMobileCountryCd', value);
        reset({
            ...getValues(),
            countryCd: value,
            receiverZipCd: '',
            receiverAddress: '',
            receiverDetailAddress: '',
            receiverJibunAddress: '',
            receiverState: '',
            receiverCity: '',
        });
    };

    const searchJapanAddress = async () => {
        const zipCode = getValues('receiverZipCd');

        if (!zipCode) {
            openDialog({
                message: t('우편번호를 입력해주세요.'),
            });
            return;
        }

        try {
            const { data } = await address.searchJpAddress({ zipCode });
            setValue('receiverState', data.prefCode);
            setValue('receiverAddress', data.address);
            setValue('receiverCity', data.city);
        } catch (error) {
            const msg = isAxiosError(error)
                ? error.response?.data?.message
                : null;
            openDialog({
                message:
                    typeof msg === 'string' && msg
                        ? msg
                        : t('배송지를 등록할 수 없습니다.'),
            });
        }
    };

    const {
        register: { mutate: registerMutate },
        update: { mutate: updateMutate },
    } = useShippingAddressMutation();

    const toApiPayload = (
        submitData: ShippingAddressSchemaType,
    ): RegisterShippingAddressData => {
        const c1 = submitData.receiverContact1;
        const receiverContact1 = `${c1.prefix}${c1.middle ?? ''}${
            c1.suffix ?? ''
        }`;

        return {
            ...submitData,
            receiverName: isKorean
                ? (submitData.receiverName ?? '')
                : `${submitData.receiverFirstName ?? ''} ${
                      submitData.receiverLastName ?? ''
                  }`.trim(),
            receiverContact1,
            countryCd: (submitData.countryCd ?? undefined) as
                | CountryCdType
                | undefined,
        };
    };

    const onSubmit = (data: ShippingAddressSchemaType) => {
        const parsedData = toApiPayload(shippingAddressSchema.parse(data));

        if (mode === 'register') {
            registerMutate(
                { data: parsedData },
                {
                    onSuccess: async () => {
                        addToast({
                            message: t('배송지가 등록되었습니다.'),
                        });
                        router.push(PATHS.MYPAGE.ADDRESSES.MAIN);
                    },
                },
            );
            return;
        }

        if (shippingAddressData) {
            updateMutate(
                {
                    addressNo: shippingAddressData.addressNo,
                    data: parsedData,
                },
                {
                    onSuccess: async () => {
                        addToast({
                            message: t('배송지가 수정되었습니다.'),
                        });
                        router.push(PATHS.MYPAGE.ADDRESSES.MAIN);
                    },
                },
            );
        }
    };

    return (
        <FormProvider {...methods}>
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.content}>
                    <InputContainer>
                        <InputLabel htmlFor='addressName' isRequired>
                            {t('배송지명')}
                        </InputLabel>
                        <InputField
                            id='addressName'
                            placeholder={t('배송지명을 입력해주세요.')}
                            {...register('addressName')}
                            data-error={!!errors.addressName}
                        />
                        <ErrorMessage name='addressName' />
                    </InputContainer>

                    <InputContainer>
                        <InputLabel
                            htmlFor={
                                isKorean ? 'receiverName' : 'receiverLastName'
                            }
                            isRequired
                        >
                            {t('받으시는 분')}
                        </InputLabel>
                        {isKorean ? (
                            <>
                                <InputField
                                    id='receiverName'
                                    placeholder={t(
                                        '받으시는 분을 입력해주세요.',
                                    )}
                                    {...register('receiverName')}
                                    data-error={!!errors.receiverName}
                                />
                                <ErrorMessage name='receiverName' />
                            </>
                        ) : (
                            <>
                                <InputFieldContainer gridRatio={[1, 1]}>
                                    <InputField
                                        id='receiverLastName'
                                        placeholder='Last Name'
                                        {...register('receiverLastName')}
                                        data-error={!!errors.receiverLastName}
                                    />
                                    <InputField
                                        id='receiverFirstName'
                                        placeholder='First Name'
                                        {...register('receiverFirstName')}
                                        data-error={!!errors.receiverFirstName}
                                    />
                                </InputFieldContainer>
                                <ErrorMessage name='receiverFirstName' />
                                <ErrorMessage name='receiverLastName' />
                            </>
                        )}
                    </InputContainer>

                    <InputContainer>
                        <InputLabel isRequired>{t('주소')}</InputLabel>

                        {!isKorean && (
                            <Controller
                                control={control}
                                name='countryCd'
                                render={({ field: { onChange, value } }) => (
                                    <Select
                                        isSearchable
                                        name='countryCd'
                                        options={[...MOBILE_COUNTRY_CODE_LIST]}
                                        value={find(
                                            (item) => item.value === value,
                                            MOBILE_COUNTRY_CODE_LIST,
                                        )}
                                        onChange={(selected) => {
                                            if (selected) {
                                                onChange(selected.value);
                                                onCountryClick(
                                                    selected.value as CountryCdType,
                                                );
                                            }
                                        }}
                                    />
                                )}
                            />
                        )}

                        {countryCdWatch === 'KR' && (
                            <>
                                <InputFieldContainer gridRatio={[3, 1]}>
                                    <InputField
                                        readOnly
                                        {...register('receiverZipCd')}
                                        placeholder={t(
                                            '우편번호를 입력해주세요.',
                                        )}
                                        data-error={!!errors.receiverZipCd}
                                    />
                                    <Button
                                        frame='solid'
                                        variant='apple'
                                        className={styles.postcodeButton}
                                        type='button'
                                        onClick={onOpenAddressSearchModal}
                                    >
                                        {t('우편번호 찾기')}
                                    </Button>
                                </InputFieldContainer>
                                <ErrorMessage name='receiverZipCd' />
                                <InputField
                                    readOnly
                                    {...register('receiverAddress')}
                                    placeholder={t('주소를 입력해주세요.')}
                                    data-error={!!errors.receiverAddress}
                                />
                                <ErrorMessage name='receiverAddress' />
                                <InputField
                                    placeholder={t('상세주소를 입력해주세요.')}
                                    {...register('receiverDetailAddress')}
                                    data-error={!!errors.receiverDetailAddress}
                                />
                                <ErrorMessage name='receiverDetailAddress' />
                            </>
                        )}

                        {countryCdWatch === 'JP' && (
                            <>
                                <InputFieldContainer gridRatio={[3, 1]}>
                                    <InputField
                                        {...register('receiverZipCd')}
                                        placeholder={t(
                                            '우편번호를 입력해주세요.',
                                        )}
                                        data-error={!!errors.receiverZipCd}
                                    />
                                    <Button
                                        frame='solid'
                                        variant='apple'
                                        className={styles.postcodeButton}
                                        type='button'
                                        onClick={searchJapanAddress}
                                    >
                                        {t('우편번호 찾기')}
                                    </Button>
                                </InputFieldContainer>

                                <InputField
                                    {...register('receiverAddress')}
                                    placeholder={t('주소를 입력해주세요.')}
                                    data-error={!!errors.receiverAddress}
                                />
                                <ErrorMessage name='receiverAddress' />

                                <InputField
                                    {...register('receiverDetailAddress')}
                                    placeholder={t('상세주소를 입력해주세요.')}
                                    data-error={!!errors.receiverDetailAddress}
                                />
                                <ErrorMessage name='receiverDetailAddress' />
                            </>
                        )}

                        {countryCdWatch !== 'KR' && countryCdWatch !== 'JP' && (
                            <>
                                <InputField
                                    placeholder='Address'
                                    {...register('receiverAddress')}
                                    data-error={!!errors.receiverAddress}
                                />
                                <ErrorMessage name='receiverAddress' />

                                <InputField
                                    placeholder='DetailAddress'
                                    {...register('receiverDetailAddress')}
                                    data-error={!!errors.receiverDetailAddress}
                                />
                                <ErrorMessage name='receiverDetailAddress' />

                                {countryCdWatch === 'US' ? (
                                    <Controller
                                        control={control}
                                        name='receiverState'
                                        render={({
                                            field: { onChange, value },
                                        }) => (
                                            <Select
                                                isSearchable
                                                name='receiverState'
                                                options={[...STATE_LIST]}
                                                placeholder='State / Province / Region'
                                                value={find(
                                                    (item) =>
                                                        item.value === value,
                                                    STATE_LIST,
                                                )}
                                                onChange={(selected) => {
                                                    if (selected) {
                                                        onChange(
                                                            selected.value,
                                                        );
                                                    }
                                                }}
                                            />
                                        )}
                                    />
                                ) : (
                                    <InputField
                                        placeholder='State / Province / Region'
                                        {...register('receiverState')}
                                    />
                                )}

                                <InputField
                                    placeholder='City'
                                    {...register('receiverCity')}
                                />

                                <InputField
                                    placeholder='Zip/Postal Code'
                                    {...register('receiverZipCd')}
                                    data-error={!!errors.receiverZipCd}
                                />
                                <ErrorMessage name='receiverZipCd' />
                            </>
                        )}
                    </InputContainer>

                    <InputContainer>
                        <InputLabel isRequired>{t('휴대폰 번호')}</InputLabel>

                        {isKorean ? (
                            <InputFieldContainer gridRatio={[1, 1, 1]}>
                                <Controller
                                    control={control}
                                    name='receiverContact1.prefix'
                                    render={({
                                        field: { value, onChange, ...rest },
                                    }) => (
                                        <Select
                                            {...rest}
                                            options={[
                                                ...PHONE_PREFIX_NUMBER_LIST,
                                            ]}
                                            value={
                                                PHONE_PREFIX_NUMBER_LIST.find(
                                                    (o) => o.value === value,
                                                ) ?? PHONE_PREFIX_NUMBER_LIST[0]
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
                                    inputMode='numeric'
                                    maxLength={4}
                                    placeholder='0000'
                                    type='text'
                                    {...register('receiverContact1.middle')}
                                    data-error={
                                        !!errors.receiverContact1?.middle
                                    }
                                />
                                <InputField
                                    inputMode='numeric'
                                    maxLength={4}
                                    placeholder='0000'
                                    type='text'
                                    {...register('receiverContact1.suffix')}
                                    data-error={
                                        !!errors.receiverContact1?.suffix
                                    }
                                />
                            </InputFieldContainer>
                        ) : (
                            <InputFieldContainer gridRatio={[1, 2]}>
                                <Controller
                                    control={control}
                                    name='receiverMobileCountryCd'
                                    render={({
                                        field: { onChange, value },
                                    }) => (
                                        <Select
                                            isSearchable
                                            menuPortalTarget={
                                                typeof document !== 'undefined'
                                                    ? document.body
                                                    : undefined
                                            }
                                            options={[
                                                ...MOBILE_COUNTRY_CODE_LIST,
                                            ]}
                                            placeholder={t(
                                                '국가코드를 선택해주세요.',
                                            )}
                                            value={find(
                                                (item) => item.value === value,
                                                MOBILE_COUNTRY_CODE_LIST,
                                            )}
                                            onChange={(selected) => {
                                                if (selected) {
                                                    setValue(
                                                        'countryCd',
                                                        selected.value as CountryCdType,
                                                    );
                                                    onChange(selected.value);
                                                }
                                            }}
                                        />
                                    )}
                                />
                                <InputField
                                    {...register('receiverContact1.prefix')}
                                    data-error={
                                        !!errors.receiverContact1?.prefix
                                    }
                                />
                            </InputFieldContainer>
                        )}
                        <ErrorMessage name='receiverMobileCountryCd' />
                        <ErrorMessage name='receiverContact1.prefix' />
                        <ErrorMessage name='receiverContact1.middle' />
                        <ErrorMessage name='receiverContact1.suffix' />
                    </InputContainer>

                    <InputContainer>
                        <InputLabel>{t('전화번호')}</InputLabel>
                        <InputField
                            inputMode='numeric'
                            type='text'
                            {...register('receiverContact2')}
                            placeholder={t('전화번호를 입력해주세요.')}
                        />
                    </InputContainer>

                    <InputFieldContainer>
                        <InputLabel>{t('배송 요청사항')}</InputLabel>
                        <Select
                            getOptionLabel={(option) => t(option.label)}
                            getOptionValue={(option) => option.value}
                            menuPortalTarget={
                                typeof document !== 'undefined'
                                    ? document.body
                                    : undefined
                            }
                            options={ADDRESS_MEMO_LIST}
                            placeholder={t('배송시 요청사항을 선택해 주세요.')}
                            value={findAddressMemoOption(
                                addressMemoWatch ?? '',
                            )}
                            onChange={(e) => {
                                if (e?.value === '직접 입력') {
                                    setValue('addressMemo', '');
                                } else {
                                    setValue('addressMemo', e?.value ?? '');
                                }
                            }}
                        />
                        {!ADDRESS_MEMO_LIST.find(
                            (item) => item.value === addressMemoWatch,
                        ) && (
                            <InputField
                                placeholder={t('배송지 메모')}
                                {...register('addressMemo')}
                            />
                        )}
                    </InputFieldContainer>

                    <Controller
                        control={control}
                        name='defaultYn'
                        render={({ field, ...rest }) => (
                            <label className={styles.checkboxLabel}>
                                <InputCheckbox
                                    {...rest}
                                    checked={field.value === 'Y'}
                                    onCheckedChange={(checked) =>
                                        field.onChange(checked ? 'Y' : 'N')
                                    }
                                />
                                {t('기본 배송지로 설정')}
                            </label>
                        )}
                    />
                </div>

                <div className={styles.actions}>
                    <Button
                        className={styles.actionButton}
                        frame='outlined'
                        type='button'
                        variant='secondary'
                        onClick={() => router.back()}
                    >
                        {t('돌아가기')}
                    </Button>
                    <Button
                        className={styles.actionButton}
                        disabled={isSubmitting}
                        frame='solid'
                        type='submit'
                        variant='primary'
                    >
                        {t(mode === 'register' ? '등록하기' : '수정하기')}
                    </Button>
                </div>
            </form>
        </FormProvider>
    );
};
