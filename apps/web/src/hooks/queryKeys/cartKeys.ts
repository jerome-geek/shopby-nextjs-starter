import type {
    GetCartListParams,
    GetSelectedCartPriceParams,
} from '@/models/order/cart';

const cartKeys = {
    all: ['cart'] as const,

    /** 장바구니 리스트 */
    lists: () => [...cartKeys.all, 'list'] as const,
    list: (searchParams?: GetCartListParams) =>
        [...cartKeys.lists(), searchParams] as const,

    /** 장바구니 상품 개수 */
    count: () => [...cartKeys.all, 'count'] as const,

    /** 장바구니 상품 금액 */
    price: (searchParams: GetSelectedCartPriceParams) =>
        [...cartKeys.all, 'price', searchParams] as const,
};

export default cartKeys;
