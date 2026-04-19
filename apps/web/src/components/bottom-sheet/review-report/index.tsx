import { useTranslation } from 'react-i18next';

import { ReviewReport } from '@/components/layer-contents/review-report';
import {
    BottomSheetLayout,
    DefaultBottomSheetProps,
} from '@/components/layout';
import { Button } from '@/components/ui/button';

interface ReviewReportBottomSheetProps extends DefaultBottomSheetProps {
    productNo: number;
    reviewNo: number;
}

export const REPORT_REASON_OPTIONS = [
    { value: 'COPYRIGHT', label: '저작권 침해' },
    { value: 'SLANDER', label: '비방' },
    { value: 'ETC', label: '기타사유' },
];

export const ReviewReportBottomSheet = ({
    productNo,
    reviewNo,
    ...props
}: ReviewReportBottomSheetProps) => {
    const { t } = useTranslation();

    return (
        <BottomSheetLayout
            {...props}
            title={t('리뷰 신고하기')}
            footerButtonList={[
                <Button
                    key='review-report-cancel-button'
                    frame='outlined'
                    variant='primary'
                    type='button'
                    onClick={props.close}
                >
                    {t('취소')}
                </Button>,
                <Button
                    key='review-report-submit-button'
                    frame='solid'
                    variant='primary'
                    type='submit'
                    form='review-report-form'
                >
                    {t('등록')}
                </Button>,
            ]}
        >
            <ReviewReport
                productNo={productNo}
                reviewNo={reviewNo}
                {...props}
            />
        </BottomSheetLayout>
    );
};
