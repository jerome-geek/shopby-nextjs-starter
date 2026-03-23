'use client';
import Link from 'next/link';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Grid, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { ArrowIcon } from '@/components/icons/ArrowIcon';
import ProductCard from '@/components/product/card';
import * as styles from '@/components/section/best/index.css';
import { PATHS } from '@/const/paths';
import {
    useCategoriesByCode,
    useCategory,
} from '@/hooks/query/display/category';
import { useBestSellerProductList } from '@/hooks/query/product/product';

import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/pagination';
import { useAdditionalDiscountByProductNos } from '@/hooks/query/product/additionalDiscount';

export default function Best() {
    const { t } = useTranslation();

    // TODO: 메인페이지에 필요한 코드들을 서버에서 조회해서 클라이언트로 넘겨줄 수 있도록, 실시간으로 반영 가능한지 체크
    const { data: categoriesByCodeData } = useCategoriesByCode({
        data: { codes: ['BEST'] },
    });

    const displayCategoryNo = categoriesByCodeData?.[0].displayCategoryNo || 0;

    const { data: categoryData } = useCategory({
        categoryNo: displayCategoryNo,
        options: {
            enabled: displayCategoryNo !== 0,
        },
    });

    const [selectedCategory, setSelectedCategory] = useState(0);
    const activeCategory =
        selectedCategory ||
        (categoryData?.flatCategories[0]?.depth2CategoryNo ?? 0);

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

    const bestSellerProductList = bestSellerProductListData?.items || [];

    return (
        <section className={styles.section}>
            <div className={styles.header}>
                <div className={styles.titleWrapper}>
                    <h2 className={styles.title}>{t('베스트 랭킹')}</h2>
                    <p className={styles.subtitle}>
                        {t('지금 가장 많이 찾는 아이템')}
                    </p>
                </div>

                <Link href={PATHS.PRODUCTS.BEST} className={styles.viewAll}>
                    {t('전체보기')}
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path
                            d="M9 18l6-6-6-6"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </Link>
            </div>

            <div className={styles.categoryList}>
                {categoryData?.flatCategories.map((category) => (
                    <button
                        key={category.depth2CategoryNo}
                        className={`${styles.categoryTab} ${
                            activeCategory === category.depth2CategoryNo
                                ? styles.categoryTabActive
                                : ''
                        }`}
                        onClick={() =>
                            setSelectedCategory(category.depth2CategoryNo)
                        }
                    >
                        {category.depth2Label}
                    </button>
                ))}
            </div>

            <div className={styles.swiperContainer}>
                {bestSellerProductList.length > 0 ? (
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
                        {bestSellerProductList.map((product, index) => (
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

            <Link href="/best" className={styles.moreLink}>
                {t('베스트 랭킹 더보기')}
                <ArrowIcon direction="right" />
            </Link>
        </section>
    );
}
