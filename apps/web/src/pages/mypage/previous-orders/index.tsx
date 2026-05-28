import { isEmpty } from '@fxts/core';
import dayjs from 'dayjs';
import Link from 'next/link';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import LoadingWrapper from '@/shared/components/common/loading-wrapper';
import { NoResult } from '@/shared/components/common/no-result';
import Seo from '@/shared/components/common/seo';
import { MypageLayout } from '@/shared/components/layout';
import * as card from '@/components/mypage/common/mypage-list-card/index.css';
import { PeriodQueryFilter } from '@/components/mypage/filters/period-query-filter';
import { PreviousOrderItem } from '@/components/mypage/previous-orders/item';
import Paging from '@/shared/ui/paging';
import { PATHS } from '@/const/paths';
import { useMypageListQueryParams } from '@/entities/mypage/hooks/useMypageListQueryParams';
import { useInfinitePreviousOrderList } from '@/hooks/infiniteQuery/order/previousOrder';
import { usePreviousOrderList } from '@/hooks/query/order/previousOrder';
import { useResponsive } from '@/hooks/utils';
import type { GetPreviousOrdersResponse } from '@/models/order/previousOrder';
import * as styles from '@/pages/mypage/previous-orders/index.css';
import { ObserverTarget } from '@/shared/components/observer-target';
import { Only } from '@/shared/components/only';

const PAGE_SIZE = 10;

export default function MypagePreviousOrdersPage() {
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
        <>
            <Seo title={t('이전 주문 내역')} noindex={true} />
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
                    <Only.Desktop>
                        <div
                            className={card.headerRow}
                            style={{
                                gridTemplateColumns:
                                    'minmax(0, 1fr) minmax(120px, 160px)',
                            }}
                        >
                            <div className={card.headerCell}>
                                {t('주문번호 / 주문일자 / 상품정보')}
                            </div>
                            <div className={card.headerCell}>
                                {t('주문상태')}
                            </div>
                        </div>
                    </Only.Desktop>

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

                                                <ul
                                                    className={
                                                        styles.orderOptionList
                                                    }
                                                >
                                                    {order.orderOptions?.map(
                                                        (option) => (
                                                            <PreviousOrderItem
                                                                key={
                                                                    option.optionNo
                                                                }
                                                                productName={
                                                                    option.productName
                                                                }
                                                                optionName={
                                                                    option.optionName
                                                                }
                                                                optionValue={
                                                                    option.optionValue
                                                                }
                                                                orderCnt={
                                                                    option.orderCnt
                                                                }
                                                                salePrice={
                                                                    option.salePrice
                                                                }
                                                                orderStatusType={
                                                                    option.orderStatusType
                                                                }
                                                            />
                                                        ),
                                                    )}
                                                </ul>
                                            </div>
                                        );
                                    },
                                )}
                            </div>
                        ) : (
                            <NoResult text={t('주문 내역이 없습니다.')} />
                        )}

                        <Only.Mobile>
                            <ObserverTarget
                                onIntersect={() => {
                                    if (hasNextPage) {
                                        fetchNextPage();
                                    }
                                }}
                                hasNextPage={hasNextPage || false}
                            />
                        </Only.Mobile>

                        <Only.Desktop>
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
                        </Only.Desktop>
                    </LoadingWrapper>
                </div>
            </section>
        </div>
        </>
    );
}

MypagePreviousOrdersPage.getLayout = (page: React.ReactNode) => (
    <MypageLayout>{page}</MypageLayout>
);
