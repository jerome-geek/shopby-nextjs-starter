import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'motion/react';
import { Tabs } from 'radix-ui';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { profile } from '@/api/member';
import { Button } from '@/shared/ui/button';
import { InputContainer, InputField, InputLabel } from '@/shared/ui/input';
import * as styles from '@/features/member/find-password/components/account-step/index.css';
import type {
    FindPasswordMethod,
    IssuedInfo,
} from '@/features/member/find-password/types';
import { useAuthenticationMutation } from '@/hooks/mutations';
import useApiError from '@/hooks/useApiError';
import { useDialog } from '@/hooks/utils';
import { findPasswordSchema, FindPasswordType } from '@/schema/profile.schema';
import { ErrorMessage } from '@/shared/components/form';

interface AccountStepProps {
    findMethod: FindPasswordMethod;
    onFindMethodChange: (method: FindPasswordMethod) => void;
    onCertified: (info: IssuedInfo) => void;
}

const FIND_PASSWORD_METHODS = [
    { label: '이메일로 찾기', value: 'EMAIL' },
    { label: '휴대폰번호로 찾기', value: 'SMS' },
];

export const AccountStep = ({
    findMethod,
    onFindMethodChange,
    onCertified,
}: AccountStepProps) => {
    const { t } = useTranslation();

    const { handleErrorToast } = useApiError();
    const { openAsyncDialog } = useDialog();

    const methods = useForm<FindPasswordType>({
        resolver: zodResolver(findPasswordSchema),
        defaultValues: {
            findMethod: 'EMAIL',
            memberId: '',
        },
    });

    const {
        register,
        setValue,
        formState: { isSubmitting, errors },
        handleSubmit,
    } = methods;

    const {
        sendCertificatedNumber: { mutate: sendCertificatedNumberMutate },
    } = useAuthenticationMutation();

    const onTabChange = (value: FindPasswordMethod) => {
        onFindMethodChange(value);
        setValue('findMethod', value, {
            shouldDirty: false,
        });
    };

    const onSubmit = handleSubmit(async ({ memberId }) => {
        try {
            const { data } = await profile.getMaskingAccountInfo({ memberId });

            const isAgree = await openAsyncDialog({
                message:
                    findMethod === 'EMAIL'
                        ? t(
                              '{{email}}으로 <br /> 인증번호를 발송하시겠습니까?',
                              { email: data.email },
                          )
                        : t(
                              '{{mobileNo}}으로 <br /> 인증번호를 발송하시겠습니까?',
                              { mobileNo: data.mobileNo },
                          ),
                iconType: 'auth',
                onConfirmReturnValue: true,
                onCloseReturnValue: false,
            });

            if (!isAgree) {
                return;
            }

            sendCertificatedNumberMutate(
                {
                    data: {
                        usage: 'FIND_PASSWORD',
                        type: findMethod,
                        memberNo: data.memberNo,
                    },
                },
                {
                    onSuccess: () => {
                        onCertified({
                            memberId,
                            memberNo: data.memberNo,
                        });
                    },
                },
            );
        } catch (error) {
            handleErrorToast(error);
        }
    });

    return (
        <FormProvider {...methods}>
            <form className={styles.form} onSubmit={onSubmit}>
                <Tabs.Root
                    className={styles.tabsRoot}
                    value={findMethod}
                    onValueChange={(value) =>
                        onTabChange(value as FindPasswordMethod)
                    }
                >
                    <Tabs.List className={styles.tabsList}>
                        {FIND_PASSWORD_METHODS.map(({ label, value }) => (
                            <Tabs.Trigger
                                key={value}
                                value={value}
                                className={styles.tabsTrigger}
                            >
                                {t(label)}
                                {findMethod === value && (
                                    <motion.div
                                        layoutId='find-password-active-tab'
                                        className={styles.tabsIndicator}
                                        transition={{
                                            type: 'spring',
                                            bounce: 0.2,
                                            duration: 0.6,
                                        }}
                                    />
                                )}
                            </Tabs.Trigger>
                        ))}
                    </Tabs.List>

                    <InputContainer>
                        <InputLabel isRequired>{t('아이디')}</InputLabel>

                        <InputField
                            type='text'
                            placeholder={t('아이디를 입력해 주세요.')}
                            {...register('memberId')}
                            data-error={!!errors.memberId}
                        />
                        <ErrorMessage name='memberId' />
                    </InputContainer>
                </Tabs.Root>

                <Button
                    type='submit'
                    frame='solid'
                    variant='primary'
                    disabled={isSubmitting}
                    className={styles.submitButton}
                >
                    <span>{t('인증번호 발송')}</span>
                </Button>
            </form>
        </FormProvider>
    );
};
