import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { PhotoReviewList } from '@/features/product/overlay/photo-review-list/content';
import {
    BottomSheetLayout,
    DefaultBottomSheetProps,
} from '@/shared/components/layout';
import { Button } from '@/shared/ui';

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

    const [selectedReviewNo, setSelectedReviewNo] = useState<number>(reviewNo);

    return (
        <BottomSheetLayout
            {...props}
            type='fullscreen'
            title={t('포토 리뷰 모아보기')}
            footerButtonList={
                selectedReviewNo
                    ? [
                          <Button
                              key='photo-review-list-close-button'
                              frame='outlined'
                              variant='primary'
                              type='button'
                              onClick={props.close}
                          >
                              {t('닫기')}
                          </Button>,
                          <Button
                              key='photo-review-list-close-button'
                              frame='outlined'
                              variant='secondary'
                              type='button'
                              onClick={() => setSelectedReviewNo(0)}
                          >
                              {t('목록으로')}
                          </Button>,
                      ]
                    : [
                          <Button
                              key='photo-review-list-close-button'
                              frame='outlined'
                              variant='primary'
                              type='button'
                              onClick={props.close}
                          >
                              {t('닫기')}
                          </Button>,
                      ]
            }
        >
            <PhotoReviewList
                productNo={productNo}
                selectedReviewNo={selectedReviewNo}
                setSelectedReviewNo={setSelectedReviewNo}
                {...props}
            />
        </BottomSheetLayout>
    );
};
