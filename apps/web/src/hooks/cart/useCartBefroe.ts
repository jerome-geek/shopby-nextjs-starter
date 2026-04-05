import { flatMap, map, pipe, sum } from '@fxts/core';
import { useMemo } from 'react';
import { shallowEqual } from 'react-redux';

import { useCartCount, useCartList } from '@/hooks/query/order/cart';
import { useGuestCartList } from '@/hooks/query/order/guestOrder';
import { GetCartData } from '@/models/order/guestOrder';
import { useTypedSelector } from '@/state/store';
import { checkLogin } from '@/utils/users';

const useCart = () => {
    const isLogin = checkLogin();

    const { cart: guestCartList } = useTypedSelector(
        ({ cart }) => ({
            cart: cart.data,
        }),
        shallowEqual,
    );

    const { data: cartListData, isLoading: isCartListLoading } = useCartList({
        searchParams: {
            divideInvalidProducts: true,
        },
    });

    const { data: guestCartListData, isLoading: isGuestCartListLoading } =
        useGuestCartList({
            data: guestCartList as GetCartData,
            searchParams: {
                divideInvalidProducts: true,
            },
        });

    const { data: cartCount } = useCartCount();

    const guestCartCount = useMemo(() => {
        if (!guestCartListData?.deliveryGroups) {
            return 0;
        }

        return pipe(
            guestCartListData.deliveryGroups,
            map((item) => item.orderProducts.length),
            sum,
        );
    }, [guestCartListData?.deliveryGroups]);

    const cartCountByOption = useMemo(() => {
        if (!cartListData?.deliveryGroups) {
            return 0;
        }

        return pipe(
            cartListData.deliveryGroups,
            flatMap((item) => item.orderProducts),
            flatMap((product) => product.orderProductOptions),
            flatMap((option) => option.orderCnt),
            sum,
        );
    }, [cartListData]);

    const guestCartCountByOption = useMemo(() => {
        if (!guestCartListData?.deliveryGroups) {
            return 0;
        }

        return pipe(
            guestCartListData.deliveryGroups,
            flatMap((item) => item.orderProducts),
            flatMap((product) => product.orderProductOptions),
            flatMap((option) => option.orderCnt),
            sum,
        );
    }, [guestCartListData?.deliveryGroups]);

    const cartInfo = useMemo(() => {
        return isLogin ? cartListData : guestCartListData;
    }, [isLogin, cartListData, guestCartListData]);

    const totalCount = useMemo(() => {
        return isLogin ? cartCount?.count || 0 : guestCartCount;
    }, [isLogin, cartCount, guestCartCount]);

    const totalCountByOption = useMemo(() => {
        return isLogin ? cartCountByOption : guestCartCountByOption;
    }, [isLogin, cartCountByOption, guestCartCountByOption]);

    const isLoading = isLogin ? isCartListLoading : isGuestCartListLoading;

    return {
        cartInfo,
        totalCount,
        totalCountByOption,
        isLoading,
    };
};

export default useCart;
