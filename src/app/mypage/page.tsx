import { getCachedProfile } from '@/api/member/profile.server';
import OrderStatus from '@/components/mypage/order-status';
import RecentOrders from '@/components/mypage/recent-orders';
import RecentWishlist from '@/components/mypage/recent-wishlist';
import MyPageSummary from '@/components/mypage/summary';

export default async function MyPage() {
    const profileData = await getCachedProfile();

    return (
        <div>
            <MyPageSummary />

            <OrderStatus />

            <RecentOrders />

            <RecentWishlist />
        </div>
    );
}
