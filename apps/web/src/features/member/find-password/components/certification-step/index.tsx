import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { authentication } from '@/api/auth';
import { Button } from '@/components/ui/button';
import { InputContainer, InputField } from '@/components/ui/input';
import * as styles from '@/features/member/find-password/components/certification-step/index.css';
import type {
    FindPasswordMethod,
    IssuedInfo,
    VerifiedInfo,
} from '@/features/member/find-password/types';
import useApiError from '@/hooks/useApiError';
import { useTimer } from '@/hooks/useTimer';
import { useDialog } from '@/hooks/utils';
import {
    checkCertificateNumberSchema,
    CheckCertificateNumberType,
} from '@/schema/profile.schema';
import { ErrorMessage } from '@/shared/components/form';

const CERTIFICATION_DURATION = 180;

interface CertificationStepProps {
    findMethod: FindPasswordMethod;
    issuedInfo: IssuedInfo;
    onVerified: (info: VerifiedInfo) => void;
    onReset: () => void;
}

export const CertificationStep = ({
    findMethod,
    issuedInfo,
    onVerified,
    onReset,
}: CertificationStepProps) => {
    const { t } = useTranslation();

    const { handleErrorToast } = useApiError();
    const { openDialog } = useDialog();

    const { remainTime, formattedTime, startTimer, stopTimer } = useTimer();

    const methods = useForm<CheckCertificateNumberType>({
        resolver: zodResolver(checkCertificateNumberSchema),
        defaultValues: {
            findMethod,
            memberId: issuedInfo.memberId,
            memberNo: issuedInfo.memberNo,
            certificatedNumber: '',
        },
    });

    const {
        register,
        formState: { isSubmitting },
        handleSubmit,
    } = methods;

    useEffect(() => {
        startTimer(CERTIFICATION_DURATION);

        return () => {
            stopTimer();
        };
    }, [startTimer, stopTimer]);

    useEffect(() => {
        if (remainTime !== 0) {
            return;
        }

        openDialog({
            message: t('인증번호 발송 시간이 만료되었습니다.'),
            confirm: onReset,
        });
    }, [remainTime, openDialog, onReset, t]);

    const onSubmit = handleSubmit(async ({ certificatedNumber }) => {
        if (remainTime === 0) {
            openDialog({
                message: t('인증 시간이 만료되었습니다. 다시 시도해주세요.'),
                confirm: onReset,
            });
            return;
        }

        try {
            const { data } = await authentication.checkCertificatedNumber({
                certificatedNumber: certificatedNumber ?? '',
                type: findMethod,
                usage: 'FIND_PASSWORD',
                memberNo: issuedInfo.memberNo,
            });

            stopTimer();

            onVerified({
                memberId: issuedInfo.memberId,
                memberNo: issuedInfo.memberNo,
                findMethod,
                certificatedNumber: certificatedNumber ?? '',
                key: (data as { key?: string })?.key ?? '',
            });
        } catch (error) {
            handleErrorToast(error);
        }
    });

    return (
        <FormProvider {...methods}>
            <form className={styles.form} onSubmit={onSubmit}>
                <p className={styles.stepGuideText}>
                    {findMethod === 'EMAIL'
                        ? t('이메일로 발송된 인증번호를 입력해주세요.')
                        : t('휴대폰으로 발송된 인증번호를 입력해주세요.')}
                </p>

                <InputContainer>
                    <div className={styles.certificationFieldRow}>
                        <InputField
                            type='text'
                            inputMode='numeric'
                            placeholder={t('인증번호를 입력해주세요.')}
                            {...register('certificatedNumber')}
                        />
                        {remainTime > 0 && (
                            <span className={styles.timerText}>
                                {formattedTime}
                            </span>
                        )}
                    </div>
                    <ErrorMessage name='certificatedNumber' />
                </InputContainer>

                <Button
                    type='submit'
                    frame='solid'
                    variant='primary'
                    disabled={isSubmitting || remainTime === 0}
                    className={styles.submitButton}
                >
                    <span>{t('확인')}</span>
                </Button>
            </form>
        </FormProvider>
    );
};
