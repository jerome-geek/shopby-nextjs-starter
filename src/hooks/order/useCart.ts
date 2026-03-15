import { useCartStore } from '@/store/useCartStore';
import { useStore } from '@/hooks/utils/useStore';

/**
 * 장바구니 관련 훅
 * - 비회원의 경우 Zustand 스토어(localStorage)를 통해 장바구니 상태를 관리합니다.
 * - useStore 공용 훅을 사용하여 Hydration 이슈를 해결합니다.
 */
const useCart = () => {
    const cartItems = useStore(useCartStore, (state) => state.cartItems) || [];

    const cartCount = cartItems.length;

    const totalOrderCnt = cartItems.reduce(
        (acc, cur) => acc + cur.orderCnt,
        0,
    );

    return {
        cartCount,
        totalOrderCnt,
        cartItems,
    };
};

export default useCart;
