import { isEmpty } from '@fxts/core';
import dayjs from 'dayjs';
import { overlay } from 'overlay-kit';
import Link from 'next/link';
import { useRouter } from 'next/router';
import type { GetServerSideProps } from 'next';
import type { ReactNode } from 'react';
import { Star } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useQueryClient } from '@tanstack/react-query';

import LoadingWrapper from '@/components/common/loading-wrapper';
import { MypageLayout } from '@/components/layout';
import { ImageDetailModal } from '@/components/modal/image-detail';
import OptionText from '@/components/mypage/common/option-text';
import * as card from '@/components/mypage/common/mypage-list-card/index.css';
import { Button } from '@/components/ui/button';
import { PATHS } from '@/const/paths';
import { useReviewMutation } from '@/hooks/mutations';
import { useProductReview } from '@/hooks/query/display/review';
import { useDialog } from '@/hooks/utils';
import * as styles from '@/pages/mypage/reviews/[reviewNo]/index.css';
import { useToast } from '@/hooks/ui/useToast';
import useApiError from '@/hooks/useApiError';
import { reviewKeys } from '@/hooks/queryKeys';

export const MypageReviewDetail = () => {
    const { t } = useTranslation();
    const router = useRouter();
    const { openAsyncDialog } = useDialog();
    const { addToast } = useToast();

    const queryClient = useQueryClient();

    const { handleErrorDialog } = useApiError();

    const productNo = Number(router.query.productNo) || 0;
    const reviewNo = Number(router.query.reviewNo) || 0;

    const { data: productReviewData, isFetched: isProductReviewFetched } =
        useProductReview({
            productNo,
            reviewNo,
            options: { enabled: !!productNo && !!reviewNo },
        });

    const openImagePreview = (src: string) => {
        overlay.open((props) => <ImageDetailModal src={src} {...props} />);
    };

    const { delete: deleteReview } = useReviewMutation({ productNo });

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
                    isLoading={!isProductReviewFetched}
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
                                                <Star
                                                    key={n}
                                                    width={16}
                                                    height={16}
                                                    fill={
                                                        filled
                                                            ? 'currentColor'
                                                            : 'none'
                                                    }
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
                                                            openImagePreview(
                                                                src,
                                                            )
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
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const reviewNo = Number(ctx.params?.reviewNo) || 0;
    const productNo = Number(ctx.query.productNo) || 0;

    if (!reviewNo || !productNo) {
        return {
            redirect: {
                destination: PATHS.MYPAGE.REVIEWS.MAIN,
                permanent: false,
            },
        };
    }

    return { props: {} };
};

MypageReviewDetail.getLayout = (page: ReactNode) => {
    return <MypageLayout>{page}</MypageLayout>;
};

export default MypageReviewDetail;
