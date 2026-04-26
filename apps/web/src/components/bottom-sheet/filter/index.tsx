import { clsx } from 'clsx';
import { X } from 'lucide-react';
import { RadioGroup } from 'radix-ui';
import { useId, useMemo, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import * as styles from '@/components/bottom-sheet/filter/index.css';
import {
    BottomSheetLayout,
    type DefaultModalLayoutProps,
} from '@/components/layout';
import { Button } from '@/components/ui';
import { InputField } from '@/components/ui/input/field';
import { Column, Row } from '@/components/ui/layout/flex';
import { PRICE_FILTER_OPTIONS } from '@/const/product';
import { useBrandSearchList } from '@/hooks/query/product/brand';
import { useProductSearchSummary } from '@/hooks/query/product/product';
import { useProductFilter } from '@/hooks/useProductFilter';
import type { GetProductSearchSummaryParams } from '@/models/product/product';
import 'swiper/css';

export type FilterBottomSheetTab = 'productInfo' | 'price' | 'brands';

export interface FilterBottomSheetProps extends DefaultModalLayoutProps {
    /** 열 때 보여줄 탭 (모바일 필터 칩과 동일한 이름) */
    initialTab: FilterBottomSheetTab;
    categoryNo?: number;
    keywords?: string;
    brandNos?: string[];
}

const TAB_LIST: { type: FilterBottomSheetTab; label: string }[] = [
    { type: 'productInfo', label: '상품 정보' },
    { type: 'price', label: '가격' },
    { type: 'brands', label: '브랜드' },
];

export const FilterBottomSheet = ({
    isOpen,
    close,
    unmount,
    initialTab,
    categoryNo = 0,
    keywords,
    brandNos,
}: FilterBottomSheetProps) => {
    const priceRadioGroupId = useId();
    const [activeTab, setActiveTab] = useState<FilterBottomSheetTab>(() =>
        TAB_LIST.some((t) => t.type === initialTab)
            ? initialTab
            : 'productInfo',
    );

    const {
        pendingFilters,
        appliedSearchParams,
        setPendingFilter,
        applyFilters,
        resetFilters,
    } = useProductFilter({
        categoryNo: categoryNo > 0 ? categoryNo : undefined,
        keywords,
        brandNos,
    });

    const priceRadioOptions = useMemo(
        () => [
            ...PRICE_FILTER_OPTIONS.map((option) => ({
                value: option.id,
                label: option.name,
            })),
            { value: 'custom', label: '직접 선택' },
        ],
        [],
    );

    const pendingSummaryParams = useMemo<GetProductSearchSummaryParams>(() => {
        const priceOption =
            pendingFilters.priceFilterId &&
            pendingFilters.priceFilterId !== 'custom'
                ? PRICE_FILTER_OPTIONS.find(
                      (option) => option.id === pendingFilters.priceFilterId,
                  )
                : undefined;
        const useCustomPrice =
            pendingFilters.priceFilterId === 'custom' &&
            pendingFilters.priceMin != null &&
            pendingFilters.priceMax != null &&
            !Number.isNaN(pendingFilters.priceMin) &&
            !Number.isNaN(pendingFilters.priceMax);

        return {
            ...(categoryNo > 0 && { categoryNos: [categoryNo] }),
            filter: {
                soldout: pendingFilters.soldout ?? true,
                ...(appliedSearchParams.filter?.keywords && {
                    keywords: appliedSearchParams.filter.keywords,
                }),
                ...(pendingFilters.deliveryConditionType === 'FREE' && {
                    deliveryConditionType: 'FREE' as const,
                }),
                ...(priceOption?.discountedComparison &&
                    priceOption.discountedPrices && {
                        discountedComparison: priceOption.discountedComparison,
                        discountedPrices: priceOption.discountedPrices,
                    }),
                ...(useCustomPrice && {
                    discountedComparison: 'BETWEEN' as const,
                    discountedPrices: [
                        pendingFilters.priceMin!,
                        pendingFilters.priceMax!,
                    ],
                }),
            },
            ...(pendingFilters.onlySaleProduct && {
                onlySaleProduct: true,
            }),
            ...(pendingFilters.brandNos?.length && {
                brandNos: pendingFilters.brandNos,
            }),
        };
    }, [appliedSearchParams.filter, pendingFilters, categoryNo]);

    const appliedSummaryParams = useMemo<GetProductSearchSummaryParams>(
        () => ({
            filter: appliedSearchParams.filter,
            categoryNos: appliedSearchParams.categoryNos,
            excludeCategoryNos: appliedSearchParams.excludeCategoryNos,
            categoryOperator: appliedSearchParams.categoryOperator,
            brandNos: appliedSearchParams.brandNos,
            partnerNos: appliedSearchParams.partnerNos,
            onlySaleProduct: appliedSearchParams.onlySaleProduct,
            shippingAreaType: appliedSearchParams.shippingAreaType,
        }),
        [appliedSearchParams],
    );

    const { data: pendingSummaryData } = useProductSearchSummary({
        searchParams: pendingSummaryParams,
        options: {
            enabled: categoryNo > 0,
        },
    });
    const { data: appliedSummaryData } = useProductSearchSummary({
        searchParams: appliedSummaryParams,
        options: {
            enabled: categoryNo > 0,
        },
    });
    const pendingTotalCount = pendingSummaryData?.totalCount ?? 0;

    const enabledBrandNos = useMemo(
        () =>
            new Set(
                appliedSummaryData?.brands?.map((brand) =>
                    String(brand.brandNo),
                ) ?? [],
            ),
        [appliedSummaryData?.brands],
    );

    const { data: brandSearchListData } = useBrandSearchList({
        searchParams: {
            sortCriterion: 'BRAND_NAME',
            sortDirection: 'ASC',
        },
    });

    const initialSlideIndex = Math.max(
        0,
        TAB_LIST.findIndex((tab) => tab.type === initialTab),
    );

    const hasSelectedFilters = useMemo(() => {
        if (pendingFilters.deliveryConditionType === 'FREE') {
            return true;
        }
        if (pendingFilters.onlySaleProduct) {
            return true;
        }
        if (pendingFilters.soldout === false) {
            return true;
        }
        if (pendingFilters.priceFilterId) {
            if (pendingFilters.priceFilterId === 'custom') {
                return (
                    pendingFilters.priceMin != null &&
                    pendingFilters.priceMax != null
                );
            }
            return true;
        }
        if (pendingFilters.brandNos && pendingFilters.brandNos.length > 0) {
            return true;
        }
        return false;
    }, [pendingFilters]);

    const handleApply = () => {
        applyFilters();
        close();
    };

    return (
        <BottomSheetLayout
            isOpen={isOpen}
            close={close}
            unmount={unmount}
            footerButtonList={[
                <Button
                    key='filter-reset'
                    frame='outlined'
                    className={styles.resetButton}
                    onClick={resetFilters}
                >
                    초기화
                </Button>,
                <Button
                    key='filter-apply'
                    frame='solid'
                    variant='primary'
                    className={styles.registerButton}
                    onClick={handleApply}
                >
                    {pendingTotalCount}개 상품 보기
                </Button>,
            ]}
        >
            <div className={styles.container}>
                <div className={styles.swiperContainer}>
                    <Swiper
                        slidesPerView='auto'
                        spaceBetween={12}
                        watchOverflow
                        initialSlide={initialSlideIndex}
                    >
                        {TAB_LIST.map((tab) => (
                            <SwiperSlide key={tab.type}>
                                <button
                                    className={styles.tabButton}
                                    data-selected={
                                        activeTab === tab.type
                                            ? true
                                            : undefined
                                    }
                                    onClick={() => setActiveTab(tab.type)}
                                >
                                    {tab.label}
                                </button>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                <div className={styles.filterScrollArea} data-lenis-prevent>
                    {activeTab === 'productInfo' && (
                        <div className={styles.chipWrap}>
                            <button
                                className={styles.filterChip}
                                aria-pressed={
                                    pendingFilters.deliveryConditionType ===
                                    'FREE'
                                }
                                onClick={() =>
                                    setPendingFilter(
                                        'deliveryConditionType',
                                        pendingFilters.deliveryConditionType ===
                                            'FREE'
                                            ? undefined
                                            : 'FREE',
                                    )
                                }
                            >
                                무료배송
                            </button>
                            <button className={styles.filterChip} disabled>
                                빠른배송
                            </button>
                            <button
                                className={styles.filterChip}
                                aria-pressed={!!pendingFilters.onlySaleProduct}
                                onClick={() =>
                                    setPendingFilter(
                                        'onlySaleProduct',
                                        pendingFilters.onlySaleProduct
                                            ? undefined
                                            : true,
                                    )
                                }
                            >
                                세일중
                            </button>
                            <button
                                className={styles.filterChip}
                                aria-pressed={pendingFilters.soldout === false}
                                onClick={() =>
                                    setPendingFilter(
                                        'soldout',
                                        pendingFilters.soldout === false
                                            ? undefined
                                            : false,
                                    )
                                }
                            >
                                품절 제외
                            </button>
                        </div>
                    )}

                    {activeTab === 'price' && (
                        <Column style={{ gap: '20px' }}>
                            <RadioGroup.Root
                                className={styles.chipWrap}
                                value={pendingFilters.priceFilterId ?? ''}
                                onValueChange={(value) => {
                                    setPendingFilter(
                                        'priceFilterId',
                                        value || undefined,
                                    );
                                    if (value !== 'custom') {
                                        setPendingFilter('priceMin', undefined);
                                        setPendingFilter('priceMax', undefined);
                                    }
                                }}
                            >
                                {priceRadioOptions.map((option) => (
                                    <RadioGroup.Item
                                        key={option.value}
                                        className={styles.filterChip}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </RadioGroup.Item>
                                ))}
                            </RadioGroup.Root>

                            {pendingFilters.priceFilterId === 'custom' && (
                                <Column
                                    gap={'xs'}
                                    style={{ maxWidth: '247px' }}
                                >
                                    <Row gap={'xs'} align={'center'}>
                                        <div
                                            className={
                                                styles.customPriceFieldWrap
                                            }
                                        >
                                            <InputField
                                                id={`${priceRadioGroupId}-min`}
                                                type='number'
                                                className={
                                                    styles.customPriceField
                                                }
                                                placeholder='최소 가격 입력'
                                                value={
                                                    pendingFilters.priceMin ??
                                                    ''
                                                }
                                                onChange={(e) =>
                                                    setPendingFilter(
                                                        'priceMin',
                                                        e.target.value === ''
                                                            ? undefined
                                                            : Number(
                                                                  e.target
                                                                      .value,
                                                              ),
                                                    )
                                                }
                                            />
                                            <span
                                                className={
                                                    styles.customPriceUnit
                                                }
                                            >
                                                원
                                            </span>
                                        </div>
                                    </Row>
                                    <Row gap={'xs'} align={'center'}>
                                        <div
                                            className={
                                                styles.customPriceFieldWrap
                                            }
                                        >
                                            <InputField
                                                id={`${priceRadioGroupId}-max`}
                                                type='number'
                                                className={
                                                    styles.customPriceField
                                                }
                                                placeholder='최대 가격 입력'
                                                value={
                                                    pendingFilters.priceMax ??
                                                    ''
                                                }
                                                onChange={(e) =>
                                                    setPendingFilter(
                                                        'priceMax',
                                                        e.target.value === ''
                                                            ? undefined
                                                            : Number(
                                                                  e.target
                                                                      .value,
                                                              ),
                                                    )
                                                }
                                            />
                                            <span
                                                className={
                                                    styles.customPriceUnit
                                                }
                                            >
                                                원
                                            </span>
                                        </div>
                                    </Row>
                                </Column>
                            )}
                        </Column>
                    )}

                    {activeTab === 'brands' && (
                        <div
                            className={clsx(
                                styles.chipWrap,
                                styles.brandChipScroll,
                            )}
                            data-lenis-prevent
                        >
                            {brandSearchListData?.map((brand) => {
                                const brandNo = String(brand.brandNo);
                                const currentSelectedBrandNos =
                                    pendingFilters.brandNos ?? [];
                                const isBrandChecked =
                                    currentSelectedBrandNos.includes(brandNo);
                                const isBrandDisabled =
                                    !!appliedSummaryData &&
                                    !enabledBrandNos.has(brandNo) &&
                                    !isBrandChecked;

                                return (
                                    <button
                                        key={brand.brandNo}
                                        className={styles.filterChip}
                                        aria-pressed={isBrandChecked}
                                        disabled={isBrandDisabled}
                                        onClick={() => {
                                            const next = isBrandChecked
                                                ? currentSelectedBrandNos.filter(
                                                      (item) =>
                                                          item !== brandNo,
                                                  )
                                                : [
                                                      ...new Set([
                                                          ...currentSelectedBrandNos,
                                                          brandNo,
                                                      ]),
                                                  ];
                                            setPendingFilter(
                                                'brandNos',
                                                next.length > 0
                                                    ? next
                                                    : undefined,
                                            );
                                        }}
                                    >
                                        {brand.mainBrandName}
                                    </button>
                                );
                            })}
                        </div>
                    )}
                </div>

                {hasSelectedFilters && (
                    <div className={styles.selectedFilterContainer}>
                        <Swiper
                            slidesPerView='auto'
                            spaceBetween={4}
                            watchOverflow
                        >
                            {pendingFilters.deliveryConditionType ===
                                'FREE' && (
                                <SwiperSlide style={{ width: 'auto' }}>
                                    <button
                                        className={styles.selectedFilterButton}
                                        onClick={() =>
                                            setPendingFilter(
                                                'deliveryConditionType',
                                                undefined,
                                            )
                                        }
                                    >
                                        <span>무료배송</span>
                                        <span>
                                            <X size={16} strokeWidth={1.5} />
                                        </span>
                                    </button>
                                </SwiperSlide>
                            )}
                            {pendingFilters.onlySaleProduct && (
                                <SwiperSlide style={{ width: 'auto' }}>
                                    <button
                                        className={styles.selectedFilterButton}
                                        onClick={() =>
                                            setPendingFilter(
                                                'onlySaleProduct',
                                                undefined,
                                            )
                                        }
                                    >
                                        <span>세일중</span>
                                        <span>
                                            <X size={14} strokeWidth={1.5} />
                                        </span>
                                    </button>
                                </SwiperSlide>
                            )}
                            {pendingFilters.soldout === false && (
                                <SwiperSlide style={{ width: 'auto' }}>
                                    <button
                                        className={styles.selectedFilterButton}
                                        onClick={() =>
                                            setPendingFilter(
                                                'soldout',
                                                undefined,
                                            )
                                        }
                                    >
                                        <span>품절 제외</span>
                                        <span>
                                            <X size={14} strokeWidth={1.5} />
                                        </span>
                                    </button>
                                </SwiperSlide>
                            )}
                            {pendingFilters.priceFilterId &&
                                pendingFilters.priceFilterId !== 'custom' && (
                                    <SwiperSlide style={{ width: 'auto' }}>
                                        <button
                                            className={
                                                styles.selectedFilterButton
                                            }
                                            onClick={() => {
                                                setPendingFilter(
                                                    'priceFilterId',
                                                    undefined,
                                                );
                                                setPendingFilter(
                                                    'priceMin',
                                                    undefined,
                                                );
                                                setPendingFilter(
                                                    'priceMax',
                                                    undefined,
                                                );
                                            }}
                                        >
                                            <span>
                                                {PRICE_FILTER_OPTIONS.find(
                                                    (o) =>
                                                        o.id ===
                                                        pendingFilters.priceFilterId,
                                                )?.name ?? ''}
                                            </span>
                                            <span>
                                                <X
                                                    size={14}
                                                    strokeWidth={1.5}
                                                />
                                            </span>
                                        </button>
                                    </SwiperSlide>
                                )}
                            {pendingFilters.priceFilterId === 'custom' &&
                                pendingFilters.priceMin != null &&
                                pendingFilters.priceMax != null && (
                                    <SwiperSlide style={{ width: 'auto' }}>
                                        <button
                                            className={
                                                styles.selectedFilterButton
                                            }
                                            onClick={() => {
                                                setPendingFilter(
                                                    'priceFilterId',
                                                    undefined,
                                                );
                                                setPendingFilter(
                                                    'priceMin',
                                                    undefined,
                                                );
                                                setPendingFilter(
                                                    'priceMax',
                                                    undefined,
                                                );
                                            }}
                                        >
                                            <span>직접 선택</span>
                                            <span>
                                                <X
                                                    size={14}
                                                    strokeWidth={1.5}
                                                />
                                            </span>
                                        </button>
                                    </SwiperSlide>
                                )}
                            {pendingFilters.brandNos?.map((brandNo) => {
                                const brandLabel =
                                    brandSearchListData?.find(
                                        (b) => String(b.brandNo) === brandNo,
                                    )?.mainBrandName ?? brandNo;

                                return (
                                    <SwiperSlide
                                        key={brandNo}
                                        style={{ width: 'auto' }}
                                    >
                                        <button
                                            className={
                                                styles.selectedFilterButton
                                            }
                                            onClick={() => {
                                                const next = (
                                                    pendingFilters.brandNos ??
                                                    []
                                                ).filter((n) => n !== brandNo);
                                                setPendingFilter(
                                                    'brandNos',
                                                    next.length > 0
                                                        ? next
                                                        : undefined,
                                                );
                                            }}
                                        >
                                            <span>{brandLabel}</span>
                                            <span>
                                                <X
                                                    size={14}
                                                    strokeWidth={1.5}
                                                />
                                            </span>
                                        </button>
                                    </SwiperSlide>
                                );
                            })}
                        </Swiper>
                    </div>
                )}
            </div>
        </BottomSheetLayout>
    );
};
