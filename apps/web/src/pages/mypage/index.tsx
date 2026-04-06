import { MypageLayout } from '@/components/layout';
import ShopbyApiErrorBoundary from '@/components/error-boundary/shopby';
import MyPageMainMobilePaths from '@/components/mypage/main/mobile-paths';
import OrderStatusSummary from '@/components/mypage/main/order-status-summary/index';
import OrderSummary from '@/components/mypage/main/order-summary';
import RecentOrderProducts from '@/components/mypage/main/recent-order-products';
import Summary from '@/components/mypage/main/summary/index';
import useResponsive from '@/hooks/utils/useResponsive';
import * as styles from '@/pages/mypage/index.css';

export default function MypageMain() {
    const { isMobile } = useResponsive();

    return (
        <div className={styles.container}>
            <ShopbyApiErrorBoundary>
                <Summary />
            </ShopbyApiErrorBoundary>

            <ShopbyApiErrorBoundary>
                <OrderStatusSummary />
            </ShopbyApiErrorBoundary>

            <ShopbyApiErrorBoundary>
                <OrderSummary />
            </ShopbyApiErrorBoundary>

            {!isMobile && (
                <ShopbyApiErrorBoundary>
                    <RecentOrderProducts />
                </ShopbyApiErrorBoundary>
            )}

            {isMobile && <MyPageMainMobilePaths />}
        </div>
    );
}

MypageMain.getLayout = (page: React.ReactNode) => {
    return <MypageLayout>{page}</MypageLayout>;
};
