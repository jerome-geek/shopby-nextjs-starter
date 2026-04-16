import { ChefHat, CirclePlusIcon } from 'lucide-react';
import { motion } from 'motion/react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { RecipeCard } from '@/components/recipe/card';
import { FailedCard } from '@/components/recipe/grid-section/failed-card';
import * as styles from '@/components/recipe/grid-section/index.css';
import { ProcessingCard } from '@/components/recipe/grid-section/processing-card';
import { RecipeGridSkeleton } from '@/components/recipe/grid-section/skeleton';
import PagingV2 from '@/components/ui/paging-v2';
import { MODAL_QUERY_KEY, MODAL_TYPE } from '@/const/modal';
import { useSearchMyRecipeList } from '@/hooks/query/shop/recipe';
import { useCustomDialog } from '@/hooks/ui';
import { useAuth } from '@/hooks/useAuth';
import { SearchRecipesParams } from '@/models/shop/recipe';

export const RecipeGridSection = () => {
    const { t } = useTranslation();
    const router = useRouter();
    const isLogin = useAuth();
    const { openLoginDialog } = useCustomDialog();

    const [loadedImages, setLoadedImages] = useState<Record<number, boolean>>(
        {},
    );

    const [searchParams, setSearchParams] = useState<SearchRecipesParams>({
        page: 1,
        take: 5,
        order: 'DESC',
    });

    const { data: searchMyRecipeListData, isPending } = useSearchMyRecipeList({
        searchParams,
    });
    console.log(
        '🚀 ~ RecipeGridSection ~ searchMyRecipeListData:',
        searchMyRecipeListData,
    );

    const recipeList = searchMyRecipeListData?.data ?? [];

    const handleImageLoad = (sno: number) => {
        setLoadedImages((prev) => ({ ...prev, [sno]: true }));
    };

    const handleRecipeButtonClick = (e: React.MouseEvent) => {
        if (!isLogin) {
            e.preventDefault();
            const [basePath, existingSearch] = router.asPath.split('?');
            const params = new URLSearchParams(existingSearch);
            params.set(MODAL_QUERY_KEY, MODAL_TYPE.RECIPE_CREATE);
            const returnUrl = `${basePath}?${params.toString()}`;
            openLoginDialog(returnUrl);
            return;
        }

        router.replace(
            {
                query: {
                    ...router.query,
                    [MODAL_QUERY_KEY]: MODAL_TYPE.RECIPE_CREATE,
                },
            },
            undefined,
            { shallow: true },
        );
    };

    if (isPending) {
        return <RecipeGridSkeleton />;
    }

    return (
        <section className={styles.section}>
            <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>{t('레시피')}</h2>
                {/* {recipeList.length > 0 && (
                    <div className={styles.viewAll} onClick={onViewAll}>
                        {t('전체보기')} <ChevronRight size={14} />
                    </div>
                )} */}
            </div>

            {recipeList.length === 0 ? (
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
                        onClick={handleRecipeButtonClick}
                    >
                        <CirclePlusIcon size={20} />
                        <span>{t('레시피 만들기')}</span>
                    </button>
                </motion.div>
            ) : (
                <div className={styles.recipeGrid}>
                    {recipeList.map((r) => {
                        const isProcessing = r.recipeStatus === 'PROCESSING';
                        const isFailed = r.recipeStatus === 'FAILED';
                        const isLoaded = loadedImages[r.sno] || !r.thumbnailUrl;

                        if (isProcessing) {
                            return <ProcessingCard key={r.sno} recipe={r} />;
                        }

                        if (isFailed) {
                            return <FailedCard key={r.sno} recipe={r} />;
                        }

                        return (
                            <RecipeCard key={r.sno} recipe={r} />
                            // <Link
                            //     href={`/recipes/${r.sno}`}
                            //     key={r.sno}
                            //     className={styles.container}
                            // >
                            //     <motion.div
                            //         whileHover={{ y: -4 }}
                            //         style={{
                            //             display: 'block',
                            //             textDecoration: 'none',
                            //         }}
                            //     >
                            //         <div className={styles.recipeImgArea}>
                            //             {!isLoaded && (
                            //                 <div
                            //                     className={
                            //                         styles.skeletonThumbnail
                            //                     }
                            //                 >
                            //                     <Loader2
                            //                         className={styles.spinner}
                            //                         size={24}
                            //                     />
                            //                 </div>
                            //             )}
                            //             {r.thumbnailUrl ? (
                            //                 <motion.img
                            //                     src={r.thumbnailUrl}
                            //                     className={styles.productImg}
                            //                     alt={r.title}
                            //                     initial={{ opacity: 0 }}
                            //                     animate={{
                            //                         opacity: isLoaded ? 1 : 0,
                            //                     }}
                            //                     onLoad={() =>
                            //                         handleImageLoad(r.sno)
                            //                     }
                            //                     style={{
                            //                         display: isLoaded
                            //                             ? 'block'
                            //                             : 'none',
                            //                     }}
                            //                 />
                            //             ) : (
                            //                 <div
                            //                     className={
                            //                         styles.skeletonThumbnail
                            //                     }
                            //                     style={{
                            //                         backgroundColor:
                            //                             vars.color.gray['10'],
                            //                     }}
                            //                 >
                            //                     <ChefHat
                            //                         size={32}
                            //                         color={
                            //                             vars.color.gray['30']
                            //                         }
                            //                     />
                            //                 </div>
                            //             )}
                            //             <div
                            //                 style={{
                            //                     position: 'absolute',
                            //                     top: '8px',
                            //                     right: '8px',
                            //                     zIndex: 2,
                            //                 }}
                            //             >
                            //                 <Bookmark
                            //                     size={18}
                            //                     fill={
                            //                         r.bookmarked
                            //                             ? vars.color.green['80']
                            //                             : vars.color.white
                            //                     }
                            //                     color={
                            //                         r.bookmarked
                            //                             ? vars.color.green['80']
                            //                             : vars.color.white
                            //                     }
                            //                 />
                            //             </div>
                            //         </div>

                            //         <div className={styles.productInfo}>
                            //             <h3 className={styles.recipeTitle}>
                            //                 {r.title}
                            //             </h3>
                            //             <span className={styles.recipeAuthor}>
                            //                 {r.authorName || t('익명')}
                            //             </span>
                            //             <div className={styles.recipeMeta}>
                            //                 <span className={styles.iconText}>
                            //                     <Clock size={12} />{' '}
                            //                     {Math.floor(
                            //                         (r.durationSeconds || 0) /
                            //                             60,
                            //                     )}
                            //                     {t('분')}
                            //                 </span>
                            //                 <span className={styles.iconText}>
                            //                     <Users size={12} /> {r.servings}
                            //                     {t('인분')}
                            //                 </span>
                            //             </div>
                            //         </div>
                            //     </motion.div>
                            // </Link>
                        );
                    })}
                </div>
            )}

            {recipeList.length > 0 && (
                <PagingV2
                    currentPage={Number(searchParams.page)}
                    totalCount={searchMyRecipeListData?.count ?? 0}
                    pageSize={Number(searchParams.take)}
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
