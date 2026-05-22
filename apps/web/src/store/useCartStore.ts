import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { OptionInputs } from '@/models/order';

export interface GuestCartItem {
    productNo: number;
    optionNo: number;
    orderCnt: number;
    baseProductNo?: number;
    optionInputs?: OptionInputs[];
}

interface CartStore {
    cartItems: GuestCartItem[];
    addItem: (item: GuestCartItem) => void;
    removeItem: (productNo: number, optionNo: number) => void;
    updateItem: (productNo: number, optionNo: number, orderCnt: number) => void;
    clearCart: () => void;
}

export const useCartStore = create<CartStore>()(
    persist(
        (set) => ({
            cartItems: [],
            addItem: (item) =>
                set((state) => {
                    const existingItemIndex = state.cartItems.findIndex(
                        (i) =>
                            i.productNo === item.productNo &&
                            i.optionNo === item.optionNo,
                    );
                    if (existingItemIndex > -1) {
                        const newItems = [...state.cartItems];
                        newItems[existingItemIndex].orderCnt += item.orderCnt;
                        return { cartItems: newItems };
                    }
                    return { cartItems: [...state.cartItems, item] };
                }),
            removeItem: (productNo, optionNo) =>
                set((state) => ({
                    cartItems: state.cartItems.filter(
                        (i) =>
                            !(
                                i.productNo === productNo &&
                                i.optionNo === optionNo
                            ),
                    ),
                })),
            updateItem: (productNo, optionNo, orderCnt) =>
                set((state) => ({
                    cartItems: state.cartItems.map((i) =>
                        i.productNo === productNo && i.optionNo === optionNo
                            ? { ...i, orderCnt }
                            : i,
                    ),
                })),
            clearCart: () => set({ cartItems: [] }),
        }),
        {
            name: 'shopby-guest-cart',
        },
    ),
);
