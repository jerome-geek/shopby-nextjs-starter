import Link from 'next/link';
import { useTranslation } from 'react-i18next';

import * as styles from '@/components/mypage/main/summary/index.css';
import { PATHS } from '@/const/paths';
import useAccumulationSummary from '@/hooks/query/manage/accumulation/useAccumulationSummary';
import useProfile from '@/hooks/query/member/profile/useProfile';
import useLikeProductCount from '@/hooks/query/product/profile/useLikeProductCount';
import { useCouponSummary } from '@/hooks/query/promotion/coupon';
import useLogout from '@/hooks/useLogout';
import { POINT } from '@/utils/currency';
import { useReviewableProductList } from '@/hooks/query/display/review';

const Summary = () => {
    const { t } = useTranslation();

    const { data: profileData } = useProfile();

    const memberNo = profileData?.memberNo ?? 0;

    const { logout } = useLogout();

    const { data: couponSummaryData } = useCouponSummary({
        memberNo,
        params: { expireDay: 90 },
        options: { enabled: memberNo > 0 },
    });

    const { data: likeProductCountData } = useLikeProductCount({
        memberNo,
        options: { enabled: memberNo > 0 },
    });

    const { data: accumulationSummaryData } = useAccumulationSummary({
        options: { enabled: memberNo > 0 },
    });

    const { data: reviewableProductListData } = useReviewableProductList({
        searchParams: {
            pageNumber: 1,
            pageSize: 5,
            hasTotalCount: true,
        },
        options: { enabled: memberNo > 0 },
    });

    const summaryList = [
        {
            id: 'likeProduct',
            title: '스크랩북',
            content: likeProductCountData?.likedCount ?? 0,
            url: PATHS.MYPAGE.WISH,
        },
        {
            id: 'accumulation',
            title: '적립금',
            content: POINT(
                accumulationSummaryData?.totalAvailableAmt ?? 0,
            ).format(),
            url: PATHS.MYPAGE.ACCUMULATIONS,
        },
        {
            id: 'coupon',
            title: '쿠폰',
            content: couponSummaryData?.usableCouponCnt ?? 0,
            url: PATHS.MYPAGE.COUPONS,
        },
        {
            id: 'review',
            title: '작성 가능 리뷰',
            content: reviewableProductListData?.totalCount ?? 0,
            url: PATHS.MYPAGE.REVIEWS.MAIN,
        },
    ] as const;

    return (
        <section className={styles.section}>
            <div className={styles.header}>
                <p className={styles.welcome}>
                    <span className={styles.badge}>
                        {profileData?.memberGradeName ?? t('일반')}
                    </span>
                    <b>{profileData?.memberName ?? t('회원')}</b> {t('님')}
                </p>

                <button
                    type='button'
                    className={styles.logoutButton}
                    onClick={logout}
                >
                    {t('로그아웃')}
                </button>
            </div>

            <ul className={styles.list}>
                {summaryList.map(({ id, title, content, url }) => (
                    <li key={id} className={styles.item}>
                        <Link href={url}>
                            <span className={styles.title}>{t(title)}</span>
                            <span className={styles.value}>{content}</span>
                        </Link>
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default Summary;
