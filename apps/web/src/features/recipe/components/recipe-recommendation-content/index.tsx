'use client';

import { useTranslation } from 'react-i18next';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { SmallCaretIcon } from '@/components/icons';
import { RecipeCard } from '@/components/recipe/card';
import * as styles from '@/features/recipe/components/recipe-recommendation-content/index.css';
import usePublicRecipeSearch from '@/hooks/suspenseQuery/shop/recipe/usePublicRecipeSearch';
import { BREAKPOINTS } from '@/styles/media';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface RecipeRecommendationLayerContentProps {
    close: () => void;
}

export const RecipeRecommendationLayerContent = ({
    close,
}: RecipeRecommendationLayerContentProps) => {
    const { t } = useTranslation();

    const { data: publicRecipeSearchData } = usePublicRecipeSearch({
        searchParams: {
            page: 1,
            take: 10,
            order: 'DESC',
            sortBy: 'LATEST',
        },
    });

    const recipes = publicRecipeSearchData?.data ?? [];

    if (recipes.length === 0) {
        return null;
    }

    return (
        <section className={styles.container}>
            <header className={styles.titleGroup}>
                <h2
                    className={styles.title}
                    dangerouslySetInnerHTML={{
                        __html: t(
                            '배송 기다리는 동안<br/>식비를 절반으로 줄여주는 레시피 구경하세요!',
                        ),
                    }}
                />
            </header>

            <div className={styles.recipeArea}>
                <Swiper
                    className={styles.swiperContainer}
                    wrapperTag='ul'
                    spaceBetween={16}
                    slidesPerView={2.2}
                    modules={[Navigation, Pagination]}
                    navigation={{
                        prevEl: '.recipe-recommend-prev',
                        nextEl: '.recipe-recommend-next',
                    }}
                    pagination={{
                        el: '.recipe-recommend-pagination',
                        type: 'fraction',
                        renderFraction: (currentClass, totalClass) => {
                            return (
                                `<span class="${currentClass} ${styles.paginationCurrent}"></span>` +
                                `<span class="${styles.paginationDivider}">/</span>` +
                                `<span class="${totalClass} ${styles.paginationTotal}"></span>`
                            );
                        },
                    }}
                    breakpoints={{
                        [BREAKPOINTS.SM]: {
                            slidesPerView: 3,
                            spaceBetween: 24,
                        },
                    }}
                >
                    {recipes.map((recipe) => (
                        <SwiperSlide
                            key={recipe.sno}
                            tag='li'
                            className={styles.swiperSlide}
                        >
                            <article
                                className={styles.recipeCardWrapper}
                                onClick={() => close()}
                            >
                                <RecipeCard recipe={recipe} />
                            </article>
                        </SwiperSlide>
                    ))}
                </Swiper>

                {recipes.length > 1 && (
                    <div className={styles.paginationWrapper}>
                        <button
                            className={`${styles.paginationButton} recipe-recommend-prev`}
                            aria-label={t('이전 레시피')}
                            type='button'
                        >
                            <SmallCaretIcon
                                direction='left'
                                width={18}
                                height={18}
                            />
                        </button>
                        <div
                            className={`${styles.recommendPagination} recipe-recommend-pagination`}
                        />
                        <button
                            className={`${styles.paginationButton} recipe-recommend-next`}
                            aria-label={t('다음 레시피')}
                            type='button'
                        >
                            <SmallCaretIcon
                                direction='right'
                                width={18}
                                height={18}
                            />
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};
