import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import Seo from '@/components/common/seo';
import ShopbyApiErrorBoundary from '@/components/error-boundary/shopby';
import { CSRLayout } from '@/components/layout';
import { PATHS } from '@/const/paths';
import GuestOrderContent from '@/features/order/components/guest-order-content';
import MemberOrderContent from '@/features/order/components/member-order-content';
import OrderFail from '@/features/order/components/order-fail';
import { useCustomDialog } from '@/hooks/ui/useCustomDialog';
import { useAuth } from '@/hooks/useAuth';
import { useResponsive } from '@/hooks/utils';
import * as styles from '@/pages/order/complete/index.css';

const OrderCompletePage = () => {
    const { t } = useTranslation();
    const router = useRouter();
    const isLogin = useAuth();
    const { isMobile } = useResponsive();
    const { openRecipeRecommendation } = useCustomDialog();

    const { orderNo, result = 'SUCCESS' } = router.query as {
        orderNo: string;
        result: 'SUCCESS' | 'FAIL';
        guestToken?: string;
    };

    const isOrderSuccess = !!orderNo && result === 'SUCCESS';

    useEffect(() => {
        if (!router.isReady) {
            return;
        }

        if (!isMobile && window.opener) {
            window.opener.location.href = window.location.href;
            setTimeout(() => {
                window.close();
            }, 500);
        }

        if (isOrderSuccess) {
            openRecipeRecommendation();
        }
    }, [isMobile, router.isReady, isOrderSuccess, openRecipeRecommendation]);

    if (router.isReady && !orderNo && result === 'SUCCESS') {
        void router.replace(PATHS.MAIN);
        return null;
    }

    return (
        <>
            <Seo title={t('주문 완료')} />

            <CSRLayout
                fallback={
                    <div className={styles.loadingWrapper}>
                        {t('로딩 중...')}
                    </div>
                }
            >
                <div className={styles.pageWrapper}>
                    {isOrderSuccess ? (
                        <ShopbyApiErrorBoundary
                            fallback={
                                <div className={styles.loadingWrapper}>
                                    {t('로딩 중...')}
                                </div>
                            }
                            errorFallback={
                                <div className={styles.loadingWrapper}>
                                    {t(
                                        '데이터를 불러오는 중 오류가 발생했습니다.',
                                    )}
                                </div>
                            }
                        >
                            {isLogin ? (
                                <MemberOrderContent orderNo={orderNo} />
                            ) : (
                                <GuestOrderContent orderNo={orderNo} />
                            )}
                        </ShopbyApiErrorBoundary>
                    ) : (
                        <OrderFail />
                    )}
                </div>
            </CSRLayout>
        </>
    );
};

export default OrderCompletePage;
