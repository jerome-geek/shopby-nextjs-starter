import { isEmpty } from '@fxts/core';
import dayjs from 'dayjs';
import { AnimatePresence, motion } from 'motion/react';
import { overlay } from 'overlay-kit';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { CouponRegisterBottomSheet } from '@/features/mypage/coupons/overlay/coupon-register/bottom-sheet';
import LoadingWrapper from '@/shared/components/common/loading-wrapper';
import { NoResult } from '@/shared/components/common/no-result';
import Seo from '@/shared/components/common/seo';
import { MypageLayout } from '@/shared/components/layout';
import { CouponRegisterModal } from '@/features/mypage/coupons/overlay/coupon-register/modal';
import * as card from '@/features/mypage/common/mypage-list-card/index.css';
import { CouponConstraintDetailContent } from '@/features/mypage/coupons/constraint-detail-content';
import { PeriodQueryFilter } from '@/features/mypage/filters/period-query-filter';
import { SegmentedToggle } from '@/features/mypage/filters/segmented-toggle';
import { Button } from '@/shared/ui/button';
import Paging from '@/shared/ui/paging';
import { useMypageListQueryParams } from '@/entities/mypage/hooks/useMypageListQueryParams';
import { couponUsableTabSpec } from '@/entities/mypage/utils/tabs';
import { useUserCoupons } from '@/hooks/query/promotion/coupon';
import { useResponsive } from '@/hooks/utils';
import { useCoupons } from '@/hooks/utils/useCoupons';
import type { Coupon } from '@/models/promotion';
import * as styles from '@/pages/mypage/coupons/index.css';
import { Only } from '@/shared/components/only';

const PAGE_SIZE = 10;

export default function MypageCouponsPage() {
    const { t } = useTranslation();
    const { isMobile } = useResponsive();
    const { getBenefitAmt, getCouponType } = useCoupons();

    const tabOptions = useMemo(() => couponUsableTabSpec.options(t), [t]);

    const [{ startYmd, endYmd, pageNumber, usable }, setQuery] =
        useMypageListQueryParams(
            {
                usable: couponUsableTabSpec.parser,
            },
            { history: 'push' },
        );

    const usableTab = couponUsableTabSpec.resolveUsable(usable);

    const searchParams = useMemo(
        () => ({
            pageNumber,
            pageSize: PAGE_SIZE,
            desc: true,
            usable: usableTab,
            hasTotalCount: true,
            startYmd,
            endYmd,
        }),
        [pageNumber, startYmd, endYmd, usableTab],
    );

    const { data: couponListData, isLoading: isCouponListLoading } =
        useUserCoupons({
            params: searchParams,
        });

    const couponList = useMemo(() => {
        return couponListData?.items ?? [];
    }, [couponListData]);

    const totalCount = useMemo(() => {
        return couponListData?.totalCount ?? 0;
    }, [couponListData]);

    const isLoading = isCouponListLoading;

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

    const onClickConstraintToggle = (coupon: Coupon) => {
        setOpenConstraintIssueNo((previous) =>
            previous === coupon.couponIssueNo ? 0 : coupon.couponIssueNo,
        );
    };

    const openCouponRegister = () => {
        overlay.open((props) => {
            return isMobile ? (
                <CouponRegisterBottomSheet {...props} />
            ) : (
                <CouponRegisterModal {...props} />
            );
        });
    };

    return (
        <>
            <Seo title={t('쿠폰')} noindex={true} />
            <div className={card.container}>
            <section className={card.section}>
                <div className={card.toolbar}>
                    <div className={card.toolbarTop}>
                        <SegmentedToggle
                            className={card.toggleGroup}
                            buttonClassName={card.toggleButton}
                            defaultValue='all'
                            value={usable}
                            options={tabOptions}
                            onChange={(nextValue) => {
                                setQuery(
                                    { usable: nextValue },
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
                                    {t('총 {{count}}개', {
                                        count: totalCount,
                                    })}
                                </span>
                            </div>

                            <div className={card.metaRowRight}>
                                <Button
                                    type='button'
                                    frame='solid'
                                    variant='primary'
                                    className={card.registerButton}
                                    onClick={openCouponRegister}
                                >
                                    {t('쿠폰 등록')}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={card.list}>
                    <Only.Desktop>
                        <div className={card.headerRow}>
                            <div className={card.headerCell}>{t('쿠폰명')}</div>
                            <div className={card.headerCell}>
                                {t('혜택정보')}
                            </div>
                            <div className={card.headerCell}>
                                {t('사용/제한 조건')}
                            </div>
                            <div className={card.headerCell}>{t('발급일')}</div>
                            <div className={card.headerCell}>{t('만료일')}</div>
                        </div>
                    </Only.Desktop>

                    <LoadingWrapper isLoading={isLoading}>
                        {isEmpty(couponList) ? (
                            <NoResult text={t('보유한 쿠폰이 없습니다.')} />
                        ) : (
                            <ul>
                                {couponList.map((coupon) => (
                                    <li
                                        key={coupon.couponIssueNo}
                                        className={card.listItem}
                                    >
                                        <div className={card.cell}>
                                            <p className={styles.name}>
                                                {coupon.couponName}
                                            </p>
                                        </div>

                                        <div className={card.cell}>
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

                                        <div className={card.cell}>
                                            <div className={styles.detailCell}>
                                                <div
                                                    className={
                                                        styles.detailAnchor
                                                    }
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
                                                                    coupon={
                                                                        coupon
                                                                    }
                                                                />
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>
                                                </div>
                                            </div>
                                        </div>

                                        <div className={card.cell}>
                                            <span
                                                className={
                                                    styles.mobileDateLabel
                                                }
                                            >
                                                {t('발급일')}
                                            </span>
                                            <p className={card.listCaption}>
                                                {dayjs(coupon.issueYmdt).format(
                                                    'YYYY-MM-DD',
                                                )}
                                            </p>
                                        </div>

                                        <div className={card.cell}>
                                            <span
                                                className={
                                                    styles.mobileDateLabel
                                                }
                                            >
                                                {t('만료일')}
                                            </span>
                                            <p className={card.listCaption}>
                                                {dayjs(
                                                    coupon.useEndYmdt,
                                                ).format('YYYY-MM-DD')}
                                            </p>
                                            <p className={card.listCaption}>
                                                {dayjs(
                                                    coupon.useEndYmdt,
                                                ).format('HH:mm:ss')}
                                            </p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </LoadingWrapper>
                </div>

                <div className={card.paging}>
                    <Paging
                        currentPage={pageNumber}
                        totalCount={totalCount}
                        pageSize={PAGE_SIZE}
                        onPageClick={(page) => {
                            setQuery({ pageNumber: page });
                        }}
                    />
                </div>
            </section>
        </div>
        </>
    );
}

MypageCouponsPage.getLayout = (page: React.ReactNode) => {
    return <MypageLayout>{page}</MypageLayout>;
};
