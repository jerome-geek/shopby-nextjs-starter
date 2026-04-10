import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/router';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';

import * as card from '@/components/mypage/common/mypage-list-card/index.css';
import { Button } from '@/components/ui/button';
import ErrorMessage from '@/components/ui/form/ErrorMessage';
import {
    InputLabel,
    InputField,
    InputFieldContainer,
} from '@/components/ui/input';
import useProfileMutation from '@/hooks/mutations/useProfileMutation';
import { useProfile } from '@/hooks/suspenseQuery/member/profile';
import useApiError from '@/hooks/useApiError';
import useSnsLogin from '@/hooks/useSnsLogin';

const schema = z.object({
    password: z.string().min(1, '비밀번호를 입력해 주세요.'),
});

type FormValues = z.infer<typeof schema>;

export const CheckAccountForm = ({
    setPassword,
}: {
    setPassword: (password: string) => void;
}) => {
    const { t } = useTranslation();
    const router = useRouter();

    const { handleErrorToast } = useApiError();

    const { data: profileData } = useProfile();
    const isSocialLogin = Boolean(profileData?.providerType);

    const methods = useForm<FormValues>({
        resolver: zodResolver(schema),
        mode: 'onSubmit',
        reValidateMode: 'onChange',
        defaultValues: { password: '' },
    });

    const { socialLoginList } = useSnsLogin();

    const socialInfo = socialLoginList.find(
        (item) => item.providerType === profileData?.providerType,
    );

    const {
        register,
        handleSubmit,
        formState: { isSubmitting, errors },
    } = methods;

    const {
        checkPassword: { mutate: checkPasswordMutate },
    } = useProfileMutation();

    const onSubmit = handleSubmit(async ({ password }) => {
        checkPasswordMutate(
            { data: { password } },
            {
                onSuccess: () => {
                    setPassword(password);
                },
                onError: (error) => {
                    handleErrorToast(error);
                },
            },
        );
    });

    return (
        <div className={card.container}>
            <section className={card.section}>
                <FormProvider {...methods}>
                    <form onSubmit={onSubmit}>
                        <p className={card.selectedRangeText}>
                            {t('개인정보 보호를 위해 본인 확인이 필요합니다.')}
                        </p>

                        {isSocialLogin ? (
                            <>
                                <p className={card.listCaption}>
                                    {t(
                                        '소셜 로그인 회원은 소셜 인증 플로우로 연결이 필요합니다.',
                                    )}
                                </p>

                                {socialInfo && (
                                    <Button
                                        type='button'
                                        frame='solid'
                                        variant={socialInfo.provider}
                                        onClick={() => {
                                            socialInfo.onClick();
                                        }}
                                        style={{
                                            marginTop: 16,
                                        }}
                                    >
                                        <socialInfo.Icon />
                                        <span>{socialInfo.label}</span>
                                    </Button>
                                )}
                            </>
                        ) : (
                            <InputFieldContainer style={{ marginTop: 16 }}>
                                <InputLabel isRequired>
                                    {t('비밀번호')}
                                </InputLabel>
                                <InputField
                                    type='password'
                                    placeholder={t('비밀번호를 입력해주세요.')}
                                    {...register('password')}
                                    data-error={!!errors.password}
                                />
                                <ErrorMessage name='password' />
                            </InputFieldContainer>
                        )}

                        <div style={{ marginTop: 16, display: 'flex', gap: 8 }}>
                            <Button
                                type='button'
                                frame='outlined'
                                variant='secondary'
                                onClick={() => router.back()}
                            >
                                {t('취소')}
                            </Button>
                            <Button
                                type='submit'
                                frame='solid'
                                variant='primary'
                                disabled={isSocialLogin || isSubmitting}
                            >
                                {t('확인')}
                            </Button>
                        </div>
                    </form>
                </FormProvider>
            </section>
        </div>
    );
};
