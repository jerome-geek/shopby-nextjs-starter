import { flatMap, map, pipe, sum } from '@fxts/core';
import { useMemo } from 'react';

import { useCartCount, useCartList } from '@/hooks/query/order/cart';
import useGuestCartList from '@/hooks/query/order/guestOrder/useGuestCartList';
import { useAuth } from '@/hooks/useAuth';
import { useStore } from '@/hooks/utils/useStore';
import type { GetCartData } from '@/models/order/guestOrder';
import { useGuestCartStore } from '@/features/order/cart/store/useGuestCartStore';

/**
 * 장바구니 관련 훅
 * - 회원: API에서 장바구니 리스트/카운트를 조회합니다.
 * - 비회원: Zustand 스토어(localStorage)를 통해 장바구니 상태를 관리합니다.
 * - useStore 공용 훅을 사용하여 Hydration 이슈를 해결합니다.
 */
const useCart = () => {
    const isLogin = useAuth();

    // ── 비회원: Zustand 스토어 ──────────────────────────────
    const rawGuestCartItems =
        useStore(useGuestCartStore, (state) => state.cartItems) ?? [];

    const guestCartItems = useMemo(
        () => rawGuestCartItems,
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [JSON.stringify(rawGuestCartItems)],
    );

    // ── 비회원: API 상세 리스트 조회 ───────────────────────────
    const isGuestCartEnabled = !isLogin;
    const mappedGuestCartData = useMemo(() => {
        return guestCartItems.map((item, idx) => ({
            ...item,
            cartNo: idx + 1, // API usually requires a cartNo. Mocking it here.
        })) as unknown as GetCartData;
    }, [guestCartItems]);

    const { data: guestCartListData, isLoading: isGuestCartListLoading } =
        useGuestCartList({
            data: mappedGuestCartData,
            searchParams: {
                divideInvalidProducts: true,
            },
            options: {
                enabled: isGuestCartEnabled,
            },
        });

    // ── 회원: API 조회 ──────────────────────────────────────
    const isMemberCartEnabled = !!isLogin;
    const { data: cartListData, isLoading: isCartListLoading } = useCartList({
        searchParams: { divideInvalidProducts: true },
        options: { enabled: isMemberCartEnabled },
    });

    const { data: cartCountData, isLoading: isCartCountLoading } =
        useCartCount();

    // ── 카운트 집계 로직 ──────────────────────────────────────
    const memberTotalCount = cartCountData?.count ?? 0;

    const guestTotalCount = useMemo(() => {
        if (!guestCartListData?.deliveryGroups) return 0;
        return pipe(
            guestCartListData.deliveryGroups,
            map((group) => group.orderProducts.length),
            sum,
        );
    }, [guestCartListData]);

    const memberTotalCountByOption = useMemo(() => {
        if (!cartListData?.deliveryGroups) return 0;
        return pipe(
            cartListData.deliveryGroups,
            flatMap((group) => group.orderProducts),
            flatMap((product) => product.orderProductOptions),
            map((option) => option.orderCnt),
            sum,
        );
    }, [cartListData]);

    const guestTotalCountByOption = useMemo(() => {
        if (!guestCartListData?.deliveryGroups) return 0;
        return pipe(
            guestCartListData.deliveryGroups,
            flatMap((group) => group.orderProducts),
            flatMap((product) => product.orderProductOptions),
            map((option) => option.orderCnt),
            sum,
        );
    }, [guestCartListData]);

    // ── 통합 반환값 ─────────────────────────────────────────
    const cartInfo = isLogin ? cartListData : guestCartListData;
    const totalCount = isLogin ? memberTotalCount : guestTotalCount;
    const totalCountByOption = isLogin
        ? memberTotalCountByOption
        : guestTotalCountByOption;
    const isLoading = isLogin
        ? isCartListLoading || isCartCountLoading
        : isGuestCartListLoading;

    return {
        /** 회원/비회원 장바구니 통합 응답 */
        cartInfo,
        /** 장바구니 아이템 종류 수 */
        totalCount,
        /** 장바구니 총 주문 수량 */
        totalCountByOption,
        /** 로딩 상태 */
        isLoading,
        /** 비회원 전용 원시 아이템 배열 (Zustand) */
        guestCartItems,
        /** 이전 호환용: 비회원 아이템 배열 (cartItems alias) */
        cartItems: guestCartItems,
    };
};

export default useCart;
