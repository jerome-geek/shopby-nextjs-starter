import Seo from '@/components/common/seo';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { ChefHat, Share2 } from 'lucide-react';
import type {
    GetStaticPaths,
    GetStaticProps,
    InferGetStaticPropsType,
} from 'next';
import { Suspense } from 'react';
import { useTranslation } from 'react-i18next';

import { recipe } from '@/api/shop';
import { RecipeCard } from '@/components/recipe';
import { ONE_HOUR_IN_SECONDS } from '@/const/time';
import { recipeKeys } from '@/hooks/queryKeys';
import { useRecipeExposureGroup } from '@/hooks/suspenseQuery/shop/recipe';
import { useToast } from '@/hooks/ui/useToast';
import * as styles from '@/pages/recipes/groups/[groupId]/[sno]/index.css';

// --- 그룹 상세 화면 ---
const RecipeGroupContent = ({
    groupId,
    sno,
}: {
    groupId: string;
    sno: string;
}) => {
    const { t } = useTranslation();
    const { addToast } = useToast();

    // 1. API 데이터 연동 (groupId 형식이 'recipe_group_N' 임을 보장)
    const { data: recipeExposureGroupData } = useRecipeExposureGroup({
        groupId: `recipe_group_${groupId}`,
    });
    console.log(
        '🚀 ~ RecipeGroupContent ~ recipeExposureGroupData:',
        recipeExposureGroupData,
    );

    // 2. sno를 기반으로 해당 그룹 필터링
    const group = recipeExposureGroupData.groups?.find(
        (g) => String(g.sno) === sno,
    );
    console.log('🚀 ~ RecipeGroupContent ~ group:', group);
    if (!group) return null;

    const recipes = group.recipes ?? [];
    const thumbnail = recipes.find((r) => r.thumbnailUrl)?.thumbnailUrl ?? null;

    const handleShare = async () => {
        const url = window.location.href;
        if (navigator.share) {
            await navigator.share({ title: group.groupName, url });
        } else {
            await navigator.clipboard.writeText(url);
            addToast({
                message: t('링크가 복사되었습니다.'),
                variant: 'success',
            });
        }
    };

    return (
        <>
            <Seo
                title={group.groupName}
                description={
                    group.description ?? `${group.groupName} 레시피 모음`
                }
            />

            <div className={styles.container}>
                {/* ── 좌측 고정 패널 ── */}
                <aside className={styles.leftPanel}>
                    <div className={styles.stickyWrapper}>
                        {thumbnail ? (
                            <img
                                src={thumbnail}
                                className={styles.groupThumbnail}
                                alt={group.groupName}
                            />
                        ) : (
                            <div className={styles.groupThumbnailPlaceholder}>
                                <ChefHat size={48} />
                            </div>
                        )}

                        <div className={styles.groupInfo}>
                            <span className={styles.badge}>
                                <ChefHat size={12} />
                                {t('레시피 그룹')}
                            </span>
                            <h1 className={styles.groupTitle}>
                                {group.groupName}
                            </h1>
                            {group.description && (
                                <p className={styles.groupDescription}>
                                    {group.description}
                                </p>
                            )}
                            <div className={styles.metaRow}>
                                <span className={styles.metaItem}>
                                    {t('레시피')}{' '}
                                    <span className={styles.metaStrong}>
                                        {recipes.length}
                                    </span>
                                    {t('개')}
                                </span>
                            </div>
                            <button
                                className={styles.shareButton}
                                onClick={handleShare}
                                id='btn-share-group'
                            >
                                <Share2 size={18} />
                                {t('공유')}
                            </button>
                        </div>
                    </div>
                </aside>

                <hr className={styles.divider} />

                {/* ── 우측 스크롤 패널 ── */}
                <section className={styles.rightPanel}>
                    {recipes.length === 0 ? (
                        <div className={styles.emptyState}>
                            <ChefHat size={40} />
                            <p className={styles.emptyStateText}>
                                {t('아직 레시피가 없습니다.')}
                            </p>
                        </div>
                    ) : (
                        <ul className={styles.recipeGrid}>
                            {recipes.map((r) => (
                                <li key={`recipe-card-${r.sno}`}>
                                    <RecipeCard recipe={r} />
                                </li>
                            ))}
                        </ul>
                    )}
                </section>
            </div>
        </>
    );
};

// --- Skeleton ---
const RecipeGroupSkeleton = () => (
    <div className={styles.container}>
        <aside className={styles.leftPanel}>
            <div className={styles.skeletonThumb} />
            <div className={styles.groupInfo}>
                <div
                    className={styles.skeletonBar}
                    style={{ width: 90, height: 24, borderRadius: 100 }}
                />
                <div
                    className={styles.skeletonBar}
                    style={{ width: '70%', height: 32, marginTop: 8 }}
                />
                <div
                    className={styles.skeletonBar}
                    style={{ width: '90%', height: 18 }}
                />
                <div
                    className={styles.skeletonBar}
                    style={{ width: '50%', height: 16 }}
                />
            </div>
        </aside>
        <main className={styles.rightPanel}>
            <div
                className={styles.skeletonBar}
                style={{ width: 160, height: 28, marginBottom: 24 }}
            />
            <div className={styles.recipeGrid}>
                {Array.from({ length: 6 }).map((_, i) => (
                    <div
                        key={i}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 8,
                        }}
                    >
                        <div className={styles.skeletonThumb} />
                        <div className={styles.skeletonTitle} />
                        <div className={styles.skeletonText} />
                    </div>
                ))}
            </div>
        </main>
    </div>
);

// --- Page ---
const RecipeGroupPage = ({
    groupId,
    sno,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
    return (
        <Suspense fallback={<RecipeGroupSkeleton />}>
            <RecipeGroupContent groupId={groupId} sno={sno} />
        </Suspense>
    );
};

// --- ISR ---
export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [],
        fallback: 'blocking',
    };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const groupId = params?.groupId as string;
    const sno = params?.sno as string;

    if (!groupId || !sno) {
        return { notFound: true };
    }

    const queryClient = new QueryClient();
    const formattedGroupId = `recipe_group_${groupId}`;

    try {
        await queryClient.fetchQuery({
            queryKey: recipeKeys.exposureGroup(formattedGroupId),
            queryFn: async () => {
                const { data } = await recipe.getRecipeExposureGroup(
                    formattedGroupId,
                );

                return data;
            },
        });
    } catch (error) {
        console.error(error);
        return { notFound: true };
    }

    return {
        props: {
            groupId,
            sno,
            dehydratedState: dehydrate(queryClient),
        },
        revalidate: ONE_HOUR_IN_SECONDS,
    };
};

export default RecipeGroupPage;
