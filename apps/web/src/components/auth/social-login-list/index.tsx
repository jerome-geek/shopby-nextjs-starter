import { useRouter } from 'next/router';

import * as styles from '@/components/auth/social-login-list/index.css';
import { PATHS } from '@/const/paths';
import useSnsLogin from '@/features/member/hooks/useSnsLogin';
import { Button } from '@/shared/ui/button';

interface SocialLoginListProps {
    isOnlySocialLoginListVisible?: boolean;
}

export default function SocialLoginList({
    isOnlySocialLoginListVisible = true,
}: SocialLoginListProps) {
    const router = useRouter();
    const returnUrl = (router.query.returnUrl as string) || PATHS.MAIN;

    const { availableSocialLoginList } = useSnsLogin();
    const isSocialLoginVisible = availableSocialLoginList.length > 0;

    const onSignupButtonClick = () => {
        router.push(
            router.pathname === PATHS.SIGNUP.REGISTER_METHOD
                ? PATHS.SIGNUP.TERMS
                : PATHS.SIGNUP.REGISTER,
        );
    };

    if (!isSocialLoginVisible) {
        return null;
    }

    return (
        <ul className={styles.socialLoginList}>
            {availableSocialLoginList.map(
                ({ label, provider, onClick, Icon }) => {
                    return (
                        <li key={`social-login-button-${provider}`}>
                            <Button
                                type='button'
                                frame='solid'
                                variant={provider}
                                onClick={() => onClick({ returnUrl })}
                            >
                                {Icon && <Icon />}
                                <span>{label}</span>
                            </Button>
                        </li>
                    );
                },
            )}

            {!isOnlySocialLoginListVisible && (
                <li>
                    <Button
                        type='button'
                        frame='solid'
                        variant='primary'
                        onClick={onSignupButtonClick}
                    >
                        <span>회원가입</span>
                    </Button>
                </li>
            )}
        </ul>
    );
}
