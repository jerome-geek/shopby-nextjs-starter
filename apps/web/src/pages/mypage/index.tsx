import { MypageLayout } from '@/components/layout';
import MyPageMainMobilePaths from '@/components/mypage/main/mobile-paths';
import OrderSummary from '@/components/mypage/main/order-summary';
import RecentOrderProducts from '@/components/mypage/main/recent-order-products';
import {
    OrderStatusSummary,
    OrderStatusSummarySkeleton,
    MypageSummary,
} from '@/features/mypage';
import * as styles from '@/pages/mypage/index.css';
import ShopbyAsyncBoundary from '@/shared/boundary/shopby-async-boundary';
import { Only } from '@/shared/components/only';

export default function MypageMainPage() {
    return (
        <div className={styles.container}>
            <ShopbyAsyncBoundary>
                <MypageSummary />
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

            <Only.Mobile>
                <MyPageMainMobilePaths />
            </Only.Mobile>
        </div>
    );
}

MypageMainPage.getLayout = (page: React.ReactNode) => (
    <MypageLayout>{page}</MypageLayout>
);
