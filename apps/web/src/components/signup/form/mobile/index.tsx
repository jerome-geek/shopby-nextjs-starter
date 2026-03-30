import { find, pipe, sortBy, toArray } from '@fxts/core';
import { Controller, useFormContext, useFormState } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import WithMemberJoinConfig from '@/components/hoc/with-member-join-config';
import { ErrorMessage } from '@/components/ui/form';
import InputField from '@/components/ui/input/field';
import FieldContainer from '@/components/ui/input/FieldContainer';
import Select from '@/components/ui/select';
import { MOBILE_COUNTRY_CODE_LIST } from '@/const/form';
import { useGlobal } from '@/hooks/utils';

const SignupFormMobile = ({ disabled }: { disabled?: boolean }) => {
    const { t } = useTranslation();

    const { isKorean, defaultMobileCountryCode } = useGlobal();

    const { register, control } = useFormContext();

    const { errors } = useFormState({
        name: ['mobileNo', 'mobileCountryCode'],
    });

    const sortedMobileCountryCodeList = pipe(
        MOBILE_COUNTRY_CODE_LIST,
        sortBy((country) => country.label),
        toArray,
    );

    return (
        <WithMemberJoinConfig name='mobileNo' label={t('휴대폰번호')}>
            {isKorean ? (
                <>
                    <InputField
                        {...register('mobileNo')}
                        placeholder={t('‘-’없이 입력해 주세요.')}
                        inputMode='numeric'
                        type='number'
                        onWheel={(e) => e.currentTarget.blur()}
                        readOnly={disabled}
                        isError={!!errors.mobileNo}
                    />
                    <ErrorMessage name='mobileNo' />
                </>
            ) : (
                <>
                    <FieldContainer gridRatio={[1, 2]}>
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
                            {...register('mobileNo')}
                            isError={!!errors.mobileNo}
                        />
                    </FieldContainer>

                    <ErrorMessage name='mobileCountryCode' />
                    <ErrorMessage name='mobileNo' />
                </>
            )}
        </WithMemberJoinConfig>
    );
};

export default SignupFormMobile;
