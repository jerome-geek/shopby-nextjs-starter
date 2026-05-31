import type { ClaimType } from '@/models';
import type { GetOrderOptionDetailForClaimResponse } from '@/models/claim/member';

import { ClaimReasonContent } from './content';

interface ClaimReasonProps {
    claimType: ClaimType;
    isFileUploadEnabled?: boolean;
    orderOptionData: GetOrderOptionDetailForClaimResponse;
}

export const ClaimReason = ({
    claimType,
    isFileUploadEnabled = false,
    orderOptionData,
}: ClaimReasonProps) => {
    return (
        <ClaimReasonContent
            claimType={claimType}
            isFileUploadEnabled={isFileUploadEnabled}
            orderOptionData={orderOptionData}
        />
    );
};

export default ClaimReason;
