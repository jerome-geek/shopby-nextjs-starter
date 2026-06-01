import Link from 'next/link';
import { useEffect, useRef } from 'react';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';

import * as drawerStyles from '@/features/drawer/search/index.css';
import * as styles from '@/features/drawer/search/ranking-section/index.css';
import { Column } from '@/shared/ui/layout/flex';
import { PagingV3 } from '@/shared/ui/paging-v3';
import { PATHS } from '@/const/paths';
import {
    COLLECTION_PAGE_QUERY_KEY,
    RECIPE_PAGE_QUERY_KEY,
} from '@/features/search/constants';
import { useResponsive } from '@/hooks/utils';

const RANKING_ITEMS_PER_PAGE = 6;

type RankingDotSize = 'lg' | 'md' | 'sm';

/**
 * 모바일 도트: 페이지 ≤5면 모두 동일 크기, 그 이상이면 최대 5개만 표시하고
 * 피그마처럼 앞/뒤로 더 있을 때 4·5번째(또는 반대편)를 작게 표시한다.
 */
const getRankingDotPages = (
    currentPage: number,
    totalPages: number,
): { page: number; size: RankingDotSize; active: boolean }[] => {
    if (totalPages <= 5) {
        return Array.from({ length: totalPages }, (_, i) => ({
            page: i + 1,
            size: 'lg' as const,
            active: i + 1 === currentPage,
        }));
    }

    const start = Math.min(Math.max(0, currentPage - 1 - 2), totalPages - 5);

    const sizePattern: RankingDotSize[] =
        start === 0
            ? ['lg', 'lg', 'lg', 'md', 'sm']
            : start === totalPages - 5
            ? ['sm', 'md', 'lg', 'lg', 'lg']
            : ['sm', 'md', 'lg', 'md', 'sm'];

    return Array.from({ length: 5 }, (_, i) => ({
        page: start + i + 1,
        size: sizePattern[i],
        active: start + i + 1 === currentPage,
    }));
};

interface RankingSectionProps {
    title: string;
    items: string[];
    page: number;
    totalPages?: number;
    onPageChange: (page: number) => void;
    onItemClick: (keyword: string) => void;
}

export const RankingSection = ({
    title,
    items,
    page,
    totalPages,
    onPageChange,
    onItemClick,
}: RankingSectionProps) => {
    const { isMobile } = useResponsive();

    const swiperRef = useRef<SwiperType | null>(null);

    const resolvedTotalPages = Math.max(
        1,
        totalPages ?? Math.ceil(items.length / RANKING_ITEMS_PER_PAGE),
    );
    const currentPage = Math.min(page, resolvedTotalPages);
    const isPrevDisabled = currentPage <= 1;
    const isNextDisabled = currentPage >= resolvedTotalPages;
    const isServerPaginated = typeof totalPages === 'number';
    const serverSlidePages = [
        !isPrevDisabled ? currentPage - 1 : null,
        currentPage,
        !isNextDisabled ? currentPage + 1 : null,
    ].filter((value): value is number => value !== null);

    const pageToSlideIndex = (page: number) => page - 1;

    const slideIndexToPage = (slideIndex: number) => slideIndex + 1;

    useEffect(() => {
        if (isServerPaginated) {
            return;
        }

        const swiper = swiperRef.current;

        if (!swiper) {
            return;
        }

        const slideIndex = pageToSlideIndex(currentPage);

        if (swiper.activeIndex !== slideIndex) {
            swiper.slideTo(slideIndex, 0);
        }
    }, [currentPage, isServerPaginated, items.length, resolvedTotalPages]);

    const goToPage = (targetPage: number) => {
        const safePage = Math.min(Math.max(targetPage, 1), resolvedTotalPages);
        onPageChange(safePage);

        if (!isServerPaginated) {
            swiperRef.current?.slideTo(pageToSlideIndex(safePage), 0);
        }
    };

    return (
        <Column className={drawerStyles.rankingSection}>
            <h3 className={drawerStyles.rankingSectionTitle}>{title}</h3>

            <Swiper
                key={
                    isServerPaginated
                        ? `${title}-${items.length}-${currentPage}`
                        : `${title}-${items.length}`
                }
                className={styles.rankingSwiper}
                slidesPerView={1}
                spaceBetween={0}
                initialSlide={
                    isServerPaginated
                        ? serverSlidePages.indexOf(currentPage)
                        : Math.min(
                              pageToSlideIndex(currentPage),
                              resolvedTotalPages - 1,
                          )
                }
                onSwiper={(swiper) => {
                    swiperRef.current = swiper;
                }}
                onSlideChange={(swiper) => {
                    if (isServerPaginated) {
                        const targetPage = serverSlidePages[swiper.activeIndex];

                        if (
                            targetPage !== undefined &&
                            targetPage !== currentPage
                        ) {
                            onPageChange(targetPage);
                        }
                        return;
                    }

                    onPageChange(slideIndexToPage(swiper.activeIndex));
                }}
            >
                {Array.from({
                    length: isServerPaginated
                        ? serverSlidePages.length
                        : resolvedTotalPages,
                }).map((_, pageIdx) => {
                    const sliceStart = isServerPaginated
                        ? (currentPage - 1) * RANKING_ITEMS_PER_PAGE
                        : pageIdx * RANKING_ITEMS_PER_PAGE;
                    const pageItems = isServerPaginated
                        ? items
                        : items.slice(
                              sliceStart,
                              sliceStart + RANKING_ITEMS_PER_PAGE,
                          );
                    return (
                        <SwiperSlide key={`page-${pageIdx}`}>
                            <ul className={drawerStyles.rankingList}>
                                {pageItems.map((item, index) => (
                                    <li key={`${item}-${sliceStart + index}`}>
                                        <Link
                                            className={
                                                drawerStyles.rankingItemLink
                                            }
                                            onClick={() => onItemClick(item)}
                                            href={{
                                                pathname: PATHS.SEARCH,
                                                query: {
                                                    keyword: item,
                                                    pageNumber: '1',
                                                    tab: title.includes(
                                                        '레시피',
                                                    )
                                                        ? 'recipe'
                                                        : 'shopping',
                                                    [RECIPE_PAGE_QUERY_KEY]:
                                                        '1',
                                                    [COLLECTION_PAGE_QUERY_KEY]:
                                                        '1',
                                                },
                                            }}
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
                                        </Link>
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
                    {getRankingDotPages(currentPage, resolvedTotalPages).map(
                        ({ page: dotPage, size, active }) => (
                            <button
                                key={`dot-${dotPage}`}
                                type='button'
                                role='tab'
                                aria-selected={active}
                                aria-label={`${dotPage} / ${resolvedTotalPages}`}
                                data-active={active}
                                className={styles.dotButton[size]}
                                onClick={() => goToPage(dotPage)}
                            />
                        ),
                    )}
                </div>
            ) : (
                <PagingV3
                    currentPage={currentPage}
                    totalCount={resolvedTotalPages * RANKING_ITEMS_PER_PAGE}
                    pageSize={RANKING_ITEMS_PER_PAGE}
                    onPageClick={goToPage}
                />
            )}
        </Column>
    );
};
