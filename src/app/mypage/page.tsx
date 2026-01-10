import OrderStatus from '@/components/mypage/order-status';
import RecentOrders from '@/components/mypage/recent-orders';
import RecentWishlist from '@/components/mypage/recent-wishlist';
import MyPageSummary from '@/components/mypage/summary';

export const dynamic = 'force-dynamic';

export default async function MyPage() {
    return (
        <div>
            <MyPageSummary />

            <OrderStatus />

            <RecentOrders />

            <RecentWishlist />
        </div>
    );
}
