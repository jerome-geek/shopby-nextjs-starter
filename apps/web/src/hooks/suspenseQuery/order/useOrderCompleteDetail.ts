import { useSuspenseQuery } from '@tanstack/react-query';
import { guestOrder, myOrder } from '@/api/order';

interface UseOrderCompleteDetailParams {
    orderNo: string;
    isLogin: boolean;
}

export const useOrderCompleteDetail = ({ orderNo, isLogin }: UseOrderCompleteDetailParams) => {
    return useSuspenseQuery({
        queryKey: ['orderCompleteDetail', orderNo, isLogin],
        queryFn: async () => {
            if (isLogin) {
                const response = await myOrder.getOrderDetail(orderNo);
                return response.data;
            } else {
                const response = await guestOrder.getOrderDetail(orderNo, {
                    orderRequestType: 'ALL',
                });
                return response.data;
            }
        },
    });
};
