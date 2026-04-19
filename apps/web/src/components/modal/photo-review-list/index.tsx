import { useTranslation } from 'react-i18next';

import { PhotoReviewList } from '@/components/layer-contents/photo-review-list';
import { DefaultModalLayoutProps, ModalLayout } from '@/components/layout';

interface PhotoReviewListModalProps extends DefaultModalLayoutProps {
    productNo: number;
    reviewNo: number;
}

export const PhotoReviewListModal = ({
    productNo,
    reviewNo,
    ...props
}: PhotoReviewListModalProps) => {
    const { t } = useTranslation();

    return (
        <ModalLayout {...props} title={t('포토 리뷰 모아보기')} size='medium'>
            <PhotoReviewList
                productNo={productNo}
                reviewNo={reviewNo}
                {...props}
            />
        </ModalLayout>
    );
};
