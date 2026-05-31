import { useTranslation } from 'react-i18next';

import { CouponRegister } from '@/features/mypage/coupons/overlay/coupon-register/content';
import { ModalLayout, type DefaultModalLayoutProps } from '@/shared/components/layout';
import { Button } from '@/shared/ui/button';

export const CouponRegisterModal = (props: DefaultModalLayoutProps) => {
    const { t } = useTranslation();

    return (
        <ModalLayout
            {...props}
            title={t('쿠폰 등록')}
            size='medium'
            footerButtonList={[
                <Button
                    key='coupon-register-submit-button'
                    frame='solid'
                    variant='primary'
                    type='submit'
                    form='coupon-register-form'
                    id='coupon-register-submit-button'
                >
                    {t('등록')}
                </Button>,
            ]}
        >
            <CouponRegister />
        </ModalLayout>
    );
};
