'use client';

import { useMemo, useRef, useState } from 'react';
import type { Swiper as SwiperType } from 'swiper';
import {
    A11y,
    Navigation,
    Pagination as SwiperPagination,
} from 'swiper/modules';
import type { SwiperOptions } from 'swiper/types';

import useMediaQuery from '@/hooks/useMediaQuery';
import { ProductSectionProduct } from '@/models/display/productSection';

type UseProductDisplaySwiperProps = {
    products: ProductSectionProduct[];
};

const DESKTOP_SLIDES_PER_VIEW = 6;
const MOBILE_SLIDES_PER_VIEW = 2.5;

export const useProductDisplaySwiper = ({
    products,
}: UseProductDisplaySwiperProps) => {
    const swiperRef = useRef<SwiperType | null>(null);
    const mediaQueryResult = useMediaQuery('(max-width: 768px)');
    const isMobile = mediaQueryResult === true;
    const isMediaQueryReady = mediaQueryResult !== null;

    const [currentPage, setCurrentPage] = useState(1);

    // 최소 3개, 최대 12개로 제한
    const limitedProducts = products.slice(
        0,
        Math.max(3, Math.min(12, products.length)),
    );

    // 데스크탑 총 페이지 수 계산
    const desktopTotalPages = Math.ceil(
        limitedProducts.length / DESKTOP_SLIDES_PER_VIEW,
    );

    // 데스크탑용: 6의 배수로 맞추기 위해 빈 슬라이드 추가
    // 예: 8개 상품 → 12개 슬라이드 (8개 상품 + 4개 빈 슬라이드)
    const productsWithEmptySlides =
        mediaQueryResult === null || isMobile
            ? limitedProducts
            : (() => {
                  const totalSlides =
                      Math.ceil(
                          limitedProducts.length / DESKTOP_SLIDES_PER_VIEW,
                      ) * DESKTOP_SLIDES_PER_VIEW;
                  const emptySlidesCount = totalSlides - limitedProducts.length;

                  return [
                      ...limitedProducts,
                      ...Array(emptySlidesCount).fill(null),
                  ];
              })();

    const swiperKey = isMobile ? 'mobile' : 'desktop';

    // Navigation 핸들러 (데스크탑 전용)
    const handleNavigationClick = (direction: 'prev' | 'next') => {
        if (isMobile) {
            return;
        }

        const swiper = swiperRef.current;
        if (!swiper) {
            return;
        }

        const currentIndex = swiper.activeIndex;
        const targetIndex =
            direction === 'prev'
                ? Math.max(currentIndex - DESKTOP_SLIDES_PER_VIEW, 0)
                : Math.min(
                      currentIndex + DESKTOP_SLIDES_PER_VIEW,
                      swiper.slides.length - DESKTOP_SLIDES_PER_VIEW,
                  );

        swiper.slideTo(targetIndex);
    };

    const swiperOptions: SwiperOptions = useMemo(() => {
        return {
            modules: [Navigation, A11y, SwiperPagination],
            slidesPerView: isMobile
                ? MOBILE_SLIDES_PER_VIEW
                : DESKTOP_SLIDES_PER_VIEW,
            slidesPerGroup: isMobile ? 1 : DESKTOP_SLIDES_PER_VIEW,
            spaceBetween: isMobile ? 10 : 20,
            slidesOffsetBefore: isMobile ? 20 : 0,
            slidesOffsetAfter: isMobile ? 20 : 0,
            speed: isMobile ? undefined : 300,
            navigation: false,
            pagination: false,
            loop: false,
            watchSlidesProgress: !isMobile,
            watchOverflow: true,
            observer: !isMobile,
            observeParents: !isMobile,
            updateOnWindowResize: !isMobile,
            touchEventsTarget: 'container',
            onSwiper: (swiper: SwiperType) => {
                swiperRef.current = swiper;
            },
            onSlideChange: !isMobile
                ? (swiper: SwiperType) => {
                      // 실제 페이지 번호 계산 (6개씩 묶음 기준)
                      const page =
                          Math.floor(
                              swiper.activeIndex / DESKTOP_SLIDES_PER_VIEW,
                          ) + 1;

                      setCurrentPage(page);
                  }
                : undefined,
        };
    }, [mediaQueryResult, isMobile]);

    return {
        swiperRef,
        swiperKey,
        swiperOptions,
        limitedProducts,
        productsWithEmptySlides,
        desktopTotalPages,
        currentPage,
        handleNavigationClick,
        showDesktopControls: !isMobile && desktopTotalPages > 1,
        isMediaQueryReady,
    };
};
