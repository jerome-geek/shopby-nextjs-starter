import { includes } from '@fxts/core';
import { overlay } from 'overlay-kit';
import { useMemo } from 'react';

import { ClaimDetailBottomSheet } from '@/components/layer-contents/claim-detail/claim-detail-bottom-sheet';
import { ClaimDetailModal } from '@/components/layer-contents/claim-detail/claim-detail-modal';
import { Button } from '@/components/ui/button';
import { CLAIM_TYPE_MAP } from '@/const/label';
import { useClaim } from '@/features/claim';
import { useAuth } from '@/hooks/useAuth';
import { useDialog, useResponsive } from '@/hooks/utils';
import type {
    ClaimStatusType,
    NextActionType,
    OrderStatusType,
} from '@/models';

export interface NextActionButtonProps {
    nextActionType: NextActionType;
    productNo: number;
    optionNo: number;
    orderOptionNo: number;
    orderNo: string;
    uri: string;
    claimNo: number | null;
    isFreeGift: boolean;
    orderStatusType: OrderStatusType;
    claimStatusType: ClaimStatusType;
}

export const NextActionButton = ({
    nextActionType,
    orderStatusType,
    claimStatusType,
    productNo,
    orderOptionNo,
    optionNo,
    orderNo,
    uri,
    claimNo,
    isFreeGift,
}: NextActionButtonProps) => {
    const { isMobile } = useResponsive();

    const { openAsyncDialog } = useDialog();

    const isLogin = useAuth();

    const { label, nextAction } = useClaim({
        nextActionType,
        orderNo,
        orderOptionNo,
        uri,
        claimNo,
        productNo,
        optionNo,
    });

    const claimType = useMemo(() => {
        if (includes(claimStatusType, ['RETURN'])) {
            return 'RETURN';
        }

        if (includes(claimStatusType, ['EXCHANGE'])) {
            return 'EXCHANGE';
        }

        return 'CANCEL';
    }, [claimStatusType]);

    const openClaimDetailModal = () => {
        if (isMobile) {
            overlay.open((props) => {
                return (
                    <ClaimDetailBottomSheet
                        {...props}
                        claimNo={claimNo!}
                        claimType={claimType}
                    />
                );
            });
            return;
        }

        overlay.open((props) => {
            return (
                <ClaimDetailModal
                    {...props}
                    claimNo={claimNo!}
                    claimType={claimType}
                />
            );
        });
    };

    if (
        isFreeGift &&
        (nextActionType === 'EXCHANGE' || nextActionType === 'WRITE_REVIEW')
    ) {
        return null;
    }

    if (!isLogin && nextActionType === 'WRITE_REVIEW') {
        return null;
    }

    if (nextActionType === 'VIEW_CLAIM' && claimNo) {
        return (
            <Button
                frame='outlined'
                size='small'
                onClick={openClaimDetailModal}
                style={{ height: '32px', fontSize: '12px' }}
            >
                {`${CLAIM_TYPE_MAP[claimType]} 상세`}
            </Button>
        );
    }

    if (nextActionType === 'CONFIRM_ORDER') {
        return (
            <Button
                frame='solid'
                variant='primary'
                size='small'
                onClick={nextAction()}
                style={{ height: '32px', fontSize: '12px' }}
            >
                {label}
            </Button>
        );
    }

    if (includes(orderStatusType, ['PRODUCT_PREPARE', 'DELIVERY_PREPARE'])) {
        if (nextActionType === 'WITHDRAW_CANCEL') {
            return null;
        }

        if (nextActionType === 'CANCEL') {
            const handleCancelClick = async () => {
                const isAgree = await openAsyncDialog({
                    type: 'confirm',
                    message: '취소신청 안내',
                    description:
                        '배송준비중인 상품은 배송 진행 상항에 따라 취소가 안될 수도 있어요.',
                    onCloseReturnValue: false,
                    onConfirmReturnValue: true,
                    confirmText: '계속하기',
                    cancelText: '그만하기',
                });

                if (isAgree) {
                    nextAction()();
                }
            };

            return (
                <Button
                    frame='outlined'
                    size='small'
                    onClick={handleCancelClick}
                    style={{ height: '32px', fontSize: '12px' }}
                >
                    {label}
                </Button>
            );
        }
    }

    return (
        <Button
            frame='outlined'
            size='small'
            onClick={nextAction()}
            style={{ height: '32px', fontSize: '12px' }}
        >
            {label}
        </Button>
    );
};
