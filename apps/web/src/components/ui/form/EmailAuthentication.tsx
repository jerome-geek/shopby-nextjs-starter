import { useRef, useState, useEffect, useReducer } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { authentication } from '@/api/auth';
import { Button } from '@/components/ui/button';
import InputFieldContainer from '@/components/ui/input/FieldContainer';
import InputContainer from '@/components/ui/input/container';
import InputField from '@/components/ui/input/field';
import { InputLabel } from '@/components/ui/input/label';
import { useMall } from '@/hooks/suspenseQuery/admin/mall';
import useDialog from '@/hooks/utils/useDialog';
import { useTimer } from '@/hooks/useTimer';
import * as styles from '@/components/ui/form/EmailAuthentication.css';
import { profile } from '@/api/member';
import useApiError from '@/hooks/useApiError';

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

export default function EmailAuthentication() {
    // 상태 정의: IDLE (초기), SENT (발송/대기), VERIFIED (인증완료), EXPIRED (시간초과)
    const [authStatus, dispatch] = useReducer(authReducer, 'IDLE');

    const certificatedNumberRef = useRef<HTMLInputElement>(null);
    const { remainTime, formattedTime, startTimer, stopTimer } = useTimer();

    const { t } = useTranslation();

    const { data: mallData } = useMall();

    const { openDialog } = useDialog();

    const isAvailable =
        mallData.mallJoinConfig.authenticationType ===
            'AUTHENTICATION_BY_EMAIL' &&
        mallData.mallJoinConfig.authenticationTimeType === 'JOIN_TIME';

    const { control, setValue } = useFormContext();

    const emailWatch = useWatch({
        control,
        name: 'email',
    });

    const { handleError } = useApiError();

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

    const onSendButtonClick = async () => {
        if (!emailWatch) {
            openDialog({ message: t('이메일을 입력해주세요.') });
            return;
        }

        try {
            const { data } = await profile.checkDuplicateEmail({
                email: emailWatch,
            });

            if (data.exist) {
                openDialog({ message: t('이메일이 중복되었습니다.') });
                return;
            }

            const { data: sendCertificatedNumberData } =
                await authentication.sendCertificatedNumber({
                    usage: 'JOIN',
                    type: 'EMAIL',
                    notiAccount: emailWatch,
                });

            startTimer(sendCertificatedNumberData.remainTime);
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
            await handleError(error);
        }
    };

    if (!isAvailable) {
        return null;
    }

    return (
        <div className={styles.container}>
            <Button
                type='button'
                frame='solid'
                variant='primary'
                onClick={onSendButtonClick}
                disabled={authStatus === 'VERIFIED'}
            >
                <span>
                    {authStatus === 'VERIFIED'
                        ? t('인증 완료')
                        : authStatus === 'EXPIRED'
                        ? t('인증번호 재발송')
                        : t('인증번호 발송')}
                </span>
            </Button>
            {authStatus !== 'IDLE' && authStatus !== 'VERIFIED' && (
                <InputContainer>
                    <InputLabel isRequired>{t('인증 번호')}</InputLabel>
                    <InputFieldContainer>
                        <div className={styles.inputWrapper}>
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
                    </InputFieldContainer>
                    <Button
                        type='button'
                        frame='outlined'
                        onClick={onCheckButtonClick}
                        disabled={authStatus === 'EXPIRED'}
                    >
                        {t('확인')}
                    </Button>
                </InputContainer>
            )}
        </div>
    );
}
