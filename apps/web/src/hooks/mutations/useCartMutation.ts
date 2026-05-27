import { useMutation, useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';

import { cart, guestOrder } from '@/api/order';
import { cartKeys } from '@/hooks/queryKeys';
import { useDialog, useResponsive } from '@/hooks/utils';
import type {
    DeleteCartParams,
    RegisterCartData,
    UpdateCartData,
} from '@/models/order/cart';
import type { GetCartData, GetCartParams } from '@/models/order/guestOrder';
import { useToast } from '@/hooks/ui';

const useCartMutation = () => {
    const queryClient = useQueryClient();

    const { openDialog } = useDialog();
    const { addToast } = useToast();

    const { isMobile } = useResponsive();

    const invalidate = () => {
        return queryClient.invalidateQueries({
            queryKey: cartKeys.all,
        });
    };

    const onErrorHandler = (error: Error) => {
        const message = isAxiosError(error)
            ? error.response?.data.message
            : '알 수 없는 오류가 발생했습니다.';

        if (isMobile) {
            addToast({ message, variant: 'error' });
        } else {
            openDialog({ message });
        }
    };

    return {
        /** 회원 장바구니 등록 */
        register: useMutation({
            mutationFn: async ({ data }: { data: RegisterCartData }) =>
                await cart.registerCart(data),
            onSuccess: () => {
                return invalidate();
            },
            onError: (error) => {
                onErrorHandler(error);
            },
        }),

        /** 회원 장바구니 수정 */
        modify: useMutation({
            mutationFn: async ({ data }: { data: UpdateCartData }) =>
                await cart.updateCart(data),
            onSuccess: () => {
                return invalidate();
            },
            onError: (error) => {
                onErrorHandler(error);
            },
        }),

        /** 회원 장바구니 삭제 */
        delete: useMutation({
            mutationFn: async ({
                params,
            }: {
                params: DeleteCartParams;
                isInvalidate?: boolean;
            }) => await cart.deleteCart(params),
            onSuccess: (_, { isInvalidate = true }) => {
                if (isInvalidate) {
                    return invalidate();
                }
            },
            onError: (error) => {
                onErrorHandler(error);
            },
        }),

        /** 비회원 장바구니 등록 */
        guestRegister: useMutation({
            mutationFn: async ({
                data,
                params,
            }: {
                data: GetCartData;
                params?: GetCartParams;
            }) => await guestOrder.getCart(data, params),
            onError: (error) => {
                onErrorHandler(error);
            },
        }),
    };
};

export default useCartMutation;
