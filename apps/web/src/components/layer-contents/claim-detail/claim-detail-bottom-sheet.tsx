import { useTranslation } from 'react-i18next';

import {
    BottomSheetLayout,
    type DefaultBottomSheetProps,
} from '@/components/layout';
import { ClaimDetailContent } from '@/components/layer-contents/claim-detail/claim-detail-content';
import { Button } from '@/components/ui/button';

export interface ClaimDetailBottomSheetProps extends DefaultBottomSheetProps {
    claimNo: number;
}

export const ClaimDetailBottomSheet = ({
    claimNo,
    ...props
}: ClaimDetailBottomSheetProps) => {
    const { t } = useTranslation();

    return (
        <BottomSheetLayout
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
        </BottomSheetLayout>
    );
};
