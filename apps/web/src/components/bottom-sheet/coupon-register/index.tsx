import { useTranslation } from 'react-i18next';

import { CouponRegister } from '@/components/layer-contents/coupon-register';
import BottomSheetLayout from '@/components/layout/bottom-sheet';
import { type DefaultModalLayoutProps } from '@/components/layout/modal';
import { Button } from '@/components/ui/button';

export const CouponRegisterBottomSheet = (props: DefaultModalLayoutProps) => {
    const { t } = useTranslation();

    return (
        <BottomSheetLayout
            {...props}
            title={t('쿠폰 등록')}
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
        </BottomSheetLayout>
    );
};
