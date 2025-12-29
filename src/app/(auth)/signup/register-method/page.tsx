'use client';

import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';

import { Button } from '@/components/ui/button';
import { PATHS } from '@/const/paths';
import useSnsLogin from '@/hooks/useSnsLogin';
import { css } from '@/styled-system/css';
import { token } from '@/styled-system/tokens';

export default function SignupRegisterMethodPage() {
    const { t } = useTranslation();

    const { socialLoginList } = useSnsLogin();
    const availableSocialLoginList = socialLoginList.filter(
        ({ isAvailable }) => isAvailable
    );

    const router = useRouter();
    const onSignupButtonClick = () => {
        router.push(PATHS.SIGNUP.TERMS);
    };

    return (
        <div
            className={css({
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
            })}
        >
            <div
                className={css({
                    display: 'flex',
                    flexDirection: 'column',
                    gap: { base: '24px', md: '40px' },
                })}
            >
                <div
                    className={css({
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '6px',
                    })}
                >
                    <h2
                        className={css({
                            fontSize: '4rem',
                            lineHeight: '5rem',
                            fontWeight: 'bold',
                            letterSpacing: '-2%',
                            color: token('colors.black'),
                        })}
                        dangerouslySetInnerHTML={{
                            __html: t('가나스윔에<br /> 오신 것을 환영해요!'),
                        }}
                    />

                    <p
                        className={css({
                            fontSize: '1.6rem',
                            lineHeight: '2.6rem',
                            letterSpacing: '-2%',
                            color: token('colors.gray70'),
                        })}
                    >
                        회원가입을 하시면 특별한 혜택을 받을 수 있어요.
                    </p>
                </div>

                <div
                    className={css({
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '8px',
                    })}
                >
                    <Button
                        frame="solid"
                        variant="primary"
                        onClick={onSignupButtonClick}
                    >
                        <span>{t('회원가입')}</span>
                    </Button>
                    {availableSocialLoginList.map(
                        ({ label, provider, onClick, Icon }) => {
                            return (
                                <Button
                                    type="button"
                                    frame="solid"
                                    variant={provider}
                                    onClick={() => onClick({ returnUrl: '' })}
                                >
                                    {Icon && <Icon />}
                                    <span>{label}</span>
                                </Button>
                            );
                        }
                    )}
                </div>
            </div>
        </div>
    );
}
