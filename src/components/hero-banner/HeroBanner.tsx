'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import styles from './HeroBanner.module.css';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

interface BannerSlide {
    id: number;
    backgroundColor: string;
}

const MOCK_SLIDES: BannerSlide[] = [
    { id: 1, backgroundColor: '#e8e0d5' },
    { id: 2, backgroundColor: '#f5e6c8' },
    { id: 3, backgroundColor: '#d4e4d4' },
    { id: 4, backgroundColor: '#e0d4e8' },
    { id: 5, backgroundColor: '#d8e8ec' },
];

export function HeroBanner() {
    return (
        <section className={styles.heroBanner}>
            <Swiper
                modules={[Autoplay, Pagination, Navigation]}
                spaceBetween={0}
                slidesPerView={1}
                loop={true}
                autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                    el: `.${styles.pagination}`,
                    bulletClass: styles.bullet,
                    bulletActiveClass: styles.bulletActive,
                }}
                navigation={{
                    prevEl: `.${styles.navPrev}`,
                    nextEl: `.${styles.navNext}`,
                }}
                className={styles.swiper}
            >
                {MOCK_SLIDES.map((slide) => (
                    <SwiperSlide key={slide.id}>
                        <div
                            className={styles.slide}
                            style={{ backgroundColor: slide.backgroundColor }}
                        >
                            <div className={styles.slideContent}>
                                <div className={styles.skeleton}>
                                    <div className={styles.skeletonImage} />
                                    <div className={styles.skeletonTextGroup}>
                                        <div className={styles.skeletonTitle} />
                                        <div
                                            className={styles.skeletonSubtitle}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Custom Navigation */}
            <button
                className={`${styles.navButton} ${styles.navPrev}`}
                aria-label="이전 배너"
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path
                        d="M15 18L9 12L15 6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </button>
            <button
                className={`${styles.navButton} ${styles.navNext}`}
                aria-label="다음 배너"
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path
                        d="M9 18L15 12L9 6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </button>

            {/* Custom Pagination */}
            <div className={styles.paginationWrapper}>
                <div className={styles.pagination} />
            </div>
        </section>
    );
}
