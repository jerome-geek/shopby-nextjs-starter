import { isEmpty } from '@fxts/core';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';

import LoadingWrapper from '@/components/common/loading-wrapper';
import { NoResult } from '@/components/common/no-result';
import { ObserverTarget } from '@/components/common/observer-target';
import { ProductCard } from '@/components/product';
import { Column } from '@/components/ui/layout/flex';
import PagingV2 from '@/components/ui/paging-v2';
import { PATHS } from '@/const/paths';
import useInfiniteProductList from '@/hooks/infiniteQuery/product/product/useInfiniteProductList';
import { useProductList } from '@/hooks/query/product/product';
import { useCategoryAll } from '@/hooks/suspenseQuery/display/category';
import { useResponsive } from '@/hooks/utils';
import { useCategoryMenu } from '@/hooks/utils/useCategoryMenu';
import type { OrderByType, OrderDirectionType } from '@/models';
import * as styles from '@/pages/products/best/index.css';

const PAGE_SIZE = 20;

const parseQueryNumber = (
    value: string | string[] | undefined,
    fallback: number,
): number => {
    const raw = Array.isArray(value) ? value[0] : value;
    const n = Number(raw);
    return Number.isFinite(n) && n >= 1 ? Math.floor(n) : fallback;
};

export default function NewProducts() {
    const { isMobile } = useResponsive();

    const router = useRouter();

    const { categoryNo: categoryNoQuery, pageNumber: pageNumberQuery } =
        router.query;

    const pageNumber = parseQueryNumber(
        pageNumberQuery as string | string[] | undefined,
        1,
    );

    const { data: categoryData } = useCategoryAll();

    const mainCategoryNo =
        categoryData?.multiLevelCategories?.[0]?.categoryNo ?? 0;

    const { depth2CategoryList } = useCategoryMenu(mainCategoryNo);

    const defaultCategoryNo = mainCategoryNo;

    const categoryNoFromQuery = categoryNoQuery
        ? Number(
              Array.isArray(categoryNoQuery)
                  ? categoryNoQuery[0]
                  : categoryNoQuery,
          )
        : undefined;

    const selectedCategory =
        categoryNoFromQuery && categoryNoFromQuery > 0
            ? categoryNoFromQuery
            : defaultCategoryNo;

    const newListBaseSearchParams = useMemo(
        () => ({
            pageSize: PAGE_SIZE,
            categoryNos: selectedCategory ? [selectedCategory] : [],
            hasTotalCount: true,
            order: {
                by: 'SALE_YMD' as OrderByType,
                direction: 'DESC' as OrderDirectionType,
            },
        }),
        [selectedCategory],
    );

    const listEnabled = router.isReady && selectedCategory > 0;

    const { data: productListData, isLoading: isProductListLoading } =
        useProductList({
            searchParams: {
                ...newListBaseSearchParams,
                pageNumber,
            },
            options: {
                enabled: listEnabled && !isMobile,
            },
        });

    const {
        data: infiniteProductListData,
        fetchNextPage,
        hasNextPage,
        isLoading: isInfiniteProductListLoading,
    } = useInfiniteProductList({
        searchParams: newListBaseSearchParams,
        options: {
            enabled: listEnabled && isMobile,
        },
    });

    const productList = useMemo(() => {
        if (isMobile) {
            return (
                infiniteProductListData?.pages.flatMap(
                    (page) => page.data.items,
                ) ?? []
            );
        }

        return productListData?.items ?? [];
    }, [infiniteProductListData, isMobile, productListData?.items]);

    const totalCount = isMobile
        ? infiniteProductListData?.pages[0]?.data.totalCount ?? 0
        : productListData?.totalCount ?? 0;

    const isListLoading = isMobile
        ? isInfiniteProductListLoading
        : isProductListLoading;

    const handlePageClick = (nextPage: number) => {
        router.push(
            {
                pathname: PATHS.PRODUCTS.NEW,
                query: {
                    categoryNo: String(selectedCategory),
                    pageNumber: String(nextPage),
                },
            },
            undefined,
            { shallow: true },
        );
    };

    return (
        <div className={styles.container}>
            <Column>
                <Column style={{ gap: isMobile ? '20px' : '32px' }}>
                    {!isMobile && <h1 className={styles.title}>신상품</h1>}

                    <div className={styles.categorySwiperContainer}>
                        <Swiper
                            slidesPerView='auto'
                            spaceBetween={4}
                            watchOverflow
                            breakpoints={{
                                768: {
                                    spaceBetween: 6,
                                },
                            }}
                            className={styles.categorySwiper}
                        >
                            <SwiperSlide style={{ width: 'auto' }}>
                                <Link
                                    href={`${PATHS.PRODUCTS.NEW}`}
                                    className={styles.categoryLink}
                                    data-selected={
                                        Number(selectedCategory) ===
                                        Number(mainCategoryNo)
                                            ? 'true'
                                            : undefined
                                    }
                                >
                                    전체
                                </Link>
                            </SwiperSlide>

                            {depth2CategoryList.map((category) => (
                                <SwiperSlide
                                    key={category.categoryNo}
                                    style={{ width: 'auto' }}
                                >
                                    <Link
                                        href={`${PATHS.PRODUCTS.NEW}?categoryNo=${category.categoryNo}&pageNumber=1`}
                                        className={styles.categoryLink}
                                        data-selected={
                                            Number(selectedCategory) ===
                                            Number(category.categoryNo)
                                                ? 'true'
                                                : undefined
                                        }
                                    >
                                        {category.label}
                                    </Link>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </Column>

                <div className={styles.border} />
            </Column>

            <LoadingWrapper isLoading={isListLoading}>
                {isEmpty(productList) ? (
                    <NoResult title={'등록된 상품이 없습니다.'} />
                ) : (
                    <Column style={{ gap: isMobile ? '0' : '60px' }}>
                        <div className={styles.productGrid}>
                            {productList.map((product) => (
                                <ProductCard
                                    key={product.productNo}
                                    productNo={product.productNo}
                                    productName={product.productName}
                                    imageUrlInfo={product.imageUrlInfo}
                                    brandNo={product.brandNo}
                                    brandName={product.brandName}
                                    stickerInfos={product.stickerInfos}
                                    likeCount={product.likeCount}
                                    liked={product.liked}
                                    reviewRating={product.reviewRating}
                                    totalReviewCount={product.totalReviewCount}
                                    salePrice={product.salePrice}
                                    immediateDiscountAmt={
                                        product.immediateDiscountAmt
                                    }
                                    additionDiscountAmt={
                                        product.additionDiscountAmt
                                    }
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
                            <PagingV2
                                currentPage={pageNumber}
                                totalCount={totalCount}
                                pageSize={PAGE_SIZE}
                                onPageClick={handlePageClick}
                            />
                        )}
                    </Column>
                )}
            </LoadingWrapper>
        </div>
    );
}
