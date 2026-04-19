import clsx from 'clsx';
import dayjs from 'dayjs';
import { MessageCircle, ThumbsUp } from 'lucide-react';
import { overlay } from 'overlay-kit';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { ReviewReportBottomSheet } from '@/components/bottom-sheet/review-report';
import LoadingWrapper from '@/components/common/loading-wrapper';
import { NoResult } from '@/components/common/no-result';
import { StarIcon } from '@/components/icons/StarIcon';
import { ImageGallery } from '@/components/layer-contents/photo-review-list/detail/gallery';
import { ImageDetailModal } from '@/components/modal/image-detail';
import { ReviewReportModal } from '@/components/modal/review-report';
import Comments from '@/components/product/product-tabs/review/comments';
import * as reviewStyles from '@/components/product/product-tabs/review/index.css';
import { useReviewMutation } from '@/hooks/mutations';
import { useProductReview } from '@/hooks/query/display/review';
import { useCustomDialog, useToast } from '@/hooks/ui';
import { useAuth } from '@/hooks/useAuth';
import { useDialog, useResponsive } from '@/hooks/utils';
import { vars } from '@/styles/theme.css';

export const PhotoReviewDetail = ({
    productNo,
    reviewNo,
}: {
    productNo: number;
    reviewNo: number;
}) => {
    const { t } = useTranslation();

    const isLogin = useAuth();
    const { openLoginDialog } = useCustomDialog();
    const { openAsyncDialog } = useDialog();
    const { addToast } = useToast();
    const { isMobile } = useResponsive();

    const { data: productReviewData, isLoading: isProductReviewLoading } =
        useProductReview({
            productNo,
            reviewNo,
        });

    const { recommend, cancelRecommend, cancelReport } = useReviewMutation({
        productNo,
    });

    const isRecommendPending = recommend.isPending || cancelRecommend.isPending;
    const [isOpenComments, setIsOpenComments] = useState(false);

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

    const handleRecommend = async (
        recommendable: boolean,
        targetReviewNo: number,
    ) => {
        if (!isLogin) {
            openLoginDialog();
            return;
        }

        try {
            if (recommendable) {
                await recommend.mutateAsync({ reviewNo: targetReviewNo });
                addToast({
                    message: t('리뷰를 추천했습니다.'),
                    variant: 'success',
                });
                return;
            }

            await cancelRecommend.mutateAsync({ reviewNo: targetReviewNo });
            addToast({
                message: t('리뷰 추천을 취소했습니다.'),
                variant: 'success',
            });
        } catch (error) {
            console.error(error);
        }
    };

    const openReviewReportOverlay = async (
        targetReviewNo: number,
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
                            reviewNo={targetReviewNo}
                            {...props}
                        />
                    ) : (
                        <ReviewReportModal
                            productNo={productNo}
                            reviewNo={targetReviewNo}
                            {...props}
                        />
                    ),
                );
                return;
            }

            const isAgree = await openAsyncDialog({
                message: t('리뷰 신고를 취소하시겠습니까?'),
                type: 'confirm',
                onConfirmReturnValue: true,
                onCloseReturnValue: false,
            });

            if (!isAgree) {
                return;
            }

            await cancelReport.mutateAsync({ reviewNo: targetReviewNo });
            addToast({
                message: t('리뷰 신고를 취소했습니다.'),
                variant: 'success',
            });
        } catch (error) {
            console.error(error);
        }
    };

    const option = formatOption(productReviewData?.orderedOption);
    const reviewImages = productReviewData?.fileUrls ?? [];
    const writer =
        (
            productReviewData?.registerName ||
            productReviewData?.memberName ||
            productReviewData?.memberId ||
            ''
        )
            ?.toString()
            .trim() || t('익명');
    const dateText = productReviewData?.registerYmdt
        ? dayjs(productReviewData.registerYmdt).format('YYYY.MM.DD')
        : '';

    return (
        <LoadingWrapper
            isLoading={isProductReviewLoading}
            containerStyle={{
                height: '600px',
            }}
            isLoadedAnimation
        >
            {!productReviewData ? (
                <NoResult text={t('리뷰 정보를 불러올 수 없습니다.')} />
            ) : (
                <article
                    className={reviewStyles.item}
                    style={{
                        padding: 0,
                        borderTop: 'none',
                    }}
                >
                    <div className={reviewStyles.itemHeader}>
                        <div>
                            <Stars rate={Number(productReviewData.rate) || 0} />
                        </div>

                        <div className={reviewStyles.metaRight}>
                            <span className={reviewStyles.metaText}>
                                <span>{writer}</span>
                                <span>•</span>
                                <span>{dateText}</span>
                                <span>•</span>
                                <button
                                    type='button'
                                    className={reviewStyles.reportButton}
                                    onClick={() =>
                                        openReviewReportOverlay(
                                            productReviewData.reviewNo,
                                            Boolean(
                                                productReviewData.reportable,
                                            ),
                                        )
                                    }
                                >
                                    {productReviewData.reportable
                                        ? t('신고')
                                        : t('신고 취소')}
                                </button>
                            </span>
                        </div>
                    </div>

                    <div className={reviewStyles.contentContainer}>
                        {option && (
                            <div className={reviewStyles.optionText}>
                                {option}
                            </div>
                        )}
                        {productReviewData.content && (
                            <div className={reviewStyles.content}>
                                {productReviewData.content}
                            </div>
                        )}
                    </div>

                    <ImageGallery
                        images={reviewImages}
                        onImageClick={openImageOverlay}
                    />

                    <div className={reviewStyles.footer}>
                        <button
                            type='button'
                            className={clsx(
                                reviewStyles.footerItem,
                                !productReviewData.recommendable &&
                                    reviewStyles.recommendButton,
                            )}
                            disabled={isRecommendPending}
                            onClick={() =>
                                handleRecommend(
                                    Boolean(productReviewData.recommendable),
                                    productReviewData.reviewNo,
                                )
                            }
                        >
                            <ThumbsUp
                                size={14}
                                fill={
                                    productReviewData.recommendable
                                        ? 'none'
                                        : vars.color.primary
                                }
                                stroke={
                                    productReviewData.recommendable
                                        ? vars.color.gray[60]
                                        : vars.color.primary
                                }
                            />
                            {Number(productReviewData.recommendCnt) || 0}
                        </button>

                        <button
                            className={reviewStyles.footerItem}
                            type='button'
                            disabled={
                                Number(productReviewData.commentCount) === 0
                            }
                            onClick={() => setIsOpenComments((prev) => !prev)}
                        >
                            <MessageCircle
                                size={14}
                                fill={
                                    isOpenComments
                                        ? vars.color.gray[60]
                                        : 'none'
                                }
                            />
                            {Number(productReviewData.commentCount) || 0}
                        </button>
                    </div>

                    {isOpenComments &&
                        Number(productReviewData.commentCount) > 0 && (
                            <Comments
                                key={productReviewData.reviewNo}
                                productNo={productNo}
                                reviewNo={productReviewData.reviewNo}
                            />
                        )}
                </article>
            )}
        </LoadingWrapper>
    );
};

const Stars = ({ rate }: { rate: number }) => {
    const safeRate = Math.max(0, Math.min(5, Number(rate) || 0));

    return (
        <div className={reviewStyles.stars} aria-label={`평점 ${safeRate}점`}>
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
