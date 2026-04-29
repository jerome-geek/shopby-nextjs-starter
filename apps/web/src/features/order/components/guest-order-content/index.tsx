import useGuestOrderDetail from '@/hooks/suspenseQuery/order/guestOrder/useGuestOrderDetail';

import OrderDetailsContent from '@/features/order/components/order-details-content';

/**
 * [비회원 주문 내역 렌더러]
 */
const GuestOrderContent = ({ orderNo }: { orderNo: string }) => {
    const { data: orderInfo } = useGuestOrderDetail({ orderNo });
    return <OrderDetailsContent orderInfo={orderInfo} />;
};

export default GuestOrderContent;
