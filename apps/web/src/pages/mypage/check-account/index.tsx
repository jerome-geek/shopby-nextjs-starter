import { zodResolver } from '@hookform/resolvers/zod';
import { isAxiosError } from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';

import { MypageLayout } from '@/components/layout';
import * as card from '@/components/mypage/common/mypage-list-card/index.css';
import { Button } from '@/components/ui/button';
import InputContainer from '@/components/ui/input/container';
import Field from '@/components/ui/input/field';
import { InputLabel } from '@/components/ui/input/label';
import { PATHS } from '@/const/paths';
import useProfileMutation from '@/hooks/mutations/useProfileMutation';
import useProfile from '@/hooks/query/member/profile/useProfile';
import { useDialog } from '@/hooks/utils';

const schema = z.object({
    password: z.string().min(1, '비밀번호를 입력해 주세요.'),
});

type FormValues = z.infer<typeof schema>;

export const MypageCheckAccount = () => {
    const { t } = useTranslation();
    const router = useRouter();
    const { openAsyncDialog } = useDialog();

    const { data: profileData } = useProfile();
    const isSocialLogin = Boolean(profileData?.providerType);

    const [isVerifying, setIsVerifying] = useState(false);

    const methods = useForm<FormValues>({
        resolver: zodResolver(schema),
        mode: 'onSubmit',
        reValidateMode: 'onChange',
        defaultValues: { password: '' },
    });

    const { register, handleSubmit } = methods;

    const {
        checkPassword: { mutate: checkPasswordMutate },
    } = useProfileMutation();

    const onSubmit = handleSubmit(async ({ password }) => {
        setIsVerifying(true);

        checkPasswordMutate(
            { data: { password } },
            {
                onSuccess: async () => {
                    const response = await fetch('/api/mypage/edit/issue', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ password }),
                    });

                    if (!response.ok) {
                        await openAsyncDialog({
                            message: t(
                                '인증 토큰 발급에 실패했습니다. 잠시 후 다시 시도해주세요.',
                            ),
                        });

                        setIsVerifying(false);
                        return;
                    }

                    router.replace(PATHS.MYPAGE.EDIT);
                },
                onError: async (error) => {
                    await openAsyncDialog({
                        message: isAxiosError(error)
                            ? error.response?.data.message ??
                              t('비밀번호 인증에 실패했습니다.')
                            : t('비밀번호 인증에 실패했습니다.'),
                    });

                    setIsVerifying(false);
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
                            disabled={isSocialLogin || isVerifying}
                        >
                            {t('확인')}
                        </Button>
                    </div>
                </form>
            </section>
        </div>
    );
};

MypageCheckAccount.getLayout = (page: React.ReactNode) => {
    return <MypageLayout>{page}</MypageLayout>;
};

export default MypageCheckAccount;
