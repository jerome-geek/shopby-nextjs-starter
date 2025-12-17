import { Button } from '@/components/Button';
import { css } from '@/styled-system/css';

export default function SignupRegisterMethodPage() {
    return (
        <div>
            SignupRegisterMethodPage
            <div
                className={css({
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                })}
            >
                <Button frame="outlined">취소</Button>
                <Button frame="solid" variant="primary">
                    테스트1
                </Button>
                <Button frame="solid" variant="primary" disabled>
                    테스트2
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
