import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

import { NEXT_ACTION_MAP } from '@/const/label';
import { PATHS } from '@/const/paths';
import { useDialog } from '@/hooks/utils';
import { NextActionType } from '@/models';

interface UseClaimProps {
    nextActionType: NextActionType;
    orderOptionNo: number;
    orderNo: string;
    uri: string;
    claimNo: number | null;
    productNo: number;
    optionNo: number;
}

export const useClaim = ({
    nextActionType,
    orderOptionNo,
    orderNo,
    productNo,
    optionNo,
    uri,
    // claimNo,
}: UseClaimProps) => {
    const { t } = useTranslation();
    const router = useRouter();
    const { openDialog, openAsyncDialog } = useDialog();

    // label map (fallback to nextActionType text if not mapped)
    const rawLabel =
        NEXT_ACTION_MAP[nextActionType as keyof typeof NEXT_ACTION_MAP];
    const label = t(rawLabel ?? '');

    const nextAction = () => {
        switch (nextActionType) {
            case 'VIEW_DELIVERY':
                return () => {
                    if (uri) window.open(uri, '_blank');
                };
            case 'VIEW_CLAIM':
                return () => {
                    void router.push(`${PATHS.MYPAGE.ORDERS.MAIN}/${orderNo}`);
                };
            case 'WRITE_REVIEW':
                return () => {
                    void router.push(
                        `${PATHS.MYPAGE.REVIEWS.MAIN}/write/${productNo}?optionNo=${optionNo}&orderOptionNo=${orderOptionNo}`,
                    );
                };
            case 'CONFIRM_ORDER':
            case 'DELIVERY_DONE':
            case 'CANCEL':
            case 'RETURN':
            case 'EXCHANGE':
            case 'CANCEL_ALL':
            case 'WITHDRAW_CANCEL':
            case 'WITHDRAW_EXCHANGE':
            case 'WITHDRAW_RETURN':
                return async () => {
                    const confirmMessage =
                        nextActionType === 'CONFIRM_ORDER'
                            ? '해당 상품을 구매확정하시겠습니까?'
                            : nextActionType === 'DELIVERY_DONE'
                              ? '해당 상품을 배송완료 처리하시겠습니까?'
                              : '신청하시겠습니까?';

                    const isAgree = await openAsyncDialog({
                        message: t(confirmMessage),
                        onCloseReturnValue: false,
                        onConfirmReturnValue: true,
                    });

                    if (isAgree) {
                        // TODO: Mutation 연동 필요
                        openDialog({
                            message: t('준비 중인 기능입니다.'),
                        });
                    }
                };
            default:
                return () => {};
        }
    };

    return { label, nextAction };
};
