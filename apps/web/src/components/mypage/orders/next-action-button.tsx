import { Button } from '@/components/ui/button';
import { useResponsive } from '@/hooks/utils';
import useClaim from '@/hooks/utils/useClaim';
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

    const { label, nextAction } = useClaim({
        nextActionType,
        orderNo,
        orderOptionNo,
        uri,
        claimNo,
        productNo,
        optionNo,
    });

    // TODO: ClaimDetailBottomSheet/Modal 추후 구현
    const openClaimDetailModal = () => {
        if (isMobile) {
            // overlay.open((props) => {
            //     return <ClaimDetailBottomSheet {...props} claimNo={claimNo!} />;
            // });
            window.alert('ClaimDetailBottomSheet 준비 중입니다.');
            return;
        }

        // TODO: ClaimDetailModal 추후 구현
        // overlay.open((props) => {
        // return <ClaimDetailModal {...props} claimNo={claimNo!} />;
        // });
    };

    if (
        isFreeGift &&
        (nextActionType === 'EXCHANGE' || nextActionType === 'WRITE_REVIEW')
    ) {
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
