import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'motion/react';
import { overlay } from 'overlay-kit';
import { Tabs } from 'radix-ui';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { FindIdResultBottomSheet } from '@/components/bottom-sheet/find-id-result';
import { FindIdResultModal } from '@/components/modal/find-id-result';
import { Button } from '@/components/ui/button';
import { ErrorMessage } from '@/components/ui/input';
import { InputContainer, InputField, InputLabel } from '@/components/ui/input';
import { EmailField } from '@/features/member/find-id/components/filed/email';
import { MobileField } from '@/features/member/find-id/components/filed/mobile';
import * as styles from '@/features/member/find-id/components/find-id-form/index.css';
import { useProfileMutation } from '@/hooks/mutations';
import { useToast } from '@/hooks/ui';
import { useResponsive } from '@/hooks/utils';
import type { AuthType } from '@/models';
import { findIdSchema, FindIdType } from '@/schema/profile.schema';

const FIND_ID_METHODS = [
    { label: '이메일로 찾기', value: 'EMAIL' },
    { label: '휴대폰번호로 찾기', value: 'SMS' },
];

export const FindIdForm = () => {
    const { t } = useTranslation();

    const { isMobile } = useResponsive();

    const { addToast } = useToast();

    const [activeTab, setActiveTab] = useState<AuthType>('EMAIL');

    const methods = useForm<FindIdType>({
        resolver: zodResolver(findIdSchema),
        defaultValues: {
            findMethod: 'EMAIL',
            memberName: '',
            email: '',
            mobileNo: '',
        },
    });

    const {
        register,
        reset,
        formState: { isSubmitting, errors },
        handleSubmit,
    } = methods;

    const onTabChange = (value: AuthType) => {
        setActiveTab(value);
        reset(
            (prev) => ({
                ...prev,
                findMethod: value,
                email: '',
                mobileNo: '',
            }),
            {
                keepFieldsRef: true,
            },
        );
    };

    const {
        findId: { mutate: findIdMutate, isPending: isFindIdPending },
    } = useProfileMutation();

    const onSubmit = handleSubmit(
        ({ memberName, email, mobileNo, findMethod }) => {
            findIdMutate(
                {
                    data: {
                        memberName,
                        email,
                        mobileNo,
                        findMethod,
                    },
                },
                {
                    onSuccess: ({ data }) => {
                        if (!data || data.length === 0) {
                            addToast({
                                message: t('회원정보를 찾을 수 없습니다.'),
                            });
                            return;
                        }

                        if (isMobile) {
                            overlay.open((props) => (
                                <FindIdResultBottomSheet
                                    {...props}
                                    memberName={memberName ?? ''}
                                    result={data}
                                />
                            ));
                            return;
                        }

                        overlay.open((props) => (
                            <FindIdResultModal
                                {...props}
                                memberName={memberName ?? ''}
                                result={data}
                            />
                        ));
                    },
                },
            );
        },
    );

    return (
        <FormProvider {...methods}>
            <form className={styles.form} onSubmit={onSubmit}>
                <Tabs.Root
                    className={styles.tabsRoot}
                    defaultValue='EMAIL'
                    onValueChange={(value) => onTabChange(value as AuthType)}
                >
                    <Tabs.List className={styles.tabsList}>
                        {FIND_ID_METHODS.map(({ label, value }) => (
                            <Tabs.Trigger
                                key={value}
                                value={value}
                                className={styles.tabsTrigger}
                            >
                                {t(label)}

                                {value === activeTab && (
                                    <motion.div
                                        layoutId='active-tab'
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
                        <InputLabel isRequired>{t('이름')}</InputLabel>

                        <InputField
                            type='text'
                            placeholder={t('이름을 입력해 주세요.')}
                            {...register('memberName')}
                            data-error={!!errors.memberName}
                        />
                        <ErrorMessage name='memberName' />
                    </InputContainer>

                    <Tabs.Content
                        value='EMAIL'
                        tabIndex={-1}
                        className={styles.tabsContent}
                    >
                        <EmailField />
                    </Tabs.Content>

                    <Tabs.Content
                        value='SMS'
                        tabIndex={-1}
                        className={styles.tabsContent}
                    >
                        <MobileField />
                    </Tabs.Content>
                </Tabs.Root>

                <Button
                    type='submit'
                    frame='solid'
                    variant='primary'
                    disabled={isSubmitting || isFindIdPending}
                    className={styles.submitButton}
                >
                    <span>{t('아이디 찾기')}</span>
                </Button>
            </form>
        </FormProvider>
    );
};
