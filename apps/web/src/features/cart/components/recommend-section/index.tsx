'use client';

import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { SmallCaretIcon } from '@/components/icons';
import { ProductCard } from '@/components/product';
import * as styles from '@/features/cart/components/recommend-section/index.css';
import { CartRecommendSectionSkeleton } from '@/features/cart/components/recommend-section/skeleton';
import {
    useProductSectionById,
    useProductSectionProductList,
} from '@/hooks/suspenseQuery/display/productSection';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export const CartRecommendSection = () => {
    const { data: productSectionByIdData } = useProductSectionById({
        sectionId: 'CART',
    });

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

    const totalPage = products.length;

    if (products.length === 0) return null;

    return (
        <section className={styles.container}>
            <h3 className={styles.title}>{productSectionByIdData.label}</h3>
            <Swiper
                className={styles.swiperContainer}
                spaceBetween={15}
                slidesPerView='auto'
                modules={[Navigation, Pagination]}
                slidesOffsetBefore={20}
                slidesOffsetAfter={20}
                breakpoints={{
                    1025: {
                        slidesOffsetBefore: 0,
                        slidesOffsetAfter: 0,
                    },
                }}
                navigation={{
                    prevEl: '.recommend-prev',
                    nextEl: '.recommend-next',
                }}
                pagination={{
                    el: '.recommend-pagination',
                    type: 'fraction',
                    renderFraction: (currentClass, totalClass) => {
                        return (
                            `<span class="${currentClass} ${styles.paginationCurrent}"></span>` +
                            `<span class="${styles.paginationDivider}">&nbsp;/&nbsp;</span>` +
                            `<span class="${totalClass} ${styles.paginationTotal}"></span>`
                        );
                    },
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
                        className={`${styles.paginationButton} recommend-prev`}
                        aria-label='이전 상품'
                        type='button'
                    >
                        <SmallCaretIcon
                            direction='left'
                            width={16}
                            height={16}
                        />
                    </button>
                    <div
                        className={`${styles.recommendPagination} recommend-pagination`}
                    />
                    <button
                        className={`${styles.paginationButton} recommend-next`}
                        aria-label='다음 상품'
                        type='button'
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

CartRecommendSection.Skeleton = CartRecommendSectionSkeleton;
