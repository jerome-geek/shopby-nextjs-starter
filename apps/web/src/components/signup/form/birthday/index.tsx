import { find } from '@fxts/core';
import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import WithMemberJoinConfig from '@/components/hoc/with-member-join-config';
import { ErrorMessage } from '@/components/ui/form';
import FieldContainer from '@/components/ui/input/FieldContainer';
import Select from '@/components/ui/select';
import { DAY_LIST, MONTH_LIST, YEAR_LIST } from '@/const/date';

const SignupFormBirthday = ({ disabled }: { disabled?: boolean }) => {
    const { t } = useTranslation();

    const { control } = useFormContext();

    return (
        <WithMemberJoinConfig name='birthday' label={t('생년월일')}>
            <FieldContainer gridRatio={[1, 1, 1]}>
                <Controller
                    control={control}
                    name='birthYear'
                    render={({ field: { onChange, value, ...rest } }) => (
                        <Select
                            {...rest}
                            isSearchable
                            isDisabled={disabled}
                            options={YEAR_LIST}
                            placeholder={t('연도')}
                            value={find((a) => a.value === value, YEAR_LIST)}
                            onChange={(singleValue) => {
                                if (singleValue) {
                                    onChange(singleValue.value);
                                }
                            }}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name='birthMonth'
                    render={({ field: { onChange, value, ...rest } }) => (
                        <Select
                            {...rest}
                            isSearchable
                            isDisabled={disabled}
                            options={MONTH_LIST}
                            placeholder={t('월')}
                            value={find((a) => a.value === value, MONTH_LIST)}
                            onChange={(singleValue) => {
                                if (singleValue) {
                                    onChange(singleValue.value);
                                }
                            }}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name='birthDay'
                    render={({ field: { onChange, value, ...rest } }) => (
                        <Select
                            {...rest}
                            isSearchable
                            isDisabled={disabled}
                            options={DAY_LIST}
                            placeholder={t('일')}
                            value={find((a) => a.value === value, DAY_LIST)}
                            onChange={(singleValue) => {
                                if (singleValue) {
                                    onChange(singleValue.value);
                                }
                            }}
                        />
                    )}
                />
            </FieldContainer>

            <ErrorMessage name='birthYear' />
            <ErrorMessage name='birthMonth' />
            <ErrorMessage name='birthDay' />
        </WithMemberJoinConfig>
    );
};

export default SignupFormBirthday;
