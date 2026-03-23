import { includes } from '@fxts/core';
import { useCallback, useEffect, useRef } from 'react';
import { useLocalStorage } from 'usehooks-ts';

import { useProductProfileMutation } from '@/hooks/mutations';
import { useAuth } from '@/hooks/useAuth';

/**
 * [읽기/쓰기 전용 훅]
 * 최근 본 상품 목록을 가져오거나 수동으로 추가할 때 사용합니다.
 * (컴포넌트 렌더링을 발생시키지만, 스스로 부수효과를 만들지 않는 순수 상태 훅)
 */
export const useRecentViewProducts = () => {
    const isLogin = useAuth();

    const [mallProductNos, setMallProductNos] = useLocalStorage<number[]>(
        'GUEST_RECENT_VIEW_PRODUCT',
        [],
    );

    const {
        recentView: { mutate: recentViewMutate },
    } = useProductProfileMutation();

    const addRecentProduct = useCallback(
        (productNo: number | undefined) => {
            if (!productNo || isLogin === null) return;

            if (isLogin) {
                // 회원: 서버에 전송
                recentViewMutate({
                    data: { productNo },
                });
            } else {
                // 비회원: 로컬 스토리지 업데이트
                setMallProductNos((prev) => {
                    if (!includes(productNo, prev)) {
                        return [...prev, productNo];
                    }
                    return prev;
                });
            }
        },
        [isLogin, recentViewMutate, setMallProductNos],
    );

    return { mallProductNos, addRecentProduct };
};

/**
 * [자동 추적(Tracking) 전용 훅]
 * 상품 상세 페이지 등에서 호출만 해두면 알아서 '최근 본 상품' 액션을 1회 발생시킵니다.
 * @example
 * // pages/products/[productNo].tsx 안에서 호출
 * useTrackRecentViewProduct(productNo);
 */
export const useTrackRecentViewProduct = (productNo?: number) => {
    const { addRecentProduct } = useRecentViewProducts();
    const isLogin = useAuth();

    // StrictMode 등에서 중복 호출을 막기 위한 플래그
    const trackedRef = useRef(false);

    useEffect(() => {
        // 이미 추적했거나, 로그인 상태를 아직 모르면 대기
        if (trackedRef.current || !productNo || isLogin === null) return;

        addRecentProduct(productNo);
        trackedRef.current = true;
    }, [productNo, isLogin, addRecentProduct]);
};
