import { useTranslation } from 'react-i18next';

import { ModalLayout, type DefaultModalLayoutProps } from '@/shared/components/layout';
import { Button } from '@/shared/ui/button';
import { Withdrawal } from '@/features/mypage/edit/overlay/withdrawal/content';

export const WithdrawalModal = (props: DefaultModalLayoutProps) => {
    const { t } = useTranslation();

    return (
        <ModalLayout
            {...props}
            title={t('회원 탈퇴')}
            size='medium'
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
        </ModalLayout>
    );
};
