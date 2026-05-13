import { MypageLayout } from '@/components/layout';
import MyPageMainMobilePaths from '@/components/mypage/main/mobile-paths';
import {
    OrderStatusSummary,
    OrderStatusSummarySkeleton,
} from '@/features/mypage/order-status-summary';
import OrderSummary from '@/components/mypage/main/order-summary';
import RecentOrderProducts from '@/components/mypage/main/recent-order-products';
import Summary from '@/components/mypage/main/summary';
import useResponsive from '@/hooks/utils/useResponsive';
import * as styles from '@/pages/mypage/index.css';
import ShopbyAsyncBoundary from '@/shared/boundary/shopby-async-boundary';
import { useEffect } from 'react';
import useMyApp from '@/hooks/myapp/useMyApp';

export default function MypageMainPage() {
    const { isMobile } = useResponsive();
    const { isMyApp } = useMyApp({ isMyAppInit: true });

    useEffect(() => {
        if (isMyApp) {
            alert('인앱 브라우저 테스트');
        }
    }, [isMyApp]);

    return (
        <div className={styles.container}>
            <ShopbyAsyncBoundary>
                <Summary />
            </ShopbyAsyncBoundary>

            <ShopbyAsyncBoundary fallback={<OrderStatusSummarySkeleton />}>
                <OrderStatusSummary />
            </ShopbyAsyncBoundary>

            <ShopbyAsyncBoundary>
                <OrderSummary />
            </ShopbyAsyncBoundary>

            <ShopbyAsyncBoundary>
                <RecentOrderProducts />
            </ShopbyAsyncBoundary>

            {isMobile && <MyPageMainMobilePaths />}
        </div>
    );
}

MypageMainPage.getLayout = (page: React.ReactNode) => (
    <MypageLayout>{page}</MypageLayout>
);
