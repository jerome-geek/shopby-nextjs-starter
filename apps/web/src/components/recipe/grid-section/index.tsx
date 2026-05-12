import { ChefHat, CirclePlusIcon } from 'lucide-react';
import { motion } from 'motion/react';
import { useState, useTransition } from 'react';
import { useTranslation } from 'react-i18next';
import { Swiper, SwiperSlide } from 'swiper/react';

import { RecipeCard } from '@/components/recipe/card';
import * as styles from '@/components/recipe/grid-section/index.css';
import { ViewAllLink } from '@/components/ui';
import PagingV2 from '@/components/ui/paging-v2';
import { PATHS } from '@/const/paths';
import { useCustomDialog } from '@/features/dialog';
import { useSearchMyRecipeList } from '@/hooks/suspenseQuery/shop/recipe';
import { useResponsive } from '@/hooks/utils';
import type { SearchRecipesParams } from '@/models/shop/recipe';

import 'swiper/css';

export const RecipeGridSection = () => {
    const { t } = useTranslation();
    const { isMobile } = useResponsive();
    const [isPending, startTransition] = useTransition();

    const { openRecipeCreateSelection } = useCustomDialog();

    const pageSize = isMobile ? 10 : 5;

    const [searchParams, setSearchParams] = useState<SearchRecipesParams>({
        page: 1,
        take: pageSize,
        order: 'DESC',
    });

    const { data: searchMyRecipeListData } = useSearchMyRecipeList({
        searchParams: {
            ...searchParams,
            take: pageSize,
        },
    });

    const recipeList = searchMyRecipeListData.data ?? [];
    const isRecipeListVisible = recipeList.length > 0;

    return (
        <section className={styles.section}>
            <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>{t('레시피')}</h2>
                {isRecipeListVisible && (
                    <ViewAllLink href={PATHS.MYPAGE.RECIPES}>
                        {t('전체보기')}
                    </ViewAllLink>
                )}
            </div>

            <div
                className={styles.recipeListContainer}
                style={{
                    opacity: isPending ? 0.5 : 1,
                    transition: 'opacity 0.2s',
                }}
            >
                {isRecipeListVisible ? (
                    isMobile ? (
                        <Swiper
                            className={styles.swiperContainer}
                            slidesPerView={2.2}
                            spaceBetween={12}
                            slidesOffsetBefore={20}
                            slidesOffsetAfter={20}
                        >
                            {recipeList.map((r) => (
                                <SwiperSlide
                                    key={r.sno}
                                    className={styles.swiperSlide}
                                >
                                    <RecipeCard recipe={r} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    ) : (
                        <div className={styles.recipeGrid}>
                            {recipeList.map((r) => (
                                <RecipeCard key={r.sno} recipe={r} />
                            ))}
                        </div>
                    )
                ) : (
                    <motion.div
                        className={styles.emptyState}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <div className={styles.emptyIconArea}>
                            <ChefHat size={32} />
                        </div>
                        <div>
                            <h3 className={styles.emptyTitle}>
                                {t('등록된 레시피가 없습니다')}
                            </h3>
                            <p className={styles.emptyDescription}>
                                {t('아직 등록된 레시피가 없습니다.')}
                                <br />
                                {t(
                                    '나만의 특별한 레시피를 등록하고 관리해보세요!',
                                )}
                            </p>
                        </div>
                        <button
                            className={styles.createRecipeButton}
                            type='button'
                            onClick={openRecipeCreateSelection}
                        >
                            <CirclePlusIcon size={20} />
                            <span>{t('레시피 만들기')}</span>
                        </button>
                    </motion.div>
                )}
            </div>

            {!isMobile && isRecipeListVisible && (
                <PagingV2
                    currentPage={Number(searchParams.page)}
                    totalCount={searchMyRecipeListData?.count ?? 0}
                    pageSize={pageSize}
                    onPageClick={(nextPage) =>
                        startTransition(() => {
                            setSearchParams((prev) => ({
                                ...prev,
                                page: nextPage,
                            }));
                        })
                    }
                />
            )}
        </section>
    );
};
