import { ChevronRight } from 'lucide-react';
import { useRouter } from 'next/router';
import { overlay } from 'overlay-kit';
import { FormProvider, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { CouponApplyOverlay } from '@/features/order/components/coupon/apply';
import * as styles from '@/features/order/components/coupon/index.css';
import { useOrderSheetCalculate } from '@/hooks/order';
import { PaymentReserveSchemaType } from '@/schema';
import { CURRENCY } from '@/utils/currency';

const Coupon = () => {
    const { t } = useTranslation();
    const router = useRouter();
    const orderSheetNo = router.query.orderSheetNo as string;

    const { calculateOrderSheetData, orderSheetData, couponsWatch } =
        useOrderSheetCalculate({
            orderSheetNo,
        });

    const isCouponSelected =
        !!couponsWatch?.cartCouponIssueNo ||
        !!couponsWatch?.productCoupons?.length;

    const usableCouponCnt =
        orderSheetData?.orderSheetPromotionSummary?.usableCouponCnt ?? 0;

    const methods = useFormContext<PaymentReserveSchemaType>();

    const handleOpenOverlay = () => {
        overlay.open(({ isOpen, close, unmount }) => (
            <FormProvider {...methods}>
                <CouponApplyOverlay
                    isOpen={isOpen}
                    close={close}
                    unmount={unmount}
                />
            </FormProvider>
        ));
    };

    const productCouponAmt =
        calculateOrderSheetData?.paymentInfo.productCouponAmt || 0;
    const cartCouponAmt =
        calculateOrderSheetData?.paymentInfo.cartCouponAmt || 0;

    return (
        <section className={styles.benefitContainer}>
            <h3 className={styles.title}>{t('쿠폰')}</h3>

            <div className={styles.selectBox} onClick={handleOpenOverlay}>
                <div className={styles.selectLeft}>
                    <span className={styles.selectedLabel}>
                        {isCouponSelected
                            ? t('쿠폰 적용 중')
                            : t('쿠폰 사용 안함')}
                    </span>
                    {(productCouponAmt > 0 || cartCouponAmt > 0) && (
                        <div className={styles.discountBadgeGroup}>
                            {productCouponAmt > 0 && (
                                <span className={styles.discountBadge}>
                                    {t('상품 쿠폰')} -
                                    {CURRENCY(productCouponAmt).format()}
                                </span>
                            )}
                            {cartCouponAmt > 0 && (
                                <span className={styles.discountBadge}>
                                    {t('주문 쿠폰')} -
                                    {CURRENCY(cartCouponAmt).format()}
                                </span>
                            )}
                        </div>
                    )}
                </div>

                <div className={styles.countWrapper}>
                    <span>{usableCouponCnt}장</span>
                    <ChevronRight size={18} />
                </div>
            </div>
        </section>
    );
};

export default Coupon;
