import { useFormContext, useWatch } from 'react-hook-form';
import { useRouter } from 'next/router';
import { overlay } from 'overlay-kit';
import { ChevronRight } from 'lucide-react';

import { useOrderSheet } from '@/hooks/suspenseQuery/order/orderSheet';
import { PaymentReserveSchemaType } from '@/schema';
import * as styles from './index.css';

const Coupon = () => {
    const router = useRouter();
    const orderSheetNo = router.query.orderSheetNo as string;

    const { control } = useFormContext<PaymentReserveSchemaType>();

    const { data: orderSheetData } = useOrderSheet({
        orderSheetNo,
        searchParams: { includeMemberAddress: true },
    });

    const coupons = useWatch({ control, name: 'coupons' });
    const isCouponSelected =
        !!coupons?.cartCouponIssueNo || !!coupons?.productCoupons?.length;

    const usableCouponCnt =
        orderSheetData?.orderSheetPromotionSummary?.usableCouponCnt ?? 0;

    const handleOpenOverlay = () => {
        // overlay-kit을 이용한 오버레이 오픈 초안
        overlay.open(({ close }) => (
            <div
                style={{
                    position: 'fixed',
                    inset: 0,
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000,
                }}
                onClick={close}
            >
                <div
                    style={{
                        background: 'white',
                        padding: '24px',
                        borderRadius: '12px',
                        width: '90%',
                        maxWidth: '400px',
                    }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <h2 style={{ marginBottom: '16px' }}>쿠폰 선택</h2>
                    <p style={{ color: '#666', marginBottom: '24px' }}>
                        사용 가능한 쿠폰 리스트가 여기에 제공될 예정입니다.
                    </p>
                    <button
                        onClick={close}
                        style={{
                            width: '100%',
                            height: '48px',
                            background: '#000',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                        }}
                    >
                        닫기
                    </button>
                </div>
            </div>
        ));
    };

    return (
        <section className={styles.container} onClick={handleOpenOverlay}>
            <h3 className={styles.title}>쿠폰</h3>

            <div className={styles.selectBox}>
                <span className={styles.selectedLabel}>
                    {isCouponSelected ? '쿠폰 적용 중' : '쿠폰 사용 안함'}
                </span>

                <div className={styles.countWrapper}>
                    <span>{usableCouponCnt}장</span>
                    <ChevronRight size={18} />
                </div>
            </div>
        </section>
    );
};

export default Coupon;
