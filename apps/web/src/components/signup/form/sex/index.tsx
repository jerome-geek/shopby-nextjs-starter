import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import WithMemberJoinConfig from '@/components/hoc/with-member-join-config';
import { InputRadio } from '@/shared/ui/input';
import { ErrorMessage } from '@/shared/components/form';

const SignupFormSex = ({ disabled }: { disabled?: boolean }) => {
    const { t } = useTranslation();

    const { control } = useFormContext();

    return (
        <WithMemberJoinConfig name='sex' label={t('성별')}>
            <Controller
                name='sex'
                control={control}
                render={({ field: { onChange, value } }) => {
                    return (
                        <InputRadio
                            onChange={onChange}
                            options={[
                                { value: 'F', label: t('여성') },
                                { value: 'M', label: t('남성') },
                            ]}
                            value={value}
                            disabled={disabled}
                        />
                    );
                }}
            />
            <ErrorMessage name='sex' />
        </WithMemberJoinConfig>
    );
};

export default SignupFormSex;
