import { overlay } from 'overlay-kit';

import { ClaimDetailBottomSheet } from '@/components/layer-contents/claim-detail/claim-detail-bottom-sheet';
import { ClaimDetailModal } from '@/components/layer-contents/claim-detail/claim-detail-modal';
import { Button } from '@/components/ui/button';
import { useClaim } from '@/features/claim';
import { useAuth } from '@/hooks/useAuth';
import { useResponsive } from '@/hooks/utils';
import type { NextActionType } from '@/models';

export interface NextActionButtonProps {
    nextActionType: NextActionType;
    productNo: number;
    optionNo: number;
    orderOptionNo: number;
    orderNo: string;
    uri: string;
    claimNo: number | null;
    isFreeGift: boolean;
}

export const NextActionButton = ({
    nextActionType,
    productNo,
    orderOptionNo,
    optionNo,
    orderNo,
    uri,
    claimNo,
    isFreeGift,
}: NextActionButtonProps) => {
    const { isMobile } = useResponsive();

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

    const openClaimDetailModal = () => {
        if (isMobile) {
            overlay.open((props) => {
                return <ClaimDetailBottomSheet {...props} claimNo={claimNo!} />;
            });
            return;
        }

        overlay.open((props) => {
            return <ClaimDetailModal {...props} claimNo={claimNo!} />;
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
                {label}
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
