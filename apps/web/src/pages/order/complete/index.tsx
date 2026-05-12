import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import LoadingWrapper from '@/components/common/loading-wrapper';
import Seo from '@/components/common/seo';
import { CSRLayout } from '@/components/layout';
import { PATHS } from '@/const/paths';
import { useCustomDialog } from '@/features/dialog';
import GuestOrderContent from '@/features/order/components/guest-order-content';
import MemberOrderContent from '@/features/order/components/member-order-content';
import OrderFail from '@/features/order/components/order-fail';
import { useAuth } from '@/hooks/useAuth';
import { useResponsive } from '@/hooks/utils';
import * as styles from '@/pages/order/complete/index.css';
import ShopbyAsyncBoundary from '@/shared/boundary/shopby-async-boundary';

const OrderCompletePage = () => {
    const { t } = useTranslation();
    const router = useRouter();
    const isLogin = useAuth();
    const { isMobile } = useResponsive();
    const { openRecipeRecommendation } = useCustomDialog();

    const {
        orderNo,
        result = 'SUCCESS',
        guestToken,
    } = router.query as {
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
                    <LoadingWrapper
                        isLoading
                        containerStyle={{
                            height: '80vh',
                        }}
                    >
                        <span />
                    </LoadingWrapper>
                }
            >
                <div className={styles.pageWrapper}>
                    {isOrderSuccess ? (
                        <ShopbyAsyncBoundary
                            fallback={
                                <LoadingWrapper
                                    isLoading
                                    containerStyle={{
                                        height: '80vh',
                                    }}
                                >
                                    <span />
                                </LoadingWrapper>
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
                                <GuestOrderContent
                                    orderNo={orderNo}
                                    guestToken={guestToken}
                                />
                            )}
                        </ShopbyAsyncBoundary>
                    ) : (
                        <OrderFail />
                    )}
                </div>
            </CSRLayout>
        </>
    );
};

export default OrderCompletePage;
