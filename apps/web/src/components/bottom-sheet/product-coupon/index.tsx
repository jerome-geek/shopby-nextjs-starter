import { useTranslation } from 'react-i18next';

import { ProductCoupon } from '@/components/layer-contents/product-coupon';
import * as styles from '@/components/layer-contents/product-coupon/index.css';
import {
    BottomSheetLayout,
    DefaultBottomSheetProps,
} from '@/shared/components/layout';
import { Button } from '@/shared/ui';

interface ProductCouponBottomSheetProps extends DefaultBottomSheetProps {
    productNo: number;
}

export const ProductCouponBottomSheet = ({
    productNo,
    ...props
}: ProductCouponBottomSheetProps) => {
    const { t } = useTranslation();

    return (
        <BottomSheetLayout
            {...props}
            title='쿠폰 받기'
            footerButtonList={[
                <Button
                    key='download-all'
                    frame='solid'
                    variant='green'
                    type='submit'
                    form='product-coupon-form'
                    id='product-coupon-form-submit-button'
                    className={styles.downloadAllButton}
                >
                    {t('쿠폰 모두 받기')}
                </Button>,
            ]}
        >
            <ProductCoupon productNo={productNo} {...props} />
        </BottomSheetLayout>
    );
};
