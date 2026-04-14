'use client';

import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper';

import 'swiper/css';

import { SmallCaretIcon } from '@/components/icons';
import ProductCard from '@/components/product/card';
import { useProductSectionProductList } from '@/hooks/query/display/productSection';

import * as styles from './index.css';

const Recommend = () => {
    const { data: productSectionProductListData } =
        useProductSectionProductList({
            sectionId: 'CART',
            searchParams: {
                by: 'ADMIN_SETTING',
                direction: 'DESC',
                soldout: false,
                saleStatus: 'RESERVATION_AND_ONSALE',
                pageNumber: 1,
                pageSize: 10,
                hasOptionValues: false,
                includeStopProduct: false,
            },
        });

    const products = productSectionProductListData?.products ?? [];
    const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(
        null,
    );
    const [currentIndex, setCurrentIndex] = useState(1);

    if (products.length === 0) return null;

    const totalPage = products.length;

    return (
        <section className={styles.container}>
            <h3 className={styles.title}>함께 구매하면 좋은 상품</h3>
            <Swiper
                className={styles.swiperContainer}
                spaceBetween={15}
                slidesPerView='auto'
                onSwiper={(swiper) => {
                    setSwiperInstance(swiper);
                }}
                onSlideChange={(swiper) => {
                    setCurrentIndex(swiper.realIndex + 1);
                }}
            >
                {products.map((product) => (
                    <SwiperSlide
                        key={product.productNo}
                        className={styles.swiperSlide}
                    >
                        <ProductCard
                            productNo={product.productNo}
                            productName={product.productName}
                            imageUrlInfo={product.imageUrlInfo.map((img) => ({
                                imageUrlType: img.imageUrlType || 'IMAGE_URL',
                                type: img.imageUrlType || 'IMAGE_URL',
                                url: img.url,
                            }))}
                            brandNo={product.brandNo}
                            brandName={product.brandName}
                            stickerInfos={product.stickerInfos.map(
                                (sticker, stickerIndex) => ({
                                    no: stickerIndex + 1,
                                    name: sticker.label,
                                    label: sticker.label,
                                    type: sticker.type,
                                }),
                            )}
                            likeCount={product.likeCount}
                            liked={product.liked}
                            reviewRating={product.reviewRating}
                            totalReviewCount={product.totalReviewCount}
                            salePrice={product.salePrice}
                            immediateDiscountAmt={product.immediateDiscountAmt}
                            additionDiscountAmt={product.additionDiscountAmt}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>

            {totalPage > 1 && (
                <div className={styles.paginationWrapper}>
                    <button
                        className={styles.paginationButton}
                        onClick={() => swiperInstance?.slidePrev()}
                        aria-label='이전 상품'
                    >
                        <SmallCaretIcon
                            direction='left'
                            width={16}
                            height={16}
                        />
                    </button>
                    <span className={styles.paginationCurrent}>
                        {currentIndex}
                    </span>
                    <span className={styles.paginationDivider}>/</span>
                    <span className={styles.paginationTotal}>{totalPage}</span>
                    <button
                        className={styles.paginationButton}
                        onClick={() => swiperInstance?.slideNext()}
                        aria-label='다음 상품'
                    >
                        <SmallCaretIcon
                            direction='right'
                            width={16}
                            height={16}
                        />
                    </button>
                </div>
            )}
        </section>
    );
};

export default Recommend;
