import { isEmpty } from '@fxts/core';
import { ThumbsUp } from 'lucide-react';
import { useRouter } from 'next/router';
import { overlay } from 'overlay-kit';
import { Swiper, SwiperSlide } from 'swiper/react';

import { PhotoReviewListBottomSheet } from '@/components/bottom-sheet/photo-review-list';
import LoadingWrapper from '@/components/common/loading-wrapper';
import { PhotoReviewListModal } from '@/components/modal/photo-review-list';
import * as styles from '@/components/product/photo-review/index.css';
import { PHOTO_PAGE_SIZE } from '@/components/product/product-tabs/review';
import { usePhotoReviewList } from '@/hooks/query/display/review';
import { useResponsive } from '@/hooks/utils';
import { BREAKPOINTS } from '@/styles/media';

import 'swiper/css';

export const PhotoReview = () => {
    const router = useRouter();
    const productNo = Number(router.query.productNo) || 0;

    const { isMobile } = useResponsive();

    const { data: photoReviewListData, isLoading: isPhotoReviewListLoading } =
        usePhotoReviewList({
            productNo,
            searchParams: {
                pageNumber: 1,
                pageSize: PHOTO_PAGE_SIZE,
                hasTotalCount: true,
            },
        });

    const photoReviews = (photoReviewListData?.contents ?? []).slice(0, 5);

    const handleImageClick = (reviewNo: number) => {
        overlay.open((props) =>
            isMobile ? (
                <PhotoReviewListBottomSheet
                    productNo={productNo}
                    reviewNo={reviewNo}
                    {...props}
                />
            ) : (
                <PhotoReviewListModal
                    productNo={productNo}
                    reviewNo={reviewNo}
                    {...props}
                />
            ),
        );
    };

    return (
        <LoadingWrapper
            isLoading={isPhotoReviewListLoading}
            containerStyle={{
                height: '146px',
            }}
        >
            {isEmpty(photoReviews) ? null : (
                <div className={styles.photoReviewSection}>
                    <h2 className={styles.photoReviewTitle}>사진 리뷰</h2>
                    <div className={styles.photoReviewList}>
                        <Swiper
                            slidesPerView={3.2}
                            spaceBetween={12}
                            breakpoints={{
                                [BREAKPOINTS.SM]: {
                                    slidesPerView: 4.2,
                                },
                                [BREAKPOINTS.MD]: {
                                    slidesPerView: 5,
                                },
                            }}
                        >
                            {photoReviews.map((review) => (
                                <SwiperSlide
                                    key={review.reviewNo}
                                    className={styles.photoReviewItem}
                                >
                                    <button
                                        type='button'
                                        className={
                                            styles.photoReviewImageButton
                                        }
                                        onClick={() =>
                                            handleImageClick(review.reviewNo)
                                        }
                                    >
                                        <img
                                            src={review.urls?.[0] || ''}
                                            alt='리뷰 이미지'
                                            className={styles.photoReviewImage}
                                        />
                                    </button>

                                    <div className={styles.photoReviewRating}>
                                        <ThumbsUp size={14} />
                                        <span>
                                            {Number(review.recommendCnt) || 0}
                                        </span>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            )}
        </LoadingWrapper>
    );
};
