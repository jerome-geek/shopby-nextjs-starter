import { map, pipe, take, toArray } from '@fxts/core';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import dynamic from 'next/dynamic';

import { banner } from '@/api/display';
import { collection } from '@/api/shop';
import { BANNER_ID_PREFIX, HeroBanner } from '@/components/banner/hero';
import { LazyRender } from '@/components/common';
import Seo from '@/components/common/seo';
import ShopbyApiErrorBoundary from '@/components/error-boundary/shopby';
import CollectionGroupSection from '@/components/section/collection-group';
import { ONE_HOUR_IN_SECONDS } from '@/const/time';
import { bannerKeys, collectionKeys } from '@/hooks/queryKeys';
import * as styles from '@/styles/Home.css';

const TimeSale = dynamic(() => import('@/components/section/time-sale'), {
    ssr: false,
});
const Best = dynamic(() => import('@/components/section/best'), {
    ssr: false,
});
const RecipeGroupSection = dynamic(
    () => import('@/components/section/recipe-group'),
    {
        ssr: false,
    },
);

export async function getStaticProps() {
    const queryClient = new QueryClient();

    const bannerId = `${BANNER_ID_PREFIX}-HOME`;

    try {
        await Promise.all([
            queryClient.prefetchQuery({
                queryKey: bannerKeys.list([bannerId]),
                queryFn: async () => {
                    const { data } = await banner.getBannersByIds([bannerId]);
                    return data;
                },
            }),
            queryClient.prefetchQuery({
                queryKey: collectionKeys.exposureGroup('collection_group_1'),
                queryFn: async () => {
                    const { data } =
                        await collection.getCollectionExposureGroup(
                            'collection_group_1',
                        );

                    // Optimization using fxts: Trim data and slice recipes
                    if (data?.groups) {
                        data.groups = pipe(
                            data.groups,
                            map((group) => ({
                                ...group,
                                collection: {
                                    ...group.collection,
                                    recipes: pipe(
                                        group.collection.recipes ?? [],
                                        take(4),
                                        map((recipe) => ({
                                            ...recipe,
                                            ingredients: pipe(
                                                recipe.ingredients ?? [],
                                                take(6),
                                                map((ing) => ({
                                                    sno: ing.sno,
                                                    name: ing.name,
                                                    amount: ing.amount,
                                                    isEssential:
                                                        ing.isEssential,
                                                    coupangProduct: null,
                                                })),
                                                toArray,
                                            ),
                                            steps: pipe(
                                                recipe.steps ?? [],
                                                map((step) => ({
                                                    sno: step.sno,
                                                    stepNumber: step.stepNumber,
                                                    description:
                                                        step.description,
                                                    stepImageUrl: null,
                                                    timestampSeconds: null,
                                                })),
                                                toArray,
                                            ),
                                            extraData: {},
                                        })),
                                        toArray,
                                    ),
                                },
                            })),
                            toArray,
                        );
                    }

                    return data;
                },
            }),
        ]);
    } catch (error) {
        console.error('[Home Page getStaticProps] Prefetching failed:', {
            message: error instanceof Error ? error.message : String(error),
            stack: error instanceof Error ? error.stack : undefined,
        });
    }

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
        revalidate: ONE_HOUR_IN_SECONDS,
    };
}

export default function Home() {
    return (
        <>
            <Seo description='Welcome to our online store' />

            <div className={`${styles.main}`}>
                {/* Full-width HeroBanner */}
                <HeroBanner type='HOME' />

                <CollectionGroupSection groupId='collection_group_1' />

                <RecipeGroupSection groupId='recipe_group_1' />

                {/* 라이프 타임특가 */}
                <LazyRender minHeight={400}>
                    <ShopbyApiErrorBoundary errorFallback={<></>}>
                        <TimeSale type='LIFE' title='라이프 타임특가' />
                    </ShopbyApiErrorBoundary>
                </LazyRender>

                <LazyRender minHeight={300}>
                    <RecipeGroupSection groupId='recipe_group_2' />
                </LazyRender>

                {/* 키즈 타임특가 */}
                <LazyRender minHeight={400}>
                    <ShopbyApiErrorBoundary errorFallback={<></>}>
                        <TimeSale type='KIDS' title='키즈 타임특가' />
                    </ShopbyApiErrorBoundary>
                </LazyRender>

                <LazyRender minHeight={300}>
                    <RecipeGroupSection groupId='recipe_group_3' />
                </LazyRender>

                {/* 라이프 베스트 */}
                <LazyRender minHeight={500}>
                    <ShopbyApiErrorBoundary errorFallback={<></>}>
                        <Best type='LIFE' />
                    </ShopbyApiErrorBoundary>
                </LazyRender>

                <LazyRender minHeight={300}>
                    <RecipeGroupSection groupId='recipe_group_4' />
                </LazyRender>

                {/* 키즈 베스트 */}
                <LazyRender minHeight={500}>
                    <ShopbyApiErrorBoundary errorFallback={<></>}>
                        <Best type='KIDS' />
                    </ShopbyApiErrorBoundary>
                </LazyRender>
            </div>
        </>
    );
}
