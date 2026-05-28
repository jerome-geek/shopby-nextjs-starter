import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/router';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { profile } from '@/api/member';
import { Button } from '@/shared/ui/button';
import { InputContainer, InputField, InputLabel } from '@/shared/ui/input';
import { PATHS } from '@/const/paths';
import * as styles from '@/features/member/find-password/components/password-step/index.css';
import type { VerifiedInfo } from '@/features/member/find-password/types';
import { useMyApp } from '@/hooks/myapp';
import { useToast } from '@/hooks/ui';
import useApiError from '@/hooks/useApiError';
import {
    passwordChangeSchema,
    PasswordChangeType,
} from '@/schema/profile.schema';
import { ErrorMessage } from '@/shared/components/form';

interface PasswordStepProps {
    verifiedInfo: VerifiedInfo;
}

export const PasswordStep = ({ verifiedInfo }: PasswordStepProps) => {
    const { t } = useTranslation();

    const router = useRouter();

    const { addToast } = useToast();

    const { handleErrorToast } = useApiError();
    const { isMyApp, handleSendLoginView } = useMyApp();

    const methods = useForm<PasswordChangeType>({
        resolver: zodResolver(passwordChangeSchema),
        defaultValues: {
            newPassword: '',
            passwordConfirm: '',
        },
    });

    const {
        register,
        formState: { isSubmitting, errors },
        handleSubmit,
    } = methods;

    const onSubmit = handleSubmit(async ({ newPassword }) => {
        try {
            await profile.updatePasswordByCertificationNo({
                findMethod: verifiedInfo.findMethod,
                certificationNumber: verifiedInfo.certificatedNumber,
                newPassword,
                key: verifiedInfo.key,
                memberId: verifiedInfo.memberId,
            });

            addToast({
                message: t('비밀번호가 변경되었습니다.'),
                variant: 'success',
            });

            if (isMyApp) {
                handleSendLoginView();
                return;
            }

            router.replace(PATHS.AUTH.LOGIN);
        } catch (error) {
            handleErrorToast(error);
        }
    });

    return (
        <FormProvider {...methods}>
            <form className={styles.form} onSubmit={onSubmit}>
                <p className={styles.stepGuideText}>
                    {t('새로운 비밀번호를 입력해주세요.')}
                </p>

                <InputContainer>
                    <InputLabel isRequired>{t('새 비밀번호')}</InputLabel>

                    <InputField
                        type='password'
                        placeholder={t(
                            '새 비밀번호 (영문/숫자/특수문자 조합 8~20자)',
                        )}
                        autoComplete='new-password'
                        {...register('newPassword')}
                        data-error={!!errors.newPassword}
                    />
                    <ErrorMessage name='newPassword' />
                </InputContainer>

                <InputContainer>
                    <InputLabel isRequired>{t('새 비밀번호 확인')}</InputLabel>

                    <InputField
                        type='password'
                        placeholder={t('새 비밀번호 확인')}
                        autoComplete='new-password'
                        {...register('passwordConfirm')}
                        data-error={!!errors.passwordConfirm}
                    />
                    <ErrorMessage name='passwordConfirm' />
                </InputContainer>

                <Button
                    type='submit'
                    frame='solid'
                    variant='primary'
                    disabled={isSubmitting}
                    className={styles.submitButton}
                >
                    <span>{t('비밀번호 변경')}</span>
                </Button>
            </form>
        </FormProvider>
    );
};
