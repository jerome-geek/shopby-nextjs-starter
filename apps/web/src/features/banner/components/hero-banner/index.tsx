'use client';

import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import Link from 'next/link';
import { useMemo, useRef, useState } from 'react';
import type { Swiper as SwiperType } from 'swiper';
import {
    Autoplay,
    EffectCoverflow,
    Navigation,
    Pagination,
} from 'swiper/modules';
import { Swiper, SwiperProps, SwiperSlide } from 'swiper/react';

import FetchBoundary from '@/components/common/FetchBoundary';
import ImageWrapper from '@/components/ui/image';
import * as styles from '@/features/banner/components/hero-banner/index.css';
import { BREAKPOINTS } from '@/styles/media';
import { getLandingUrl, getLinkTarget } from '@/utils/banner';
import {
    extractBannerContentsByAccountIndex,
    normalizeImageUrl,
} from '@/utils/shopby';

import { useBannerList } from '@/hooks/suspenseQuery/display/banner';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export type HeroBannerType = 'HOME' | 'SHOP' | 'KIDS' | 'LIFE';
export const BANNER_ID_PREFIX = 'MAIN-BANNER';

const HeroBannerContent = ({ type }: { type: HeroBannerType }) => {
    const { data: bannerListData } = useBannerList({
        type: 'id',
        banners: [`${BANNER_ID_PREFIX}-${type}`],
        options: {
            select: (data) => extractBannerContentsByAccountIndex(data, 0),
        },
    });
    const isBannerListVisible = bannerListData.length > 0;
    const hasMultipleBanners = bannerListData.length > 1;

    const swiperRef = useRef<SwiperType | null>(null);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const [isSwiperReady, setIsSwiperReady] = useState(false);

    const swiperOptions: SwiperProps = useMemo(
        () => ({
            modules: [Autoplay, Navigation, Pagination, EffectCoverflow],
            // NOTE: 반응형 옵션 변경은 Swiper breakpoints로 처리 (리마운트 방지)
            effect: 'coverflow',
            coverflowEffect: {
                rotate: 0,
                stretch: 0,
                depth: 60,
                scale: 0.95,
                modifier: 1,
                slideShadows: false,
            },
            spaceBetween: 12,
            slidesPerView: 1.05,
            centeredSlides: true,
            loop: hasMultipleBanners,
            watchSlidesProgress: true,
            autoplay: isAutoPlaying
                ? {
                      delay: 3000,
                      disableOnInteraction: false,
                      pauseOnMouseEnter: true,
                  }
                : false,
            grabCursor: true,
            pagination: {
                el: `.${styles.swiperPagination}`,
                type: 'progressbar',
            },
            navigation: {
                prevEl: `.${styles.navPrev}`,
                nextEl: `.${styles.navNext}`,
            },
            style: { overflow: 'visible' },
            onSwiper: (swiper) => {
                swiperRef.current = swiper;
                setIsSwiperReady(true);
            },
            onResize: (swiper) => {
                // 리사이즈 시 레이아웃 재계산을 즉시 반영 (transition에 덜 영향 받게)
                swiper.update();
            },
            onBreakpoint: (swiper) => {
                // 브레이크포인트 전환 시 effect/레이아웃 갱신
                swiper.update();
            },
            breakpoints: {
                0: {
                    slidesPerView: 1.05,
                    spaceBetween: 12,
                    coverflowEffect: {
                        rotate: 0,
                        stretch: 0,
                        depth: 60,
                        scale: 0.95,
                        modifier: 1,
                        slideShadows: false,
                    },
                },
                [BREAKPOINTS.SM]: {
                    slidesPerView: 3,
                    spaceBetween: 24,
                    coverflowEffect: {
                        rotate: 0,
                        stretch: 0,
                        depth: 0,
                        scale: 1,
                        modifier: 1,
                        slideShadows: false,
                    },
                },
            },
        }),
        [hasMultipleBanners, isAutoPlaying],
    );

    const handleAutoPlayButtonClick = () => {
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

    if (!isBannerListVisible) {
        return null;
    }

    return (
        <section className={styles.container}>
            <div className={styles.heroBanner}>
                <div className={styles.swiperContainer}>
                    {/* NOTE : 스와이퍼 준비 전 스켈레톤 노출 */}
                    {!isSwiperReady && (
                        <div
                            style={{
                                position: 'absolute',
                                inset: 0,
                                zIndex: 1,
                            }}
                        >
                            <HeroBannerSkeletonCards />
                        </div>
                    )}

                    <Swiper
                        {...swiperOptions}
                        style={{
                            ...swiperOptions.style,
                            visibility: isSwiperReady ? 'visible' : 'hidden',
                        }}
                    >
                        {bannerListData.map((banner, index) => (
                            <SwiperSlide
                                key={
                                    banner.bannerNo || banner.imageUrl || index
                                }
                                className={styles.slide}
                            >
                                <Link
                                    href={getLandingUrl({
                                        landingUrl: banner.landingUrl,
                                        landingUrlType: banner.landingUrlType,
                                    })}
                                    target={getLinkTarget(
                                        banner.browerTargetType,
                                    )}
                                    rel={
                                        banner.browerTargetType === 'NEW'
                                            ? 'noopener noreferrer'
                                            : undefined
                                    }
                                    className={styles.card}
                                >
                                    <ImageWrapper
                                        src={
                                            normalizeImageUrl(
                                                banner.imageUrl || '',
                                            ) || ''
                                        }
                                        alt={banner.name || '배너 이미지'}
                                        loading='eager'
                                    />
                                    <div className={styles.cardContent}>
                                        <h3
                                            className={styles.cardTitle}
                                            style={{
                                                color:
                                                    banner.nameColor ||
                                                    '#ffffff',
                                            }}
                                            dangerouslySetInnerHTML={{
                                                __html: banner.name,
                                            }}
                                        />
                                        {banner.description && (
                                            <p
                                                className={
                                                    styles.cardDescription
                                                }
                                                style={{
                                                    color:
                                                        banner.descriptionColor ||
                                                        '#ffffff',
                                                }}
                                                dangerouslySetInnerHTML={{
                                                    __html: banner.description,
                                                }}
                                            />
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
                            aria-label='이전 배너'
                        >
                            <ChevronLeft />
                        </button>

                        <button
                            className={`${styles.navButton} ${styles.navNext}`}
                            onClick={() => swiperRef.current?.slideNext()}
                            aria-label='다음 배너'
                        >
                            <ChevronRight />
                        </button>

                        <div className={styles.separator} />

                        <button
                            className={styles.controlButton}
                            onClick={handleAutoPlayButtonClick}
                            aria-label={isAutoPlaying ? '일시정지' : '재생'}
                        >
                            {isAutoPlaying ? <Pause /> : <Play />}
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

const HeroBannerSkeletonCards = () => {
    return (
        <div className={styles.skeletonWrapper}>
            {[0, 1, 2].map((i) => (
                <div key={i} className={styles.skeletonCard}>
                    <div className={styles.skeletonImage} />
                    <div className={styles.skeletonContent}>
                        <div className={styles.skeletonTitle} />
                        <div className={styles.skeletonDescription} />
                    </div>
                </div>
            ))}
        </div>
    );
};

const HeroBannerSkeleton = () => {
    return (
        <section className={styles.container}>
            <div className={styles.heroBanner}>
                <div className={styles.swiperContainer}>
                    <HeroBannerSkeletonCards />
                </div>
                <div className={styles.skeletonControls} />
            </div>
        </section>
    );
};

export const HeroBanner = ({ type }: { type: HeroBannerType }) => {
    return (
        <FetchBoundary fallback={<HeroBannerSkeleton />} errorFallback={<></>}>
            <HeroBannerContent type={type} />
        </FetchBoundary>
    );
};
