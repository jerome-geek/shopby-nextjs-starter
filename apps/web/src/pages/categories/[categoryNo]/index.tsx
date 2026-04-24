import {
    flatMap,
    indexBy,
    isEmpty,
    map,
    pipe,
    prop,
    toArray,
} from '@fxts/core';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import LoadingWrapper from '@/components/common/loading-wrapper';
import { NoResult } from '@/components/common/no-result';
import { ObserverTarget } from '@/components/common/observer-target';
import { ProductCard } from '@/components/product';
import { ProductListCategory } from '@/components/product-list/category';
import { MobileFilter } from '@/components/product-list/mobile-filter';
import { ProductListSideBar } from '@/components/product-list/side-bar';
import { Paging } from '@/components/ui';
import { SORT_OPTIONS } from '@/const/product';
import useInfiniteProductList from '@/hooks/infiniteQuery/product/product/useInfiniteProductList';
import { useAdditionalDiscountByProductNos } from '@/hooks/query/product/additionalDiscount';
import { useProductList } from '@/hooks/query/product/product';
import { useProductFilter } from '@/hooks/useProductFilter';
import { useResponsive } from '@/hooks/utils';
import { useCategoryMenu } from '@/hooks/utils/useCategoryMenu';
import * as styles from '@/pages/categories/[categoryNo]/index.css';

export default function CategoryPage() {
    const { t } = useTranslation();

    const { isMobile } = useResponsive();

    const router = useRouter();
    const { categoryNo } = router.query;

    const parsedCategoryNo = Number(categoryNo) || undefined;

    const { depth4CategoryList, depth3CategoryNo, depth4CategoryNo } =
        useCategoryMenu(parsedCategoryNo);

    const { appliedSearchParams } = useProductFilter({
        categoryNo: parsedCategoryNo,
    });

    const { data: productListData, isLoading: isProductListLoading } =
        useProductList({
            searchParams: appliedSearchParams,
            options: {
                enabled: parsedCategoryNo != null,
            },
        });

    const {
        fetchNextPage,
        hasNextPage,
        data: infiniteProductListData,
        isLoading: isInfiniteProductListLoading,
    } = useInfiniteProductList({
        searchParams: appliedSearchParams,
        options: {
            enabled: parsedCategoryNo != null && isMobile,
        },
    });

    const totalCount = productListData?.totalCount ?? 0;

    const selectedSortOptionId = useMemo(() => {
        const by = appliedSearchParams.order?.by;
        const direction = appliedSearchParams.order?.direction;
        return (
            SORT_OPTIONS.find(
                (option) => option.by === by && option.direction === direction,
            )?.id ?? SORT_OPTIONS[0].id
        );
    }, [appliedSearchParams.order?.by, appliedSearchParams.order?.direction]);

    const products = useMemo(() => {
        if (isMobile) {
            return pipe(
                infiniteProductListData?.pages ?? [],
                flatMap((page) => page.data.items),
                toArray,
            );
        }

        return productListData?.items ?? [];
    }, [isMobile, productListData, infiniteProductListData]);

    const productNos = useMemo(
        () => pipe(products, map(prop('productNo')), toArray),
        [products],
    );

    const { data: additionalDiscountsData } = useAdditionalDiscountByProductNos(
        {
            searchParams: {
                productNos,
            },
            options: {
                enabled: productNos.length > 0,
            },
        },
    );

    const productsWithDiscounts = useMemo(() => {
        const discountMap = pipe(
            additionalDiscountsData?.data ?? [],
            indexBy(prop('productNo')),
        );

        return pipe(
            products,
            map((product) => ({
                ...product,
                additionalDiscount: discountMap[product.productNo] ?? null,
            })),
            toArray,
        );
    }, [products, additionalDiscountsData]);

    return (
        <div className={styles.container}>
            {isMobile ? (
                <div className={styles.mobileTopContainer}>
                    <ProductListCategory />
                    <MobileFilter categoryNo={parsedCategoryNo} />
                    <div className={styles.totalCount}>
                        총{' '}
                        <span className={styles.totalCountValue}>
                            {totalCount}
                        </span>
                        개
                    </div>
                </div>
            ) : (
                <ProductListSideBar categoryNo={parsedCategoryNo} />
            )}

            <section className={styles.contentArea}>
                {!isMobile && (
                    <>
                        {depth4CategoryList.length > 0 && (
                            <ul className={styles.depth4CategoryList}>
                                <li
                                    className={styles.depth4CategoryListItem}
                                    data-selected={
                                        !depth4CategoryNo ? 'true' : undefined
                                    }
                                >
                                    <Link
                                        href={`/categories/${depth3CategoryNo}`}
                                    >
                                        전체
                                    </Link>
                                </li>
                                {depth4CategoryList.map((depth4Category) => (
                                    <li
                                        key={`depth4category-${depth4Category.categoryNo}`}
                                        className={
                                            styles.depth4CategoryListItem
                                        }
                                        data-selected={
                                            depth4CategoryNo ===
                                            depth4Category.categoryNo
                                                ? 'true'
                                                : undefined
                                        }
                                    >
                                        <Link
                                            href={`/categories/${depth4Category.categoryNo}`}
                                        >
                                            {depth4Category.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        )}

                        <div className={styles.sortContainer}>
                            <ul className={styles.sortList}>
                                {SORT_OPTIONS.map((sortOption) => (
                                    <li key={sortOption.id}>
                                        <button
                                            type='button'
                                            className={styles.sortListButton}
                                            data-selected={
                                                selectedSortOptionId ===
                                                sortOption.id
                                                    ? 'true'
                                                    : undefined
                                            }
                                            onClick={() => {
                                                void router.replace(
                                                    {
                                                        pathname:
                                                            router.pathname,
                                                        query: {
                                                            ...router.query,
                                                            pageNumber: '1',
                                                            by: sortOption.by,
                                                            direction:
                                                                sortOption.direction,
                                                        },
                                                    },
                                                    undefined,
                                                    { shallow: true },
                                                );
                                            }}
                                        >
                                            {sortOption.name}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </>
                )}

                <LoadingWrapper
                    isLoading={
                        isMobile
                            ? isInfiniteProductListLoading
                            : isProductListLoading
                    }
                >
                    {isEmpty(productsWithDiscounts) ? (
                        <NoResult text={t('상품이 없습니다.')} />
                    ) : (
                        <>
                            <div className={styles.productList}>
                                {productsWithDiscounts.map((product) => (
                                    <ProductCard
                                        key={product.productNo}
                                        {...product}
                                    />
                                ))}
                            </div>

                            {isMobile ? (
                                <ObserverTarget
                                    onIntersect={() => {
                                        if (hasNextPage) {
                                            fetchNextPage();
                                        }
                                    }}
                                    hasNextPage={hasNextPage}
                                    totalCount={totalCount}
                                />
                            ) : (
                                <Paging
                                    currentPage={
                                        appliedSearchParams.pageNumber ?? 1
                                    }
                                    pageSize={
                                        appliedSearchParams.pageSize ?? 20
                                    }
                                    totalCount={totalCount}
                                    onPageClick={(pageNumber) => {
                                        router.replace(
                                            {
                                                pathname: router.pathname,
                                                query: {
                                                    ...router.query,
                                                    pageNumber:
                                                        String(pageNumber),
                                                },
                                            },
                                            undefined,
                                            { shallow: true },
                                        );
                                    }}
                                />
                            )}
                        </>
                    )}
                </LoadingWrapper>
            </section>
        </div>
    );
}
