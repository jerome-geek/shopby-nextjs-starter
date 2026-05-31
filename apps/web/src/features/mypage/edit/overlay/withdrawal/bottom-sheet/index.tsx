import { useTranslation } from 'react-i18next';

import {
    BottomSheetLayout,
    type DefaultBottomSheetProps,
} from '@/shared/components/layout';
import { Button } from '@/shared/ui/button';
import { Withdrawal } from '@/features/mypage/edit/overlay/withdrawal/content';

export const WithdrawalBottomSheet = (props: DefaultBottomSheetProps) => {
    const { t } = useTranslation();

    return (
        <BottomSheetLayout
            {...props}
            title={t('회원 탈퇴')}
            type='fullscreen'
            footerButtonList={[
                <Button
                    key='withdrawal-submit-button'
                    frame='solid'
                    variant='primary'
                    type='submit'
                    form='withdrawal-form'
                    id='withdrawal-submit-button'
                >
                    {t('탈퇴하기')}
                </Button>,
            ]}
        >
            <Withdrawal {...props} />
        </BottomSheetLayout>
    );
};
