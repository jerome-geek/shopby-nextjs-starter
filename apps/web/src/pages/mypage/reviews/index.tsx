import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';

import { MypageLayout } from '@/components/layout';
import * as card from '@/components/mypage/common/mypage-list-card/index.css';
import { PeriodQueryFilter } from '@/components/mypage/filters/period-query-filter';
import { SegmentedToggle } from '@/components/mypage/filters/segmented-toggle';
import {
    useMyReviewList,
    useReviewableProductList,
} from '@/hooks/query/display/review';
import { ReviewableListView } from '@/components/mypage/review/reviewable-list';
import { MyReviewListView } from '@/components/mypage/review/review-list';
import { useMypageQueryState } from '@/hooks/useMypageQueryState';

type ReviewTab = 'REVIEWABLE' | 'MY_REVIEW';

const toReviewTab = (value?: string): ReviewTab => {
    switch (value) {
        case 'MY_REVIEW':
            return 'MY_REVIEW';
        case 'REVIEWABLE':
        default:
            return 'REVIEWABLE';
    }
};

export const MypageReviews = () => {
    const { t } = useTranslation();
    const router = useRouter();

    const reviewTypeQuery = router.query.reviewType as string | undefined;
    const reviewTab = useMemo(
        () => toReviewTab(reviewTypeQuery),
        [reviewTypeQuery],
    );

    const { startYmd, endYmd, pageNumber, pageSize, setQuery } =
        useMypageQueryState();

    const tabOptions = useMemo(
        () => [
            { value: 'REVIEWABLE' as const, label: t('작성 가능한 리뷰') },
            { value: 'MY_REVIEW' as const, label: t('내 리뷰') },
        ],
        [t],
    );

    const searchParams = useMemo(
        () => ({
            pageNumber,
            pageSize,
            hasTotalCount: true,
            startDate: startYmd,
            endDate: endYmd,
        }),
        [pageNumber, pageSize, startYmd, endYmd],
    );

    const { data: myReviewCountData } = useMyReviewList({
        searchParams,
    });

    const { data: reviewableCountData } = useReviewableProductList({
        searchParams,
    });

    const myReviewTotalCount = myReviewCountData?.totalCount ?? 0;
    const reviewableTotalCount = reviewableCountData?.totalCount ?? 0;
    const totalCount =
        reviewTab === 'REVIEWABLE' ? reviewableTotalCount : myReviewTotalCount;

    const tabOptionsWithCount = useMemo(
        () => [
            {
                value: 'REVIEWABLE' as const,
                label: `${t('작성 가능한 리뷰')} ${reviewableTotalCount}`,
            },
            {
                value: 'MY_REVIEW' as const,
                label: `${t('내 리뷰')} ${myReviewTotalCount}`,
            },
        ],
        [myReviewTotalCount, reviewableTotalCount, t],
    );

    return (
        <div className={card.container}>
            <section className={card.section}>
                <div className={card.toolbar}>
                    <div className={card.toolbarTop}>
                        <SegmentedToggle
                            className={card.toggleGroup}
                            buttonClassName={card.toggleButton}
                            defaultValue={tabOptions[0].value}
                            value={reviewTab}
                            options={tabOptionsWithCount}
                            onChange={(nextValue) => {
                                setQuery({
                                    reviewType:
                                        nextValue === 'REVIEWABLE'
                                            ? undefined
                                            : nextValue,
                                });
                            }}
                        />

                        <PeriodQueryFilter />
                    </div>

                    <div className={card.toolbarBottom}>
                        <div className={card.metaRow}>
                            <div className={card.metaRowLeft}>
                                {startYmd && endYmd ? (
                                    <span className={card.selectedRangeText}>
                                        {startYmd} ~ {endYmd}
                                    </span>
                                ) : (
                                    <span className={card.selectedRangeText}>
                                        {t('최근 3개월')}
                                    </span>
                                )}

                                <span className={card.count}>
                                    {t('총 {{count}}개', { count: totalCount })}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={card.list}>
                    {reviewTab === 'REVIEWABLE' ? (
                        <ReviewableListView />
                    ) : (
                        <MyReviewListView />
                    )}
                </div>
            </section>
        </div>
    );
};

MypageReviews.getLayout = (page: React.ReactNode) => {
    return <MypageLayout>{page}</MypageLayout>;
};

export default MypageReviews;
