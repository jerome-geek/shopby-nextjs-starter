import { ChevronDown, RotateCcw, X } from 'lucide-react';
import { useRouter } from 'next/router';
import { overlay } from 'overlay-kit';
import type { ParsedUrlQueryInput } from 'querystring';
import { useLayoutEffect, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';

import {
    FilterBottomSheet,
    type FilterBottomSheetTab,
} from '@/components/bottom-sheet/filter';
import { SortBottomSheet } from '@/components/bottom-sheet/sort';
import * as styles from '@/features/product/list/mobile-filter/index.css';
import { PRICE_FILTER_OPTIONS, SORT_OPTIONS } from '@/const/product';
import { useBrandSearchList } from '@/hooks/query/product/brand';
import { useProductFilter } from '@/hooks/useProductFilter';
import { vars } from '@/styles/theme.css';

export type MobileFilterProps = {
    categoryNo?: number;
};

const DEFAULT_SORT_OPTION_ID = SORT_OPTIONS[0].id;
const DELIVERY_FILTER_LABELS = {
    FREE: '무료배송',
    CONDITIONAL: '조건부 무료배송',
    FIXED_FEE: '유료배송',
} as const;

export const MobileFilter = ({ categoryNo }: MobileFilterProps) => {
    const { t } = useTranslation();
    const router = useRouter();
    const swiperRef = useRef<SwiperType | null>(null);

    const { appliedSearchParams, appliedFilters, resetFilters } =
        useProductFilter({
            categoryNo:
                categoryNo != null && categoryNo > 0 ? categoryNo : undefined,
        });

    const { data: brandSearchListData } = useBrandSearchList({
        searchParams: {
            sortCriterion: 'BRAND_NAME',
            sortDirection: 'ASC',
            pageSize: 100,
        },
    });

    const selectedSortOption = useMemo(() => {
        const by = appliedSearchParams.order?.by;
        const direction = appliedSearchParams.order?.direction;
        return (
            SORT_OPTIONS.find(
                (option) => option.by === by && option.direction === direction,
            ) ?? SORT_OPTIONS[0]
        );
    }, [appliedSearchParams.order?.by, appliedSearchParams.order?.direction]);

    const sortLabel = t(selectedSortOption.name);
    const sortActive = selectedSortOption.id !== DEFAULT_SORT_OPTION_ID;

    const productInfoLabel = useMemo(() => {
        const parts: string[] = [];
        if (appliedFilters.deliveryConditionType) {
            parts.push(
                DELIVERY_FILTER_LABELS[appliedFilters.deliveryConditionType],
            );
        }
        if (appliedFilters.onlySaleProduct) {
            parts.push('세일중');
        }
        if (appliedFilters.soldout === false) {
            parts.push('품절 제외');
        }
        return parts.length > 0 ? parts.join(', ') : '상품 정보';
    }, [appliedFilters]);

    const productInfoActive =
        !!appliedFilters.deliveryConditionType ||
        !!appliedFilters.onlySaleProduct ||
        appliedFilters.soldout === false;

    const priceLabel = useMemo(() => {
        if (!appliedFilters.priceFilterId) {
            return '가격';
        }
        if (appliedFilters.priceFilterId === 'custom') {
            return '직접 선택';
        }
        return (
            PRICE_FILTER_OPTIONS.find(
                (o) => o.id === appliedFilters.priceFilterId,
            )?.name ?? '가격'
        );
    }, [appliedFilters.priceFilterId]);

    const priceActive = !!appliedFilters.priceFilterId;

    const brandLabel = useMemo(() => {
        const nos = appliedFilters.brandNos;
        if (!nos?.length) {
            return '브랜드';
        }
        const names = nos.map(
            (no) =>
                brandSearchListData?.find((b) => String(b.brandNo) === no)
                    ?.mainBrandName ?? no,
        );
        return names.join(', ');
    }, [appliedFilters.brandNos, brandSearchListData]);

    const brandActive = !!appliedFilters.brandNos?.length;

    const hasAppliedFilters =
        sortActive || productInfoActive || priceActive || brandActive;

    useLayoutEffect(() => {
        const swiper = swiperRef.current;
        if (!swiper) {
            return;
        }

        let cancelled = false;
        const moveToStart = () => {
            if (cancelled || swiperRef.current !== swiper || swiper.destroyed) {
                return;
            }
            swiper.update();
            swiper.slideTo(0, 0);
        };

        moveToStart();

        const rafId = window.requestAnimationFrame(moveToStart);
        const timeoutId = window.setTimeout(moveToStart, 80);

        return () => {
            cancelled = true;
            window.cancelAnimationFrame(rafId);
            window.clearTimeout(timeoutId);
        };
    }, [
        selectedSortOption.id,
        sortLabel,
        productInfoLabel,
        priceLabel,
        brandLabel,
        hasAppliedFilters,
    ]);

    const replaceQuery = (mutate: (q: ParsedUrlQueryInput) => void) => {
        const nextQuery: ParsedUrlQueryInput = { ...router.query };
        mutate(nextQuery);
        nextQuery.pageNumber = '1';
        void router.replace(
            { pathname: router.pathname, query: nextQuery },
            undefined,
            { shallow: true },
        );
    };

    const clearProductInfo = () => {
        replaceQuery((q) => {
            delete q.deliveryConditionType;
            delete q.onlySaleProduct;
            delete q.soldout;
        });
    };

    const clearPrice = () => {
        replaceQuery((q) => {
            delete q.priceFilterId;
            delete q.priceMin;
            delete q.priceMax;
        });
    };

    const clearBrands = () => {
        replaceQuery((q) => {
            delete q.brandNos;
        });
    };

    const openSortBottomSheet = () => {
        overlay.open((props) => (
            <SortBottomSheet
                {...props}
                queryOptions={SORT_OPTIONS}
                selectedQueryOption={selectedSortOption}
                onQueryChange={(option) => {
                    const sortOption = SORT_OPTIONS.find(
                        (item) => item.id === option.id,
                    );
                    if (!sortOption) {
                        return;
                    }
                    void router.replace(
                        {
                            pathname: router.pathname,
                            query: {
                                ...router.query,
                                pageNumber: '1',
                                by: sortOption.by,
                                direction: sortOption.direction,
                            },
                        },
                        undefined,
                        { shallow: true },
                    );
                }}
            />
        ));
    };

    const openFilterBottomSheet = (initialTab: FilterBottomSheetTab) => {
        overlay.open((props) => (
            <FilterBottomSheet
                key={initialTab}
                {...props}
                initialTab={initialTab}
                categoryNo={categoryNo}
            />
        ));
    };

    return (
        <Swiper
            className={styles.filterSwiper}
            spaceBetween={4}
            slidesPerView={'auto'}
            slidesOffsetBefore={20}
            slidesOffsetAfter={20}
            watchOverflow
            observer
            observeParents
            onSwiper={(swiper) => {
                swiperRef.current = swiper;
            }}
        >
            {hasAppliedFilters && (
                <SwiperSlide style={{ width: 'auto' }}>
                    <div className={styles.refreshButton}>
                        <button
                            type='button'
                            className={styles.refreshButton}
                            aria-label='필터 초기화'
                            onClick={resetFilters}
                        >
                            <RotateCcw
                                size={16}
                                strokeWidth={1.5}
                                color={vars.color.gray['80']}
                            />
                        </button>
                    </div>
                </SwiperSlide>
            )}

            <SwiperSlide style={{ width: 'auto' }}>
                <div className={styles.filterPill()}>
                    <button
                        type='button'
                        className={styles.filterPillMain}
                        onClick={openSortBottomSheet}
                    >
                        <span className={styles.filterPillLabel}>
                            {sortLabel}
                        </span>
                    </button>
                    <div className={styles.filterPillTrailing}>
                        <ChevronDown size={16} strokeWidth={1.5} />
                    </div>
                </div>
            </SwiperSlide>
            <SwiperSlide style={{ width: 'auto' }}>
                <div
                    className={styles.filterPill({
                        isActive: productInfoActive,
                    })}
                >
                    <button
                        type='button'
                        className={styles.filterPillMain}
                        onClick={() => openFilterBottomSheet('productInfo')}
                    >
                        <span className={styles.filterPillLabel}>
                            {productInfoLabel}
                        </span>
                    </button>
                    <div className={styles.filterPillTrailing}>
                        {productInfoActive ? (
                            <button
                                type='button'
                                className={styles.filterPillClear}
                                aria-label={t('상품 정보 필터 해제')}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    clearProductInfo();
                                }}
                            >
                                <X size={16} strokeWidth={1.5} />
                            </button>
                        ) : (
                            <ChevronDown size={16} strokeWidth={1.5} />
                        )}
                    </div>
                </div>
            </SwiperSlide>
            <SwiperSlide style={{ width: 'auto' }}>
                <div className={styles.filterPill({ isActive: priceActive })}>
                    <button
                        type='button'
                        className={styles.filterPillMain}
                        onClick={() => openFilterBottomSheet('price')}
                    >
                        <span className={styles.filterPillLabel}>
                            {priceLabel}
                        </span>
                    </button>
                    <div className={styles.filterPillTrailing}>
                        {priceActive ? (
                            <button
                                type='button'
                                className={styles.filterPillClear}
                                aria-label='가격 필터 해제'
                                onClick={(e) => {
                                    e.stopPropagation();
                                    clearPrice();
                                }}
                            >
                                <X size={16} strokeWidth={1.5} />
                            </button>
                        ) : (
                            <ChevronDown size={16} strokeWidth={1.5} />
                        )}
                    </div>
                </div>
            </SwiperSlide>
            <SwiperSlide style={{ width: 'auto' }}>
                <div className={styles.filterPill({ isActive: brandActive })}>
                    <button
                        type='button'
                        className={styles.filterPillMain}
                        onClick={() => openFilterBottomSheet('brands')}
                    >
                        <span className={styles.filterPillLabel}>
                            {brandLabel}
                        </span>
                    </button>
                    <div className={styles.filterPillTrailing}>
                        {brandActive ? (
                            <button
                                type='button'
                                className={styles.filterPillClear}
                                aria-label='브랜드 필터 해제'
                                onClick={(e) => {
                                    e.stopPropagation();
                                    clearBrands();
                                }}
                            >
                                <X size={16} strokeWidth={1.5} />
                            </button>
                        ) : (
                            <ChevronDown size={16} strokeWidth={1.5} />
                        )}
                    </div>
                </div>
            </SwiperSlide>
        </Swiper>
    );
};
