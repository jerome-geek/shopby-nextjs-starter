import OrderDetailsContent from '@/features/order/components/order-details-content';
import { useSb } from '@/hooks/libs/shopby';
import useGuestOrderDetail from '@/hooks/suspenseQuery/order/guestOrder/useGuestOrderDetail';

/**
 * [비회원 주문 내역 렌더러]
 */
const GuestOrderContent = ({ orderNo }: { orderNo: string }) => {
    const { data: orderInfo } = useGuestOrderDetail({ orderNo });

    useSb({ order: orderInfo });

    return <OrderDetailsContent orderInfo={orderInfo} />;
};

export default GuestOrderContent;
