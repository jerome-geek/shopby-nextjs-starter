import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { PhotoReviewList } from '@/components/layer-contents/photo-review-list';
import { DefaultModalLayoutProps, ModalLayout } from '@/components/layout';
import { Button } from '@/components/ui';

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

    const [selectedReviewNo, setSelectedReviewNo] = useState<number>(reviewNo);

    return (
        <ModalLayout
            {...props}
            title={t('포토 리뷰 모아보기')}
            size='medium'
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
        </ModalLayout>
    );
};
