import { zodResolver } from '@hookform/resolvers/zod';
import { isAxiosError } from 'axios';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';

import * as card from '@/components/mypage/common/mypage-list-card/index.css';
import { Button } from '@/components/ui/button';
import InputContainer from '@/components/ui/input/container';
import Field from '@/components/ui/input/field';
import { InputLabel } from '@/components/ui/input/label';
import useProfileMutation from '@/hooks/mutations/useProfileMutation';
import { useDialog } from '@/hooks/utils';
import { useProfile } from '@/hooks/suspenseQuery/member/profile';

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
    const { openAsyncDialog } = useDialog();

    const { data: profileData } = useProfile();
    const isSocialLogin = Boolean(profileData?.providerType);

    const methods = useForm<FormValues>({
        resolver: zodResolver(schema),
        mode: 'onSubmit',
        reValidateMode: 'onChange',
        defaultValues: { password: '' },
    });

    const {
        register,
        handleSubmit,
        formState: { isSubmitting },
    } = methods;

    const {
        checkPassword: { mutate: checkPasswordMutate },
    } = useProfileMutation();

    const onSubmit = handleSubmit(async ({ password }) => {
        checkPasswordMutate(
            { data: { password } },
            {
                onSuccess: async () => {
                    setPassword(password);
                },
                onError: async (error) => {
                    await openAsyncDialog({
                        message: isAxiosError(error)
                            ? error.response?.data.message ??
                              t('비밀번호 인증에 실패했습니다.')
                            : t('비밀번호 인증에 실패했습니다.'),
                    });
                },
            },
        );
    });

    return (
        <div className={card.container}>
            <section className={card.section}>
                <form onSubmit={onSubmit}>
                    <p className={card.selectedRangeText}>
                        {t('개인정보 보호를 위해 본인 확인이 필요합니다.')}
                    </p>

                    {isSocialLogin ? (
                        <p className={card.listCaption}>
                            {t(
                                '소셜 로그인 회원은 소셜 인증 플로우로 연결이 필요합니다.',
                            )}
                        </p>
                    ) : (
                        <InputContainer style={{ marginTop: 16 }}>
                            <InputLabel isRequired>{t('비밀번호')}</InputLabel>
                            <Field
                                type='password'
                                placeholder={t('비밀번호를 입력해주세요.')}
                                {...register('password')}
                            />
                        </InputContainer>
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
            </section>
        </div>
    );
};
