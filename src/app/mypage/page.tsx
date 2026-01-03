import OrderStatus from '@/components/mypage/order-status';
import MyPageSummary from '@/components/mypage/summary';

export default function MyPage() {
    return (
        <div>
            <MyPageSummary />
            <OrderStatus />
        </div>
    );
}
