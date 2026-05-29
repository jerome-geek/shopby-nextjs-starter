import { includes } from '@fxts/core';

interface ShowNextActionContext {
    orderStatusType: string;
    isFreeGift: boolean;
    isExchangeDisabled: boolean;
    isLogin: boolean;
}

/**
 * 마이페이지 주문 내역 아이템에서 다음 동작(nextActions)의 노출 여부를 결정하는 헬퍼 함수
 */
export const shouldShowNextAction = (
    nextActionType: string,
    context: ShowNextActionContext,
): boolean => {
    const { orderStatusType, isFreeGift, isExchangeDisabled, isLogin } =
        context;

    // 1. 배송중 / 배송완료 상태일 때는 특정 액션만 노출 허용
    if (includes(orderStatusType, ['DELIVERY_ING', 'DELIVERY_DONE'])) {
        if (
            !includes(nextActionType, [
                'VIEW_DELIVERY',
                'EXCHANGE',
                'RETURN',
                'CONFIRM_ORDER',
            ])
        ) {
            return false;
        }
    }

    // 2. 사은품 예외 처리 (사은품은 교환 및 리뷰 작성이 불가능)
    if (isFreeGift && includes(nextActionType, ['EXCHANGE', 'WRITE_REVIEW'])) {
        return false;
    }

    // 3. 교환이 불가능한 주문 상태 처리
    if (nextActionType === 'EXCHANGE' && isExchangeDisabled) {
        return false;
    }

    // 4. 입금대기 상태인 경우 주문 전체 취소(CANCEL_ALL) 버튼 미노출
    if (orderStatusType === 'DEPOSIT_WAIT' && nextActionType === 'CANCEL_ALL') {
        return false;
    }

    // 5. 로그인 상태가 아닐 때 리뷰 작성 버튼 미노출
    if (isLogin && nextActionType === 'WRITE_REVIEW') {
        return false;
    }

    // 6. 상품준비중 또는 배송준비중 상태일 때 취소신청 취소(WITHDRAW_CANCEL) 버튼 미노출
    if (includes(orderStatusType, ['PRODUCT_PREPARE', 'DELIVERY_PREPARE'])) {
        if (nextActionType === 'WITHDRAW_CANCEL') {
            return false;
        }
    }

    return true;
};
