import { isEmpty } from '@fxts/core';
import { useState } from 'react';
import type { SwiperClass } from 'swiper/react';
import { Swiper, SwiperSlide } from 'swiper/react';

import * as styles from '@/components/layer-contents/photo-review-list/detail/gallery/index.css';

import 'swiper/css';

export const ImageGallery = ({
    images,
    onImageClick,
}: {
    images: string[];
    onImageClick: (src: string) => void;
}) => {
    const [activeIndex, setActiveIndex] = useState(0);

    if (isEmpty(images)) {
        return null;
    }

    return (
        <div className={styles.gallery} aria-label='리뷰 이미지'>
            <Swiper
                className={styles.gallerySwiper}
                slidesPerView={1}
                watchOverflow
                onSwiper={(swiper: SwiperClass) => {
                    setActiveIndex(swiper.activeIndex ?? 0);
                }}
                onSlideChange={(swiper: SwiperClass) => {
                    setActiveIndex(swiper.activeIndex ?? 0);
                }}
            >
                {images.map((url, idx) => (
                    <SwiperSlide key={`${url}-${idx}`}>
                        <button
                            type='button'
                            className={styles.slideButton}
                            onClick={() => onImageClick(url)}
                        >
                            <div className={styles.slideInner}>
                                <img
                                    className={styles.slideImg}
                                    src={url}
                                    alt='리뷰 첨부 이미지'
                                    loading='lazy'
                                />
                                <div className={styles.fraction}>
                                    {activeIndex + 1}/{images.length}
                                </div>
                            </div>
                        </button>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};
