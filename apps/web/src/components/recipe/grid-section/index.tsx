import {
    AlertCircle,
    Bookmark,
    ChefHat,
    ChevronRight,
    Clock,
    Loader2,
    Users,
} from 'lucide-react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import * as styles from '@/components/recipe/grid-section/index.css';
import { useSearchMyRecipeList } from '@/hooks/query/shop/recipe';
import { vars } from '@/styles/theme.css';

interface RecipeGridSectionProps {
    title: string;
    onViewAll?: () => void;
}

export const RecipeGridSection = ({
    title,
    onViewAll,
}: RecipeGridSectionProps) => {
    const { t } = useTranslation();
    const [loadedImages, setLoadedImages] = useState<Record<number, boolean>>(
        {},
    );

    const { data } = useSearchMyRecipeList({ params: { page: 1, take: 10 } });
    const recipes = data?.data ?? [];
    console.log('🚀 ~ RecipeGridSection ~ recipes:', recipes);

    const handleImageLoad = (sno: number) => {
        setLoadedImages((prev) => ({ ...prev, [sno]: true }));
    };

    return (
        <section className={styles.section}>
            <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>{t(title)}</h2>
                <div className={styles.viewAll} onClick={onViewAll}>
                    {t('전체보기')} <ChevronRight size={14} />
                </div>
            </div>
            <div className={styles.recipeGrid}>
                {recipes.map((r) => {
                    const isProcessing = r.recipeStatus === 'PROCESSING';
                    const isFailed = r.recipeStatus === 'FAILED';
                    console.log(
                        '🚀 ~ RecipeGridSection ~ isProcessing:',
                        isProcessing,
                    );
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
                                    <div className={styles.processingThumbnail}>
                                        <div className={styles.loadingIconArea}>
                                            <ChefHat
                                                size={32}
                                                className={styles.spinner}
                                            />
                                            <span
                                                className={styles.loadingText}
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
                                        <div className={styles.loadingIconArea}>
                                            <AlertCircle
                                                size={32}
                                                color='#e57373'
                                                strokeWidth={1.5}
                                            />
                                            <span
                                                className={styles.loadingText}
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
                                            className={styles.skeletonThumbnail}
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
                                            className={styles.skeletonThumbnail}
                                            style={{
                                                backgroundColor:
                                                    vars.color.gray['10'],
                                            }}
                                        >
                                            <ChefHat
                                                size={32}
                                                color={vars.color.gray['30']}
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
                                    <h3 className={styles.productName}>
                                        {r.title}
                                    </h3>
                                    <span className={styles.brandName}>
                                        {r.authorName || t('익명')}
                                    </span>
                                    <div className={styles.recipeMeta}>
                                        <span className={styles.iconText}>
                                            <Clock size={12} />{' '}
                                            {Math.floor(
                                                (r.durationSeconds || 0) / 60,
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
            <div className={styles.pagination}>
                <span style={{ color: vars.color.black, fontWeight: 700 }}>
                    1
                </span>
                <span>2</span>
                <ChevronRight size={14} />
            </div>
        </section>
    );
};
