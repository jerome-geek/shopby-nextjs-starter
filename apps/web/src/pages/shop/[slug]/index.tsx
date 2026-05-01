import { QueryClient, dehydrate } from '@tanstack/react-query';
import type { GetStaticPaths, GetStaticProps } from 'next';

import { event } from '@/api/display';
import ShopbyApiErrorBoundary from '@/components/error-boundary/shopby';
import SectionGroup from '@/components/section/group';
import TimeSale from '@/components/section/time-sale';
import { EVENT_DISPLAY_CATEGORY_NO } from '@/const/category';
import { ONE_HOUR_IN_SECONDS } from '@/const/time';
import { bannerListOptions } from '@/entities/banner/queries';
import {
    BANNER_ID_PREFIX,
    HeroBanner,
} from '@/features/banner/components/hero-banner';
import IconBanner from '@/features/banner/components/icon-banner';
import { eventKeys } from '@/hooks/queryKeys';
import type { GetEventsV2Params } from '@/models/display/event';
import * as styles from '@/styles/Home.css';

const SHOP_TYPES = {
    LIFE: 'life',
    KIDS: 'kids',
} as const;

export type ShopType = (typeof SHOP_TYPES)[keyof typeof SHOP_TYPES];

interface ShopMainPageProps {
    type: ShopType;
}

export default function ShopMainPage({ type }: ShopMainPageProps) {
    const heroBannerType = type === 'kids' ? 'KIDS' : 'LIFE';

    return (
        <div className={styles.main}>
            {/* Full-width HeroBanner */}
            <section className={styles.heroBannerSection}>
                <HeroBanner type={heroBannerType} />
                <IconBanner type={heroBannerType} />
            </section>

            <ShopbyApiErrorBoundary errorFallback={<></>}>
                <TimeSale type={heroBannerType} title={'오늘만 특가'} />
            </ShopbyApiErrorBoundary>

            {/* 기획전 및 상품진열 그룹 */}
            <ShopbyApiErrorBoundary errorFallback={<></>}>
                <SectionGroup />
            </ShopbyApiErrorBoundary>
        </div>
    );
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [{ params: { slug: 'life' } }, { params: { slug: 'kids' } }],
        fallback: 'blocking',
    };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const slug = (params?.slug as string) || '';

    // 허용된 경로 목록
    const validPaths = ['life', 'kids'];

    // life, kids 외의 경로로 들어오거나 slug가 없을 경우 404
    if (!validPaths.includes(slug)) {
        return {
            notFound: true,
        };
    }

    const type = slug === 'life' ? SHOP_TYPES.LIFE : SHOP_TYPES.KIDS;
    const heroBannerType = type === 'kids' ? 'KIDS' : 'LIFE';

    const queryClient = new QueryClient();

    const eventSearchParams: GetEventsV2Params = {
        page: {
            number: 1,
            size: 7,
        },
        order: {
            by: 'REGISTER_DATE',
            direction: 'DESC',
        },
        categoryNos: [EVENT_DISPLAY_CATEGORY_NO[heroBannerType]],
    };

    try {
        await Promise.all([
            // Prefetch Banners
            queryClient.prefetchQuery(
                bannerListOptions({
                    banners: [`${BANNER_ID_PREFIX}-${heroBannerType}`],
                }),
            ),

            // Prefetch first page of infinite event list
            queryClient.prefetchInfiniteQuery({
                queryKey: eventKeys.infiniteList(eventSearchParams),
                initialPageParam: 1,
                queryFn: async ({ pageParam }) => {
                    const { data } = await event.getEventsV2({
                        ...eventSearchParams,
                        page: {
                            ...eventSearchParams.page,
                            number: Number(pageParam) || 1,
                        },
                    });

                    return data;
                },
            }),
        ]);
    } catch (error) {
        console.error(
            `[Shop Page getStaticProps] Prefetching failed for ${slug}:`,
            error,
        );
    }

    const dehydratedState = JSON.parse(JSON.stringify(dehydrate(queryClient)));

    return {
        props: {
            type,
            dehydratedState,
        },
        revalidate: ONE_HOUR_IN_SECONDS,
    };
};
