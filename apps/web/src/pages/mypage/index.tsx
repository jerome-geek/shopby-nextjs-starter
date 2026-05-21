import Seo from '@/components/common/seo';
import { MypageLayout } from '@/components/layout';
import {
    MypageShortcuts,
    MypageSummary,
    OrderStatusSummary,
    OrderStatusSummarySkeleton,
    OrderSummary,
    RecentOrderProducts,
} from '@/features/mypage';
import * as styles from '@/pages/mypage/index.css';
import ShopbyAsyncBoundary from '@/shared/boundary/shopby-async-boundary';
import { Only } from '@/shared/components/only';

export default function MypageMainPage() {
    return (
        <>
            <Seo title='마이페이지' noindex={true} />

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
                    <MypageShortcuts />
                </Only.Mobile>
            </div>
        </>
    );
}

MypageMainPage.getLayout = (page: React.ReactNode) => (
    <MypageLayout>{page}</MypageLayout>
);
