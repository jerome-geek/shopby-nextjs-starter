import { useTranslation } from 'react-i18next';

import {
    ModalLayout,
    type DefaultModalLayoutProps,
} from '@/components/layout';
import { ClaimDetailContent } from '@/components/layer-contents/claim-detail/claim-detail-content';
import { Button } from '@/components/ui/button';

export interface ClaimDetailModalProps extends DefaultModalLayoutProps {
    claimNo: number;
}

export const ClaimDetailModal = ({
    claimNo,
    ...props
}: ClaimDetailModalProps) => {
    const { t } = useTranslation();

    return (
        <ModalLayout
            {...props}
            title={t('클레임 조회')}
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
