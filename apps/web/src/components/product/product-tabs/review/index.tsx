import { isEmpty } from '@fxts/core';
import clsx from 'clsx';
import dayjs from 'dayjs';
import { MessageCircle, ThumbsUp } from 'lucide-react';
import { useRouter } from 'next/router';
import { overlay } from 'overlay-kit';
import { useState } from 'react';

import { PhotoReviewListBottomSheet } from '@/components/bottom-sheet/photo-review-list';
import { ReviewReportBottomSheet } from '@/components/bottom-sheet/review-report';
import { NoResult } from '@/components/common/no-result';
import { StarIcon } from '@/components/icons/StarIcon';
import { ImageDetailModal } from '@/components/modal/image-detail';
import { PhotoReviewListModal } from '@/components/modal/photo-review-list';
import { ReviewReportModal } from '@/components/modal/review-report';
import Comments from '@/components/product/product-tabs/review/comments';
import * as styles from '@/components/product/product-tabs/review/index.css';
import PagingV2 from '@/components/ui/paging-v2';
import { PATHS } from '@/const/paths';
import { useReviewMutation } from '@/hooks/mutations';
import {
    usePhotoReviewList,
    useProductReviewList,
} from '@/hooks/query/display/review';
import { useCustomDialog, useToast } from '@/hooks/ui';
import { useAuth } from '@/hooks/useAuth';
import { useDialog, useResponsive } from '@/hooks/utils';
import { vars } from '@/styles/theme.css';

const PAGE_SIZE = 5;
export const PHOTO_PAGE_SIZE = 12;

const Review = ({ onClick }: { onClick: () => void }) => {
    const router = useRouter();
    const productNoQuery = router.query.productNo as string;

    const productNo = Number(productNoQuery) || 0;

    const isLogin = useAuth();

    const { openLoginDialog } = useCustomDialog();
    const { openAsyncDialog } = useDialog();
    const { addToast } = useToast();

    const { isMobile } = useResponsive();

    const PHOTO_WIDGET_COUNT = isMobile ? 4 : 5;

    const [pageNumber, setPageNumber] = useState(1);

    const { data: photoReviewListData } = usePhotoReviewList({
        productNo,
        searchParams: {
            pageNumber: 1,
            pageSize: PHOTO_PAGE_SIZE,
            hasTotalCount: true,
        },
    });

    const { data: productReviewListData } = useProductReviewList({
        productNo,
        searchParams: {
            pageNumber,
            pageSize: PAGE_SIZE,
            hasTotalCount: true,
        },
    });

    const {
        recommend,
        cancelRecommend,
        cancelReport,
        delete: deleteReview,
    } = useReviewMutation({
        productNo,
    });

    const isRecommendPending = recommend.isPending || cancelRecommend.isPending;

    const reviews = productReviewListData?.items ?? [];
    const photoReviews = photoReviewListData?.contents ?? [];
    const totalCount = Number(productReviewListData?.totalCount) || 0;
    const rate = Number(productReviewListData?.rate) || 0;

    const formatOption = (orderedOption?: {
        optionTitle?: string;
        optionValue?: string;
    }) => {
        const title = orderedOption?.optionTitle?.trim() ?? '';
        const value = orderedOption?.optionValue?.trim() ?? '';

        if (!title && !value) {
            return '';
        }

        if (title && value && title !== value) {
            return `${title}: ${value}`;
        }

        return title || value;
    };

    const openImageOverlay = (src: string) => {
        overlay.open((props) => <ImageDetailModal src={src} {...props} />);
    };

    const openPhotoReviewListOverlay = (reviewNo: number) => {
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

    const [openCommentsReviewNo, setOpenCommentsReviewNo] = useState(0);

    const handleComment = (reviewNo: number, reviewCnt: number) => {
        if (reviewCnt === 0) {
            return;
        }

        setOpenCommentsReviewNo((prev) => (prev === reviewNo ? 0 : reviewNo));
    };

    const handleRecommend = async (
        recommendable: boolean,
        reviewNo: number,
    ) => {
        if (!isLogin) {
            openLoginDialog();
            return;
        }

        try {
            if (recommendable) {
                await recommend.mutateAsync({ reviewNo });

                addToast({
                    message: '리뷰를 추천했습니다.',
                    variant: 'success',
                });
                return;
            }

            await cancelRecommend.mutateAsync({ reviewNo });
            addToast({
                message: '리뷰 추천을 취소했습니다.',
                variant: 'success',
            });
        } catch (error) {
            console.error(error);
        }
    };

    const openReviewReportOverlay = async (
        reviewNo: number,
        reportable: boolean,
    ) => {
        if (!isLogin) {
            openLoginDialog();
            return;
        }

        try {
            if (reportable) {
                overlay.open((props) =>
                    isMobile ? (
                        <ReviewReportBottomSheet
                            productNo={productNo}
                            reviewNo={reviewNo}
                            {...props}
                        />
                    ) : (
                        <ReviewReportModal
                            productNo={productNo}
                            reviewNo={reviewNo}
                            {...props}
                        />
                    ),
                );
                return;
            }

            const isAgree = await openAsyncDialog({
                message: '리뷰 신고를 취소하시겠습니까?',
                type: 'confirm',
                onConfirmReturnValue: true,
                onCloseReturnValue: false,
            });

            if (!isAgree) {
                return;
            }

            await cancelReport.mutateAsync({ reviewNo });
            addToast({
                message: '리뷰 신고를 취소했습니다.',
                variant: 'success',
            });
        } catch (error) {
            console.error(error);
        }
    };

    const handleDeleteReview = async (reviewNo: number) => {
        const isAgree = await openAsyncDialog({
            type: 'confirm',
            message: '리뷰를 삭제하시겠습니까?',
            onConfirmReturnValue: true,
            onCloseReturnValue: false,
        });

        if (!isAgree) {
            return;
        }

        try {
            await deleteReview.mutateAsync({ reviewNo });

            addToast({
                message: '리뷰가 삭제되었습니다.',
                variant: 'success',
            });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <section className={styles.container}>
            <div className={styles.headerContainer}>
                <div className={styles.header}>
                    <span className={styles.title}>
                        리뷰 ({totalCount || 0})
                    </span>
                    <Stars rate={rate} />
                </div>

                {!isEmpty(photoReviews) && (
                    <div
                        className={styles.photoRow}
                        aria-label='포토 리뷰 미리보기'
                    >
                        {photoReviews
                            .slice(0, PHOTO_WIDGET_COUNT)
                            .map((review, idx) => (
                                <div
                                    key={`${review.reviewNo}-${idx}`}
                                    className={styles.photoTile}
                                >
                                    <button
                                        type='button'
                                        className={styles.moreTileButton}
                                        onClick={() => {
                                            openPhotoReviewListOverlay(
                                                idx === PHOTO_WIDGET_COUNT - 1
                                                    ? 0
                                                    : review.reviewNo,
                                            );
                                        }}
                                    >
                                        <img
                                            className={styles.photoImg}
                                            src={review.urls?.[0] ?? ''}
                                            alt='포토 리뷰 이미지'
                                            loading='lazy'
                                        />
                                        {idx === PHOTO_WIDGET_COUNT - 1 && (
                                            <div
                                                className={
                                                    styles.moreTileButtonText
                                                }
                                            >
                                                <span>+</span>
                                                더보기
                                            </div>
                                        )}
                                    </button>
                                </div>
                            ))}
                    </div>
                )}
            </div>

            {isEmpty(reviews) ? (
                <NoResult
                    text='등록된 리뷰가 없습니다.'
                    style={{
                        height: '150px',
                    }}
                />
            ) : (
                <div className={styles.list}>
                    {reviews.map((r) => {
                        const option = formatOption(r.orderedOption);
                        const reviewImages = r.fileUrls ?? [];
                        const writer =
                            (r.registerName || r.memberName || r.memberId || '')
                                .toString()
                                .trim() || '익명';
                        const dateText = dayjs(r.registerYmdt).format(
                            'YYYY.MM.DD',
                        );

                        return (
                            <article key={r.reviewNo} className={styles.item}>
                                <div className={styles.itemHeader}>
                                    <div>
                                        <Stars rate={Number(r.rate) || 0} />
                                    </div>

                                    <div className={styles.metaRight}>
                                        <span className={styles.metaText}>
                                            {r.myReview && (
                                                <>
                                                    <button
                                                        type='button'
                                                        onClick={() => {
                                                            router.push({
                                                                pathname: `${PATHS.MYPAGE.REVIEWS.MAIN}/modify/${r.reviewNo}`,
                                                                query: {
                                                                    productNo,
                                                                },
                                                            });
                                                        }}
                                                    >
                                                        수정
                                                    </button>
                                                    <span>•</span>
                                                    <button
                                                        type='button'
                                                        onClick={() =>
                                                            handleDeleteReview(
                                                                r.reviewNo,
                                                            )
                                                        }
                                                    >
                                                        삭제
                                                    </button>
                                                </>
                                            )}
                                            <span>{writer}</span>
                                            <span>•</span>
                                            <span>{dateText}</span>
                                            {!r.myReview && (
                                                <>
                                                    <span>•</span>
                                                    <button
                                                        type='button'
                                                        className={
                                                            styles.reportButton
                                                        }
                                                        onClick={() => {
                                                            openReviewReportOverlay(
                                                                r.reviewNo,
                                                                r.reportable,
                                                            );
                                                        }}
                                                    >
                                                        {r.reportable
                                                            ? '신고'
                                                            : '신고 취소'}
                                                    </button>
                                                </>
                                            )}
                                        </span>
                                    </div>
                                </div>

                                <div className={styles.contentContainer}>
                                    {option && (
                                        <div className={styles.optionText}>
                                            {option}
                                        </div>
                                    )}

                                    {r.content && (
                                        <div className={styles.content}>
                                            {r.content}
                                        </div>
                                    )}
                                </div>

                                {!isEmpty(reviewImages) && (
                                    <ul className={styles.reviewImageList}>
                                        {reviewImages.map((url, idx) => (
                                            <li
                                                key={`${url}-${idx}`}
                                                className={
                                                    styles.reviewImageItem
                                                }
                                            >
                                                <button
                                                    type='button'
                                                    onClick={() =>
                                                        openImageOverlay(url)
                                                    }
                                                >
                                                    <img
                                                        className={
                                                            styles.photoImg
                                                        }
                                                        src={url}
                                                        alt='리뷰 첨부 이미지'
                                                        loading='lazy'
                                                    />
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                )}

                                <div className={styles.footer}>
                                    <button
                                        type='button'
                                        className={clsx(
                                            styles.footerItem,
                                            !r.recommendable &&
                                                styles.recommendButton,
                                        )}
                                        disabled={isRecommendPending}
                                        onClick={() =>
                                            handleRecommend(
                                                r.recommendable,
                                                r.reviewNo,
                                            )
                                        }
                                    >
                                        <ThumbsUp
                                            size={14}
                                            fill={
                                                r.recommendable
                                                    ? 'none'
                                                    : vars.color.primary
                                            }
                                            stroke={
                                                r.recommendable
                                                    ? vars.color.gray[60]
                                                    : vars.color.primary
                                            }
                                        />
                                        {Number(r.recommendCnt) || 0}
                                    </button>

                                    <button
                                        className={styles.footerItem}
                                        type='button'
                                        disabled={Number(r.commentCount) === 0}
                                        onClick={() =>
                                            handleComment(
                                                r.reviewNo,
                                                Number(r.commentCount) || 0,
                                            )
                                        }
                                    >
                                        <MessageCircle
                                            size={14}
                                            fill={
                                                openCommentsReviewNo ===
                                                r.reviewNo
                                                    ? vars.color.gray[60]
                                                    : 'none'
                                            }
                                        />
                                        {Number(r.commentCount) || 0}
                                    </button>
                                </div>

                                {openCommentsReviewNo === r.reviewNo && (
                                    <Comments
                                        key={r.reviewNo}
                                        productNo={productNo}
                                        reviewNo={r.reviewNo}
                                    />
                                )}
                            </article>
                        );
                    })}
                </div>
            )}

            <PagingV2
                className={styles.paging}
                currentPage={pageNumber}
                totalCount={totalCount}
                pageSize={PAGE_SIZE}
                onPageClick={(next) => {
                    setPageNumber(next);
                    onClick();
                }}
            />
        </section>
    );
};

export default Review;

const Stars = ({ rate }: { rate: number }) => {
    const safeRate = Math.max(0, Math.min(5, Number(rate) || 0));

    return (
        <div className={styles.stars} aria-label={`평점 ${safeRate}점`}>
            {Array.from({ length: 5 }).map((_, idx) => (
                <StarIcon
                    key={idx}
                    width={14}
                    height={14}
                    fillPercentage={idx < safeRate ? 100 : 0}
                    fillColor='#E2808F'
                    baseColor='#E0E0E0'
                />
            ))}
        </div>
    );
};
