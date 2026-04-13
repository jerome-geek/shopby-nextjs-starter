import { useRouter } from 'next/router';

import * as styles from '@/components/auth/social-login-list/index.css';
import { Button } from '@/components/ui/button';
import { PATHS } from '@/const/paths';
import useSnsLogin from '@/hooks/useSnsLogin';

export default function SocialLoginList({
    isOnlySocialLoginListVisible = true,
}: {
    isOnlySocialLoginListVisible?: boolean;
}) {
    const router = useRouter();
    const returnUrl = (router.query.returnUrl as string) || PATHS.MAIN;

    const { availableSocialLoginList } = useSnsLogin();
    const isSocialLoginVisible = availableSocialLoginList.length > 0;

    const onSignupButtonClick = () => {
        router.push(PATHS.SIGNUP.TERMS);
    };

    if (!isSocialLoginVisible) {
        return null;
    }

    return (
        <ul className={styles.socialLoginList}>
            {!isOnlySocialLoginListVisible && (
                <li>
                    <Button
                        type="button"
                        frame="solid"
                        variant="primary"
                        onClick={onSignupButtonClick}
                    >
                        <span>회원가입</span>
                    </Button>
                </li>
            )}

            {availableSocialLoginList.map(
                ({ label, provider, onClick, Icon }) => {
                    return (
                        <li key={`social-login-button-${provider}`}>
                            <Button
                                type="button"
                                frame="solid"
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
        </ul>
    );
}
