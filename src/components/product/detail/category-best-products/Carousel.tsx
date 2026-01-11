'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import ProductCard from '@/components/product/card';
import { SearchProductItem } from '@/models/product/product';
import { css } from '@/styled-system/css';
import { hstack } from '@/styled-system/patterns';
import { SmallCaretIcon } from '@/components/icons';
import { BREAKPOINTS } from '@/const/breakpoints';

interface CarouselProps {
    products: SearchProductItem[];
}

export default function CategoryBestProductsCarousel({
    products,
}: CarouselProps) {
    // 유니크한 선택자를 위해 접두사 사용
    const prevElClass = 'best-swiper-prev';
    const nextElClass = 'best-swiper-next';
    const paginationElClass = 'best-swiper-pagination';

    return (
        <div className={css({ width: '100%' })}>
            <Swiper
                modules={[Navigation, Pagination]}
                slidesPerView={2.2}
                slidesPerGroup={1}
                spaceBetween={12}
                slidesOffsetBefore={20}
                slidesOffsetAfter={20}
                breakpoints={{
                    [BREAKPOINTS.SM]: {
                        slidesPerView: 4,
                        slidesPerGroup: 4,
                        spaceBetween: 24,
                        slidesOffsetBefore: 0,
                        slidesOffsetAfter: 0,
                    },
                }}
                navigation={{
                    prevEl: `.${prevElClass}`,
                    nextEl: `.${nextElClass}`,
                }}
                pagination={{
                    el: `.${paginationElClass}`,
                    type: 'fraction',
                    renderFraction: (currentClass, totalClass) => {
                        return `<span class="${currentClass}" style="color: black;"></span> / <span class="${totalClass}"></span>`;
                    },
                }}
                className={css({
                    paddingBottom: '10px',
                    '& .swiper-slide': {
                        height: 'auto',
                    },
                })}
            >
                {products.map((item) => (
                    <SwiperSlide key={item.productNo}>
                        <ProductCard
                            productNo={item.productNo}
                            productName={item.productName}
                            imageUrlInfo={item.imageUrlInfo}
                            brandNo={item.brandNo}
                            brandName={item.brandName}
                            stickerInfos={item.stickerInfos}
                            likeCount={item.likeCount}
                            liked={item.liked}
                            reviewRating={item.reviewRating}
                            totalReviewCount={item.totalReviewCount}
                            salePrice={item.salePrice}
                            immediateDiscountAmt={item.immediateDiscountAmt}
                            additionDiscountAmt={item.additionDiscountAmt}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Pagination Controls */}
            {products.length > 0 && (
                <div
                    className={hstack({
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: '30px',
                        gap: '24px',
                    })}
                >
                    <button
                        type='button'
                        className={`${prevElClass} ${navButtonStyle}`}
                        aria-label='이전 상품'
                    >
                        <SmallCaretIcon
                            direction='left'
                            width={24}
                            height={24}
                            currentColor='black'
                        />
                    </button>

                    <div
                        className={`${paginationElClass} ${paginationStyle}`}
                    ></div>

                    <button
                        type='button'
                        className={`${nextElClass} ${navButtonStyle}`}
                        aria-label='다음 상품'
                    >
                        <SmallCaretIcon
                            direction='right'
                            width={24}
                            height={24}
                            currentColor='black'
                        />
                    </button>
                </div>
            )}
        </div>
    );
}

const navButtonStyle = css({
    cursor: 'pointer',
    display: 'flex',
    transition: 'opacity 0.2s',
    '&.swiper-button-disabled': {
        opacity: 0.2,
        cursor: 'not-allowed',
    },
});

const paginationStyle = css({
    fontSize: '1.6rem',
    fontWeight: '500',
    color: 'gray40',
    fontFamily: 'number',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    width: 'auto !important',
    position: 'static !important',
});
