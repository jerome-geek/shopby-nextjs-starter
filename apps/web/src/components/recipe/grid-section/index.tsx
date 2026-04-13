import {
    AlertCircle,
    Bookmark,
    ChefHat,
    ChevronRight,
    CirclePlusIcon,
    Clock,
    Loader2,
    Users,
} from 'lucide-react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import Paging from '@/components/ui/paging';
import * as styles from '@/components/recipe/grid-section/index.css';
import { MODAL_QUERY_KEY, MODAL_TYPE } from '@/const/modal';
import { useSearchMyRecipeList } from '@/hooks/query/shop/recipe';
import { useCustomDialog } from '@/hooks/ui';
import { useAuth } from '@/hooks/useAuth';
import { vars } from '@/styles/theme.css';
import { SearchRecipesParams } from '@/models/shop/recipe';

interface RecipeGridSectionProps {
    title: string;
    onViewAll?: () => void;
}

export const RecipeGridSection = ({
    title,
    onViewAll,
}: RecipeGridSectionProps) => {
    const { t } = useTranslation();
    const router = useRouter();
    const isLogin = useAuth();
    const { openLoginDialog } = useCustomDialog();

    const [loadedImages, setLoadedImages] = useState<Record<number, boolean>>(
        {},
    );

    const [searchParams, setSearchParams] = useState<SearchRecipesParams>({
        page: 1,
        take: 10,
        order: 'DESC',
    });

    const { data } = useSearchMyRecipeList({
        searchParams,
    });
    const recipes = data?.data ?? [];

    console.log('🚀 ~ RecipeGridSection ~ recipes:', recipes);

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

    return (
        <section className={styles.section}>
            <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>{t(title)}</h2>
                {recipes.length > 0 && (
                    <div className={styles.viewAll} onClick={onViewAll}>
                        {t('전체보기')} <ChevronRight size={14} />
                    </div>
                )}
            </div>

            {recipes.length === 0 ? (
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
                    {recipes.map((r) => {
                        const isProcessing = r.recipeStatus === 'PROCESSING';
                        const isFailed = r.recipeStatus === 'FAILED';
                        const isLoaded = loadedImages[r.sno] || !r.thumbnailUrl;

                        if (isProcessing) {
                            return (
                                <motion.div
                                    key={r.sno}
                                    style={{ cursor: 'default' }}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                >
                                    <div className={styles.recipeImgArea}>
                                        <div
                                            className={
                                                styles.processingThumbnail
                                            }
                                        >
                                            <div
                                                className={
                                                    styles.loadingIconArea
                                                }
                                            >
                                                <ChefHat
                                                    size={32}
                                                    className={styles.spinner}
                                                />
                                                <span
                                                    className={
                                                        styles.loadingText
                                                    }
                                                >
                                                    {t('레시피를 생성중입니다')}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles.productInfo}>
                                        <h3 className={styles.productName}>
                                            {r.title || t('새로운 레시피')}
                                        </h3>
                                        <div
                                            className={styles.brandName}
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '4px',
                                            }}
                                        >
                                            <Loader2
                                                size={12}
                                                className={styles.spinner}
                                            />
                                            {t('레시피 정보를 가져오고 있어요')}
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        }

                        if (isFailed) {
                            return (
                                <motion.div
                                    key={r.sno}
                                    style={{ cursor: 'default' }}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                >
                                    <div className={styles.recipeImgArea}>
                                        <div className={styles.failedThumbnail}>
                                            <div
                                                className={
                                                    styles.loadingIconArea
                                                }
                                            >
                                                <AlertCircle
                                                    size={32}
                                                    color='#e57373'
                                                    strokeWidth={1.5}
                                                />
                                                <span
                                                    className={
                                                        styles.loadingText
                                                    }
                                                    style={{
                                                        color: '#e57373',
                                                        marginTop: '4px',
                                                    }}
                                                >
                                                    {t('레시피 분석 실패')}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles.productInfo}>
                                        <h3 className={styles.productName}>
                                            {r.title ||
                                                t('분석을 완료하지 못했어요')}
                                        </h3>
                                        {r.failureReason ? (
                                            <div
                                                style={{
                                                    fontSize: '11px',
                                                    color: '#e57373',
                                                    lineHeight: 1.4,
                                                    wordBreak: 'keep-all',
                                                }}
                                            >
                                                {r.failureReason}
                                            </div>
                                        ) : (
                                            <div className={styles.brandName}>
                                                {t(
                                                    '다시 시도하거나 URL을 확인해주세요.',
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            );
                        }

                        return (
                            <Link
                                href={`/recipes/${r.sno}`}
                                key={r.sno}
                                className={styles.container}
                            >
                                <motion.div
                                    whileHover={{ y: -4 }}
                                    style={{
                                        display: 'block',
                                        textDecoration: 'none',
                                    }}
                                >
                                    <div className={styles.recipeImgArea}>
                                        {!isLoaded && (
                                            <div
                                                className={
                                                    styles.skeletonThumbnail
                                                }
                                            >
                                                <Loader2
                                                    className={styles.spinner}
                                                    size={24}
                                                />
                                            </div>
                                        )}
                                        {r.thumbnailUrl ? (
                                            <motion.img
                                                src={r.thumbnailUrl}
                                                className={styles.productImg}
                                                alt={r.title}
                                                initial={{ opacity: 0 }}
                                                animate={{
                                                    opacity: isLoaded ? 1 : 0,
                                                }}
                                                onLoad={() =>
                                                    handleImageLoad(r.sno)
                                                }
                                                style={{
                                                    display: isLoaded
                                                        ? 'block'
                                                        : 'none',
                                                }}
                                            />
                                        ) : (
                                            <div
                                                className={
                                                    styles.skeletonThumbnail
                                                }
                                                style={{
                                                    backgroundColor:
                                                        vars.color.gray['10'],
                                                }}
                                            >
                                                <ChefHat
                                                    size={32}
                                                    color={
                                                        vars.color.gray['30']
                                                    }
                                                />
                                            </div>
                                        )}
                                        <div
                                            style={{
                                                position: 'absolute',
                                                top: '8px',
                                                right: '8px',
                                                zIndex: 2,
                                            }}
                                        >
                                            <Bookmark
                                                size={18}
                                                fill={
                                                    r.bookmarked
                                                        ? '#8da287'
                                                        : 'white'
                                                }
                                                color={
                                                    r.bookmarked
                                                        ? '#8da287'
                                                        : 'white'
                                                }
                                            />
                                        </div>
                                    </div>

                                    <div className={styles.productInfo}>
                                        <h3 className={styles.recipeTitle}>
                                            {r.title}
                                        </h3>
                                        <span className={styles.recipeAuthor}>
                                            {r.authorName || t('익명')}
                                        </span>
                                        <div className={styles.recipeMeta}>
                                            <span className={styles.iconText}>
                                                <Clock size={12} />{' '}
                                                {Math.floor(
                                                    (r.durationSeconds || 0) /
                                                        60,
                                                )}
                                                {t('분')}
                                            </span>
                                            <span className={styles.iconText}>
                                                <Users size={12} /> {r.servings}
                                                {t('인분')}
                                            </span>
                                        </div>
                                    </div>
                                </motion.div>
                            </Link>
                        );
                    })}
                </div>
            )}
            {/* {recipes.length > 0 && (
                <div className={styles.pagination}>
                    <span style={{ color: vars.color.black, fontWeight: 700 }}>
                        1
                    </span>
                    <span>2</span>
                    <ChevronRight size={14} />
                </div>
            )} */}
            {/* TODO: 페이징 디자인 추가 필요 */}
            {recipes.length > 0 && (
                <Paging
                    currentPage={Number(searchParams.page)}
                    totalCount={data?.count ?? 0}
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
