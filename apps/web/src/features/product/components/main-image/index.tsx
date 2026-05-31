import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useMemo, useState } from 'react';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { Swiper, SwiperClass, SwiperProps, SwiperSlide } from 'swiper/react';

import * as styles from '@/features/product/components/main-image/index.css';
import { useProductDetail } from '@/hooks/suspenseQuery/product/product';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';

export const ProductMainImage = ({ productNo }: { productNo: number }) => {
    const { data: productDetailData } = useProductDetail({
        productNo,
    });

    const imageUrls = productDetailData?.baseInfo?.imageUrls || [];

    const [activeThumbIndex, setActiveThumbIndex] = useState(0);
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);
    const [mainSwiper, setMainSwiper] = useState<SwiperClass | null>(null);

    // 💡 수동 동기화 함수: 썸네일 클릭 시 메인 이미지 이동
    const handleThumbClick = (index: number) => {
        if (mainSwiper && !mainSwiper.destroyed) {
            mainSwiper.slideTo(index);
            setActiveThumbIndex(index);
        }
    };

    const mainSwiperSettings = useMemo<SwiperProps>(
        () => ({
            modules: [FreeMode, Navigation, Thumbs],
            navigation: {
                prevEl: '.swiper-prev',
                nextEl: '.swiper-next',
            },
            pagination: {
                enabled: true,
                el: '.product-swiper-pagination',
                type: 'progressbar',
            },
            observer: true,
            observeParents: true,
            onSlideChange: (swiper: SwiperClass) => {
                setActiveThumbIndex(swiper.activeIndex);
                // 💡 메인이 바뀌면 썸네일 스와이퍼도 해당 위치로 강제 이동
                if (thumbsSwiper && !thumbsSwiper.destroyed) {
                    thumbsSwiper.slideTo(swiper.activeIndex);
                }
            },
            style: {
                width: '100%',
            },
        }),
        [thumbsSwiper],
    );

    const thumbsSwiperSettings = useMemo<SwiperProps>(
        () => ({
            modules: [FreeMode, Thumbs],
            freeMode: true,
            watchSlidesProgress: true,
            slidesPerView: 'auto',
            direction: 'horizontal',
            spaceBetween: 16,
            slideToClickedSlide: true,
        }),
        [],
    );

    return (
        <div className={styles.container}>
            <div className={styles.swiperWrapper}>
                {/* 메인 이미지 스와이퍼 */}
                <div
                    className={styles.mainSwiperContainer}
                    style={{ position: 'relative' }}
                >
                    <Swiper
                        {...mainSwiperSettings}
                        onSwiper={setMainSwiper}
                        thumbs={{
                            swiper:
                                thumbsSwiper && !thumbsSwiper.destroyed
                                    ? thumbsSwiper
                                    : null,
                        }}
                        className={styles.mainSwiper}
                    >
                        {imageUrls.map((url) => {
                            return (
                                <SwiperSlide key={url}>
                                    <div className={styles.imageWrapper}>
                                        <img
                                            src={url}
                                            alt=''
                                            className={styles.thumbnail}
                                        />
                                    </div>
                                </SwiperSlide>
                            );
                        })}
                    </Swiper>
                </div>

                {/* 세로형 썸네일 스와이퍼 (데스크탑 전용) */}
                <div className={styles.thumbsSwiperContainer}>
                    <Swiper
                        {...thumbsSwiperSettings}
                        onSwiper={setThumbsSwiper}
                        direction='vertical'
                        className={styles.thumbsSwiper}
                    >
                        {imageUrls.map((url, index) => {
                            return (
                                <SwiperSlide
                                    key={`thumb-${url}`}
                                    className={styles.thumbSlide}
                                >
                                    <div
                                        className={`${
                                            styles.thumbImageWrapper
                                        } ${
                                            activeThumbIndex === index
                                                ? styles.activeThumb
                                                : ''
                                        }`}
                                        onClick={() => handleThumbClick(index)}
                                    >
                                        <img
                                            src={url}
                                            alt=''
                                            className={styles.thumbImage}
                                        />
                                    </div>
                                </SwiperSlide>
                            );
                        })}
                    </Swiper>
                </div>
            </div>
        </div>
    );
};
