import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import {
    ModalLayout,
    type DefaultModalLayoutProps,
} from '@/shared/components/layout';
import { ClaimDetailContent } from '@/components/layer-contents/claim-detail/claim-detail-content';
import { Button } from '@/shared/ui/button';
import { CLAIM_TYPE_MAP } from '@/const/label';
import type { ClaimType } from '@/models';

export interface ClaimDetailModalProps extends DefaultModalLayoutProps {
    claimNo: number;
    claimType: ClaimType;
}

export const ClaimDetailModal = ({
    claimNo,
    claimType,
    ...props
}: ClaimDetailModalProps) => {
    const { t } = useTranslation();

    const claimTypeLabel = useMemo(() => {
        return `${CLAIM_TYPE_MAP[claimType]} 상세`;
    }, [claimType]);

    return (
        <ModalLayout
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
        </ModalLayout>
    );
};
