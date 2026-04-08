import { useTranslation } from 'react-i18next';

import { ModalLayout, type DefaultModalLayoutProps } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Withdrawal } from '@/components/layer-contents/withdrawal';

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
