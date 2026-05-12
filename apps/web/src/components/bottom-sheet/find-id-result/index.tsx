import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

import { FindIdResult } from '@/components/layer-contents/find-id-result';
import {
    BottomSheetLayout,
    DefaultBottomSheetProps,
} from '@/components/layout';
import { Button } from '@/components/ui/button';
import { PATHS } from '@/const/paths';
import { useMyApp } from '@/hooks/myapp';
import type { FindIdResponse } from '@/models/member/profile';

interface FindIdResultBottomSheetProps extends DefaultBottomSheetProps {
    memberName: string;
    result: FindIdResponse;
}

export const FindIdResultBottomSheet = ({
    memberName,
    result,
    ...props
}: FindIdResultBottomSheetProps) => {
    const { t } = useTranslation();
    const router = useRouter();
    const { isMyApp, handleSendLoginView } = useMyApp();

    return (
        <BottomSheetLayout
            {...props}
            title={t('아이디 찾기 결과')}
            footerButtonList={[
                <Button
                    key='find-id-result-find-password-button'
                    type='button'
                    frame='outlined'
                    variant='primary'
                    onClick={() => {
                        props.close();
                        router.push(PATHS.MEMBER.FIND_PASSWORD);
                    }}
                >
                    {t('비밀번호 찾기')}
                </Button>,
                <Button
                    key='find-id-result-login-button'
                    type='button'
                    frame='solid'
                    variant='primary'
                    onClick={() => {
                        props.close();

                        if (isMyApp) {
                            handleSendLoginView();
                            return;
                        }

                        router.push(PATHS.AUTH.LOGIN);
                    }}
                >
                    {t('로그인하기')}
                </Button>,
            ]}
        >
            <FindIdResult memberName={memberName} result={result} />
        </BottomSheetLayout>
    );
};
