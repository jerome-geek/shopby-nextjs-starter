import OrderDetailsContent from '@/features/order/components/order-details-content';
import useOrderDetail from '@/hooks/suspenseQuery/order/myOrder/useOrderDetail';

/**
 * [회원 주문 내역 렌더러]
 */
const MemberOrderContent = ({ orderNo }: { orderNo: string }) => {
    const { data: orderInfo } = useOrderDetail({ orderNo });

    return <OrderDetailsContent orderInfo={orderInfo} />;
};

export default MemberOrderContent;
