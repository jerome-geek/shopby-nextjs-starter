'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import type { Swiper as SwiperType } from 'swiper';
import { Autoplay, EffectCoverflow, Navigation } from 'swiper/modules';
import { SwiperOptions } from 'swiper/types';

import useMediaQuery from '@/hooks/useMediaQuery';
import { Banner } from '@/models/display/banner';

type UseHeroBannerSwiperProps = {
    banners: Banner[];
};

const AUTOPLAY_CONFIG = {
    delay: 3000,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
} as const;

export const useHeroBannerSwiper = ({ banners }: UseHeroBannerSwiperProps) => {
    const swiperRef = useRef<SwiperType | null>(null);
    const mediaQueryResult = useMediaQuery('(max-width: 767px)');
    const isMobile = mediaQueryResult === true;
    const isMediaQueryReady = mediaQueryResult !== null;
    const hasMultipleBanners = banners.length > 1;

    const [currentSlide, setCurrentSlide] = useState(1);
    const [isAutoplayPaused, setIsAutoplayPaused] = useState(false);

    const swiperKey = isMobile ? 'mobile' : 'desktop';

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

    const handleNavigationClick = (direction: 'prev' | 'next') => {
        if (isMobile) {
            return;
        }
        const swiper = swiperRef.current;
        if (!swiper) {
            return;
        }

        direction === 'prev' ? swiper.slidePrev() : swiper.slideNext();
    };

    const swiperOptions: SwiperOptions = useMemo(() => {
        const autoplayConfig =
            hasMultipleBanners && (isMobile || !isAutoplayPaused)
                ? AUTOPLAY_CONFIG
                : false;

        return {
            modules: isMobile
                ? [EffectCoverflow, Autoplay]
                : [Navigation, Autoplay],
            effect: isMobile ? 'coverflow' : 'slide',
            slidesPerView: isMobile ? 1.2 : 3.5,
            spaceBetween: isMobile ? 12 : 18,
            centeredSlides: true,
            loop: hasMultipleBanners,
            watchOverflow: true,
            autoplay: autoplayConfig,
            navigation: !isMobile
                ? {
                      nextEl: '.swiper-button-next-custom',
                      prevEl: '.swiper-button-prev-custom',
                  }
                : false,
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
            onSwiper: (swiper: SwiperType) => {
                swiperRef.current = swiper;
            },
            onSlideChange: (swiper: SwiperType) => {
                setCurrentSlide(swiper.realIndex + 1);
            },
        };
    }, [isMobile, hasMultipleBanners, isAutoplayPaused]);

    useEffect(() => {
        const swiper = swiperRef.current;

        if (!swiper?.autoplay || isMobile || !hasMultipleBanners) {
            return;
        }

        if (isAutoplayPaused && swiper.autoplay.running) {
            swiper.autoplay.stop();
            return;
        }

        if (!isAutoplayPaused && !swiper.autoplay.running) {
            swiper.autoplay.start();
        }
    }, [isAutoplayPaused, isMobile, hasMultipleBanners]);

    return {
        swiperRef,
        swiperKey,
        swiperOptions,
        currentSlide,
        isAutoplayPaused,
        handleToggleAutoplay,
        handleNavigationClick,
        showDesktopControls: !isMobile && hasMultipleBanners,
        isMediaQueryReady,
    };
};
