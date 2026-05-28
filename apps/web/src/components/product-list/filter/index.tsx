import { RadioGroup } from 'radix-ui';
import { useId, useMemo } from 'react';

import * as styles from '@/components/product-list/filter/index.css';
import { CustomAccordion } from '@/shared/ui/accordion';
import { InputCheckbox } from '@/shared/ui/input/checkbox';
import { InputField } from '@/shared/ui/input/field';
import * as radioStyles from '@/shared/ui/input/radio/index.css';
import { Column, Row } from '@/shared/ui/layout/flex';
import { PRICE_FILTER_OPTIONS } from '@/const/product';
import { useBrandSearchList } from '@/hooks/query/product/brand';
import { useProductSearchSummary } from '@/hooks/query/product/product';
import { useProductFilter } from '@/hooks/useProductFilter';
import type { GetProductSearchSummaryParams } from '@/models/product/product';

export type ProductListFilterProps = {
    categoryNo?: number;
};

export const ProductListFilter = ({
    categoryNo = 0,
}: ProductListFilterProps) => {
    const priceRadioGroupId = useId();
    const deliveryRadioGroupId = useId();
    const {
        pendingFilters,
        appliedSearchParams,
        setPendingFilter,
        applyFilters,
        resetFilters,
    } = useProductFilter({
        categoryNo: categoryNo > 0 ? categoryNo : undefined,
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

    const deliveryRadioOptions = useMemo(
        () => [
            { value: 'FREE', label: '무료배송' },
            { value: 'CONDITIONAL', label: '조건부 무료배송' },
            { value: 'FIXED_FEE', label: '유료배송' },
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
                ...(pendingFilters.deliveryConditionType && {
                    deliveryConditionType: pendingFilters.deliveryConditionType,
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

    return (
        <div className={styles.container}>
            <ul className={styles.filterList}>
                <li>
                    <CustomAccordion
                        type='single'
                        defaultValue={'productInformation'}
                        hideIcon
                        itemClassName={styles.filterAccordionItem}
                        items={[
                            {
                                value: 'productInformation',
                                header: (
                                    <h3 className={styles.filterTitle}>
                                        상품 정보
                                    </h3>
                                ),
                                content: (
                                    <ul className={styles.filterContentList}>
                                        <li>
                                            <RadioGroup.Root
                                                className={
                                                    styles.priceRadioRoot
                                                }
                                                value={
                                                    pendingFilters.deliveryConditionType ??
                                                    ''
                                                }
                                                onValueChange={(value) => {
                                                    setPendingFilter(
                                                        'deliveryConditionType',
                                                        value as
                                                            | 'FREE'
                                                            | 'CONDITIONAL'
                                                            | 'FIXED_FEE',
                                                    );
                                                }}
                                            >
                                                {deliveryRadioOptions.map(
                                                    (option) => {
                                                        const itemId = `${deliveryRadioGroupId}-${option.value}`;

                                                        return (
                                                            <div
                                                                key={
                                                                    option.value
                                                                }
                                                                className={
                                                                    styles.radioContainer
                                                                }
                                                            >
                                                                <label
                                                                    className={
                                                                        styles.filterLabel
                                                                    }
                                                                    htmlFor={
                                                                        itemId
                                                                    }
                                                                >
                                                                    {
                                                                        option.label
                                                                    }
                                                                </label>
                                                                <RadioGroup.Item
                                                                    className={
                                                                        radioStyles.radioItem
                                                                    }
                                                                    id={itemId}
                                                                    value={
                                                                        option.value
                                                                    }
                                                                >
                                                                    <RadioGroup.Indicator
                                                                        className={
                                                                            radioStyles.radioIndicator
                                                                        }
                                                                    />
                                                                </RadioGroup.Item>
                                                            </div>
                                                        );
                                                    },
                                                )}
                                            </RadioGroup.Root>
                                        </li>
                                        <li>
                                            <label
                                                className={styles.filterLabel}
                                            >
                                                세일중
                                                <InputCheckbox
                                                    checked={
                                                        !!pendingFilters.onlySaleProduct
                                                    }
                                                    onCheckedChange={(
                                                        checked,
                                                    ) =>
                                                        setPendingFilter(
                                                            'onlySaleProduct',
                                                            checked
                                                                ? true
                                                                : undefined,
                                                        )
                                                    }
                                                />
                                            </label>
                                        </li>
                                        <li>
                                            <label
                                                className={styles.filterLabel}
                                            >
                                                품절 제외
                                                <InputCheckbox
                                                    checked={
                                                        pendingFilters.soldout ===
                                                        false
                                                    }
                                                    onCheckedChange={(
                                                        checked,
                                                    ) =>
                                                        setPendingFilter(
                                                            'soldout',
                                                            checked
                                                                ? false
                                                                : undefined,
                                                        )
                                                    }
                                                />
                                            </label>
                                        </li>
                                    </ul>
                                ),
                            },
                        ]}
                    />
                </li>

                <li>
                    <CustomAccordion
                        type='single'
                        defaultValue={'price'}
                        hideIcon
                        itemClassName={styles.filterAccordionItem}
                        items={[
                            {
                                value: 'price',
                                header: (
                                    <h3 className={styles.filterTitle}>가격</h3>
                                ),
                                content: (
                                    <div className={styles.filterContentList}>
                                        <RadioGroup.Root
                                            className={styles.priceRadioRoot}
                                            value={
                                                pendingFilters.priceFilterId ??
                                                ''
                                            }
                                            onValueChange={(value) => {
                                                setPendingFilter(
                                                    'priceFilterId',
                                                    value || undefined,
                                                );
                                                if (value !== 'custom') {
                                                    setPendingFilter(
                                                        'priceMin',
                                                        undefined,
                                                    );
                                                    setPendingFilter(
                                                        'priceMax',
                                                        undefined,
                                                    );
                                                }
                                            }}
                                        >
                                            {priceRadioOptions.map((option) => {
                                                const itemId = `${priceRadioGroupId}-${option.value}`;

                                                return (
                                                    <div
                                                        key={option.value}
                                                        className={
                                                            styles.radioContainer
                                                        }
                                                    >
                                                        <label
                                                            className={
                                                                styles.filterLabel
                                                            }
                                                            htmlFor={itemId}
                                                        >
                                                            {option.label}
                                                        </label>
                                                        <RadioGroup.Item
                                                            className={
                                                                radioStyles.radioItem
                                                            }
                                                            id={itemId}
                                                            value={option.value}
                                                        >
                                                            <RadioGroup.Indicator
                                                                className={
                                                                    radioStyles.radioIndicator
                                                                }
                                                            />
                                                        </RadioGroup.Item>
                                                    </div>
                                                );
                                            })}
                                        </RadioGroup.Root>

                                        {pendingFilters.priceFilterId ===
                                            'custom' && (
                                            <Column gap={'xs'}>
                                                <Row
                                                    gap={'xs'}
                                                    align={'center'}
                                                >
                                                    <InputField
                                                        id='price-min'
                                                        type='number'
                                                        placeholder='최소 가격 입력'
                                                        value={
                                                            pendingFilters.priceMin ??
                                                            ''
                                                        }
                                                        onChange={(e) =>
                                                            setPendingFilter(
                                                                'priceMin',
                                                                e.target
                                                                    .value ===
                                                                    ''
                                                                    ? undefined
                                                                    : Number(
                                                                          e
                                                                              .target
                                                                              .value,
                                                                      ),
                                                            )
                                                        }
                                                    />
                                                    <span
                                                        className={
                                                            styles.priceUnit
                                                        }
                                                    >
                                                        원
                                                    </span>
                                                </Row>
                                                <Row
                                                    gap={'xs'}
                                                    align={'center'}
                                                >
                                                    <InputField
                                                        id='price-max'
                                                        type='number'
                                                        placeholder='최대 가격 입력'
                                                        value={
                                                            pendingFilters.priceMax ??
                                                            ''
                                                        }
                                                        onChange={(e) =>
                                                            setPendingFilter(
                                                                'priceMax',
                                                                e.target
                                                                    .value ===
                                                                    ''
                                                                    ? undefined
                                                                    : Number(
                                                                          e
                                                                              .target
                                                                              .value,
                                                                      ),
                                                            )
                                                        }
                                                    />
                                                    <span
                                                        className={
                                                            styles.priceUnit
                                                        }
                                                    >
                                                        원
                                                    </span>
                                                </Row>
                                            </Column>
                                        )}
                                    </div>
                                ),
                            },
                        ]}
                    />
                </li>

                <li>
                    <CustomAccordion
                        type='single'
                        defaultValue={'brands'}
                        hideIcon
                        itemClassName={styles.filterBrandAccordionItem}
                        items={[
                            {
                                value: 'brands',
                                header: (
                                    <h3 className={styles.filterTitle}>
                                        브랜드
                                    </h3>
                                ),
                                content: (
                                    <ul className={styles.filterContentList}>
                                        {brandSearchListData?.map((brand) => {
                                            const brandNo = String(
                                                brand.brandNo,
                                            );
                                            const currentSelectedBrandNos =
                                                pendingFilters.brandNos ?? [];
                                            const isBrandChecked =
                                                currentSelectedBrandNos.includes(
                                                    brandNo,
                                                );
                                            const isBrandDisabled =
                                                !!appliedSummaryData &&
                                                !enabledBrandNos.has(brandNo) &&
                                                !isBrandChecked;

                                            return (
                                                <li key={brand.brandNo}>
                                                    <label
                                                        className={`${
                                                            styles.filterLabel
                                                        } ${
                                                            isBrandDisabled
                                                                ? styles.disabledFilterLabel
                                                                : ''
                                                        }`}
                                                    >
                                                        {brand.mainBrandName}
                                                        <InputCheckbox
                                                            checked={
                                                                isBrandChecked
                                                            }
                                                            disabled={
                                                                isBrandDisabled
                                                            }
                                                            onCheckedChange={(
                                                                checked,
                                                            ) => {
                                                                const next =
                                                                    checked
                                                                        ? [
                                                                              ...new Set(
                                                                                  [
                                                                                      ...currentSelectedBrandNos,
                                                                                      brandNo,
                                                                                  ],
                                                                              ),
                                                                          ]
                                                                        : currentSelectedBrandNos.filter(
                                                                              (
                                                                                  item,
                                                                              ) =>
                                                                                  item !==
                                                                                  brandNo,
                                                                          );

                                                                setPendingFilter(
                                                                    'brandNos',
                                                                    next.length >
                                                                        0
                                                                        ? next
                                                                        : undefined,
                                                                );
                                                            }}
                                                        />
                                                    </label>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                ),
                            },
                        ]}
                    />
                </li>
            </ul>

            <Column gap={'xs'}>
                <button className={styles.resetButton} onClick={resetFilters}>
                    초기화
                </button>
                <button
                    className={styles.registerButton}
                    onClick={() => applyFilters()}
                >
                    {pendingTotalCount}개의 상품 보기
                </button>
            </Column>
        </div>
    );
};
