'use client';

import Image from 'next/image';
import { useMemo, useState } from 'react';
import { FreeMode, Navigation, Pagination, Thumbs } from 'swiper/modules';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';

import { BREAKPOINTS } from '@/const/breakpoints';
import { css } from '@/styled-system/css';
import { aspectRatio } from '@/styled-system/patterns';
import { token } from '@/styled-system/tokens';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';

interface ProductMainImageProps {
    imageUrls: string[];
}

const swiperPaginationStyles = css({
    '--swiper-theme-color': token('colors.black'),
    '--swiper-pagination-progressbar-bg-color': token('colors.white'),
    '--swiper-pagination-progressbar-size': '4px',
    display: { base: 'block', md: 'none' },
    position: 'absolute',
    bottom: '0 !important',
    top: 'auto !important',
    left: 0,
    width: '100%',
    height: '4px',
    zIndex: 10,
});

export default function ProductMainImage({ imageUrls }: ProductMainImageProps) {
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);

    const normalizedImageUrls = useMemo(
        () =>
            imageUrls.map((url) =>
                url.startsWith('//') ? `https:${url}` : url
            ),
        [imageUrls]
    );

    return (
        <div
            className={css({
                width: '100%',
                minWidth: 0,
                height: 'fit-content',
                display: 'grid',
                gridTemplateColumns: { base: '1fr', md: '1fr 78px' },
                gap: { base: '0', md: '24px' },
            })}
        >
            <div
                className={css({
                    position: 'relative',
                    minWidth: 0, // Swiper in grid container fix
                    borderRadius: { base: '0px', md: '24px' },
                    overflow: 'hidden',
                    backgroundColor: '#F3F3F3',
                })}
            >
                <Swiper
                    modules={[FreeMode, Thumbs, Pagination]}
                    pagination={{
                        el: '.product-swiper-pagination',
                        type: 'progressbar',
                    }}
                    thumbs={{ swiper: thumbsSwiper }}
                    breakpoints={{
                        [BREAKPOINTS.MD]: {
                            pagination: {
                                enabled: false,
                            },
                        },
                    }}
                    className={css({ width: '100%' })}
                >
                    {normalizedImageUrls.map((url) => {
                        return (
                            <SwiperSlide key={url}>
                                <div
                                    className={aspectRatio({
                                        ratio: {
                                            base: 375 / 472,
                                            md: 588 / 741,
                                        },
                                        position: 'relative',
                                    })}
                                >
                                    <ImageWithFadeIn
                                        src={url}
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        alt="product detail image"
                                    />
                                </div>
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
                <div
                    className={`${swiperPaginationStyles} product-swiper-pagination`}
                />
            </div>

            <div
                className={css({
                    display: { base: 'none', md: 'block' },
                    width: '100%',
                    position: 'relative',
                })}
            >
                <Swiper
                    modules={[FreeMode, Navigation, Thumbs]}
                    onSwiper={setThumbsSwiper}
                    direction="vertical"
                    spaceBetween={12}
                    freeMode
                    watchSlidesProgress
                    slidesPerView={6.5}
                    style={{ height: '100%' }}
                >
                    {normalizedImageUrls.map((url) => {
                        return (
                            <SwiperSlide
                                key={url}
                                className={css({
                                    width: '100%',
                                    aspectRatio: '78 / 98', // 78px * 98px design ratio
                                    borderRadius: '8px',
                                    overflow: 'hidden',
                                    border: '2px solid transparent',
                                    cursor: 'pointer',
                                    '&.swiper-slide-thumb-active': {
                                        borderColor: token('colors.black'),
                                    },
                                })}
                            >
                                <img
                                    src={url}
                                    className={css({
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                    })}
                                />
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
            </div>
        </div>
    );
}

function ImageWithFadeIn({
    src,
    sizes,
    alt,
}: {
    src: string;
    sizes: string;
    alt: string;
}) {
    return (
        <Image
            src={src}
            alt={alt}
            fill={true}
            sizes={sizes}
            onLoad={(e) => {
                if (e.currentTarget.src.indexOf('data:image/') < 0) {
                    e.currentTarget.style.opacity = '1';
                }
            }}
            style={{
                opacity: 0,
                transition: 'opacity 0.4s ease-in-out',
                objectFit: 'contain',
            }}
        />
    );
}
