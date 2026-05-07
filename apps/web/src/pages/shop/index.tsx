import { QueryClient, dehydrate } from '@tanstack/react-query';
import { GetStaticProps } from 'next';
import dynamic from 'next/dynamic';

import { event, productSection } from '@/api/display';
import { timeSale } from '@/api/shop';
import { LazyRender } from '@/components/common';
import { ONE_HOUR_IN_SECONDS } from '@/const/time';
import { SORTING_TYPE_BY_STATUS } from '@/const/timeSale';
import { bannerListOptions } from '@/entities/banner/queries';
import {
    BANNER_ID_PREFIX,
    HeroBanner,
} from '@/features/banner/components/hero-banner';
import IconBanner from '@/features/banner/components/icon-banner';
import { productSectionKeys, timeSaleKeys } from '@/hooks/queryKeys';
import eventKeys from '@/hooks/queryKeys/eventKeys';
import * as styles from '@/pages/shop/index.css';
import { TIME_SALE_LIST_BASE_PARAMS } from '@/pages/time-sale';
import ShopbyAsyncBoundary from '@/shared/boundary/shopby-async-boundary';

const TimeSale = dynamic(() => import('@/components/section/time-sale'), {
    ssr: false,
});
const Best = dynamic(() => import('@/components/section/best'), {
    ssr: false,
});
const Event = dynamic(() => import('@/components/section/event'), {
    ssr: false,
});

// 쇼핑몰 기본 홈은 발견
export default function ShopMainPage() {
    return (
        <div className={styles.main}>
            {/* Full-width HeroBanner */}
            <section className={styles.heroBannerSection}>
                <HeroBanner type='SHOP' />
                <IconBanner type='SHOP' />
            </section>

            {/* 라이프 타임특가 */}
            <ShopbyAsyncBoundary errorFallback={<></>}>
                <TimeSale
                    type='LIFE'
                    sectionId='TIMESALE_LIFE'
                    title='라이프 타임특가'
                />
            </ShopbyAsyncBoundary>

            {/* 영상(기획전) */}
            <Event index={1} />

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

            {/* 영상(기획전) */}
            <LazyRender minHeight={400}>
                <ShopbyAsyncBoundary errorFallback={<></>}>
                    <Event index={2} />
                </ShopbyAsyncBoundary>
            </LazyRender>

            {/* 라이프 베스트 */}
            <LazyRender minHeight={500}>
                <ShopbyAsyncBoundary errorFallback={<></>}>
                    <Best type='LIFE' />
                </ShopbyAsyncBoundary>
            </LazyRender>

            {/* 영상(기획전) */}
            <LazyRender minHeight={400}>
                <ShopbyAsyncBoundary errorFallback={<></>}>
                    <Event index={3} />
                </ShopbyAsyncBoundary>
            </LazyRender>

            {/* 키즈 베스트 */}
            <LazyRender minHeight={500}>
                <ShopbyAsyncBoundary errorFallback={<></>}>
                    <Best type='KIDS' />
                </ShopbyAsyncBoundary>
            </LazyRender>

            {/* 영상(기획전) */}
            <LazyRender minHeight={400}>
                <ShopbyAsyncBoundary errorFallback={<></>}>
                    <Event index={4} />
                </ShopbyAsyncBoundary>
            </LazyRender>
        </div>
    );
}

export const getStaticProps: GetStaticProps = async () => {
    const queryClient = new QueryClient();

    const HOME_BANNER_ID = `${BANNER_ID_PREFIX}-SHOP`;
    const sectionId = 'TIMESALE_LIFE';

    try {
        // 1. 배너 프리페칭 (목록 조회와 무관하게 병렬 실행)
        await Promise.all([
            queryClient.prefetchQuery(
                bannerListOptions({
                    banners: [HOME_BANNER_ID],
                }),
            ),

            // 2. SHOP_MAIN_1 이벤트 상세 조회 (배너와는 병렬)
            (async () => {
                const eventKey = 'SHOP_MAIN_1';

                const { data: detailData } = await event.getEvent(eventKey);

                // 이벤트 상세 캐시 주입 (EventSection 스켈레톤 제거)
                queryClient.setQueryData(
                    eventKeys.detail(eventKey),
                    detailData,
                );
            })(),

            // 3. 타임세일 섹션 및 상품 조회 (순차 의존성 해결)
            (async () => {
                // 섹션 정보 조회
                const { data: sectionData } =
                    await productSection.getProductSectionById(sectionId);

                queryClient.setQueryData(
                    productSectionKeys.detail(sectionId),
                    sectionData,
                );

                const sectionNo = sectionData?.sectionNo;

                if (sectionNo) {
                    // 타임세일 상품 조회
                    const searchParams = {
                        ...TIME_SALE_LIST_BASE_PARAMS,
                        sortingType: SORTING_TYPE_BY_STATUS['today-open'],
                    };

                    const { data: timeSaleData } =
                        await timeSale.getTimeSaleSectionProducts(sectionNo, {
                            ...searchParams,
                            pageNumber: 1,
                        });

                    queryClient.setQueryData(
                        timeSaleKeys.sectionProducts(sectionNo, searchParams),
                        timeSaleData,
                    );
                }
            })(),
        ]);
    } catch (error) {
        console.error('[Home Page getStaticProps] Prefetching failed:', {
            message: error instanceof Error ? error.message : String(error),
            stack: error instanceof Error ? error.stack : undefined,
        });
    }

    const dehydratedState = JSON.parse(JSON.stringify(dehydrate(queryClient)));

    return {
        props: {
            dehydratedState,
        },
        revalidate: ONE_HOUR_IN_SECONDS,
    };
};
