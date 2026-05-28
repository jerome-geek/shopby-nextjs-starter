import { useTranslation } from 'react-i18next';

import { ReviewReport } from '@/components/layer-contents/review-report';
import { DefaultModalLayoutProps, ModalLayout } from '@/shared/components/layout';
import { Button } from '@/shared/ui/button';

interface ReviewReportModalProps extends DefaultModalLayoutProps {
    productNo: number;
    reviewNo: number;
}

export const ReviewReportModal = ({
    productNo,
    reviewNo,
    ...props
}: ReviewReportModalProps) => {
    const { t } = useTranslation();

    return (
        <ModalLayout
            {...props}
            title={t('리뷰 신고하기')}
            size='medium'
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
        </ModalLayout>
    );
};
