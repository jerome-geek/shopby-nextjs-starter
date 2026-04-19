import { ChefHat, CirclePlusIcon } from 'lucide-react';
import { motion } from 'motion/react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';

import { RecipeCard } from '@/components/recipe/card';
import * as styles from '@/components/recipe/grid-section/index.css';
import { RecipeGridSkeleton } from '@/components/recipe/grid-section/skeleton';
import { ViewAllLink } from '@/components/ui';
import PagingV2 from '@/components/ui/paging-v2';
import { MODAL_QUERY_KEY, MODAL_TYPE } from '@/const/modal';
import { useSearchMyRecipeList } from '@/hooks/query/shop/recipe';
import { useCustomDialog } from '@/hooks/ui';
import { useResponsive } from '@/hooks/utils';
import type { SearchRecipesParams } from '@/models/shop/recipe';

export const RecipeGridSection = () => {
    const { t } = useTranslation();
    const router = useRouter();
    const { openRecipeCreateSelection } = useCustomDialog();
    const { isMobile } = useResponsive();

    const pageSize = isMobile ? 10 : 5;

    const [searchParams, setSearchParams] = useState<SearchRecipesParams>({
        page: 1,
        take: pageSize,
        order: 'DESC',
    });

    const { data: searchMyRecipeListData, isPending } = useSearchMyRecipeList({
        searchParams: {
            ...searchParams,
            take: pageSize,
        },
    });

    const recipeList = searchMyRecipeListData?.data ?? [];
    const isRecipeListVisible = recipeList.length > 0;


    if (isPending) {
        return <RecipeGridSkeleton />;
    }

    return (
        <section className={styles.section}>
            <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>{t('레시피')}</h2>
                {/* TODO: 전체보기 클릭시 레시피 전체보기 페이지 이동 */}
                {isRecipeListVisible && (
                    <ViewAllLink href={'/'}>{t('전체보기')}</ViewAllLink>
                )}
            </div>

            {isRecipeListVisible ? (
                isMobile ? (
                    <Swiper
                        className={styles.swiperContainer}
                        slidesPerView='auto'
                        spaceBetween={16}
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
                            {t('나만의 특별한 레시피를 등록하고 관리해보세요!')}
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

            {!isMobile && isRecipeListVisible && (
                <PagingV2
                    currentPage={Number(searchParams.page)}
                    totalCount={searchMyRecipeListData?.count ?? 0}
                    pageSize={pageSize}
                    onPageClick={(nextPage) =>
                        setSearchParams((prev) => ({
                            ...prev,
                            page: nextPage,
                        }))
                    }
                />
            )}
        </section>
    );
};
