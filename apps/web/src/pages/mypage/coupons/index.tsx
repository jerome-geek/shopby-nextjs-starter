import dayjs from 'dayjs';
import { clsx } from 'clsx';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AnimatePresence, motion } from 'motion/react';

import LoadingWrapper from '@/components/common/loading-wrapper';
import { MypageLayout } from '@/components/layout/mypage';
import { CouponConstraintDetailContent } from '@/components/mypage/coupons/constraint-detail-content';
import { PeriodQueryFilter } from '@/components/mypage/filters/period-query-filter';
import { SegmentedToggle } from '@/components/mypage/filters/segmented-toggle';
import { Button } from '@/components/ui/button';
import useProfile from '@/hooks/query/member/profile/useProfile';
import { useUserCoupons } from '@/hooks/query/promotion/coupon';
import { useCoupons } from '@/hooks/utils/useCoupons';
import useResponsive from '@/hooks/utils/useResponsive';
import type { Coupon } from '@/models/promotion';
import * as styles from '@/pages/mypage/coupons/index.css';

const PAGE_SIZE = 10;

export const MypageCoupons = () => {
    const { t } = useTranslation();
    const router = useRouter();
    const { isMobile } = useResponsive();
    const { getBenefitAmt, getCouponType } = useCoupons();

    const { data: profileData } = useProfile();
    const memberNo = profileData?.memberNo ?? 0;

    const usableQuery = router.query.usable;
    const parseUsable =
        usableQuery === 'false' ? false : usableQuery === 'true' ? true : true;

    const pageNumber = Math.max(1, Number(router.query.pageNumber ?? 1) || 1);
    const startYmd = String(router.query.startYmd ?? '');
    const endYmd = String(router.query.endYmd ?? '');

    const searchParams = useMemo(
        () => ({
            pageNumber,
            pageSize: PAGE_SIZE,
            desc: true,
            usable: parseUsable,
            ...(startYmd ? { startYmd } : {}),
            ...(endYmd ? { endYmd } : {}),
        }),
        [pageNumber, startYmd, endYmd, parseUsable],
    );

    const { data, isLoading } = useUserCoupons({
        memberNo,
        params: searchParams,
        options: {
            enabled: memberNo > 0,
        },
    });

    const couponList = data?.items ?? [];
    const totalCount = data?.totalCount ?? 0;
    const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));

    const [openConstraintIssueNo, setOpenConstraintIssueNo] = useState(0);
    const constraintPopupRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (openConstraintIssueNo === 0) {
            return;
        }

        const onPointerDown = (event: PointerEvent) => {
            const target = event.target as Node;
            if (constraintPopupRef.current?.contains(target)) {
                return;
            }
            const trigger = document.getElementById(
                `coupon-constraint-${openConstraintIssueNo}`,
            );
            if (trigger?.contains(target)) {
                return;
            }
            setOpenConstraintIssueNo(0);
        };

        document.addEventListener('pointerdown', onPointerDown, true);
        return () => {
            document.removeEventListener('pointerdown', onPointerDown, true);
        };
    }, [openConstraintIssueNo]);

    const setQuery = (next: Record<string, string | number | undefined>) => {
        void router.replace(
            {
                pathname: router.pathname,
                query: {
                    ...router.query,
                    ...next,
                    ...(next.pageNumber ? {} : { pageNumber: 1 }),
                },
            },
            undefined,
            { shallow: true },
        );
    };

    const onClickConstraintToggle = (coupon: Coupon) => {
        setOpenConstraintIssueNo((previous) =>
            previous === coupon.couponIssueNo ? 0 : coupon.couponIssueNo,
        );
    };

    return (
        <div className={styles.container}>
            <section className={styles.section}>
                <div className={styles.toolbar}>
                    <div className={styles.toolbarTop}>
                        <SegmentedToggle
                            className={styles.toggleGroup}
                            buttonClassName={styles.toggleButton}
                            value={parseUsable ? 'usable' : 'unusable'}
                            options={[
                                { value: 'usable', label: t('사용 가능 쿠폰') },
                                {
                                    value: 'unusable',
                                    label: t('사용 불가 쿠폰'),
                                },
                            ]}
                            onChange={(value) => {
                                if (value === 'usable') {
                                    setQuery({ usable: 'true' });
                                    return;
                                }
                                setQuery({ usable: 'false' });
                            }}
                        />

                        <PeriodQueryFilter />
                    </div>

                    <div className={styles.toolbarBottom}>
                        <div className={styles.period}>
                            <div className={styles.metaRow}>
                                <div className={styles.metaRowLeft}>
                                    {startYmd && endYmd ? (
                                        <span
                                            className={styles.selectedRangeText}
                                        >
                                            {startYmd} ~ {endYmd}
                                        </span>
                                    ) : (
                                        <span
                                            className={styles.selectedRangeText}
                                        >
                                            {t('최근 3개월')}
                                        </span>
                                    )}

                                    <span className={styles.count}>
                                        {t('총 {{count}}개', {
                                            count: totalCount,
                                        })}
                                    </span>
                                </div>

                                <div className={styles.metaRowRight}>
                                    <Button
                                        type='button'
                                        frame='solid'
                                        variant='primary'
                                        className={styles.registerCouponButton}
                                        onClick={() => {
                                            /* 쿠폰 등록 플로우 연결 예정 */
                                        }}
                                    >
                                        {t('쿠폰 등록')}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.list}>
                    {!isMobile && (
                        <div className={styles.headerRow}>
                            <div className={styles.headerCell}>
                                {t('쿠폰명')}
                            </div>
                            <div className={styles.headerCell}>
                                {t('혜택정보')}
                            </div>
                            <div className={styles.headerCell}>
                                {t('사용/제한 조건')}
                            </div>
                            <div className={styles.headerCell}>
                                {t('발급일')}
                            </div>
                            <div className={styles.headerCell}>
                                {t('만료일')}
                            </div>
                        </div>
                    )}

                    <LoadingWrapper isLoading={isLoading}>
                        {couponList.length === 0 ? (
                            <div className={styles.empty}>
                                {t('현재 보유한 쿠폰이 없습니다.')}
                            </div>
                        ) : (
                            couponList.map((coupon) => (
                                <div
                                    key={coupon.couponIssueNo}
                                    className={styles.listItem}
                                >
                                    <div className={styles.cell}>
                                        <p className={styles.name}>
                                            {coupon.couponName}
                                        </p>
                                    </div>

                                    <div className={styles.cell}>
                                        <div
                                            className={styles.benefitContainer}
                                        >
                                            <p className={styles.benefitText}>
                                                {getBenefitAmt(coupon)}
                                            </p>
                                            <p
                                                className={
                                                    styles.benefitCouponType
                                                }
                                            >
                                                {getCouponType(
                                                    coupon.couponType,
                                                )}
                                            </p>
                                        </div>
                                    </div>

                                    <div className={styles.cell}>
                                        <div className={styles.detailCell}>
                                            <div
                                                className={styles.detailAnchor}
                                            >
                                                <button
                                                    type='button'
                                                    id={`coupon-constraint-${coupon.couponIssueNo}`}
                                                    className={
                                                        styles.detailButton
                                                    }
                                                    onClick={() => {
                                                        onClickConstraintToggle(
                                                            coupon,
                                                        );
                                                    }}
                                                >
                                                    {t('상세보기')}
                                                </button>

                                                <AnimatePresence>
                                                    {openConstraintIssueNo ===
                                                        coupon.couponIssueNo && (
                                                        <motion.div
                                                            ref={
                                                                constraintPopupRef
                                                            }
                                                            initial='hidden'
                                                            animate='visible'
                                                            exit='hidden'
                                                            variants={{
                                                                hidden: {
                                                                    opacity: 0,
                                                                    y: 10,
                                                                    x: isMobile
                                                                        ? 0
                                                                        : '-50%',
                                                                },
                                                                visible: {
                                                                    opacity: 1,
                                                                    y: 0,
                                                                    x: isMobile
                                                                        ? 0
                                                                        : '-50%',
                                                                },
                                                            }}
                                                            className={
                                                                styles.detailPopup
                                                            }
                                                            onClick={(
                                                                event,
                                                            ) => {
                                                                event.stopPropagation();
                                                            }}
                                                        >
                                                            <div
                                                                className={
                                                                    styles.detailPopupHeader
                                                                }
                                                            >
                                                                {t(
                                                                    '사용/제한 조건',
                                                                )}
                                                            </div>
                                                            <CouponConstraintDetailContent
                                                                coupon={coupon}
                                                            />
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        </div>
                                    </div>

                                    <div className={styles.cell}>
                                        <span
                                            className={styles.mobileDateLabel}
                                        >
                                            {t('발급일')}
                                        </span>
                                        <p className={styles.subText}>
                                            {dayjs(coupon.issueYmdt).format(
                                                'YYYY-MM-DD',
                                            )}
                                        </p>
                                    </div>

                                    <div className={styles.cell}>
                                        <span
                                            className={styles.mobileDateLabel}
                                        >
                                            {t('만료일')}
                                        </span>
                                        <p className={styles.subText}>
                                            {dayjs(coupon.useEndYmdt).format(
                                                'YYYY-MM-DD',
                                            )}
                                        </p>
                                        <p className={styles.subText}>
                                            {dayjs(coupon.useEndYmdt).format(
                                                'HH:mm:ss',
                                            )}
                                        </p>
                                    </div>
                                </div>
                            ))
                        )}
                    </LoadingWrapper>
                </div>

                {totalPages > 1 && (
                    <div className={styles.pagination}>
                        <button
                            type='button'
                            className={clsx(
                                styles.pageButton,
                                pageNumber <= 1 && styles.pageButtonDisabled,
                            )}
                            onClick={() =>
                                setQuery({
                                    pageNumber: Math.max(1, pageNumber - 1),
                                })
                            }
                            disabled={pageNumber <= 1}
                        >
                            {t('이전')}
                        </button>
                        <span className={styles.subText}>
                            {pageNumber} / {totalPages}
                        </span>
                        <button
                            type='button'
                            className={clsx(
                                styles.pageButton,
                                pageNumber >= totalPages &&
                                    styles.pageButtonDisabled,
                            )}
                            onClick={() =>
                                setQuery({
                                    pageNumber: Math.min(
                                        totalPages,
                                        pageNumber + 1,
                                    ),
                                })
                            }
                            disabled={pageNumber >= totalPages}
                        >
                            {t('다음')}
                        </button>
                    </div>
                )}
            </section>
        </div>
    );
};

MypageCoupons.getLayout = (page: React.ReactNode) => {
    return <MypageLayout>{page}</MypageLayout>;
};

export default MypageCoupons;
