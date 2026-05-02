import { QueryClient, dehydrate } from '@tanstack/react-query';
import { GetStaticProps } from 'next';
import dynamic from 'next/dynamic';

import { LazyRender } from '@/components/common';
import Seo from '@/components/common/seo';
import CollectionGroupSection from '@/components/section/collection-group';
import { ONE_HOUR_IN_SECONDS } from '@/const/time';
import { bannerListOptions } from '@/entities/banner/queries';
import { collectionExposureGroupOptions } from '@/entities/shop/collection/queries';
import {
    BANNER_ID_PREFIX,
    HeroBanner,
} from '@/features/banner/components/hero-banner';
import * as styles from '@/pages/index.css';
import ShopbyAsyncBoundary from '@/shared/boundary/shopby-async-boundary';

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

export default function HomePage() {
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
                    <ShopbyAsyncBoundary errorFallback={<></>}>
                        <TimeSale
                            type='LIFE'
                            sectionId='TIMESALE_LIFE'
                            title='라이프 타임특가'
                        />
                    </ShopbyAsyncBoundary>
                </LazyRender>

                <LazyRender minHeight={300}>
                    <RecipeGroupSection groupId='recipe_group_2' />
                </LazyRender>

                {/* 키즈 타임특가 */}
                <LazyRender minHeight={400}>
                    <ShopbyAsyncBoundary errorFallback={<></>}>
                        <TimeSale
                            type='KIDS'
                            sectionId='TIMESALE_KIDS'
                            title='키즈 타임특가'
                        />
                    </ShopbyAsyncBoundary>
                </LazyRender>

                <LazyRender minHeight={300}>
                    <RecipeGroupSection groupId='recipe_group_3' />
                </LazyRender>

                {/* 라이프 베스트 */}
                <LazyRender minHeight={500}>
                    <ShopbyAsyncBoundary errorFallback={<></>}>
                        <Best type='LIFE' />
                    </ShopbyAsyncBoundary>
                </LazyRender>

                <LazyRender minHeight={300}>
                    <RecipeGroupSection groupId='recipe_group_4' />
                </LazyRender>

                {/* 키즈 베스트 */}
                <LazyRender minHeight={500}>
                    <ShopbyAsyncBoundary errorFallback={<></>}>
                        <Best type='KIDS' />
                    </ShopbyAsyncBoundary>
                </LazyRender>
            </div>
        </>
    );
}

export const getStaticProps: GetStaticProps = async () => {
    const queryClient = new QueryClient();

    const COLLECTION_GROUP_ID = 'collection_group_1';
    const HOME_BANNER_ID = `${BANNER_ID_PREFIX}-HOME`;

    try {
        await Promise.all([
            queryClient.prefetchQuery(
                bannerListOptions({
                    banners: [HOME_BANNER_ID],
                }),
            ),
            queryClient.prefetchQuery(
                collectionExposureGroupOptions({
                    groupId: COLLECTION_GROUP_ID,
                }),
            ),
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
};
