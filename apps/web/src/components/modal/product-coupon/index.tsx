import { useTranslation } from 'react-i18next';

import { ProductCoupon } from '@/components/layer-contents/product-coupon';
import { ModalLayout, type DefaultModalLayoutProps } from '@/shared/components/layout';
import { Button } from '@/shared/ui';

interface ProductCouponModalProps extends DefaultModalLayoutProps {
    productNo: number;
}

export const ProductCouponModal = ({
    productNo,
    ...props
}: ProductCouponModalProps) => {
    const { t } = useTranslation();

    return (
        <ModalLayout
            {...props}
            title='쿠폰 받기'
            size='medium'
            footerButtonList={[
                <Button
                    key='download-all'
                    frame='solid'
                    variant='green'
                    type='submit'
                    form='product-coupon-form'
                    id='product-coupon-form-submit-button'
                >
                    {t('쿠폰 모두 받기')}
                </Button>,
            ]}
        >
            <ProductCoupon productNo={productNo} {...props} />
        </ModalLayout>
    );
};
