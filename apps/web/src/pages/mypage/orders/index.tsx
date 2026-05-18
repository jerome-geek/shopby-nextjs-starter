import { isEmpty } from '@fxts/core';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import LoadingWrapper from '@/components/common/loading-wrapper';
import { NoResult } from '@/components/common/no-result';
import { ObserverTarget } from '@/shared/components/observer-target';
import { MypageLayout } from '@/components/layout';
import * as card from '@/components/mypage/common/mypage-list-card/index.css';
import { PeriodQueryFilter } from '@/components/mypage/filters/period-query-filter';
import { OrderOptions } from '@/components/mypage/orders/order-options';
import { ORDER_OPTIONS_DESKTOP_GRID_TEMPLATE } from '@/components/mypage/orders/order-options-item.css';
import Paging from '@/components/ui/paging';
import { useMypageListQueryParams } from '@/entities/mypage/hooks/useMypageListQueryParams';
import { ordersStatusTabSpec } from '@/entities/mypage/utils/tabs';
import {
    OrderStatusFilter,
    OrderStatusFilterFallback,
    type OrderStatusFilterValue,
} from '@/features/mypage/order-status-filter';
import {
    useInfiniteMyOrderList,
    useMyOrderList,
} from '@/hooks/query/order/myOrder';
import { useResponsive } from '@/hooks/utils';
import ShopbyAsyncBoundary from '@/shared/boundary/shopby-async-boundary';

const PAGE_SIZE = 10;

export default function MypageOrdersPage() {
    const { t } = useTranslation();

    const { isMobile } = useResponsive();

    const [{ startYmd, endYmd, pageNumber, orderStatus }, setQuery] =
        useMypageListQueryParams(
            {
                orderStatus: ordersStatusTabSpec.parser,
            },
            { history: 'push' },
        );

    const parseOrderStatus = useMemo(() => {
        return ordersStatusTabSpec.resolveRequestTypes(orderStatus);
    }, [orderStatus]);

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

    const { data: myOrderListData, isLoading: isMyOrderListLoading } =
        useMyOrderList({
            searchParams,
            options: {
                enabled: !isMobile,
            },
        });

    const {
        data: infiniteMyOrderListData,
        isLoading: isInfiniteMyOrderListLoading,
        hasNextPage,
        fetchNextPage,
    } = useInfiniteMyOrderList({
        searchParams,
        options: {
            enabled: isMobile,
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

    const handleOrderStatusChange = (value: OrderStatusFilterValue) => {
        setQuery({ orderStatus: value }, { resetPage: true });
    };

    return (
        <div className={card.container}>
            <section className={card.section}>
                <div className={card.toolbar}>
                    <div className={card.toolbarTop}>
                        <ShopbyAsyncBoundary
                            fallback={
                                <OrderStatusFilterFallback
                                    value={orderStatus}
                                    onChange={handleOrderStatusChange}
                                />
                            }
                        >
                            <OrderStatusFilter
                                value={orderStatus}
                                onChange={handleOrderStatusChange}
                            />
                        </ShopbyAsyncBoundary>

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
                        <div
                            className={card.headerRow}
                            style={{
                                gridTemplateColumns:
                                    ORDER_OPTIONS_DESKTOP_GRID_TEMPLATE,
                                gap: 0,
                            }}
                        >
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
                        {!isEmpty(myOrderList) ? (
                            <OrderOptions optionItems={myOrderList} />
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
}

MypageOrdersPage.getLayout = (page: React.ReactNode) => (
    <MypageLayout>{page}</MypageLayout>
);
