import { map, pipe, toArray } from '@fxts/core';
import { Swiper, SwiperSlide } from 'swiper/react';

import * as styles from '@/components/drawer/search/index.css';
import { ProductCard } from '@/components/product';
import { Column } from '@/components/ui/layout/flex';
import { useProductSectionProductList } from '@/hooks/suspenseQuery/display/productSection';
import { useResponsive } from '@/hooks/utils';
import type { ImageUrlType } from '@/models/product';

import 'swiper/css';

export const RecommendProductsSection = () => {
    const { isMobile } = useResponsive();

    const { data: filteredProducts } = useProductSectionProductList({
        sectionId: 'SEARCH_RECOMMEND',
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
        options: {
            select: ({ products }) =>
                pipe(
                    products ?? [],
                    map((product) => ({
                        ...product,
                        imageUrlInfo:
                            product.imageUrlInfo &&
                            pipe(
                                product.imageUrlInfo,
                                map((img) => ({
                                    url: img.url,
                                    type: 'IMAGE_URL',
                                })),
                                toArray,
                            ),
                        stickerInfos: pipe(
                            product.stickerInfos ?? [],
                            map(({ type, label }) => ({
                                type,
                                label,
                                name: label,
                            })),
                            toArray,
                        ),
                    })),
                    toArray,
                ),
        },
    });

    if (filteredProducts.length === 0) {
        return null;
    }

    return (
        <Column className={styles.productSectionContainer}>
            <h3 className={styles.sectionTitle}>추천 상품</h3>

            {isMobile ? (
                <Swiper
                    className={styles.recommendSwiper}
                    style={{
                        // marginLeft: 0, marginRight: '-20px'
                        overflow: 'visible',
                    }}
                    slidesPerView={2.3}
                    spaceBetween={12}
                >
                    {filteredProducts.map((product) => (
                        <SwiperSlide
                            key={product.productNo}
                            className={styles.recommendSlide}
                        >
                            <div className={styles.recommendCardWrap}>
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
                                    imageUrlInfo={
                                        product.imageUrlInfo as ImageUrlType[]
                                    }
                                    stickerInfos={product.stickerInfos}
                                    likeCount={product.likeCount}
                                    liked={product.liked}
                                    reviewRating={product.reviewRating}
                                    totalReviewCount={product.totalReviewCount}
                                    isAdditionalDiscount
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            ) : (
                <div className={styles.productGrid}>
                    {filteredProducts.map((product) => (
                        <ProductCard
                            key={product.productNo}
                            productNo={product.productNo}
                            productName={product.productName}
                            brandName={product.brandName}
                            brandNo={product.brandNo}
                            salePrice={product.salePrice}
                            immediateDiscountAmt={product.immediateDiscountAmt}
                            additionDiscountAmt={product.additionDiscountAmt}
                            imageUrlInfo={
                                product.imageUrlInfo as ImageUrlType[]
                            }
                            stickerInfos={product.stickerInfos}
                            likeCount={product.likeCount}
                            liked={product.liked}
                            reviewRating={product.reviewRating}
                            totalReviewCount={product.totalReviewCount}
                            isAdditionalDiscount
                        />
                    ))}
                </div>
            )}
        </Column>
    );
};
