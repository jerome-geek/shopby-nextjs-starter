import Seo from '@/shared/components/common/seo';
import { isEmpty, map, pipe, toArray } from '@fxts/core';
import { useLenis } from 'lenis/react';
import { ChevronDown } from 'lucide-react';
import { motion } from 'motion/react';
import { useRouter } from 'next/router';
import { useMemo, useRef, useState } from 'react';

import {
    INITIAL_STATUS_PAGE,
    SORTING_TYPE_BY_STATUS,
    STATUS_OPTIONS,
    TAB_OPTIONS,
    TIME_SALE_DISPLAY_PAGE_SIZE,
    TIME_SALE_PAGE_SIZE,
    TIME_SALE_TYPES,
    type TimeSaleStatus,
    type TimeSaleType,
} from '@/const/timeSale';
import { CountdownTimer, ProductCard } from '@/features/product/components';
import * as tabStyles from '@/features/section/components/time-sale/tab.css';
import * as toggleStyles from '@/features/section/components/time-sale/toggle.css';
import { useProductSectionById } from '@/hooks/query/display/productSection';
import { useTimeSaleSectionProducts } from '@/hooks/query/shop/timeSale';
import { useResponsive } from '@/hooks/utils';
import { ImageUrlType } from '@/models/product';
import type { TimeSaleSectionProductsResponse } from '@/models/shop/timeSale';
import * as styles from '@/pages/time-sale/index.css';
import { NoResult } from '@/shared/components/common/no-result';
import { Column, Row } from '@/shared/ui/layout/flex';

export const TIME_SALE_LIST_BASE_PARAMS = {
    by: 'ADMIN_SETTING',
    direction: 'DESC',
    soldout: false,
    pageSize: TIME_SALE_PAGE_SIZE,
    includeStopProduct: false,
} as const;

const isTimeSaleType = (value: string): value is TimeSaleType =>
    TIME_SALE_TYPES.includes(value as TimeSaleType);

const TIME_SALE_SEARCH_PARAMS = {
    'today-open': {
        ...TIME_SALE_LIST_BASE_PARAMS,
        sortingType: SORTING_TYPE_BY_STATUS['today-open'],
    },
    best: {
        ...TIME_SALE_LIST_BASE_PARAMS,
        sortingType: SORTING_TYPE_BY_STATUS['best'],
    },
    'closing-soon': {
        ...TIME_SALE_LIST_BASE_PARAMS,
        sortingType: SORTING_TYPE_BY_STATUS['closing-soon'],
    },
} as const;

const mapTimeSaleResponseToProducts = (
    data: TimeSaleSectionProductsResponse | undefined,
) =>
    pipe(
        data?.products ?? [],
        map((product) => ({
            ...product,
            additionalDiscount: product.additionalDiscounts,
            imageUrlInfo:
                product.imageUrlInfo &&
                pipe(
                    product.imageUrlInfo,
                    map((img) => ({
                        url: img.url,
                        type: 'IMAGE_URL',
                    })),
                    toArray,
                ),
            stickerInfos: pipe(
                product.stickerInfos ?? [],
                map(({ type, label }) => ({
                    type,
                    label,
                    name: label,
                })),
                toArray,
            ),
        })),
        toArray,
    );

const TimeSale = () => {
    const router = useRouter();

    const { isMobile } = useResponsive();

    const tabParam =
        typeof router.query.tab === 'string' ? router.query.tab : '';

    const activeTab: TimeSaleType = isTimeSaleType(tabParam)
        ? tabParam
        : 'life';

    const [activeStatus, setActiveStatus] =
        useState<TimeSaleStatus>('today-open');
    const [currentPageByStatus, setCurrentPageByStatus] = useState<
        Record<TimeSaleStatus, number>
    >({
        'today-open': INITIAL_STATUS_PAGE,
        best: INITIAL_STATUS_PAGE,
        'closing-soon': INITIAL_STATUS_PAGE,
    });
    const isScrollingRef = useRef(false);

    const sectionId = activeTab === 'kids' ? 'TIMESALE_KIDS' : 'TIMESALE_LIFE';

    const { data: productSectionData } = useProductSectionById({
        sectionId,
    });
    const sectionNo = productSectionData?.sectionNo ?? 0;

    const { data: todayOpenData } = useTimeSaleSectionProducts({
        sectionNo,
        searchParams: TIME_SALE_SEARCH_PARAMS['today-open'],
        options: { enabled: sectionNo > 0 },
    });

    const { data: bestData } = useTimeSaleSectionProducts({
        sectionNo,
        searchParams: TIME_SALE_SEARCH_PARAMS['best'],
        options: { enabled: sectionNo > 0 },
    });

    const { data: closingSoonData } = useTimeSaleSectionProducts({
        sectionNo,
        searchParams: TIME_SALE_SEARCH_PARAMS['closing-soon'],
        options: { enabled: sectionNo > 0 },
    });

    const productList = useMemo(
        () =>
            ({
                'today-open': mapTimeSaleResponseToProducts(todayOpenData),
                best: mapTimeSaleResponseToProducts(bestData),
                'closing-soon': mapTimeSaleResponseToProducts(closingSoonData),
            }) as const,
        [todayOpenData, bestData, closingSoonData],
    );

    const totalCount = useMemo(
        () =>
            ({
                'today-open': todayOpenData?.productTotalCount ?? 0,
                best: bestData?.productTotalCount ?? 0,
                'closing-soon': closingSoonData?.productTotalCount ?? 0,
            }) as const,
        [todayOpenData, bestData, closingSoonData],
    );

    const handleLoadMore = (status: TimeSaleStatus) => {
        setCurrentPageByStatus((prev) => ({
            ...prev,
            [status]: (prev[status] ?? INITIAL_STATUS_PAGE) + 1,
        }));
    };

    const lenis = useLenis((lenisInstance) => {
        if (!lenisInstance || isScrollingRef.current) {
            return;
        }

        const margin = isMobile ? 114 : 160;
        const bestTop = document
            .getElementById('best')
            ?.getBoundingClientRect().top;
        const closingTop = document
            .getElementById('closing-soon')
            ?.getBoundingClientRect().top;

        if (bestTop === undefined || closingTop === undefined) return;

        const nextStatus: TimeSaleStatus =
            closingTop <= margin
                ? 'closing-soon'
                : bestTop <= margin
                  ? 'best'
                  : 'today-open';

        setActiveStatus((prev) => (prev === nextStatus ? prev : nextStatus));
    });

    const handleTabChange = (value: TimeSaleType) => {
        router.push(
            {
                pathname: router.pathname,
                query: { ...router.query, tab: value },
            },
            undefined,
            { shallow: true, scroll: false },
        );
    };

    const handleStatusChange = (value: TimeSaleStatus) => {
        setActiveStatus(value);
        isScrollingRef.current = true;

        const releaseScrolling = () => {
            isScrollingRef.current = false;
        };
        const releaseTimeoutId = window.setTimeout(
            releaseScrolling,
            1.2 * 1000 + 150,
        );

        lenis?.scrollTo(`#${value}`, {
            offset: isMobile ? -120 : -140, // 데스크탑 90+50, 모바일 70+50
            duration: 1.2,
            onComplete: () => {
                window.clearTimeout(releaseTimeoutId);
                releaseScrolling();
            },
        });
    };

    return (
        <div className={styles.container}>
            <Seo title='타임특가' />
            <div className={styles.topContainer}>
                {/* <div className={styles.imageContainer}>
                    <img
                        className={styles.image}
                        src={productSectionData?.imageUrl}
                        alt='타임특가 이미지'
                    />
                </div> */}

                <div className={styles.titleContainer}>
                    {!isMobile && <h1 className={styles.title}>타임특가</h1>}

                    <div className={styles.subTitleContainer}>
                        <h2 className={styles.subTitle}>
                            {productSectionData?.promotionText}
                        </h2>
                        <p
                            className={styles.description}
                            dangerouslySetInnerHTML={{
                                __html:
                                    productSectionData?.sectionExplain || '',
                            }}
                        />
                    </div>
                </div>
            </div>

            <div>
                <div className={toggleStyles.container}>
                    {TAB_OPTIONS.map((option) => (
                        <button
                            key={option.value}
                            className={toggleStyles.button({
                                active: activeTab === option.value,
                            })}
                            onClick={() => handleTabChange(option.value)}
                        >
                            {activeTab === option.value && (
                                <motion.div
                                    layoutId='active-pill'
                                    className={toggleStyles.activeBg}
                                    transition={{
                                        type: 'spring',
                                        bounce: 0.2,
                                        duration: 0.6,
                                    }}
                                />
                            )}
                            <span
                                className={toggleStyles.label({
                                    active: activeTab === option.value,
                                })}
                            >
                                {option.label}
                            </span>
                        </button>
                    ))}
                </div>

                <div className={tabStyles.container}>
                    {STATUS_OPTIONS.map((option) => (
                        <button
                            key={option.value}
                            className={tabStyles.button({
                                active: activeStatus === option.value,
                            })}
                            onClick={() => handleStatusChange(option.value)}
                        >
                            <span
                                className={tabStyles.label({
                                    active: activeStatus === option.value,
                                })}
                            >
                                {option.label}
                            </span>
                            {activeStatus === option.value && (
                                <motion.div
                                    layoutId='active-underline'
                                    className={tabStyles.underline}
                                    transition={{
                                        type: 'spring',
                                        bounce: 0.2,
                                        duration: 0.6,
                                    }}
                                />
                            )}
                        </button>
                    ))}
                </div>

                <div className={styles.sectionContainer}>
                    {STATUS_OPTIONS.map((option) => {
                        const currentPage =
                            currentPageByStatus[option.value] ??
                            INITIAL_STATUS_PAGE;
                        const visibleCount =
                            currentPage * TIME_SALE_DISPLAY_PAGE_SIZE;
                        const products = productList[option.value];
                        const sectionTotalCount = totalCount[option.value];
                        const canShowMore =
                            sectionTotalCount > TIME_SALE_DISPLAY_PAGE_SIZE &&
                            visibleCount < products.length;

                        const noResultText =
                            option.value === 'today-open'
                                ? '오늘 시작한 타임특가 상품이 없습니다.'
                                : option.value === 'best'
                                  ? '베스트 타임특가 상품이 없습니다.'
                                  : '마감 임박 타임특가 상품이 없습니다.';

                        const visibleProducts = products.slice(0, visibleCount);

                        return (
                            <section
                                key={option.value}
                                id={option.value}
                                className={styles.section}
                            >
                                <Row align='center' justify='between'>
                                    <Column
                                        style={{
                                            gap: isMobile ? '2px' : '4px',
                                        }}
                                    >
                                        <Row
                                            gap={isMobile ? '8px' : '12px'}
                                            align='center'
                                        >
                                            <h2 className={styles.sectionTitle}>
                                                {option.label}
                                            </h2>
                                            {option.showTimer &&
                                                !isEmpty(visibleProducts) && (
                                                    <CountdownTimer />
                                                )}
                                        </Row>

                                        <p
                                            className={
                                                styles.sectionDescription
                                            }
                                        >
                                            {option.description}
                                        </p>
                                    </Column>
                                </Row>

                                {isEmpty(visibleProducts) ? (
                                    <NoResult
                                        text={noResultText}
                                        style={{
                                            height: '120px',
                                        }}
                                    />
                                ) : (
                                    <div
                                        className={styles.productListContainer}
                                    >
                                        {visibleProducts.map((product) => (
                                            <ProductCard
                                                key={product.productNo}
                                                {...product}
                                                imageUrlInfo={
                                                    product.imageUrlInfo as ImageUrlType[]
                                                }
                                                isTimeSaleEnabled
                                            />
                                        ))}
                                    </div>
                                )}

                                {canShowMore && (
                                    <button
                                        type='button'
                                        className={styles.moreButton}
                                        onClick={() =>
                                            handleLoadMore(option.value)
                                        }
                                    >
                                        <ChevronDown
                                            size={isMobile ? 16 : 20}
                                            strokeWidth={1.5}
                                        />{' '}
                                        더보기
                                    </button>
                                )}
                            </section>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default TimeSale;
