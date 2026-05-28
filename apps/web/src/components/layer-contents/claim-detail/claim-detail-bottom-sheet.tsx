import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { ClaimDetailContent } from '@/components/layer-contents/claim-detail/claim-detail-content';
import {
    BottomSheetLayout,
    type DefaultBottomSheetProps,
} from '@/components/layout';
import { Button } from '@/components/ui/button';
import { CLAIM_TYPE_MAP } from '@/const/label';
import { ClaimType } from '@/models';

export interface ClaimDetailBottomSheetProps extends DefaultBottomSheetProps {
    claimNo: number;
    claimType: ClaimType;
}

export const ClaimDetailBottomSheet = ({
    claimNo,
    claimType,
    ...props
}: ClaimDetailBottomSheetProps) => {
    const { t } = useTranslation();

    const claimTypeLabel = useMemo(() => {
        return `${CLAIM_TYPE_MAP[claimType]} 상세`;
    }, [claimType]);

    return (
        <BottomSheetLayout
            {...props}
            title={t(claimTypeLabel)}
            footerButtonList={[
                <Button
                    key='confirm'
                    frame='solid'
                    variant='primary'
                    onClick={props.close}
                >
                    {t('확인')}
                </Button>,
            ]}
        >
            <ClaimDetailContent claimNo={claimNo} />
        </BottomSheetLayout>
    );
};
