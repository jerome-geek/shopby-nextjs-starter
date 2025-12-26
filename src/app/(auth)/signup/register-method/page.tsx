'use client';

import { Button } from '@/components/ui/button';
import { PATHS } from '@/const/paths';
import { useMall } from '@/hooks/query/admin/mall';
import { css } from '@/styled-system/css';
import { token } from '@/styled-system/tokens';
import { useRouter } from 'next/navigation';

export default function SignupRegisterMethodPage() {
    const { data } = useMall();
    console.log('🚀 ~ SignupRegisterMethodPage ~ data:', data);

    // TODO: 서버컵포넌트에서 데이터를 가져와서 initialData로 세팅
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
            <div>
                <h2
                    className={css({
                        fontSize: '4rem',
                        lineHeight: '5rem',
                        fontWeight: 'bold',
                        letterSpacing: '-2%',
                        color: token('colors.black'),
                    })}
                >
                    가나스윔에
                    <br /> 오신 것을 환영해요!
                </h2>
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
    );
}
