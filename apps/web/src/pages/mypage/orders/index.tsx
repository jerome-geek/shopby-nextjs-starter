import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import dayjs from 'dayjs';

import { MypageLayout } from '@/components/layout/mypage';
import LoadingWrapper from '@/components/common/loading-wrapper';
import { NoResult } from '@/components/common/no-result';
import { ObserverTarget } from '@/components/common/observer-target';
import Paging from '@/components/ui/paging';
import { SegmentedToggle } from '@/components/mypage/filters/segmented-toggle';
import { PeriodQueryFilter } from '@/components/mypage/filters/period-query-filter';
import { useInfiniteMyOrderList } from '@/hooks/query/order/myOrder';
import {
    useMyOrderList,
    useOrderStatusSummary,
} from '@/hooks/query/order/myOrder';
import useProfile from '@/hooks/query/member/profile/useProfile';
import { useResponsive } from '@/hooks/utils';
import { DEFAULT_ORDER_TAB_TYPES } from '@/const/order';
import { PATHS } from '@/const/paths';
import { OrderRequestStatusType } from '@/models';
import { CURRENCY } from '@/utils/currency';
import * as card from '@/components/mypage/common/mypage-list-card/index.css';
import * as styles from '@/pages/mypage/orders/index.css';

const PAGE_SIZE = 10;

export const Orders = () => {
    const { isMobile } = useResponsive();
    const { t } = useTranslation();
    const router = useRouter();

    const startYmd = String(router.query.startYmd ?? '') || undefined;
    const endYmd = String(router.query.endYmd ?? '') || undefined;
    const pageNumber = Number(router.query.pageNumber) || 1;
    const orderStatus = String(router.query.orderStatus ?? '');

    const { data: profileData } = useProfile();
    const memberNo = profileData?.memberNo || 0;

    const { data: orderStatusSummaryData } = useOrderStatusSummary({
        memberNo,
    });

    const orderTabList = useMemo(
        () => [
            {
                value: DEFAULT_ORDER_TAB_TYPES.join(','),
                label: t('전체'),
            },
            {
                value: 'DEPOSIT_WAIT',
                label:
                    t('입금대기') +
                    ` ${orderStatusSummaryData?.depositWaitCnt ?? 0}`,
            },
            {
                value: 'PAY_DONE,PRODUCT_PREPARE,DELIVERY_PREPARE',
                label:
                    t('출고대기') +
                    ` ${orderStatusSummaryData?.payDoneCnt ?? 0}`,
            },
            {
                value: 'DELIVERY_ING',
                label:
                    t('배송중') +
                    ` ${orderStatusSummaryData?.deliveryIngCnt ?? 0}`,
            },
            {
                value: 'DELIVERY_DONE',
                label:
                    t('배송완료') +
                    ` ${orderStatusSummaryData?.deliveryDoneCnt ?? 0}`,
            },
            {
                value: 'BUY_CONFIRM',
                label:
                    t('구매확정') +
                    ` ${orderStatusSummaryData?.buyConfirmCnt ?? 0}`,
            },
        ],
        [orderStatusSummaryData, t],
    );

    const parseOrderStatus = useMemo(() => {
        const found = orderTabList.find((tab) => tab.value === orderStatus);
        if (found) {
            return found.value.split(',') as OrderRequestStatusType[];
        }
        return DEFAULT_ORDER_TAB_TYPES;
    }, [orderStatus, orderTabList]);

    const searchParams = useMemo(
        () => ({
            pageNumber,
            pageSize: PAGE_SIZE,
            hasTotalCount: true,
            startYmd: startYmd ?? '',
            endYmd: endYmd ?? '',
            orderRequestTypes: parseOrderStatus,
        }),
        [pageNumber, startYmd, endYmd, parseOrderStatus],
    );

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

    const { data: myOrderListData, isLoading: isMyOrderListLoading } =
        useMyOrderList({
            memberNo,
            searchParams,
            options: {
                enabled: !isMobile && memberNo > 0,
            },
        });

    const {
        data: infiniteMyOrderListData,
        isLoading: isInfiniteMyOrderListLoading,
        hasNextPage,
        fetchNextPage,
    } = useInfiniteMyOrderList({
        memberNo,
        searchParams,
        options: {
            enabled: isMobile && memberNo > 0,
        },
    });

    const myOrderList = useMemo(() => {
        if (isMobile) {
            return (
                infiniteMyOrderListData?.pages?.flatMap(
                    (page) => page?.items || [],
                ) ?? []
            );
        }
        return myOrderListData?.items ?? [];
    }, [isMobile, infiniteMyOrderListData, myOrderListData]);

    const totalCount = useMemo(() => {
        if (isMobile) {
            return infiniteMyOrderListData?.pages?.[0]?.totalCount ?? 0;
        }
        return myOrderListData?.totalCount ?? 0;
    }, [isMobile, infiniteMyOrderListData, myOrderListData]);

    const isLoading = isMobile
        ? isInfiniteMyOrderListLoading
        : isMyOrderListLoading;

    return (
        <div className={card.container}>
            <section className={card.section}>
                <div className={card.toolbar}>
                    <div className={card.toolbarTop}>
                        <SegmentedToggle
                            className={card.toggleGroup}
                            buttonClassName={card.toggleButton}
                            value={
                                orderStatus || DEFAULT_ORDER_TAB_TYPES.join(',')
                            }
                            defaultValue={DEFAULT_ORDER_TAB_TYPES.join(',')}
                            options={orderTabList}
                            onChange={(value) => {
                                setQuery({ orderStatus: value });
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
                        </div>
                    </div>
                </div>

                <div className={card.list}>
                    {!isMobile && (
                        <div className={card.headerRow}>
                            <div className={card.headerCell}>
                                {t('주문번호 / 주문일자 / 상품정보')}
                            </div>
                            <div className={card.headerCell}>
                                {t('주문상태')}
                            </div>
                            <div className={card.headerCell}>{t('선택')}</div>
                        </div>
                    )}

                    <LoadingWrapper isLoading={isLoading}>
                        {myOrderList.length === 0 ? (
                            <NoResult text={t('주문 내역이 없습니다.')} />
                        ) : (
                            <ul>
                                {myOrderList.map((orderGroup) => (
                                    <li
                                        key={orderGroup.orderNo}
                                        className={styles.orderGroup}
                                    >
                                        {/* 주문번호 / 날짜 헤더 */}
                                        <div
                                            className={styles.orderGroupHeader}
                                        >
                                            <Link
                                                href={PATHS.MYPAGE.ORDERS.DETAIL.replace(
                                                    '[orderNo]',
                                                    orderGroup.orderNo,
                                                )}
                                                className={styles.orderNoLink}
                                            >
                                                {orderGroup.orderNo}
                                            </Link>
                                            <span className={styles.orderDate}>
                                                {dayjs(
                                                    orderGroup.orderYmdt,
                                                ).format('YYYY.MM.DD')}
                                            </span>
                                        </div>

                                        {/* 개별 상품 옵션 행 */}
                                        {orderGroup.orderOptions.map(
                                            (option) => {
                                                const isBuyConfirm =
                                                    option.orderStatusType ===
                                                    'BUY_CONFIRM';
                                                const statusLabel =
                                                    option.claimStatusTypeLabel ||
                                                    option.orderStatusTypeLabel;

                                                return (
                                                    <div
                                                        key={
                                                            option.orderOptionNo
                                                        }
                                                        className={
                                                            styles.orderItemRow
                                                        }
                                                    >
                                                        {/* 상품 정보 셀 */}
                                                        <div
                                                            className={
                                                                styles.productCell
                                                            }
                                                        >
                                                            <Link
                                                                href={
                                                                    option.isExtraProduct
                                                                        ? '#'
                                                                        : `${PATHS.PRODUCTS.MAIN}/${option.productNo}`
                                                                }
                                                                style={{
                                                                    pointerEvents:
                                                                        option.isExtraProduct
                                                                            ? 'none'
                                                                            : 'auto',
                                                                    flexShrink: 0,
                                                                }}
                                                            >
                                                                <img
                                                                    src={
                                                                        option.imageUrl ||
                                                                        ''
                                                                    }
                                                                    alt={
                                                                        option.productName
                                                                    }
                                                                    className={
                                                                        styles.thumbnail
                                                                    }
                                                                />
                                                            </Link>

                                                            <div
                                                                className={
                                                                    styles.productInfo
                                                                }
                                                            >
                                                                {/* 모바일 전용 주문 상태 뱃지 */}
                                                                <span
                                                                    className={`${styles.mobileStatusBadge} ${isBuyConfirm ? styles.mobileStatusBadgePrimary : ''}`}
                                                                >
                                                                    {
                                                                        statusLabel
                                                                    }
                                                                </span>

                                                                {option.isFreeGift && (
                                                                    <span
                                                                        className={
                                                                            styles.productBadge
                                                                        }
                                                                    >
                                                                        [
                                                                        {t(
                                                                            '사은품',
                                                                        )}
                                                                        ]
                                                                    </span>
                                                                )}

                                                                {option.isExtraProduct && (
                                                                    <span
                                                                        className={
                                                                            styles.productBadge
                                                                        }
                                                                    >
                                                                        [
                                                                        {t(
                                                                            '추가상품',
                                                                        )}
                                                                        ]
                                                                    </span>
                                                                )}

                                                                <p
                                                                    className={
                                                                        styles.productName
                                                                    }
                                                                >
                                                                    {
                                                                        option.productName
                                                                    }
                                                                </p>

                                                                {option.optionTitle && (
                                                                    <p
                                                                        className={
                                                                            styles.optionText
                                                                        }
                                                                    >
                                                                        {
                                                                            option.optionTitle
                                                                        }{' '}
                                                                        |{' '}
                                                                        {
                                                                            option.orderCnt
                                                                        }
                                                                        {t(
                                                                            '개',
                                                                        )}
                                                                    </p>
                                                                )}

                                                                {!option.isFreeGift && (
                                                                    <p
                                                                        className={
                                                                            styles.priceText
                                                                        }
                                                                    >
                                                                        {CURRENCY(
                                                                            option
                                                                                .price
                                                                                ?.salePrice ??
                                                                                0,
                                                                        ).format()}
                                                                    </p>
                                                                )}
                                                            </div>
                                                        </div>

                                                        {/* 주문 상태 셀 (데스크탑) */}
                                                        <div
                                                            className={
                                                                styles.statusCell
                                                            }
                                                        >
                                                            <span
                                                                className={`${styles.statusText} ${isBuyConfirm ? styles.statusTextPrimary : ''}`}
                                                            >
                                                                {statusLabel}
                                                            </span>
                                                        </div>

                                                        <div
                                                            className={
                                                                styles.actionsCell
                                                            }
                                                        >
                                                            <Link
                                                                href={PATHS.MYPAGE.ORDERS.DETAIL.replace(
                                                                    '[orderNo]',
                                                                    orderGroup.orderNo,
                                                                )}
                                                                className={
                                                                    styles.actionButton
                                                                }
                                                            >
                                                                {t('내역조회')}
                                                            </Link>

                                                            {isBuyConfirm && (
                                                                <button
                                                                    type='button'
                                                                    className={`${styles.actionButton} ${styles.actionButtonPrimary}`}
                                                                >
                                                                    {t(
                                                                        '리뷰작성',
                                                                    )}
                                                                </button>
                                                            )}
                                                        </div>
                                                    </div>
                                                );
                                            },
                                        )}
                                    </li>
                                ))}
                            </ul>
                        )}

                        {isMobile && (
                            <ObserverTarget
                                onIntersect={() => {
                                    if (hasNextPage) {
                                        fetchNextPage();
                                    }
                                }}
                                hasNextPage={hasNextPage || false}
                                totalCount={totalCount}
                            />
                        )}
                    </LoadingWrapper>
                </div>

                {!isMobile && (
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
                )}
            </section>
        </div>
    );
};

Orders.getLayout = (page: React.ReactNode) => {
    return <MypageLayout>{page}</MypageLayout>;
};

export default Orders;
