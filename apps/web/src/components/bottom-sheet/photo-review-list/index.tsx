import { useTranslation } from 'react-i18next';

import { PhotoReviewList } from '@/components/layer-contents/photo-review-list';
import {
    BottomSheetLayout,
    DefaultBottomSheetProps,
} from '@/components/layout';

interface PhotoReviewListBottomSheetProps extends DefaultBottomSheetProps {
    productNo: number;
    reviewNo: number;
}

export const PhotoReviewListBottomSheet = ({
    productNo,
    reviewNo,
    ...props
}: PhotoReviewListBottomSheetProps) => {
    const { t } = useTranslation();

    return (
        <BottomSheetLayout {...props} title={t('포토 리뷰 모아보기')}>
            <PhotoReviewList
                productNo={productNo}
                reviewNo={reviewNo}
                {...props}
            />
        </BottomSheetLayout>
    );
};
