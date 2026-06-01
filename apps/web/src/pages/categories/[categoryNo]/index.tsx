import {
    flatMap,
    indexBy,
    isEmpty,
    last,
    map,
    pipe,
    prop,
    toArray,
} from '@fxts/core';
import type { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { type ComponentProps, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { category } from '@/api/display';
import { product } from '@/api/product';
import LoadingWrapper from '@/shared/components/common/loading-wrapper';
import { NoResult } from '@/shared/components/common/no-result';
import Seo from '@/shared/components/common/seo';
import { ObserverTarget } from '@/shared/components/observer-target';
import { ProductCard } from '@/features/product/components';
import { ProductListCategory } from '@/features/product/list/category';
import { MobileFilter } from '@/features/product/list/mobile-filter';
import { ProductListSideBar } from '@/features/product/list/side-bar';
import { Paging } from '@/shared/ui';
import { SORT_OPTIONS } from '@/entities/product/constants';
import useInfiniteProductList from '@/hooks/infiniteQuery/product/product/useInfiniteProductList';
import { useSb } from '@/hooks/libs/shopby';
import { useAdditionalDiscountByProductNos } from '@/hooks/query/product/additionalDiscount';
import { useProductList } from '@/hooks/query/product/product';
import { useProductFilter } from '@/hooks/useProductFilter';
import { useResponsive } from '@/hooks/utils';
import { useCategoryMenu } from '@/hooks/utils/useCategoryMenu';
import type { GetCategoryResponse } from '@/models/display/category';
import type {
    ProductsSearchResponse,
    SearchProductItem,
} from '@/models/product/product';
import * as styles from '@/pages/categories/[categoryNo]/index.css';

const ONE_HOUR_IN_SECONDS = 60 * 60;
const DEFAULT_CATEGORY_PAGE_SIZE = 20;
const MAX_SEO_PRODUCTS = 5;

type CategorySeoData = ComponentProps<typeof Seo>;

type CategoryPageProps = {
    categoryNo: number;
    seoData: CategorySeoData | null;
};

const findFlatCategory = (
    categoryNo: number,
    categoryData?: GetCategoryResponse,
) => {
    return (categoryData?.flatCategories ?? []).find((item) =>
        [
            item.depth1CategoryNo,
            item.depth2CategoryNo,
            item.depth3CategoryNo,
            item.depth4CategoryNo,
            item.depth5CategoryNo,
        ].includes(categoryNo),
    );
};

// ── 카테고리 번호에 해당하는 현재 카테고리명 추출 ──
const getCategoryLabel = (
    categoryNo: number,
    categoryData?: GetCategoryResponse,
) => {
    const flatCategory = findFlatCategory(categoryNo, categoryData);

    if (!flatCategory) {
        return '';
    }

    const labelByDepth = [
        [flatCategory.depth5CategoryNo, flatCategory.depth5Label],
        [flatCategory.depth4CategoryNo, flatCategory.depth4Label],
        [flatCategory.depth3CategoryNo, flatCategory.depth3Label],
        [flatCategory.depth2CategoryNo, flatCategory.depth2Label],
        [flatCategory.depth1CategoryNo, flatCategory.depth1Label],
    ] as const;

    return (
        labelByDepth.find(
            ([depthCategoryNo]) => depthCategoryNo === categoryNo,
        )?.[1] || flatCategory.fullCategoryName
    );
};

// ── Breadcrumb JSON-LD에 사용할 카테고리 경로 추출 ──
const getCategoryPathLabels = (
    categoryNo: number,
    categoryData?: GetCategoryResponse,
) => {
    const flatCategory = findFlatCategory(categoryNo, categoryData);

    if (!flatCategory) {
        return [];
    }

    return [
        flatCategory.depth1Label,
        flatCategory.depth2Label,
        flatCategory.depth3Label,
        flatCategory.depth4Label,
        flatCategory.depth5Label,
    ].filter(Boolean);
};

const getProductImage = (productItem: SearchProductItem) =>
    productItem.listImageUrls?.[0] ||
    productItem.imageUrls?.[0] ||
    productItem.listImageUrlInfo?.[0]?.url ||
    productItem.imageUrlInfo?.[0]?.url ||
    '';

// ── SEO/GEO용 최소 메타 데이터 생성 ──
const createCategorySeoData = ({
    categoryNo,
    categoryData,
    productListData,
}: {
    categoryNo: number;
    categoryData?: GetCategoryResponse;
    productListData?: ProductsSearchResponse;
}): CategorySeoData | null => {
    if (!categoryNo) {
        return null;
    }

    const categoryLabel = getCategoryLabel(categoryNo, categoryData) || '상품';
    const categoryPathLabels = getCategoryPathLabels(categoryNo, categoryData);
    const productItems = productListData?.items ?? [];
    const seoProducts = productItems.slice(0, MAX_SEO_PRODUCTS);
    const representativeProducts = seoProducts
        .map((productItem) => productItem.productName)
        .filter(Boolean);
    const brandNames = [
        ...new Set(
            productItems
                .map((productItem) => productItem.brandName)
                .filter(Boolean),
        ),
    ].slice(0, 3);
    const url = `${
        process.env.NEXT_PUBLIC_BASE_URL || ''
    }/categories/${categoryNo}`;
    const image = seoProducts.map(getProductImage).find(Boolean) || '';
    const description = [
        `${categoryLabel} 카테고리의 추천 상품 ${productListData?.totalCount ?? 0}개를 확인해보세요.`,
        representativeProducts.length > 0
            ? `대표 상품은 ${representativeProducts.join(', ')}입니다.`
            : '',
    ]
        .filter(Boolean)
        .join(' ');

    return {
        title: `${categoryLabel} 상품`,
        description,
        ...(image && { image }),
        url,
        keywords: [categoryLabel, ...categoryPathLabels, ...brandNames]
            .filter(Boolean)
            .join(', '),
        type: 'website',
        jsonLd: [
            {
                '@context': 'https://schema.org',
                '@type': 'CollectionPage',
                name: `${categoryLabel} 상품`,
                description,
                url,
                ...(image && { image }),
                ...(categoryPathLabels.length > 0 && {
                    about: categoryPathLabels.join(' > '),
                }),
            },
            {
                '@context': 'https://schema.org',
                '@type': 'BreadcrumbList',
                itemListElement: categoryPathLabels.map((label, index) => ({
                    '@type': 'ListItem',
                    position: index + 1,
                    name: label,
                })),
            },
            {
                '@context': 'https://schema.org',
                '@type': 'ItemList',
                name: `${categoryLabel} 대표 상품`,
                numberOfItems: seoProducts.length,
                itemListElement: seoProducts.map((productItem, index) => ({
                    '@type': 'ListItem',
                    position: index + 1,
                    url: `${
                        process.env.NEXT_PUBLIC_BASE_URL || ''
                    }/products/${productItem.productNo}`,
                    name: productItem.productName,
                })),
            },
        ],
    };
};

// ── Page Component ─────────────────────────────────────

export default function CategoryPage({
    categoryNo: staticCategoryNo,
    seoData,
}: CategoryPageProps) {
    const { t } = useTranslation();

    const { isMobile } = useResponsive();

    const router = useRouter();
    const { categoryNo } = router.query;

    const parsedCategoryNo = Number(categoryNo) || staticCategoryNo;

    const {
        depth4CategoryList,
        depth3CategoryNo,
        depth4CategoryNo,
        categoryData,
    } = useCategoryMenu(parsedCategoryNo);

    const { appliedSearchParams } = useProductFilter({
        categoryNo: parsedCategoryNo,
    });

    const { data: productListData, isLoading: isProductListLoading } =
        useProductList({
            searchParams: appliedSearchParams,
            options: {
                enabled: parsedCategoryNo !== null,
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
            enabled: parsedCategoryNo !== null && isMobile,
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

    const searchedProduct = useMemo(
        () =>
            isMobile
                ? last(infiniteProductListData?.pages ?? [])?.data
                : productListData,
        [isMobile, infiniteProductListData, productListData],
    );

    useSb({
        currentCategory: categoryData,
        searchedProduct,
    });

    return (
        <>
            {seoData && <Seo {...seoData} />}
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
                                        className={
                                            styles.depth4CategoryListItem
                                        }
                                        data-selected={
                                            !depth4CategoryNo
                                                ? 'true'
                                                : undefined
                                        }
                                    >
                                        <Link
                                            href={`/categories/${depth3CategoryNo}`}
                                        >
                                            전체
                                        </Link>
                                    </li>
                                    {depth4CategoryList.map(
                                        (depth4Category) => (
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
                                        ),
                                    )}
                                </ul>
                            )}

                            <div className={styles.sortContainer}>
                                <ul className={styles.sortList}>
                                    {SORT_OPTIONS.map((sortOption) => (
                                        <li key={sortOption.id}>
                                            <button
                                                type='button'
                                                className={
                                                    styles.sortListButton
                                                }
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
        </>
    );
}

// ── ISR ────────────────────────────────────────────────

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [],
        fallback: 'blocking',
    };
};

export const getStaticProps: GetStaticProps<CategoryPageProps> = async ({
    params,
}) => {
    const categoryNo = Number(params?.categoryNo) || 0;

    if (!categoryNo) {
        return { notFound: true };
    }

    const categorySearchParams = { needsBrands: false };
    const productSearchParams = {
        categoryNos: [categoryNo],
        pageNumber: 1,
        pageSize: MAX_SEO_PRODUCTS,
        hasTotalCount: true,
        order: {
            by: 'MD_RECOMMEND' as const,
            direction: 'ASC' as const,
        },
        filter: {
            soldout: true,
        },
        categoryOperator: 'AND' as const,
    };

    try {
        // SEO/GEO에 필요한 카테고리 정보와 대표 상품만 읽고, 결과는 작은 메타 데이터로 축소해서 전달합니다.
        const [categoryData, productListData] = await Promise.all([
            category
                .getCategory(categoryNo, categorySearchParams)
                .then(({ data }) => data),
            product
                .searchProducts(productSearchParams)
                .then(({ data }) => data),
        ]);

        return {
            props: {
                categoryNo,
                seoData: createCategorySeoData({
                    categoryNo,
                    categoryData,
                    productListData,
                }),
            },
            revalidate: ONE_HOUR_IN_SECONDS,
        };
    } catch (error) {
        console.error(
            `[Category Page getStaticProps] SEO data fetching failed for ${categoryNo}:`,
            error,
        );

        return { notFound: true };
    }
};
