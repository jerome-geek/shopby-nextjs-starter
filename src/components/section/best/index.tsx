'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Grid, Pagination } from 'swiper/modules';
import ProductCard from '@/components/product/card';
import * as styles from './index.css';

import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/pagination';

const CATEGORIES = ['리빙', '키즈', '패션', '라이프', '뷰티', '푸드', '홈데코'];

const MOCK_BEST_PRODUCTS = Array.from({ length: 10 }).map((_, i) => ({
    productNo: 200 + i,
    productName: `베스트 상품 ${i + 1}`,
    brandName: '프리미엄 브랜드',
    brandNo: 500,
    salePrice: 35000 + i * 1000,
    immediateDiscountAmt: 5000,
    additionDiscountAmt: 2000,
    imageUrlInfo: [
        {
            url: `https://images.unsplash.com/photo-${1580000000000 + i * 1000}?q=80&w=400&auto=format&fit=crop`,
            type: 'IMAGE_URL' as const,
            imageUrlType: 'IMAGE_URL' as const,
        },
    ],
    stickerInfos: [
        { type: 'TEXT' as const, label: '베스트', name: 'best' },
        { type: 'TEXT' as const, label: '무료배송', name: 'delivery' },
    ],
    likeCount: 150 + i * 10,
    liked: false,
    reviewRating: 4.5,
    totalReviewCount: 80 + i,
    rank: i + 1,
}));

export default function Best() {
    const [activeCategory, setActiveCategory] = useState('키즈');

    return (
        <section className={styles.section}>
            <div className={styles.header}>
                <div className={styles.titleWrapper}>
                    <h2 className={styles.title}>베스트 랭킹</h2>
                    <p className={styles.subtitle}>
                        지금 가장 많이 찾는 아이템
                    </p>
                </div>
                <Link href="/best" className={styles.viewAll}>
                    전체보기
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
                {CATEGORIES.map((cat) => (
                    <button
                        key={cat}
                        className={`${styles.categoryTab} ${
                            activeCategory === cat
                                ? styles.categoryTabActive
                                : ''
                        }`}
                        onClick={() => setActiveCategory(cat)}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            <div className={styles.swiperContainer}>
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
                    {MOCK_BEST_PRODUCTS.map((product) => (
                        <SwiperSlide
                            key={product.productNo}
                            className={styles.productGridItem}
                        >
                            <div className={styles.rankBadge}>
                                {product.rank}
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
            </div>

            <Link href="/best" className={styles.moreButton}>
                베스트 랭킹 더보기
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path
                        d="M9 18l6-6-6-6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </Link>
        </section>
    );
}
