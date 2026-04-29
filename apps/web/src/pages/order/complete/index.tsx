import { useRouter } from 'next/router';
import { overlay } from 'overlay-kit';
import { Suspense, useEffect, useRef } from 'react';
import { isMobile } from 'react-device-detect';
import { useTranslation } from 'react-i18next';

import { RecipeRecommendationBottomSheet } from '@/components/bottom-sheet/recipe-recommendation';
import ShopbyApiErrorBoundary from '@/components/error-boundary/shopby';
import { CSRLayout } from '@/components/layout';
import { RecipeRecommendationModal } from '@/components/modal/recipe-recommendation';
import GuestOrderContent from '@/features/order/components/guest-order-content';
import MemberOrderContent from '@/features/order/components/member-order-content';
import OrderFail from '@/features/order/components/order-fail';
import { useAuth } from '@/hooks/useAuth';
import * as styles from '@/pages/order/complete/index.css';

const OrderComplete = () => {
    const { t } = useTranslation();
    const router = useRouter();
    const isLogin = useAuth();
    const hasOpenedRef = useRef(false);

    const {
        orderNo,
        result = 'SUCCESS',
        // guestToken = null,
    } = router.query as {
        orderNo: string;
        result: 'SUCCESS' | 'FAIL';
        guestToken?: string;
    };

    useEffect(() => {
        if (!router.isReady || hasOpenedRef.current) {
            return;
        }

        if (!isMobile && window.opener) {
            window.opener.location.href = window.location.href;
            setTimeout(() => {
                window.close();
            }, 500);
        }

        if (result === 'SUCCESS' && orderNo) {
            hasOpenedRef.current = true;
            if (isMobile) {
                overlay.open(({ isOpen, close, unmount }) => (
                    <RecipeRecommendationBottomSheet
                        isOpen={isOpen}
                        close={close}
                        unmount={unmount}
                    />
                ));
            } else {
                overlay.open(({ isOpen, close, unmount }) => (
                    <RecipeRecommendationModal
                        isOpen={isOpen}
                        close={close}
                        unmount={unmount}
                    />
                ));
            }
        }
    }, [router.isReady, result, orderNo]);

    if (router.isReady && !orderNo && result === 'SUCCESS') {
        void router.replace('/');
        return null;
    }

    return (
        <CSRLayout>
            <div className={styles.pageWrapper}>
                {result === 'SUCCESS' && orderNo ? (
                    <ShopbyApiErrorBoundary
                        fallback={
                            <div className={styles.loadingWrapper}>
                                {t('데이터를 불러오는 중 오류가 발생했습니다.')}
                            </div>
                        }
                    >
                        <Suspense
                            fallback={
                                <div className={styles.loadingWrapper}>
                                    {t('로딩 중...')}
                                </div>
                            }
                        >
                            {isLogin ? (
                                <MemberOrderContent orderNo={orderNo} />
                            ) : (
                                <GuestOrderContent orderNo={orderNo} />
                            )}
                        </Suspense>
                    </ShopbyApiErrorBoundary>
                ) : (
                    <OrderFail />
                )}
            </div>
        </CSRLayout>
    );
};

export default OrderComplete;
