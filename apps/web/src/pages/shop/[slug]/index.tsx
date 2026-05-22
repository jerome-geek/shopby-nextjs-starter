import { dehydrate, QueryClient } from '@tanstack/react-query';
import type { GetStaticPaths, GetStaticProps } from 'next';

import { event } from '@/api/display';
import Seo from '@/components/common/seo';
import EventSection from '@/components/section/event';
import EventSectionSkeleton from '@/components/section/event/skeleton';
import SectionGroup from '@/components/section/group';
import TimeSaleSection from '@/components/section/time-sale';
import { EVENT_DISPLAY_CATEGORY_NO } from '@/const/category';
import { ONE_HOUR_IN_SECONDS } from '@/const/time';
import { bannerListOptions } from '@/entities/banner/queries';
import { eventDetailOptions } from '@/entities/event/queries';
import {
    BANNER_ID_PREFIX,
    HeroBanner,
} from '@/features/banner/components/hero-banner';
import IconBanner from '@/features/banner/components/icon-banner';
import { eventKeys } from '@/hooks/queryKeys';
import type { GetEventsV2Params } from '@/models/display/event';
import * as styles from '@/pages/shop/[slug]/index.css';
import ShopbyAsyncBoundary from '@/shared/boundary/shopby-async-boundary';

const SHOP_TYPES = {
    LIFE: 'life',
    KIDS: 'kids',
} as const;

export type ShopType = (typeof SHOP_TYPES)[keyof typeof SHOP_TYPES];

interface ShopMainPageProps {
    type: ShopType;
    eventSearchParams: GetEventsV2Params;
    sectionId: string;
}

export default function ShopMainPage({
    type,
    eventSearchParams,
    sectionId,
}: ShopMainPageProps) {
    const heroBannerType = type === 'kids' ? 'KIDS' : 'LIFE';

    const topEventSectionId = `SHOP_${type.toUpperCase()}_TOP`;

    return (
        <>
            <Seo title={heroBannerType === 'KIDS' ? '키즈' : '라이프'} />

            <div className={styles.main}>
                {/* Full-width HeroBanner */}
                <section className={styles.heroBannerSection}>
                    <HeroBanner type={heroBannerType} />
                    <IconBanner type={heroBannerType} />
                </section>

                <ShopbyAsyncBoundary errorFallback={<></>}>
                    <TimeSaleSection
                        type={heroBannerType}
                        sectionId={sectionId}
                        title={'오늘만 특가'}
                    />
                </ShopbyAsyncBoundary>

                <ShopbyAsyncBoundary
                    fallback={<EventSectionSkeleton />}
                    errorFallback={<></>}
                >
                    <EventSection eventKey={topEventSectionId} />
                </ShopbyAsyncBoundary>

                {/* 기획전 및 상품진열 그룹 */}
                <ShopbyAsyncBoundary errorFallback={<></>}>
                    <SectionGroup eventSearchParams={eventSearchParams} />
                </ShopbyAsyncBoundary>
            </div>
        </>
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
    const sectionId =
        heroBannerType === 'KIDS' ? 'TIMESALE_KIDS' : 'TIMESALE_LIFE';

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
            // 1. 배너 프리페칭 (목록 조회와 무관하게 병렬 실행)
            queryClient.prefetchQuery(
                bannerListOptions({
                    banners: [`${BANNER_ID_PREFIX}-${heroBannerType}`],
                }),
            ),

            // 2. 이벤트 목록 조회 및 첫 번째 이벤트 상세 조회 (순차 의존성 해결 + 배너와는 병렬)
            (async () => {
                const { data: eventListData } =
                    await event.getEventsV2(eventSearchParams);

                // 무한 스크롤 캐시 구조 수동 주입 (하이드레이션 미스 방지)
                queryClient.setQueryData(
                    eventKeys.infiniteList(eventSearchParams),
                    {
                        pages: [eventListData],
                        pageParams: [1],
                    },
                );

                const firstEventNo = eventListData?.contents?.[0]?.eventNo;

                if (firstEventNo) {
                    await queryClient.prefetchQuery(
                        eventDetailOptions({ eventKey: firstEventNo }),
                    );
                }
            })(),
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
            eventSearchParams,
            sectionId,
            dehydratedState,
        },
        revalidate: ONE_HOUR_IN_SECONDS,
    };
};
