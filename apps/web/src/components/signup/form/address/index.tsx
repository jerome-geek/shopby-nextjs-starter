import { find } from '@fxts/core';
import { isAxiosError } from 'axios';
import { overlay } from 'overlay-kit';
import {
    Controller,
    useFormContext,
    useFormState,
    useWatch,
} from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { address } from '@/api/manage';
import { AddressSearchBottomSheet } from '@/components/bottom-sheet/address-search';
import WithMemberJoinConfig from '@/components/hoc/with-member-join-config';
import { AddressRegister } from '@/components/layer-contents/address-search';
import { AddressSearchModal } from '@/components/modal/address-search';
import ReceiverState from '@/components/signup/form/address/receiver-state';
import * as styles from '@/components/signup/form/index.css';
import { Button } from '@/components/ui/button';
import { ErrorMessage } from '@/components/ui/form';
import { InputField, InputFieldContainer, Select } from '@/components/ui/input';
import { MOBILE_COUNTRY_CODE_LIST } from '@/const/form';
import { useDialog, useGlobal, useResponsive } from '@/hooks/utils';

const SignupFormAddress = () => {
    const { t } = useTranslation();

    const { isKorean } = useGlobal();

    const { isMobile } = useResponsive();

    const { register, control, getValues, setValue } = useFormContext();

    const { errors } = useFormState({
        name: ['zipCd', 'address', 'detailAddress', 'city'],
    });

    const { openDialog } = useDialog();

    const countryCdWatch = useWatch({
        name: 'countryCd',
    });

    const searchJapanAddress = async () => {
        const zipCode = getValues('zipCd');

        try {
            const { data } = await address.searchJpAddress({ zipCode });
            setValue('address', data.address);
            setValue('city', data.city);
            setValue('state', data.prefCode);
        } catch (error) {
            openDialog({
                message: isAxiosError(error)
                    ? error.response?.data.message
                    : t('알 수 없는 오류가 발생했습니다.'),
            });
        }
    };

    const addressRegister = (address: AddressRegister) => {
        setValue('jibunAddress', address.receiverJibunAddress, {
            shouldValidate: true,
        });
        setValue('address', address.receiverAddress, {
            shouldValidate: true,
        });
        setValue('zipCd', address.receiverZipCd, {
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

    return (
        <WithMemberJoinConfig name='address' label={t('주소')}>
            <>
                {!isKorean && (
                    <Controller
                        control={control}
                        name='countryCd'
                        defaultValue={countryCdWatch}
                        render={({ field: { onChange, value } }) => {
                            return (
                                <Select
                                    isSearchable
                                    name='countryCd'
                                    options={MOBILE_COUNTRY_CODE_LIST}
                                    value={find(
                                        (item) => item.value === value,
                                        MOBILE_COUNTRY_CODE_LIST,
                                    )}
                                    onChange={(selectedOption) => {
                                        if (selectedOption) {
                                            onChange(selectedOption.value);
                                        }
                                    }}
                                />
                            );
                        }}
                    />
                )}

                {countryCdWatch === 'JP' ? (
                    <>
                        <InputFieldContainer gridRatio={[3, 1]}>
                            <InputField
                                {...register('zipCd')}
                                data-error={!!errors.zipCd}
                            />
                            <Button
                                frame='solid'
                                variant='apple'
                                onClick={searchJapanAddress}
                                className={styles.button}
                            >
                                {t('우편번호 찾기')}
                            </Button>
                        </InputFieldContainer>
                        <InputFieldContainer>
                            <InputField
                                placeholder={t('주소')}
                                {...register('address')}
                                data-error={!!errors.address}
                            />
                        </InputFieldContainer>
                        <InputFieldContainer>
                            <InputField
                                placeholder={t('상세 주소')}
                                {...register('detailAddress')}
                                data-error={!!errors.detailAddress}
                            />
                        </InputFieldContainer>
                        <ErrorMessage name='zipCd' />
                        <ErrorMessage name='address' />
                        <ErrorMessage name='detailAddress' />
                    </>
                ) : countryCdWatch === 'KR' ? (
                    <>
                        <InputFieldContainer gridRatio={[3, 1]}>
                            <InputField
                                {...register('zipCd')}
                                placeholder={t('우편번호를 입력해 주세요.')}
                                inputMode='numeric'
                                type='number'
                                readOnly
                                data-error={!!errors.zipCd}
                            />
                            <Button
                                frame='solid'
                                variant='apple'
                                className={styles.button}
                                onClick={onOpenAddressSearchModal}
                            >
                                {t('우편번호 찾기')}
                            </Button>
                        </InputFieldContainer>
                        <InputField
                            {...register('address')}
                            placeholder={t('주소를 입력해 주세요.')}
                            type='text'
                            readOnly
                            data-error={!!errors.address}
                        />
                        <InputField
                            {...register('detailAddress')}
                            placeholder={t('상세주소를 입력해 주세요.')}
                            type='text'
                            data-error={!!errors.detailAddress}
                        />
                        <ErrorMessage name='zipCd' />
                        <ErrorMessage name='address' />
                        <ErrorMessage name='detailAddress' />
                    </>
                ) : (
                    <>
                        <InputFieldContainer>
                            <InputField
                                placeholder='Address'
                                {...register('address')}
                                data-error={!!errors.address}
                            />
                        </InputFieldContainer>
                        <InputFieldContainer>
                            <InputField
                                placeholder='DetailAddress'
                                {...register('detailAddress')}
                                data-error={!!errors.detailAddress}
                            />
                        </InputFieldContainer>

                        <ReceiverState name='state' countryCdName='countryCd' />

                        <InputFieldContainer>
                            <InputField
                                placeholder='City'
                                {...register('city')}
                                data-error={!!errors.city}
                            />
                        </InputFieldContainer>
                        <InputFieldContainer>
                            <InputField
                                placeholder='Zip/Postal Code'
                                {...register('zipCd')}
                                data-error={!!errors.zipCd}
                            />
                        </InputFieldContainer>

                        <ErrorMessage name='address' />
                        <ErrorMessage name='detailAddress' />
                        <ErrorMessage name='city' />
                        <ErrorMessage name='zipCd' />
                    </>
                )}
            </>
        </WithMemberJoinConfig>
    );
};

export default SignupFormAddress;
