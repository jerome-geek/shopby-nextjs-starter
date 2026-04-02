import { useSuspenseQuery } from '@tanstack/react-query';
import { guestOrder } from '@/api/order';

interface UseGuestOrderDetailParams {
    orderNo: string;
}

export const useGuestOrderDetail = ({ orderNo }: UseGuestOrderDetailParams) => {
    return useSuspenseQuery({
        queryKey: ['guestOrderDetail', orderNo],
        queryFn: async () => {
            const response = await guestOrder.getOrderDetail(orderNo, {
                orderRequestType: 'ALL',
            });
            return response.data;
        },
    });
};

export default useGuestOrderDetail;
