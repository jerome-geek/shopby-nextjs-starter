import { ChefHat, Share2 } from 'lucide-react';
import type {
    GetStaticPaths,
    GetStaticProps,
    InferGetStaticPropsType,
} from 'next';
import Head from 'next/head';
import { Suspense } from 'react';
import { useTranslation } from 'react-i18next';

import { RecipeCard } from '@/components/recipe';
import { useRecipeExposureGroup } from '@/hooks/suspenseQuery/shop/recipe';
import { useToast } from '@/hooks/ui/useToast';
import * as styles from '@/pages/recipes/groups/[groupId]/[sno]/index.css';
import { MOCK_DATA } from '@/pages/recipes/groups/[groupId]/mock';

// --- 그룹 상세 (데이터 연동) ---
const RecipeGroupContent = ({
    groupId,
    sno,
}: {
    groupId: string;
    sno: string;
}) => {
    const { t } = useTranslation();
    const { addToast } = useToast();

    // TODO: API 연결 시 아래 주석 해제 후 MOCK_DATA 제거
    const { data: recipeExposureGroupData } = useRecipeExposureGroup({
        groupId,
    });
    console.log(
        '🚀 ~ RecipeGroupContent ~ recipeExposureGroupData:',
        recipeExposureGroupData,
    );
    const data = MOCK_DATA;

    const group = data.groups[0];
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
            <Head>
                <title>{group.groupName} | JollyPot</title>
                <meta
                    name='description'
                    content={
                        group.description ?? `${group.groupName} 레시피 모음`
                    }
                />
            </Head>

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

    // TODO: API 연결 시 아래 주석 해제
    // const queryClient = new QueryClient();
    // try {
    //     await queryClient.fetchQuery({
    //         queryKey: recipeKeys.group(groupId),
    //         queryFn: async () => {
    //             const { data } = await recipe.getRecipeExposureGroup(groupId);
    //             return data;
    //         },
    //     });
    // } catch {
    //     return { notFound: true };
    // }

    return {
        props: {
            groupId,
            sno,
            // dehydratedState: dehydrate(queryClient),  // TODO: API 연결 시 주석 해제
        },
        revalidate: 60 * 60,
    };
};

export default RecipeGroupPage;
