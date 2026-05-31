import { useTranslation } from 'react-i18next';

import { CouponRegister } from '@/features/mypage/coupons/overlay/coupon-register/content';
import {
    BottomSheetLayout,
    DefaultBottomSheetProps,
} from '@/shared/components/layout';
import { Button } from '@/shared/ui/button';

export const CouponRegisterBottomSheet = (props: DefaultBottomSheetProps) => {
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
