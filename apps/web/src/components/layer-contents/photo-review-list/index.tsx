import { isEmpty } from '@fxts/core';
import { Image as ImageIcon, ThumbsUp } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { NoResult } from '@/components/common/no-result';
import { PhotoReviewDetail } from '@/components/layer-contents/photo-review-list/detail';
import * as styles from '@/components/layer-contents/photo-review-list/index.css';
import { DefaultModalLayoutProps } from '@/components/layout';
import { PHOTO_PAGE_SIZE } from '@/components/product/product-tabs/review';
import { Button } from '@/components/ui';
import PagingV2 from '@/components/ui/paging-v2';
import { usePhotoReviewList } from '@/hooks/query/display/review';

interface PhotoReviewListProps extends DefaultModalLayoutProps {
    productNo: number;
    reviewNo: number;
}

export const PhotoReviewList = ({
    productNo,
    reviewNo,
}: PhotoReviewListProps) => {
    const { t } = useTranslation();

    const [selectedReviewNo, setSelectedReviewNo] = useState<number>(reviewNo);
    const [pageNumber, setPageNumber] = useState(1);

    const isDetail = selectedReviewNo > 0;

    const { data: photoReviewListData } = usePhotoReviewList({
        productNo,
        searchParams: {
            pageNumber,
            pageSize: PHOTO_PAGE_SIZE,
            hasTotalCount: true,
        },
        options: {
            enabled: !isDetail,
        },
    });

    const handleDetailClick = (reviewNo: number) => {
        setSelectedReviewNo(reviewNo);

        const bottomSheetContent = document.getElementById(
            'bottom-sheet-content',
        );

        if (bottomSheetContent) {
            bottomSheetContent.scrollTo({
                top: 0,
                behavior: 'instant',
            });
        }
    };

    if (isDetail) {
        return (
            <div className={styles.container}>
                <PhotoReviewDetail
                    key={selectedReviewNo}
                    productNo={productNo}
                    reviewNo={selectedReviewNo}
                />

                <Button
                    frame='outlined'
                    variant='secondary'
                    type='button'
                    className={styles.backButton}
                    onClick={() => setSelectedReviewNo(0)}
                >
                    {t('목록으로')}
                </Button>
            </div>
        );
    }

    const photoReviews = photoReviewListData?.contents ?? [];
    const totalCount = Number(photoReviewListData?.totalCount) || 0;

    if (isEmpty(photoReviews)) {
        return <NoResult text={t('등록된 포토 리뷰가 없습니다.')} />;
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div>
                    <div className={styles.title}>
                        {t('포토 리뷰')} ({totalCount})
                    </div>
                    <div className={styles.subtitle}>
                        {t('이미지를 클릭하면 리뷰 상세를 볼 수 있어요.')}
                    </div>
                </div>
            </div>

            <div className={styles.grid} aria-label={t('포토 리뷰 목록')}>
                {photoReviews.map((review) => (
                    <button
                        key={review.reviewNo}
                        type='button'
                        className={styles.tileButton}
                        onClick={() => handleDetailClick(review.reviewNo)}
                    >
                        <img
                            className={styles.tileImg}
                            src={review.urls?.[0] ?? ''}
                            alt={t('포토 리뷰 이미지')}
                            loading='lazy'
                        />
                        <div className={styles.badgeRow} aria-hidden>
                            <span className={styles.badgeGroup}>
                                <span className={styles.badgeItem}>
                                    <ThumbsUp size={12} />
                                    {Number(review.recommendCnt) || 0}
                                </span>
                                <span className={styles.badgeItem}>
                                    <ImageIcon size={12} />
                                    {Number(review.attachedFileCount) || 0}
                                </span>
                            </span>
                        </div>
                    </button>
                ))}
            </div>

            <PagingV2
                className={styles.paging}
                currentPage={pageNumber}
                totalCount={totalCount}
                pageSize={PHOTO_PAGE_SIZE}
                onPageClick={(next) => setPageNumber(next)}
            />
        </div>
    );
};
