'use client';

import { Suspense, useState, useCallback } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import { Autoplay, Navigation, EffectCoverflow } from 'swiper/modules';

import useBannerList from '@/hooks/suspenseQuery/display/banner/useBannerList';
import type { Banner } from '@/models/display/banner';
import * as styles from './HeroBanner.css';
import { normalizeImageUrl, extractBannerContents } from '@/utils/shopby';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow';
import Link from 'next/link';
import { getLandingUrl, getLinkTarget } from '@/utils/banner';

const BANNER_ID = 'HERO-BANNER';

function HeroBannerContent() {
    const { data: banners } = useBannerList<Banner[]>({
        type: 'id',
        banners: [BANNER_ID],
        options: {
            select: extractBannerContents,
        },
    });
    const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(
        null,
    );
    const [currentIndex, setCurrentIndex] = useState(1);
    const [isPlaying, setIsPlaying] = useState(true);

    const handleSlideChange = useCallback((swiper: SwiperType) => {
        setCurrentIndex(swiper.realIndex + 1);
    }, []);

    const toggleAutoplay = useCallback(() => {
        if (!swiperInstance) return;

        if (isPlaying) {
            swiperInstance.autoplay.stop();
        } else {
            swiperInstance.autoplay.start();
        }
        setIsPlaying(!isPlaying);
    }, [swiperInstance, isPlaying]);

    if (banners.length === 0) {
        return <HeroBannerSkeleton />;
    }

    const totalSlides = banners.length;

    return (
        <section className={styles.heroBanner}>
            <div className={styles.swiperContainer}>
                <Swiper
                    modules={[Autoplay, Navigation, EffectCoverflow]}
                    spaceBetween={12}
                    slidesPerView={1.1}
                    loop
                    centeredSlides
                    grabCursor
                    effect={'coverflow'}
                    coverflowEffect={{
                        // rotate: 0,
                        // stretch: 25,
                        // depth: 100,
                        // modifier: 1.2,
                        // slideShadows: false,
                        rotate: 30,
                        stretch: 25,
                        depth: 130,
                        modifier: 1,
                        slideShadows: false,
                    }}
                    // autoplay={{
                    //     delay: 4000,
                    //     disableOnInteraction: false,
                    // }}
                    navigation={{
                        prevEl: `.${styles.navPrev}`,
                        nextEl: `.${styles.navNext}`,
                    }}
                    onSwiper={setSwiperInstance}
                    onSlideChange={handleSlideChange}
                    className={styles.swiper}
                >
                    {banners.map((banner) => (
                        <SwiperSlide
                            key={banner.bannerNo}
                            className={styles.slide}
                        >
                            <Link
                                href={getLandingUrl({
                                    landingUrl: banner.landingUrlType,
                                    landingUrlType: banner.landingUrlType,
                                })}
                                target={getLinkTarget(banner.browerTargetType)}
                                rel={
                                    banner.browerTargetType === 'NEW'
                                        ? 'noopener noreferrer'
                                        : undefined
                                }
                                className={styles.card}
                            >
                                <img
                                    src={normalizeImageUrl(banner.imageUrl)}
                                    alt={banner.name || '배너 이미지'}
                                    className={styles.cardImage}
                                />
                                <div className={styles.cardContent}>
                                    <h3
                                        className={styles.cardTitle}
                                        style={{
                                            color:
                                                banner.nameColor || '#ffffff',
                                        }}
                                    >
                                        {banner.name}
                                    </h3>
                                    {banner.description && (
                                        <p
                                            className={styles.cardDescription}
                                            style={{
                                                color:
                                                    banner.descriptionColor ||
                                                    '#ffffff',
                                            }}
                                        >
                                            {banner.description}
                                        </p>
                                    )}
                                </div>
                            </Link>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {/* Pagination & Controls */}
            <div className={styles.controls}>
                <button
                    className={styles.controlButton}
                    onClick={() => swiperInstance?.slidePrev()}
                    aria-label="이전 배너"
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path
                            d="M15 18L9 12L15 6"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </button>

                <span className={styles.pageIndicator}>
                    {currentIndex} / {totalSlides}
                </span>

                <button
                    className={styles.controlButton}
                    onClick={() => swiperInstance?.slideNext()}
                    aria-label="다음 배너"
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path
                            d="M9 18L15 12L9 6"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </button>

                <button
                    className={styles.controlButton}
                    onClick={toggleAutoplay}
                    aria-label={isPlaying ? '일시정지' : '재생'}
                >
                    {isPlaying ? (
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                        >
                            <rect
                                x="6"
                                y="4"
                                width="4"
                                height="16"
                                fill="currentColor"
                            />
                            <rect
                                x="14"
                                y="4"
                                width="4"
                                height="16"
                                fill="currentColor"
                            />
                        </svg>
                    ) : (
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                        >
                            <path d="M8 5v14l11-7z" />
                        </svg>
                    )}
                </button>
            </div>
        </section>
    );
}

function HeroBannerSkeleton() {
    return (
        <section className={styles.heroBanner}>
            <div className={styles.swiperContainer}>
                <div className={styles.skeletonWrapper}>
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className={styles.skeletonCard}>
                            <div className={styles.skeletonImage} />
                            <div className={styles.skeletonContent}>
                                <div className={styles.skeletonTitle} />
                                <div className={styles.skeletonDescription} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export function HeroBanner() {
    return (
        <Suspense fallback={<HeroBannerSkeleton />}>
            <HeroBannerContent />
        </Suspense>
    );
}
