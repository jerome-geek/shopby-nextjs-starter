import { isEmpty } from '@fxts/core';
import { clsx } from 'clsx';
import { Search } from 'lucide-react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import LoadingWrapper from '@/components/common/loading-wrapper';
import { NoResult } from '@/components/common/no-result';
import { ObserverTarget } from '@/components/common/observer-target';
import * as styles from '@/components/layer-contents/product-select/index.css';
import { type DefaultModalLayoutProps } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Select, InputField } from '@/components/ui/input';
import {
    useCategoriesByCode,
    useCategory,
} from '@/hooks/query/display/category';
import useInfiniteProductList from '@/hooks/infiniteQuery/product/product/useInfiniteProductList';
import type { MultiLevelCategory } from '@/models/display';
import type {
    ProductSearchParams,
    SearchProductItem,
} from '@/models/product/product';
import { CURRENCY } from '@/utils/currency';

type SearchType = 'keywords' | 'includeMallProductNo';

interface FormProductSearchParams {
    keywords: string;
    includeMallProductNo?: number;
    categoryNo?: number;
    searchType: SearchType;
}

interface ProductSelectProps extends DefaultModalLayoutProps {
    setProductInfo: (productInfo: SearchProductItem) => void;
}

export const ProductSelect = ({
    setProductInfo,
    ...props
}: ProductSelectProps) => {
    const { t } = useTranslation();

    const { close } = props;

    const { register, handleSubmit, control } =
        useForm<FormProductSearchParams>({
            defaultValues: {
                keywords: '',
                searchType: 'keywords',
            },
        });

    const { data: categoriesByCodeData } = useCategoriesByCode({
        data: { codes: ['MAIN'] },
    });

    const mainCategoryNo = categoriesByCodeData?.[0]?.displayCategoryNo ?? 0;

    const { data: categoryData } = useCategory({
        categoryNo: mainCategoryNo,
    });

    const [selectedCategoryPath, setSelectedCategoryPath] = useState<
        (number | undefined)[]
    >([undefined, undefined, undefined, undefined]);

    const oneDepthCategoryList = useMemo(
        () => categoryData?.multiLevelCategories?.[0]?.children ?? [],
        [categoryData],
    );

    const getChildrenByNo = useCallback(
        (list: MultiLevelCategory[], no?: number) => {
            if (!no) {
                return [];
            }
            return list.find((c) => c.categoryNo === no)?.children ?? [];
        },
        [],
    );

    const oneDepth = oneDepthCategoryList;
    const twoDepth = useMemo(
        () => getChildrenByNo(oneDepth, selectedCategoryPath[0]),
        [getChildrenByNo, oneDepth, selectedCategoryPath],
    );
    const threeDepth = useMemo(
        () => getChildrenByNo(twoDepth, selectedCategoryPath[1]),
        [getChildrenByNo, twoDepth, selectedCategoryPath],
    );
    const fourDepth = useMemo(
        () => getChildrenByNo(threeDepth, selectedCategoryPath[2]),
        [getChildrenByNo, threeDepth, selectedCategoryPath],
    );

    const categoryLevelList = useMemo(
        () => [oneDepth, twoDepth, threeDepth, fourDepth],
        [oneDepth, twoDepth, threeDepth, fourDepth],
    );

    const [committedSearch, setCommittedSearch] = useState<{
        categoryNo?: number;
        keywords?: string;
    }>({});

    const searchParams: ProductSearchParams = useMemo(
        () => ({
            filter: {
                keywords: committedSearch.keywords,
                saleStatus: 'ALL_CONDITIONS',
                soldout: true,
                totalReviewCount: true,
            },
            order: { by: 'POPULAR', direction: 'DESC' },
            pageSize: 10,
            pageNumber: 1,
            categoryNos: committedSearch.categoryNo
                ? [committedSearch.categoryNo]
                : undefined,
        }),
        [committedSearch.categoryNo, committedSearch.keywords],
    );

    const isSearchEnabled = Boolean(committedSearch.categoryNo);

    const {
        data: infiniteProductListData,
        isLoading: isInfiniteProductListLoading,
        hasNextPage,
        fetchNextPage,
    } = useInfiniteProductList({
        searchParams,
        options: {
            enabled: isSearchEnabled,
        },
    });

    const productList = useMemo(() => {
        return (
            infiniteProductListData?.pages?.flatMap(
                (page) => page.data.items,
            ) ?? []
        );
    }, [infiniteProductListData]);

    const totalCount = useMemo(() => {
        return infiniteProductListData?.pages?.[0]?.data.totalCount ?? 0;
    }, [infiniteProductListData]);

    const [selectedProduct, setSelectedProduct] =
        useState<SearchProductItem | null>(null);

    useEffect(() => {
        const submitButton = document.getElementById(
            'product-select-submit-button',
        ) as HTMLButtonElement | null;

        if (!submitButton) {
            return;
        }

        submitButton.textContent = selectedProduct
            ? t('선택')
            : t('상품을 선택해 주세요.');
        submitButton.disabled = !selectedProduct;
    }, [selectedProduct, t]);

    const onSubmit = () => {
        if (!selectedProduct) {
            return;
        }

        setProductInfo(selectedProduct);
        close?.();
    };

    const onSearchSubmit = (data: FormProductSearchParams) => {
        setSelectedProduct(null);

        setCommittedSearch({
            categoryNo: data.categoryNo,
            keywords: data.keywords,
        });
    };

    return (
        <div className={styles.container} data-lenis-prevent>
            <form
                className={styles.searchForm}
                onSubmit={handleSubmit(onSearchSubmit)}
            >
                <Controller
                    control={control}
                    name='categoryNo'
                    rules={{ required: t('카테고리를 선택해 주세요.') }}
                    render={({ field: { onChange } }) => (
                        <div className={styles.categoryGrid}>
                            {categoryLevelList.map((category, index) => {
                                const selectedNo = selectedCategoryPath[index];
                                const options = category.map((c) => ({
                                    value: c.categoryNo,
                                    label: c.label,
                                    children: c.children,
                                }));
                                const selected =
                                    options.find(
                                        (o) => o.value === selectedNo,
                                    ) ?? null;

                                return (
                                    <Select
                                        key={index}
                                        placeholder={t('{{order}}차 카테고리', {
                                            order: index + 1,
                                        })}
                                        options={options}
                                        value={selected}
                                        onChange={(opt) => {
                                            if (!opt) {
                                                return;
                                            }
                                            onChange(opt.value);

                                            setSelectedCategoryPath((prev) =>
                                                prev.map((value, i) =>
                                                    i < index
                                                        ? value
                                                        : i === index
                                                          ? opt.value
                                                          : undefined,
                                                ),
                                            );
                                        }}
                                    />
                                );
                            })}
                        </div>
                    )}
                />

                <div className={styles.searchRow}>
                    <InputField
                        className={styles.searchInput}
                        placeholder={t('검색어 입력')}
                        type={'text'}
                        maxLength={50}
                        {...register('keywords')}
                    />

                    <button className={styles.searchButton} type='submit'>
                        <Search size={18} />
                    </button>
                </div>
            </form>

            <div className={styles.totalCount}>
                <span>{t('총')}</span>
                <span className={styles.totalCountEm}>
                    {t('{{count}}', { count: totalCount })}
                </span>
                <span>{t('건')}</span>
            </div>

            <LoadingWrapper isLoading={isInfiniteProductListLoading}>
                {isEmpty(productList) ? (
                    <NoResult
                        text={t(
                            committedSearch.keywords
                                ? '상품 목록이 없습니다.'
                                : '검색어를 입력해 주세요.',
                        )}
                    />
                ) : (
                    <ul className={styles.productList}>
                        {productList.map((p) => {
                            const price = CURRENCY(p.salePrice, {
                                precision: 0,
                            })
                                .subtract(p.immediateDiscountAmt)
                                .subtract(p.additionDiscountAmt)
                                .format();

                            return (
                                <li
                                    key={p.productNo}
                                    className={clsx(
                                        styles.productItem,
                                        selectedProduct?.productNo ===
                                            p.productNo &&
                                            styles.productItemSelected,
                                    )}
                                >
                                    <div className={styles.imageWrap}>
                                        <img
                                            src={p.imageUrls?.[0] ?? ''}
                                            alt={p.productName}
                                            className={styles.productImg}
                                        />
                                    </div>

                                    <div className={styles.productBody}>
                                        <p className={styles.productName}>
                                            {p.productName}
                                        </p>

                                        <p className={styles.productPrice}>
                                            {price}
                                        </p>

                                        {selectedProduct?.productNo ===
                                        p.productNo ? (
                                            <p className={styles.selectHint}>
                                                {t('현재 선택된 상품입니다.')}
                                            </p>
                                        ) : null}

                                        <Button
                                            type='button'
                                            frame='outlined'
                                            variant='primary'
                                            className={styles.selectButton}
                                            data-selected={
                                                selectedProduct?.productNo ===
                                                p.productNo
                                            }
                                            onClick={() =>
                                                setSelectedProduct(p)
                                            }
                                        >
                                            {t(
                                                selectedProduct?.productNo ===
                                                    p.productNo
                                                    ? '선택됨'
                                                    : '선택',
                                            )}
                                        </Button>
                                    </div>
                                </li>
                            );
                        })}

                        <ObserverTarget
                            hasNextPage={hasNextPage}
                            totalCount={totalCount}
                            onIntersect={() => {
                                if (hasNextPage) {
                                    fetchNextPage();
                                }
                            }}
                        />
                    </ul>
                )}
            </LoadingWrapper>

            <form
                id='product-select-form'
                onSubmit={(e) => {
                    e.preventDefault();
                    onSubmit();
                }}
            />
        </div>
    );
};
