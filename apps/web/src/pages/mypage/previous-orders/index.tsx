import { isEmpty } from '@fxts/core';
import dayjs from 'dayjs';
import Link from 'next/link';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import LoadingWrapper from '@/components/common/loading-wrapper';
import { NoResult } from '@/components/common/no-result';
import { ObserverTarget } from '@/components/common/observer-target';
import { MypageLayout } from '@/components/layout';
import * as card from '@/components/mypage/common/mypage-list-card/index.css';
import { PeriodQueryFilter } from '@/components/mypage/filters/period-query-filter';
import Paging from '@/components/ui/paging';
import { orderMap } from '@/const/order';
import { PATHS } from '@/const/paths';
import { useMypageListQueryParams } from '@/entities/mypage/hooks/useMypageListQueryParams';
import { useInfinitePreviousOrderList } from '@/hooks/infiniteQuery/order/previousOrder';
import { usePreviousOrderList } from '@/hooks/query/order/previousOrder';
import { useResponsive } from '@/hooks/utils';
import type { GetPreviousOrdersResponse } from '@/models/order/previousOrder';
import * as styles from '@/pages/mypage/previous-orders/index.css';
import { CURRENCY } from '@/utils/currency';

const PAGE_SIZE = 10;

const PreviousOrders = () => {
    const { isMobile } = useResponsive();
    const { t } = useTranslation();
    const [{ startYmd, endYmd, pageNumber }, setQuery] =
        useMypageListQueryParams();

    const searchParams = {
        page: pageNumber,
        size: PAGE_SIZE,
        startYmd,
        endYmd,
    };

    const {
        data: previousOrderListData,
        isLoading: isPreviousOrderListLoading,
    } = usePreviousOrderList({
        searchParams,
        options: {
            enabled: !isMobile,
        },
    });

    const {
        data: infinitePreviousOrderListData,
        isLoading: isInfinitePreviousOrderListLoading,
        hasNextPage,
        fetchNextPage,
    } = useInfinitePreviousOrderList({
        searchParams,
        options: {
            enabled: isMobile,
        },
    });

    const previousOrderList = useMemo(() => {
        if (isMobile) {
            return (
                infinitePreviousOrderListData?.pages?.flatMap(
                    (page) => page?.contents || [],
                ) ?? []
            );
        }
        return previousOrderListData?.contents ?? [];
    }, [isMobile, infinitePreviousOrderListData, previousOrderListData]);

    const totalCount = useMemo(() => {
        if (isMobile) {
            return infinitePreviousOrderListData?.pages?.[0]?.totalCount ?? 0;
        }
        return previousOrderListData?.totalCount ?? 0;
    }, [isMobile, infinitePreviousOrderListData, previousOrderListData]);

    const isLoading = isMobile
        ? isInfinitePreviousOrderListLoading
        : isPreviousOrderListLoading;

    return (
        <div className={card.container}>
            <section className={card.section}>
                <div className={card.toolbar}>
                    <div className={card.toolbarTop}>
                        <span />

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
                        {!isEmpty(previousOrderList) ? (
                            <div>
                                {previousOrderList.map(
                                    (
                                        order: GetPreviousOrdersResponse['contents'][number],
                                    ) => {
                                        const orderDate =
                                            order.orderOptions?.[0]
                                                ?.orderYmdt ??
                                            order.orderOptions?.[0]?.payYmdt ??
                                            '';

                                        return (
                                            <div
                                                key={order.orderNo}
                                                className={styles.orderGroup}
                                            >
                                                <div
                                                    className={
                                                        styles.orderGroupHeader
                                                    }
                                                >
                                                    <Link
                                                        href={`${PATHS.MYPAGE.PREVIOUS_ORDERS.MAIN}/${order.orderNo}`}
                                                        className={
                                                            styles.orderNoLink
                                                        }
                                                        prefetch={false}
                                                    >
                                                        {t('주문번호')}{' '}
                                                        {order.orderNo}
                                                    </Link>
                                                    {orderDate && (
                                                        <span
                                                            className={
                                                                styles.orderDate
                                                            }
                                                        >
                                                            {dayjs(
                                                                orderDate,
                                                            ).format(
                                                                'YYYY-MM-DD',
                                                            )}
                                                        </span>
                                                    )}
                                                </div>

                                                {order.orderOptions?.map(
                                                    (
                                                        option: GetPreviousOrdersResponse['contents'][number]['orderOptions'][number],
                                                    ) => {
                                                        const statusLabel = t(
                                                            orderMap[
                                                                option.orderStatusType as keyof typeof orderMap
                                                            ] ??
                                                                option.orderStatusType,
                                                        );

                                                        const isPrimaryStatus =
                                                            option.orderStatusType ===
                                                            'BUY_CONFIRM';

                                                        return (
                                                            <div
                                                                key={
                                                                    option.optionNo
                                                                }
                                                                className={
                                                                    styles.orderItemRow
                                                                }
                                                            >
                                                                <div
                                                                    className={
                                                                        styles.productCell
                                                                    }
                                                                >
                                                                    <div
                                                                        className={
                                                                            styles.thumbnail
                                                                        }
                                                                        aria-hidden='true'
                                                                    />
                                                                    <div
                                                                        className={
                                                                            styles.productInfo
                                                                        }
                                                                    >
                                                                        <span
                                                                            className={`${
                                                                                styles.mobileStatusBadge
                                                                            } ${
                                                                                isPrimaryStatus
                                                                                    ? styles.mobileStatusBadgePrimary
                                                                                    : ''
                                                                            }`}
                                                                        >
                                                                            {
                                                                                statusLabel
                                                                            }
                                                                        </span>

                                                                        <p
                                                                            className={
                                                                                styles.productName
                                                                            }
                                                                        >
                                                                            {
                                                                                option.productName
                                                                            }
                                                                        </p>
                                                                        <p
                                                                            className={
                                                                                styles.optionText
                                                                            }
                                                                        >
                                                                            {
                                                                                option.optionName
                                                                            }
                                                                            {option.optionValue
                                                                                ? `: ${option.optionValue}`
                                                                                : ''}{' '}
                                                                            |{' '}
                                                                            {
                                                                                option.orderCnt
                                                                            }
                                                                            {t(
                                                                                '개',
                                                                            )}
                                                                        </p>
                                                                        <p
                                                                            className={
                                                                                styles.priceText
                                                                            }
                                                                        >
                                                                            {CURRENCY(
                                                                                option.salePrice ??
                                                                                    0,
                                                                            ).format()}
                                                                        </p>
                                                                    </div>
                                                                </div>

                                                                <div
                                                                    className={
                                                                        styles.statusCell
                                                                    }
                                                                >
                                                                    <span
                                                                        className={`${
                                                                            styles.statusText
                                                                        } ${
                                                                            isPrimaryStatus
                                                                                ? styles.statusTextPrimary
                                                                                : ''
                                                                        }`}
                                                                    >
                                                                        {
                                                                            statusLabel
                                                                        }
                                                                    </span>
                                                                </div>

                                                                <div
                                                                    className={
                                                                        styles.actionsCell
                                                                    }
                                                                />
                                                            </div>
                                                        );
                                                    },
                                                )}
                                            </div>
                                        );
                                    },
                                )}
                            </div>
                        ) : (
                            <NoResult text={t('주문 내역이 없습니다.')} />
                        )}

                        {isMobile ? (
                            <ObserverTarget
                                onIntersect={() => {
                                    if (hasNextPage) {
                                        fetchNextPage();
                                    }
                                }}
                                hasNextPage={hasNextPage || false}
                                totalCount={totalCount}
                            />
                        ) : (
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
                    </LoadingWrapper>
                </div>
            </section>
        </div>
    );
};

PreviousOrders.getLayout = (page: React.ReactNode) => (
    <MypageLayout>{page}</MypageLayout>
);

export default PreviousOrders;
