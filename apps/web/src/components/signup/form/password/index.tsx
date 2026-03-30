import { useFormContext, useFormState } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import WithMemberJoinConfig from '@/components/hoc/with-member-join-config';
import { ErrorMessage } from '@/components/ui/form';
import InputField from '@/components/ui/input/field';

const SignupFormPassword = () => {
    const { t } = useTranslation();

    const { register } = useFormContext();

    const { errors } = useFormState({
        name: ['password', 'passwordConfirm'],
    });

    return (
        <>
            <WithMemberJoinConfig name='password' label={t('비밀번호')}>
                <InputField
                    {...register('password')}
                    type='password'
                    autoComplete='new-password'
                    placeholder={t(
                        '비밀번호를 입력해 주세요. (최소 8자 ~ 최대 20자)',
                    )}
                    data-error={!!errors.password}
                />
                <ErrorMessage name='password' />
            </WithMemberJoinConfig>

            <WithMemberJoinConfig name='password' label={t('비밀번호 확인')}>
                <InputField
                    {...register('passwordConfirm')}
                    type='password'
                    autoComplete='new-password'
                    placeholder={t('비밀번호를 다시 입력해 주세요.')}
                    data-error={!!errors.passwordConfirm}
                />
                <ErrorMessage name='passwordConfirm' />
            </WithMemberJoinConfig>
        </>
    );
};

export default SignupFormPassword;
