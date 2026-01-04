'use client';

import { useMemo, useState } from 'react';
import { FreeMode, Navigation, Thumbs, Pagination } from 'swiper/modules';
import { Swiper, SwiperClass, SwiperProps, SwiperSlide } from 'swiper/react';

import { BREAKPOINTS } from '@/const/breakpoints';
import { css } from '@/styled-system/css';
import { aspectRatio } from '@/styled-system/patterns';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/pagination';

interface ProductMainImageProps {
    imageUrls: string[];
}

export default function ProductMainImage({ imageUrls }: ProductMainImageProps) {
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);

    const mainSwiperSettings = useMemo<SwiperProps>(
        () => ({
            modules: [FreeMode, Navigation, Thumbs, Pagination],
            pagination: { enabled: true, el: '.product-swiper-pagination' },
            navigation: true,
            thumbs: { swiper: thumbsSwiper },
        }),
        [thumbsSwiper]
    );

    const thumbsSwiperSettings = useMemo<SwiperProps>(
        () => ({
            modules: [FreeMode, Navigation, Thumbs, Pagination],
            freeMode: true,
            watchSlidesProgress: true,
            slidesPerView: 4,
            direction: 'horizontal',
            onSwiper: setThumbsSwiper,
            slideToClickedSlide: true,
            style: {
                width: '100%',
            },
            breakpoints: {
                [BREAKPOINTS.MD]: {
                    direction: 'vertical',
                    style: {
                        width: '20%',
                    },
                },
            },
        }),
        []
    );

    return (
        <div
            className={css({
                width: '100%',
                height: 'fit-content',
                display: 'flex',
                flexDirection: 'column-reverse',

                gap: '12px',
                md: {
                    flexDirection: 'row',
                },
            })}
        >
            <Swiper
                {...thumbsSwiperSettings}
                className={css({
                    width: '100%',
                    md: {
                        width: '80px !important',
                        height: '400px',
                    },
                })}
            >
                {imageUrls.map((url) => {
                    return (
                        <SwiperSlide
                            key={url}
                            className={aspectRatio({ ratio: 1 / 1 })}
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

            <div
                className={css({
                    flex: 1,
                    position: 'relative',
                    minWidth: 0, // Swiper in flex container fix
                })}
            >
                <Swiper {...mainSwiperSettings}>
                    {imageUrls.map((url) => {
                        return (
                            <SwiperSlide key={url}>
                                <div className={aspectRatio({ ratio: 1 / 1 })}>
                                    <img
                                        src={url}
                                        className={css({
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'contain',
                                        })}
                                    />
                                </div>
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
                <div
                    className="product-swiper-pagination"
                    style={{ marginTop: '10px', textAlign: 'center' }}
                />
            </div>
        </div>
    );
}
