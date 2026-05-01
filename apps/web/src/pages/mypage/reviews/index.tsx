import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { MypageLayout } from '@/components/layout';
import * as card from '@/components/mypage/common/mypage-list-card/index.css';
import { PeriodQueryFilter } from '@/components/mypage/filters/period-query-filter';
import { SegmentedToggle } from '@/components/mypage/filters/segmented-toggle';
import { MyReviewListView } from '@/components/mypage/review/review-list';
import { ReviewableListView } from '@/components/mypage/review/reviewable-list';
import { useMypageListQueryParams } from '@/entities/mypage/hooks/useMypageListQueryParams';
import { reviewTabSpec } from '@/entities/mypage/utils/tabs';
import {
    useMyReviewList,
    useReviewableProductList,
} from '@/hooks/query/display/review';

const PAGE_SIZE = 12;

export default function MypageReviewsPage() {
    const { t } = useTranslation();

    const [{ startYmd, endYmd, pageNumber, reviewType }, setQuery] =
        useMypageListQueryParams(
            {
                reviewType: reviewTabSpec.parser,
            },
            { history: 'push' },
        );

    const tabOptions = useMemo(() => reviewTabSpec.options(t), [t]);

    const searchParams = useMemo(
        () => ({
            pageNumber,
            pageSize: PAGE_SIZE,
            hasTotalCount: true,
            startDate: startYmd,
            endDate: endYmd,
        }),
        [pageNumber, startYmd, endYmd],
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
        reviewType === 'REVIEWABLE' ? reviewableTotalCount : myReviewTotalCount;

    const tabOptionsWithCount = useMemo(
        () => [
            {
                value: 'REVIEWABLE' as const,
                label: `${tabOptions[0].label} ${reviewableTotalCount}`,
            },
            {
                value: 'MY_REVIEW' as const,
                label: `${tabOptions[1].label} ${myReviewTotalCount}`,
            },
        ],
        [myReviewTotalCount, reviewableTotalCount, tabOptions],
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
                            value={reviewType}
                            options={tabOptionsWithCount}
                            onChange={(nextValue) => {
                                setQuery(
                                    {
                                        reviewType: nextValue,
                                    },
                                    { resetPage: true },
                                );
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
                    {reviewType === 'REVIEWABLE' ? (
                        <ReviewableListView />
                    ) : (
                        <MyReviewListView />
                    )}
                </div>
            </section>
        </div>
    );
}

MypageReviewsPage.getLayout = (page: React.ReactNode) => {
    return <MypageLayout>{page}</MypageLayout>;
};
