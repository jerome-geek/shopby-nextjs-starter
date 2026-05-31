import { useTranslation } from 'react-i18next';

import { ReviewReport } from '@/features/product/overlay/review-report/content';
import {
    BottomSheetLayout,
    DefaultBottomSheetProps,
} from '@/shared/components/layout';
import { Button } from '@/shared/ui/button';

interface ReviewReportBottomSheetProps extends DefaultBottomSheetProps {
    productNo: number;
    reviewNo: number;
}

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
