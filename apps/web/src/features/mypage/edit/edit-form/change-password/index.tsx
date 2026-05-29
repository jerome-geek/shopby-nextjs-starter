import { useFormContext, useFormState, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import * as styles from '@/components/signup/form/index.css';
import { Button } from '@/shared/ui';
import {
    InputField,
    InputFieldContainer,
    InputLabel,
} from '@/shared/ui/input';
import { useResponsive } from '@/hooks/utils';
import { ErrorMessage } from '@/shared/components/form';

export const ChangePassword = () => {
    const { t } = useTranslation();

    const { isMobile } = useResponsive();

    const { control, setValue, register } = useFormContext();

    const isModifyPasswordWatch = useWatch({
        control,
        name: 'isModifyPassword',
    });

    const { errors } = useFormState({
        control,
        name: ['password', 'passwordConfirm'],
    });

    return (
        <>
            <Button
                type='button'
                frame='outlined'
                variant={!isModifyPasswordWatch ? 'secondary' : 'primary'}
                style={{
                    height: isMobile ? '44px' : '50px',
                }}
                onClick={() => {
                    setValue('isModifyPassword', !isModifyPasswordWatch);
                }}
                className={styles.button}
            >
                {t('비밀번호 변경')}
            </Button>

            {isModifyPasswordWatch && (
                <>
                    <InputFieldContainer>
                        <InputLabel isRequired>{t('비밀번호')}</InputLabel>

                        <InputField
                            {...register('password')}
                            type='password'
                            autoComplete='new-password'
                            placeholder={t('비밀번호를 입력해주세요.')}
                            data-error={!!errors.password}
                        />
                        <ErrorMessage name='password' />
                    </InputFieldContainer>

                    <InputFieldContainer>
                        <InputLabel isRequired>{t('비밀번호 확인')}</InputLabel>

                        <InputField
                            {...register('passwordConfirm')}
                            type='password'
                            autoComplete='new-password'
                            placeholder={t('비밀번호를 입력해주세요.')}
                            data-error={!!errors.passwordConfirm}
                        />
                        <ErrorMessage name='passwordConfirm' />
                    </InputFieldContainer>
                </>
            )}
        </>
    );
};
