import { isEmpty } from '@fxts/core';
import { useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import LoadingWrapper from '@/shared/components/common/loading-wrapper';
import ReviewStartIcon from '@/shared/ui/icons/ReviewStartIcon';
import Seo from '@/shared/components/common/seo';
import { MypageLayout } from '@/shared/components/layout';
import * as card from '@/components/mypage/common/mypage-list-card/index.css';
import OptionText from '@/components/mypage/common/option-text';
import { Button } from '@/shared/ui/button';
import { PATHS } from '@/const/paths';
import { useCustomDialog } from '@/features/dialog';
import { useReviewMutation } from '@/hooks/mutations';
import { reviewKeys } from '@/hooks/queryKeys';
import { useProductReview } from '@/hooks/suspenseQuery/display/review';
import { useToast } from '@/hooks/ui/useToast';
import useApiError from '@/hooks/useApiError';
import { useDialog } from '@/hooks/utils';
import * as styles from '@/pages/mypage/reviews/[reviewNo]/index.css';
import ShopbyAsyncBoundary from '@/shared/boundary/shopby-async-boundary';
import { InvalidParameterError, RedirectError } from '@/shared/errors';

interface ReviewDetailDataProps {
    productNo: number;
    reviewNo: number;
}

function ReviewDetailData({ productNo, reviewNo }: ReviewDetailDataProps) {
    const { t } = useTranslation();
    const router = useRouter();
    const { openAsyncDialog } = useDialog();
    const { addToast } = useToast();
    const queryClient = useQueryClient();
    const { handleErrorDialog } = useApiError();
    const { openImageDetail } = useCustomDialog();

    const { data: productReviewData } = useProductReview({
        productNo,
        reviewNo,
    });
    const { delete: deleteReview } = useReviewMutation({ productNo });

    // 권한 가드 (데이터가 무조건 있으므로 로딩 체크 필요 없음)
    if (!productReviewData.myReview) {
        throw new RedirectError(PATHS.MYPAGE.REVIEWS.MAIN);
    }

    const onClickDelete = async () => {
        const isAgree = await openAsyncDialog({
            type: 'confirm',
            message: t('해당 리뷰를 삭제하시겠습니까?'),
            onConfirmReturnValue: true,
            onCloseReturnValue: false,
        });

        if (!isAgree) {
            return;
        }

        deleteReview.mutate(
            { reviewNo },
            {
                onSuccess: async () => {
                    await queryClient.invalidateQueries({
                        queryKey: reviewKeys.all,
                        refetchType: 'inactive',
                    });

                    addToast({
                        message: t('리뷰가 삭제되었습니다.'),
                    });
                    router.back();
                },
                onError: (error) => {
                    handleErrorDialog(error);
                },
            },
        );
    };

    const onClickEdit = () => {
        router.push({
            pathname: PATHS.MYPAGE.REVIEWS.MODIFY.replace(
                '[reviewNo]',
                String(reviewNo),
            ),
            query: { productNo: String(productNo) },
        });
    };

    return (
        <div className={card.container}>
            <section className={card.section}>
                <LoadingWrapper
                    isLoading={false}
                    containerStyle={{ height: '50vh' }}
                >
                    {productReviewData ? (
                        <article className={styles.container}>
                            <div className={styles.productRow}>
                                <div className={styles.productImageWrap}>
                                    <Link
                                        href={PATHS.PRODUCTS.DETAIL.replace(
                                            '[productNo]',
                                            String(productNo),
                                        )}
                                    >
                                        <img
                                            src={productReviewData.imageUrl}
                                            alt={productReviewData.productName}
                                            className={styles.productImage}
                                        />
                                    </Link>
                                </div>

                                <div className={styles.productMeta}>
                                    <h2 className={styles.productName}>
                                        {productReviewData.productName}
                                    </h2>

                                    {productReviewData.orderedOption ? (
                                        <OptionText
                                            optionName={
                                                productReviewData.orderedOption
                                                    .optionName
                                            }
                                            optionValue={
                                                productReviewData.orderedOption
                                                    .optionValue
                                            }
                                            productName={
                                                productReviewData.productName
                                            }
                                            inputs={
                                                productReviewData.orderedOption
                                                    .inputs
                                            }
                                            orderCnt={
                                                productReviewData.orderedOption
                                                    .orderCnt
                                            }
                                        />
                                    ) : null}

                                    <div className={styles.ratingRow}>
                                        {[1, 2, 3, 4, 5].map((n) => {
                                            const filled =
                                                (productReviewData.rate ?? 0) >=
                                                n;
                                            return (
                                                <ReviewStartIcon
                                                    key={n}
                                                    filled={filled}
                                                />
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>

                            <div className={styles.panel}>
                                <p className={styles.content}>
                                    {productReviewData.content}
                                </p>

                                {!isEmpty(productReviewData.fileUrls ?? []) ? (
                                    <ul className={styles.imageList}>
                                        {(productReviewData.fileUrls ?? []).map(
                                            (src) => (
                                                <li key={src}>
                                                    <button
                                                        type='button'
                                                        className={
                                                            styles.imageButton
                                                        }
                                                        onClick={() =>
                                                            openImageDetail(src)
                                                        }
                                                    >
                                                        <img
                                                            src={src}
                                                            alt={t(
                                                                '후기 첨부 이미지',
                                                            )}
                                                            className={
                                                                styles.attachImg
                                                            }
                                                        />
                                                    </button>
                                                </li>
                                            ),
                                        )}
                                    </ul>
                                ) : null}

                                <div className={styles.infoRow}>
                                    {productReviewData.bestReviewYn === 'Y' ? (
                                        <span className={styles.badge}>
                                            BEST REVIEW
                                        </span>
                                    ) : null}
                                    <span>
                                        {t('추천')}{' '}
                                        {(
                                            productReviewData.recommendCnt ?? 0
                                        ).toLocaleString()}
                                    </span>
                                    <span>
                                        {t('신고')}{' '}
                                        {(
                                            productReviewData.reportCnt ?? 0
                                        ).toLocaleString()}
                                    </span>
                                </div>

                                <p className={styles.date}>
                                    {dayjs(
                                        productReviewData.registerYmdt,
                                    ).format('YYYY.MM.DD HH:mm:ss')}
                                </p>

                                {productReviewData.myReview && (
                                    <div className={styles.editRow}>
                                        <button
                                            type='button'
                                            className={styles.textButton}
                                            onClick={onClickEdit}
                                        >
                                            {t('수정')}
                                        </button>
                                        <button
                                            type='button'
                                            className={styles.textButton}
                                            disabled={deleteReview.isPending}
                                            onClick={onClickDelete}
                                        >
                                            {t('삭제')}
                                        </button>
                                    </div>
                                )}
                            </div>

                            <div className={styles.backRow}>
                                <Button
                                    type='button'
                                    frame='outlined'
                                    variant='secondary'
                                    className={styles.backButton}
                                    onClick={() => router.back()}
                                >
                                    {t('돌아가기')}
                                </Button>
                            </div>
                        </article>
                    ) : null}
                </LoadingWrapper>
            </section>
        </div>
    );
}

function ReviewDetailContent() {
    const router = useRouter();

    const productNo = Number(router.query.productNo) || 0;
    const reviewNo = Number(router.query.reviewNo) || 0;

    // [1] router.isReady가 되기 전까지는 아무것도 하지 않음 (짧은 찰나)
    if (!router.isReady) return null;
    // [2] 파라미터 검증 (없으면 바로 튕김)
    if (!productNo || !reviewNo) {
        throw new InvalidParameterError(PATHS.MYPAGE.REVIEWS.MAIN);
    }
    // [3] 여기서부터는 무조건 유효한 파라미터가 있음 -> Suspense 쿼리 실행
    return <ReviewDetailData productNo={productNo} reviewNo={reviewNo} />;
}

export default function MypageReviewDetailPage() {
    return (
        <>
            <Seo title='리뷰 상세' noindex={true} />
            <ShopbyAsyncBoundary>
                <ReviewDetailContent />
            </ShopbyAsyncBoundary>
        </>
    );
}

MypageReviewDetailPage.getLayout = (page: ReactNode) => {
    return <MypageLayout>{page}</MypageLayout>;
};
