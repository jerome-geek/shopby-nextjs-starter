'use client';

import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import Link from 'next/link';
import { Suspense, useMemo, useRef, useState } from 'react';
import type { Swiper as SwiperType } from 'swiper';
import {
    Autoplay,
    EffectCoverflow,
    Navigation,
    Pagination,
} from 'swiper/modules';
import { Swiper, SwiperProps, SwiperSlide } from 'swiper/react';
import { useMediaQuery } from 'usehooks-ts';

import useBannerList from '@/hooks/suspenseQuery/display/banner/useBannerList';
import type { Banner } from '@/models/display/banner';
import { BREAKPOINTS } from '@/styles/media';
import { getLandingUrl, getLinkTarget } from '@/utils/banner';
import { extractBannerContents, normalizeImageUrl } from '@/utils/shopby';
import * as styles from './HeroBanner.css';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const BANNER_ID = 'HERO-BANNER';

function HeroBannerContent() {
    const { data: banners } = useBannerList<Banner[]>({
        type: 'id',
        banners: [BANNER_ID],
        options: {
            select: extractBannerContents,
        },
    });
    const isMobile = useMediaQuery(`(max-width: ${BREAKPOINTS.SM - 1}px)`);
    const swiperRef = useRef<SwiperType | null>(null);

    const hasMultipleBanners = banners.length > 1;
    const [isAutoPlaying, setIsAutoPlaying] = useState(false);

    const swiperOptions: SwiperProps = useMemo(
        () => ({
            modules: [Autoplay, Navigation, Pagination, EffectCoverflow],
            effect: isMobile ? 'coverflow' : 'slide',
            coverflowEffect: isMobile
                ? {
                      rotate: 0,
                      stretch: 0,
                      depth: 60,
                      scale: 0.95,
                      modifier: 1,
                      slideShadows: false,
                  }
                : undefined,
            spaceBetween: isMobile ? 12 : 24,
            slidesPerView: isMobile ? 'auto' : 3,
            centeredSlides: true,
            loop: hasMultipleBanners,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            grabCursor: true,
            pagination: {
                type: 'progressbar',
                el: `.${styles.swiperPagination}`,
                renderProgressbar: (progressbarFillClass: string) => {
                    return '<span class="' + progressbarFillClass + '"></span>';
                },
            },
            navigation: {
                prevEl: `.${styles.navPrev}`,
                nextEl: `.${styles.navNext}`,
            },
            style: { overflow: 'visible' },
            onSwiper: (swiper) => (swiperRef.current = swiper),
            onSlideChange: (swiper: SwiperType) => {
                console.log('🚀 ~ HeroBannerContent ~ swiper1111:', swiper);
            },
        }),
        [isMobile, hasMultipleBanners],
    );

    const onAutoPlayButtonClick = () => {
        const swiper = swiperRef.current;

        if (!swiper?.autoplay) {
            return;
        }

        setIsAutoPlaying((prev) => {
            if (prev) {
                swiper.autoplay?.stop();
            } else {
                swiper.autoplay?.start();
            }
            return !prev;
        });
    };

    if (banners.length === 0) {
        return <HeroBannerSkeleton />;
    }

    return (
        <section className={styles.heroBanner}>
            <div className={styles.swiperContainer}>
                <Swiper
                    key={`${banners.length}-${isMobile}`}
                    {...swiperOptions}
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

            {/* Pagination & Controls - Only visible on PC */}
            <div className={styles.controls}>
                <div className={styles.progressBox}>
                    <div className={styles.swiperPagination}></div>
                </div>

                <div className={styles.arrowBox}>
                    <button
                        className={`${styles.navButton} ${styles.navPrev}`}
                        onClick={() => swiperRef.current?.slidePrev()}
                        aria-label="이전 배너"
                    >
                        <ChevronLeft />
                    </button>

                    <button
                        className={`${styles.navButton} ${styles.navNext}`}
                        onClick={() => swiperRef.current?.slideNext()}
                        aria-label="다음 배너"
                    >
                        <ChevronRight />
                    </button>

                    <div className={styles.separator} />

                    <button
                        className={styles.controlButton}
                        onClick={onAutoPlayButtonClick}
                        aria-label={isAutoPlaying ? '일시정지' : '재생'}
                    >
                        {isAutoPlaying ? <Pause /> : <Play />}
                    </button>
                </div>
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
