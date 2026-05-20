import { find, pipe, sortBy, toArray } from '@fxts/core';
import { Controller, useFormContext, useFormState } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import WithMemberJoinConfig from '@/components/hoc/with-member-join-config';
import { ErrorMessage } from '@/components/ui/input';
import { Select, InputFieldContainer, InputField } from '@/components/ui/input';
import { MOBILE_COUNTRY_CODE_LIST } from '@/const/form';
import { useGlobal } from '@/hooks/utils';

const SignupFormTelephone = () => {
    const { t } = useTranslation();

    const { isKorean, defaultMobileCountryCode } = useGlobal();

    const { register, control } = useFormContext();

    const { errors } = useFormState({
        name: ['telephoneNo', 'mobileCountryCode'],
    });

    const sortedMobileCountryCodeList = pipe(
        MOBILE_COUNTRY_CODE_LIST,
        sortBy((country) => country.label),
        toArray,
    );

    return (
        <WithMemberJoinConfig name='phoneNo' label={t('전화번호')}>
            {isKorean ? (
                <>
                    <InputField
                        {...register('telephoneNo')}
                        placeholder={t('‘-’없이 입력해 주세요.')}
                        inputMode='numeric'
                        type='number'
                        onWheel={(e) => e.currentTarget.blur()}
                        data-error={!!errors.telephoneNo}
                    />
                    <ErrorMessage name='telephoneNo' />
                </>
            ) : (
                <>
                    <InputFieldContainer gridRatio={[1, 2]}>
                        <Controller
                            control={control}
                            name='mobileCountryCode'
                            defaultValue={defaultMobileCountryCode}
                            render={({ field: { onChange, value } }) => {
                                return (
                                    <Select
                                        isSearchable
                                        placeholder={t(
                                            '국가코드를 선택해주세요.',
                                        )}
                                        options={sortedMobileCountryCodeList}
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

                        <InputField
                            {...register('telephoneNo')}
                            data-error={!!errors.telephoneNo}
                        />
                    </InputFieldContainer>

                    <ErrorMessage name='mobileCountryCode' />
                    <ErrorMessage name='telephoneNo' />
                </>
            )}
        </WithMemberJoinConfig>
    );
};

export default SignupFormTelephone;
