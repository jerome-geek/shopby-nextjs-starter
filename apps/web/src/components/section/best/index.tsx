'use client';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Grid, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { ArrowIcon } from '@/components/icons/ArrowIcon';
import ProductCard from '@/components/product/card';
import * as styles from '@/components/section/best/index.css';
import { CATEGORY_CODE } from '@/const/category';
import { PATHS } from '@/const/paths';
import { useBestSellerProductList } from '@/hooks/query/product/product';
import { useProductsWithAdditionalDiscounts } from '@/entities/product/hooks/useProductsWithAdditionalDiscounts';
import { useMainCategory } from '@/hooks/useMainCategory';
import { BREAKPOINTS } from '@/styles/media';

import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/pagination';

export default function Best({ type }: { type: 'KIDS' | 'LIFE' }) {
    const { t } = useTranslation();

    const { mainCategoryChildrenList } = useMainCategory();

    const currentCategory = useMemo(() => {
        return mainCategoryChildrenList?.find(
            (category) => category.managementCode === CATEGORY_CODE[type],
        );
    }, [mainCategoryChildrenList, type]);

    const [selectedCategory, setSelectedCategory] = useState(0);

    const activeCategory =
        selectedCategory || (currentCategory?.categoryNo ?? 0);

    const { data: bestSellerProductListData } = useBestSellerProductList({
        searchParams: {
            pageNumber: 1,
            pageSize: 10,
            categoryNos: [activeCategory],
        },
        options: {
            enabled: activeCategory !== 0,
        },
    });

    const bestSellerProductList = useMemo(
        () => bestSellerProductListData?.items || [],
        [bestSellerProductListData],
    );

    const { productsWithDiscounts } = useProductsWithAdditionalDiscounts(
        bestSellerProductList,
    );

    return (
        <section className={styles.section}>
            <div className={styles.header}>
                <div className={styles.titleWrapper}>
                    <h2 className={styles.title}>
                        {t(type === 'KIDS' ? '키즈 베스트' : '라이프 베스트')}
                    </h2>
                    <p className={styles.subtitle}>
                        {t('지금 가장 많이 찾는 아이템')}
                    </p>
                </div>

                <Link href={PATHS.PRODUCTS.BEST} className={styles.viewAll}>
                    {t('전체보기')}
                    <svg width='16' height='16' viewBox='0 0 24 24' fill='none'>
                        <path
                            d='M9 18l6-6-6-6'
                            stroke='currentColor'
                            strokeWidth='2'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                        />
                    </svg>
                </Link>
            </div>

            <div className={styles.categoryList}>
                <Swiper
                    slidesPerView='auto'
                    spaceBetween={4}
                    watchOverflow
                    breakpoints={{
                        [BREAKPOINTS.SM]: {
                            spaceBetween: 6,
                        },
                    }}
                    style={{
                        width: '100%',
                    }}
                >
                    <SwiperSlide style={{ width: 'auto' }}>
                        <div
                            role='button'
                            tabIndex={0}
                            aria-pressed={
                                activeCategory === currentCategory?.categoryNo
                            }
                            className={`${styles.categoryTab} ${
                                activeCategory === currentCategory?.categoryNo
                                    ? styles.categoryTabActive
                                    : ''
                            }`}
                            onClick={() =>
                                setSelectedCategory(
                                    currentCategory?.categoryNo ?? 0,
                                )
                            }
                        >
                            전체
                        </div>
                    </SwiperSlide>

                    {currentCategory?.children.map((category) => (
                        <SwiperSlide
                            key={category.categoryNo}
                            style={{ width: 'auto' }}
                        >
                            <div
                                role='button'
                                tabIndex={0}
                                aria-pressed={
                                    activeCategory === category.categoryNo
                                }
                                className={`${styles.categoryTab} ${
                                    activeCategory === category.categoryNo
                                        ? styles.categoryTabActive
                                        : ''
                                }`}
                                onClick={() =>
                                    setSelectedCategory(category.categoryNo)
                                }
                            >
                                {category.label}
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            <div className={styles.swiperContainer}>
                {productsWithDiscounts.length > 0 ? (
                    <Swiper
                        slidesPerView={2.2}
                        grid={{
                            rows: 2,
                            fill: 'row',
                        }}
                        spaceBetween={16}
                        modules={[Grid, Pagination]}
                        breakpoints={{
                            768: {
                                slidesPerView: 5,
                                grid: {
                                    rows: 2,
                                    fill: 'row',
                                },
                            },
                        }}
                    >
                        {productsWithDiscounts.map((product, index) => (
                            <SwiperSlide
                                key={product.productNo}
                                className={styles.productGridItem}
                            >
                                <div className={styles.rankBadge}>
                                    <span>{index + 1}</span>
                                </div>
                                <ProductCard
                                    productNo={product.productNo}
                                    productName={product.productName}
                                    brandName={product.brandName}
                                    brandNo={product.brandNo}
                                    salePrice={product.salePrice}
                                    immediateDiscountAmt={
                                        product.immediateDiscountAmt
                                    }
                                    additionDiscountAmt={
                                        product.additionDiscountAmt
                                    }
                                    imageUrlInfo={product.imageUrlInfo}
                                    stickerInfos={product.stickerInfos}
                                    likeCount={product.likeCount}
                                    liked={product.liked}
                                    reviewRating={product.reviewRating}
                                    totalReviewCount={product.totalReviewCount}
                                    additionalDiscount={
                                        product.additionalDiscount
                                    }
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                ) : (
                    <div className={styles.emptyMessage}>
                        {t('등록된 상품이 없습니다.')}
                    </div>
                )}
            </div>

            <Link
                href={`${PATHS.PRODUCTS.BEST}?categoryNo=${currentCategory?.categoryNo}`}
                className={styles.moreLink}
            >
                {t('베스트 랭킹 더보기')}
                <ArrowIcon direction='right' />
            </Link>
        </section>
    );
}
