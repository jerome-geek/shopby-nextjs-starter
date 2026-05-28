import { SuspenseQuery } from '@suspensive/react-query';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { Swiper, SwiperSlide } from 'swiper/react';

import { StarIcon } from '@/shared/ui/icons';
import * as styles from '@/components/product/photo-review/index.css';
import { PHOTO_PAGE_SIZE } from '@/components/product/product-tabs/review';
import { productReviewListV2Options } from '@/entities/display/review/queries';
import { useCustomDialog } from '@/features/dialog/hooks/useCustomDialog';
import ShopbyAsyncBoundary from '@/shared/boundary/shopby-async-boundary';
import { getShopbyResizeImageUrl } from '@/shared/utils/shopby';
import { BREAKPOINTS } from '@/styles/media';
import { vars } from '@/styles/theme.css';

import 'swiper/css';

export const PhotoReview = () => {
    const { t } = useTranslation();

    const router = useRouter();
    const productNo = Number(router.query.productNo) || 0;

    const { openPhotoReviewList } = useCustomDialog();

    const handleImageClick = (reviewNo: number) => {
        openPhotoReviewList({ productNo, reviewNo });
    };

    return (
        <ShopbyAsyncBoundary>
            <SuspenseQuery
                {...productReviewListV2Options({
                    productNo,
                    searchParams: {
                        hasAttachmentFile: true,
                        order: {
                            by: 'RATING',
                            direction: 'DESC',
                        },
                        pageNumber: 1,
                        pageSize: PHOTO_PAGE_SIZE,
                        hasTotalCount: true,
                    },
                })}
            >
                {({ data }) => {
                    if (!data.items.length) return null;

                    return (
                        <div className={styles.photoReviewSection}>
                            <h2 className={styles.photoReviewTitle}>
                                {t('사진 리뷰')}
                            </h2>

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
                                    {data.items.map((review) => (
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
                                                    handleImageClick(
                                                        review.reviewNo,
                                                    )
                                                }
                                            >
                                                <img
                                                    src={getShopbyResizeImageUrl(
                                                        review.fileUrls?.[0] ||
                                                            '',
                                                        88 * 2,
                                                    )}
                                                    alt='리뷰 이미지'
                                                    className={
                                                        styles.photoReviewImage
                                                    }
                                                />
                                            </button>

                                            <div
                                                className={
                                                    styles.photoReviewRating
                                                }
                                            >
                                                <StarIcon
                                                    baseColor={
                                                        vars.color.pink['80']
                                                    }
                                                />
                                                <span>{review.rate}</span>
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>
                        </div>
                    );
                }}
            </SuspenseQuery>
        </ShopbyAsyncBoundary>
    );
};
