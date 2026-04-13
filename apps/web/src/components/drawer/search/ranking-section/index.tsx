import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useRef } from 'react';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';

import * as drawerStyles from '@/components/drawer/search/index.css';
import * as styles from '@/components/drawer/search/ranking-section/index.css';
import { Column } from '@/components/ui/layout/flex';
import { useResponsive } from '@/hooks/utils';
import { vars } from '@/styles/theme.css';

const RANKING_ITEMS_PER_PAGE = 6;

interface RankingSectionProps {
    title: string;
    items: string[];
    page: number;
    onPageChange: (page: number) => void;
    onItemClick: (keyword: string) => void;
}

export const RankingSection = ({
    title,
    items,
    page,
    onPageChange,
    onItemClick,
}: RankingSectionProps) => {
    const { isMobile } = useResponsive();

    const swiperRef = useRef<SwiperType | null>(null);

    const totalPages = Math.max(
        1,
        Math.ceil(items.length / RANKING_ITEMS_PER_PAGE),
    );
    const currentPage = Math.min(page, totalPages);
    const isPrevDisabled = currentPage <= 1;
    const isNextDisabled = currentPage >= totalPages;

    const pageToSlideIndex = (page: number) => page - 1;

    const slideIndexToPage = (slideIndex: number) => slideIndex + 1;

    useEffect(() => {
        const swiper = swiperRef.current;

        if (!swiper) {
            return;
        }

        const slideIndex = pageToSlideIndex(currentPage);

        if (swiper.activeIndex !== slideIndex) {
            swiper.slideTo(slideIndex, 0);
        }
    }, [currentPage, items.length, totalPages]);

    const goToPage = (targetPage: number) => {
        onPageChange(targetPage);
        swiperRef.current?.slideTo(pageToSlideIndex(targetPage), 0);
    };

    return (
        <Column className={drawerStyles.rankingSection}>
            <h3 className={drawerStyles.rankingSectionTitle}>{title}</h3>

            <Swiper
                key={`${title}-${items.length}`}
                className={styles.rankingSwiper}
                slidesPerView={1}
                spaceBetween={0}
                initialSlide={Math.min(
                    pageToSlideIndex(currentPage),
                    totalPages - 1,
                )}
                onSwiper={(swiper) => {
                    swiperRef.current = swiper;
                }}
                onSlideChange={(swiper) => {
                    onPageChange(slideIndexToPage(swiper.activeIndex));
                }}
            >
                {Array.from({ length: totalPages }).map((_, pageIdx) => {
                    const sliceStart = pageIdx * RANKING_ITEMS_PER_PAGE;
                    const pageItems = items.slice(
                        sliceStart,
                        sliceStart + RANKING_ITEMS_PER_PAGE,
                    );
                    return (
                        <SwiperSlide key={`page-${pageIdx}`}>
                            <ul className={drawerStyles.rankingList}>
                                {pageItems.map((item, index) => (
                                    <li key={`${item}-${sliceStart + index}`}>
                                        <button
                                            className={
                                                drawerStyles.rankingItemButton
                                            }
                                            onClick={() => onItemClick(item)}
                                        >
                                            <span
                                                className={
                                                    drawerStyles.rankingNumber
                                                }
                                            >
                                                {sliceStart + index + 1}
                                            </span>
                                            <span
                                                className={
                                                    drawerStyles.rankingKeyword
                                                }
                                            >
                                                {item}
                                            </span>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </SwiperSlide>
                    );
                })}
            </Swiper>

            {isMobile ? (
                <div
                    className={styles.dotPagination}
                    role='tablist'
                    aria-label={`${title} 페이지`}
                >
                    {Array.from({ length: totalPages }).map((_, dotIdx) => {
                        const isActive = dotIdx === currentPage - 1;
                        return (
                            <button
                                key={`dot-${dotIdx}`}
                                role='tab'
                                aria-selected={isActive}
                                aria-label={`${dotIdx + 1} / ${totalPages}`}
                                data-active={isActive}
                                className={styles.dotButton}
                                onClick={() => goToPage(dotIdx + 1)}
                            />
                        );
                    })}
                </div>
            ) : (
                <div className={drawerStyles.pagination}>
                    <button
                        className={drawerStyles.paginationButton}
                        disabled={isPrevDisabled}
                        onClick={() => goToPage(currentPage - 1)}
                        aria-label={`${title} 이전 페이지`}
                    >
                        <ChevronLeft size={16} color={vars.color.gray['60']} />
                    </button>

                    <span className={drawerStyles.paginationText}>
                        <span className={drawerStyles.paginationCurrent}>
                            {currentPage}
                        </span>
                        <span className={drawerStyles.paginationSeparator}>
                            /
                        </span>
                        <span className={drawerStyles.paginationTotal}>
                            {totalPages}
                        </span>
                    </span>

                    <button
                        className={drawerStyles.paginationButton}
                        disabled={isNextDisabled}
                        onClick={() => goToPage(currentPage + 1)}
                        aria-label={`${title} 다음 페이지`}
                    >
                        <ChevronRight size={16} />
                    </button>
                </div>
            )}
        </Column>
    );
};
