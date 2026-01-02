'use client';

import Link from 'next/link';
import { useTranslation } from 'react-i18next';

import { Button } from '@/components/ui/button';
import { PATHS } from '@/const/paths';
import { useProfile } from '@/hooks/query/member/profile';
import { useMall } from '@/hooks/suspenseQuery/admin/mall';
import { css } from '@/styled-system/css';

export default function SignupCompletePage() {
    const { t } = useTranslation();

    const { data: mallData } = useMall();

    const { data: profileData } = useProfile();

    return (
        <div
            className={css({
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '60vh',
                width: '100%',
                padding: '20px',
            })}
        >
            <div
                className={css({
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '40px',
                    width: '100%',
                    maxWidth: '400px',
                    textAlign: 'center',
                })}
            >
                <div
                    className={css({
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '64px',
                        height: '64px',
                        borderRadius: 'full',
                        backgroundColor: '#F4F4F5',
                        color: '#18181B',
                    })}
                ></div>

                <div
                    className={css({
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '12px',
                    })}
                >
                    <h1
                        className={css({
                            fontSize: '28px',
                            fontWeight: 'bold',
                            lineHeight: '1.3',
                            color: '#111',
                            whiteSpace: 'pre-line',
                            wordBreak: 'keep-all',
                        })}
                    >
                        {profileData?.memberName
                            ? t('{{name}}님,\n회원가입을 축하드립니다.', {
                                  name: profileData.memberName,
                              })
                            : t('회원가입을 축하드립니다.')}
                    </h1>
                    <p
                        className={css({
                            fontSize: '15px',
                            color: '#666',
                            lineHeight: '1.5',
                            wordBreak: 'keep-all',
                        })}
                    >
                        {t(
                            '{{mallName}}에 로그인 후 다양한 회원 혜택과 몰생활의 모든 것을 만나보세요.',
                            {
                                mallName: mallData.mall.mallName,
                            }
                        )}
                    </p>
                </div>

                <Link href={PATHS.MAIN} className={css({ width: '100%' })}>
                    <Button
                        type="button"
                        frame="outlined"
                        size="large"
                        className={css({ width: '100%' })}
                    >
                        {t('홈으로')}
                    </Button>
                </Link>
            </div>
        </div>
    );
}
