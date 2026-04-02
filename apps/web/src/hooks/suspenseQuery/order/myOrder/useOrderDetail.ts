import { useSuspenseQuery } from '@tanstack/react-query';
import { myOrder } from '@/api/order';

interface UseOrderDetailParams {
    orderNo: string;
}

export const useOrderDetail = ({ orderNo }: UseOrderDetailParams) => {
    return useSuspenseQuery({
        queryKey: ['myOrderDetail', orderNo],
        queryFn: async () => {
            const response = await myOrder.getOrderDetail(orderNo);
            return response.data;
        },
    });
};

export default useOrderDetail;
