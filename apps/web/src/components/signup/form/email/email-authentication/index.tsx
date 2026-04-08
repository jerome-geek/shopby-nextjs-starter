import { useMutation } from '@tanstack/react-query';
import { useContext, useEffect, useReducer, useRef, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import z from 'zod';

import { authentication } from '@/api/auth';
import { profile } from '@/api/member';
import { Button } from '@/components/ui/button';
import FieldContainer from '@/components/ui/input/FieldContainer';
import InputContainer from '@/components/ui/input/container';
import InputField from '@/components/ui/input/field';
import { InputLabel } from '@/components/ui/input/label';
import { Column } from '@/components/ui/layout/flex';
import { CertificationCheckContext } from '@/context/certificationCheck';
import { useToast } from '@/hooks/ui';
import { useTimer } from '@/hooks/useTimer';
import { useDialog, useResponsive } from '@/hooks/utils';
import { signupDuplicateCheckEmailSchema } from '@/schema';
import * as formStyles from '@/components/signup/form/index.css';
import * as styles from '@/components/signup/form/email/email-authentication/index.css';
import useApiError from '@/hooks/useApiError';
import { useRouter } from 'next/router';
import { PATHS } from '@/const/paths';

type AuthStatus = 'IDLE' | 'SENT' | 'VERIFIED' | 'EXPIRED';

type AuthAction =
    | { type: 'SEND_SUCCESS' }
    | { type: 'VERIFY_SUCCESS' }
    | { type: 'TIMEOUT' }
    | { type: 'RESET' };

const authReducer = (state: AuthStatus, action: AuthAction): AuthStatus => {
    switch (action.type) {
        case 'SEND_SUCCESS':
            if (state === 'IDLE' || state === 'EXPIRED' || state === 'SENT') {
                return 'SENT';
            }
            return state;
        case 'VERIFY_SUCCESS':
            if (state === 'SENT') {
                return 'VERIFIED';
            }
            return state;
        case 'TIMEOUT':
            if (state === 'SENT') {
                return 'EXPIRED';
            }
            return state;
        case 'RESET':
            return 'IDLE';
        default:
            return state;
    }
};

const EmailAuthentication = ({
    disabled,
    setIsDuplicated,
}: {
    disabled?: boolean;
    setIsDuplicated: (isDuplicated: boolean) => void;
}) => {
    const router = useRouter();

    const { isMobile } = useResponsive();

    const { addToast } = useToast();

    const { handleError } = useApiError();

    const isEditPage = router.pathname === PATHS.MYPAGE.EDIT;

    // 상태 정의: IDLE (초기), SENT (발송/대기), VERIFIED (인증완료), EXPIRED (시간초과)
    const [authStatus, dispatch] = useReducer(authReducer, 'IDLE');

    const certificatedNumberRef = useRef<HTMLInputElement>(null);
    const { remainTime, formattedTime, startTimer, stopTimer } = useTimer();

    const { t } = useTranslation();

    const { openDialog } = useDialog();

    const value = useContext(CertificationCheckContext);

    const isAuthenticationByEmail =
        value?.authenticationType === 'AUTHENTICATION_BY_EMAIL';

    const { control, setValue, getValues, setError, setFocus, clearErrors } =
        useFormContext();

    const emailWatch = useWatch({
        control,
        name: 'email',
    });

    const isModifyEmailWatch = useWatch({
        control,
        name: 'isModifyEmail',
    });

    // 이메일 변경 시 인증 상태 초기화
    useEffect(() => {
        dispatch({ type: 'RESET' });
        stopTimer();
        if (certificatedNumberRef.current) {
            certificatedNumberRef.current.value = '';
        }
        setValue('certificated', false);
    }, [emailWatch, stopTimer, setValue]);

    // 타이머 만료 처리
    useEffect(() => {
        if (authStatus === 'SENT' && remainTime === 0) {
            dispatch({ type: 'TIMEOUT' });
        }
    }, [remainTime, authStatus]);

    const checkDuplicateEmailMutate = useMutation({
        mutationFn: async (email: string) =>
            await profile.checkDuplicateEmail({ email }),
    });

    const validateEmail = async () => {
        const email = getValues('email') as string;

        try {
            signupDuplicateCheckEmailSchema.parse(email);

            return email;
        } catch (error) {
            if (error instanceof z.ZodError) {
                setError('email', { message: error.issues[0].message });
            }

            return null;
        }
    };

    const checkDuplicateEmail = async () => {
        const email = await validateEmail();

        if (!email) {
            return;
        }

        const { data: checkDuplicateEmailData } =
            await checkDuplicateEmailMutate.mutateAsync(email);

        if (checkDuplicateEmailData.exist) {
            setError('email', {
                message: t(
                    disabled
                        ? '해당 이메일로 가입된 SNS 계정이 있습니다.'
                        : '이미 사용중인 이메일입니다.',
                ),
            });
            setFocus('email');
            setValue('isDuplicateEmail', true, { shouldValidate: true });
            setIsDuplicated(true);
            return;
        }

        addToast({
            message: t('사용 가능한 이메일입니다.'),
        });
        setValue('isDuplicateEmail', false, { shouldValidate: true });
        clearErrors('email');
        setIsDuplicated(false);
    };

    const onSendButtonClick = async () => {
        try {
            const email = await validateEmail();

            if (!email) {
                return;
            }

            const { data: checkDuplicateEmailData } =
                await checkDuplicateEmailMutate.mutateAsync(email);

            if (checkDuplicateEmailData.exist) {
                setError('email', {
                    message: t(
                        disabled
                            ? '해당 이메일로 가입된 SNS 계정이 있습니다.'
                            : '이미 사용중인 이메일입니다.',
                    ),
                });
                setFocus('email');
                setValue('isDuplicateEmail', true, {
                    shouldValidate: true,
                });
                return;
            }

            const {
                data: { remainTime },
            } = await authentication.sendCertificatedNumber({
                usage: 'JOIN',
                type: 'EMAIL',
                notiAccount: emailWatch,
            });

            setValue('isDuplicateEmail', false, {
                shouldValidate: true,
            });
            clearErrors('email');
            clearErrors('isDuplicateEmail');
            startTimer(remainTime);
            dispatch({ type: 'SEND_SUCCESS' });
            openDialog({ message: t('인증번호가 발송되었습니다.') });
        } catch (error) {
            await handleError(error);
        }
    };

    const onCheckButtonClick = async () => {
        if (authStatus === 'EXPIRED') {
            openDialog({
                message: t('인증 시간이 만료되었습니다. 다시 발송해주세요.'),
            });
            return;
        }

        if (certificatedNumberRef.current === null) {
            return;
        }

        const certificatedNumber = certificatedNumberRef.current.value;

        try {
            await authentication.checkCertificatedNumber({
                usage: 'JOIN',
                type: 'EMAIL',
                notiAccount: emailWatch,
                certificatedNumber,
            });

            // 인증 성공 처리
            dispatch({ type: 'VERIFY_SUCCESS' });
            stopTimer();
            setValue('certificated', true);
            openDialog({ message: t('인증번호가 확인되었습니다.') });
        } catch (error) {
            console.error('🚀 ~ error:', error);
        }
    };

    const onModifyEmailButtonClick = () => {
        setValue('isModifyEmail', true);
    };

    if (!isAuthenticationByEmail) {
        return (
            <Button
                type='button'
                frame='solid'
                variant='apple'
                onClick={checkDuplicateEmail}
                disabled={checkDuplicateEmailMutate.isPending}
                style={{
                    height: isMobile ? '44px' : '50px',
                }}
                className={formStyles.button}
            >
                {t('중복확인')}
            </Button>
        );
    }

    if (isEditPage && !isModifyEmailWatch) {
        return (
            <Button
                type='button'
                frame='solid'
                variant='apple'
                onClick={onModifyEmailButtonClick}
                style={{
                    height: isMobile ? '44px' : '50px',
                }}
                className={formStyles.button}
            >
                {t('이메일 변경')}
            </Button>
        );
    }

    return (
        <Column direction='column' gap={'8px'}>
            <Button
                type='button'
                frame='solid'
                variant='apple'
                onClick={onSendButtonClick}
                disabled={authStatus === 'VERIFIED'}
                style={{
                    height: isMobile ? '44px' : '50px',
                }}
                className={formStyles.button}
            >
                {authStatus === 'VERIFIED'
                    ? t('인증 완료')
                    : authStatus === 'EXPIRED'
                    ? t('인증번호 재발송')
                    : t('인증번호 발송')}
            </Button>

            {authStatus !== 'IDLE' && authStatus !== 'VERIFIED' && (
                <InputContainer>
                    <InputLabel isRequired>{t('인증 번호')}</InputLabel>

                    <FieldContainer gridRatio={[3, 1]}>
                        <div className={styles.timerContainer}>
                            <InputField
                                ref={certificatedNumberRef}
                                placeholder={t('인증번호를 입력해주세요.')}
                                disabled={authStatus === 'EXPIRED'}
                            />
                            {authStatus === 'SENT' && (
                                <span className={styles.timerText}>
                                    {formattedTime}
                                </span>
                            )}
                        </div>

                        <Button
                            type='button'
                            frame='solid'
                            variant='apple'
                            onClick={onCheckButtonClick}
                            disabled={authStatus === 'EXPIRED'}
                            className={formStyles.button}
                        >
                            {t('확인')}
                        </Button>
                    </FieldContainer>
                </InputContainer>
            )}
        </Column>
    );
};

export default EmailAuthentication;
