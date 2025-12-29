'use client';

import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { PATHS } from '@/const/paths';
import { css } from '@/styled-system/css';
import { token } from '@/styled-system/tokens';
import { useMall } from '@/hooks/suspenseQuery/admin/mall';
import { NaverIcon } from '@/components/icons/login/Naver';
import useSnsLogin from '@/hooks/useSnsLogin';

export default function SignupRegisterMethodPage() {
    const { t } = useTranslation();

    const { data } = useMall();
    console.log('🚀 ~ SignupRegisterMethodPage ~ data:', data);

    // data?.openIdJoinConfig에 따라서 SNS회원가입 노출할 것
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
                        <span>회원가입</span>
                    </Button>
                    <Button frame="solid" variant="kakao">
                        카카오로 로그인
                    </Button>
                    <Button frame="solid" variant="naver">
                        <NaverIcon />
                        네이버로 로그인
                    </Button>
                    <Button frame="solid" variant="apple">
                        애플로 로그인
                    </Button>
                    <Button frame="solid" variant="facebook">
                        페이스북로 로그인
                    </Button>
                    <Button frame="solid" variant="line">
                        라인로 로그인
                    </Button>
                </div>
            </div>
        </div>
    );
}
