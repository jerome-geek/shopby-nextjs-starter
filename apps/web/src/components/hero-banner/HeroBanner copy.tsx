'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Suspense, useState, useCallback, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import {
    Autoplay,
    Navigation,
    EffectCoverflow,
    Pagination,
} from 'swiper/modules';

import useBannerList from '@/hooks/suspenseQuery/display/banner/useBannerList';
import type { Banner } from '@/models/display/banner';
import * as styles from './HeroBanner.css';
import { normalizeImageUrl, extractBannerContents } from '@/utils/shopby';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
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
    console.log('🚀 ~ HeroBannerContent ~ banners:', banners);
    const swiperRef = useRef<SwiperType | null>(null);

    const hasMultipleBanners = banners.length > 1;
    const [currentIndex, setCurrentIndex] = useState(1);
    const [isAutoplayPaused, setIsAutoplayPaused] = useState(false);

    const handleSlideChange = useCallback((swiper: SwiperType) => {
        setCurrentIndex(swiper.realIndex + 1);
    }, []);

    const handleToggleAutoplay = () => {
        const swiper = swiperRef.current;

        if (!swiper?.autoplay) {
            return;
        }

        setIsAutoplayPaused((prev) => {
            if (prev) {
                swiper.autoplay?.start();
            } else {
                swiper.autoplay?.stop();
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
                    modules={[
                        Autoplay,
                        Navigation,
                        Pagination,
                        // EffectCoverflow
                    ]}
                    spaceBetween={24}
                    slidesPerView={3}
                    centeredSlides
                    loop={hasMultipleBanners}
                    // loopAdditionalSlides={-1}
                    grabCursor
                    pagination={{
                        type: 'progressbar',
                        el: `.${styles.swiperPagination}`,
                        // renderProgressbar: (progressbarFillClass) => {
                        //     return (
                        //         '<span class="' +
                        //         progressbarFillClass +
                        //         '"></span>'
                        //     );
                        // },
                    }}
                    navigation={{
                        prevEl: `.${styles.navPrev}`,
                        nextEl: `.${styles.navNext}`,
                    }}
                    onSwiper={(swiper) => (swiperRef.current = swiper)}
                    onSlideChange={handleSlideChange}
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
                        onClick={handleToggleAutoplay}
                        aria-label={isAutoplayPaused ? '재생' : '일시정지'}
                    >
                        {isAutoplayPaused ? (
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                            >
                                <path d="M8 5v14l11-7z" />
                            </svg>
                        ) : (
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                            >
                                <rect
                                    x="7"
                                    y="5"
                                    width="2"
                                    height="14"
                                    fill="currentColor"
                                />
                                <rect
                                    x="15"
                                    y="5"
                                    width="2"
                                    height="14"
                                    fill="currentColor"
                                />
                            </svg>
                        )}
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
