import {
    GetCartListParams,
    GetSelectedCartPriceParams,
} from '@/models/order/cart';

const cartKeys = {
    all: ['cart'] as const,

    /** 장바구니 리스트 */
    lists: () => [...cartKeys.all, 'list'] as const,
    list: (memberNo: number, searchParams?: GetCartListParams) =>
        [...cartKeys.lists(), memberNo, searchParams] as const,

    /** 장바구니 상품 개수 */
    count: (memberNo: number) => [...cartKeys.all, 'count', memberNo] as const,

    /** 장바구니 상품 금액 */
    price: (memberNo: number, searchParams: GetSelectedCartPriceParams) =>
        [...cartKeys.all, 'price', memberNo, searchParams] as const,
};

export default cartKeys;
