import { find } from '@fxts/core';
import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import WithMemberJoinConfig from '@/features/member/member-join-config-field';
import { InputFieldContainer, Select } from '@/shared/ui/input';
import { DAY_LIST, MONTH_LIST, YEAR_LIST } from '@/const/date';
import { ErrorMessage } from '@/shared/components/form';

const SignupFormBirthday = ({ disabled }: { disabled?: boolean }) => {
    const { t } = useTranslation();

    const { control } = useFormContext();

    const parseBirthday = (
        prevValue: string,
        value: string,
        type: 'year' | 'month' | 'day',
    ) => {
        const year = prevValue?.substring(0, 4);
        const month = prevValue?.substring(4, 6);
        const day = prevValue?.substring(6, 8);

        const nextValue = {
            year,
            month,
            day,
        };

        nextValue[type] = value;

        if (type === 'month' && !year) {
            nextValue.year = '0000';
        }

        if (type === 'day' && !year) {
            nextValue.year = '0000';
        }

        if (type === 'day' && !month) {
            nextValue.month = '00';
        }

        return Object.values(nextValue).join('');
    };

    return (
        <WithMemberJoinConfig name='birthday' label={t('생년월일')}>
            <InputFieldContainer gridRatio={[1, 1, 1]}>
                <Controller
                    control={control}
                    name='birthday'
                    render={({ field: { onChange, value, ...rest } }) => (
                        <Select
                            {...rest}
                            isSearchable
                            isDisabled={disabled}
                            options={YEAR_LIST}
                            placeholder={t('연도')}
                            value={find(
                                (a) => a.value === value?.substring(0, 4),
                                YEAR_LIST,
                            )}
                            onChange={(singleValue) => {
                                if (singleValue) {
                                    onChange(
                                        parseBirthday(
                                            value,
                                            singleValue.value,
                                            'year',
                                        ),
                                    );
                                }
                            }}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name='birthday'
                    render={({ field: { onChange, value, ...rest } }) => (
                        <Select
                            {...rest}
                            isSearchable
                            isDisabled={disabled}
                            options={MONTH_LIST}
                            placeholder={t('월')}
                            value={find(
                                (a) => a.value === value?.substring(4, 6),
                                MONTH_LIST,
                            )}
                            onChange={(singleValue) => {
                                if (singleValue) {
                                    onChange(
                                        parseBirthday(
                                            value,
                                            singleValue.value,
                                            'month',
                                        ),
                                    );
                                }
                            }}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name='birthday'
                    render={({ field: { onChange, value, ...rest } }) => (
                        <Select
                            {...rest}
                            isSearchable
                            isDisabled={disabled}
                            options={DAY_LIST}
                            placeholder={t('일')}
                            value={find(
                                (a) => a.value === value?.substring(6, 8),
                                DAY_LIST,
                            )}
                            onChange={(singleValue) => {
                                if (singleValue) {
                                    onChange(
                                        parseBirthday(
                                            value,
                                            singleValue.value,
                                            'day',
                                        ),
                                    );
                                }
                            }}
                        />
                    )}
                />
            </InputFieldContainer>

            <ErrorMessage name='birthday' />
        </WithMemberJoinConfig>
    );
};

export default SignupFormBirthday;
