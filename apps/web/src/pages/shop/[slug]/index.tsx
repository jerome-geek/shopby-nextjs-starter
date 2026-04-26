import { map, pipe, take, toArray } from '@fxts/core';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import type { GetServerSideProps } from 'next';

import { banner, event, productSection } from '@/api/display';
import { timeSale } from '@/api/shop';
import { BANNER_ID_PREFIX, HeroBanner } from '@/components/banner/hero';
import IconBanner from '@/components/banner/icon';
import SectionGroup from '@/components/section/group';
import TimeSale from '@/components/section/time-sale';
import { EVENT_DISPLAY_CATEGORY_NO } from '@/const/category';
import { SORTING_TYPE_BY_STATUS } from '@/const/timeSale';
import {
    bannerKeys,
    eventKeys,
    productSectionKeys,
    timeSaleKeys,
} from '@/hooks/queryKeys';
import type { GetEventsV2Params } from '@/models/display/event';
import { TIME_SALE_LIST_BASE_PARAMS } from '@/pages/time-sale';
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

            <TimeSale type={heroBannerType} title={'오늘만 특가'} />

            {/* 기획전 및 상품진열 그룹 */}
            <SectionGroup />
        </div>
    );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const slug = (params?.slug as string) || '';

    // 허용된 경로 목록
    const validPaths = ['life', 'kids'];

    // life, kids 외의 경로로 들어오거나 slug가 없을 경우 404 또는 리다이렉트
    if (!validPaths.includes(slug)) {
        return {
            redirect: {
                destination: '/shop',
                permanent: false,
            },
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

    const timeSaleSectionId =
        heroBannerType === 'KIDS' ? 'TIMESALE_KIDS' : 'TIMESALE_LIFE';

    try {
        await Promise.all([
            // Prefetch Banners
            queryClient.prefetchQuery({
                queryKey: bannerKeys.list([
                    `${BANNER_ID_PREFIX}-${heroBannerType}`,
                ]),
                queryFn: async () => {
                    const { data } = await banner.getBannersByIds([
                        `${BANNER_ID_PREFIX}-${heroBannerType}`,
                    ]);
                    return data ?? null;
                },
            }),
            // Prefetch Infinite Event List and first few event details
            (async () => {
                const { data } = await event.getEventsV2(eventSearchParams);

                if (data?.contents) {
                    // Prefetch top 3 event details to avoid skeletons in initial view
                    const topEventNos = pipe(
                        data.contents,
                        take(3),
                        map((e) => e.eventNo),
                        toArray,
                    );

                    await Promise.all(
                        topEventNos.map((eventNo) =>
                            queryClient.prefetchQuery({
                                queryKey: eventKeys.detail(eventNo),
                                queryFn: async () => {
                                    const { data: detailData } =
                                        await event.getEvent(eventNo);
                                    return detailData ?? null;
                                },
                            }),
                        ),
                    );

                    // Optimization: Trim event list data
                    data.contents = pipe(
                        data.contents,
                        map((item) => ({
                            eventNo: item.eventNo,
                            label: item.label ?? '',
                        })),
                        toArray,
                    ) as any;
                }

                await queryClient.prefetchInfiniteQuery({
                    queryKey: eventKeys.infiniteList(eventSearchParams),
                    initialPageParam: 1,
                    queryFn: () => data ?? null,
                });
            })(),
            // Prefetch TimeSale Data
            (async () => {
                const { data: sectionData } =
                    await productSection.getProductSectionById(
                        timeSaleSectionId,
                    );
                const sectionNo = sectionData?.sectionNo ?? 0;

                await queryClient.prefetchQuery({
                    queryKey: productSectionKeys.detail(timeSaleSectionId),
                    queryFn: () => sectionData ?? null,
                });

                if (sectionNo > 0) {
                    const timeSaleSearchParams = {
                        ...TIME_SALE_LIST_BASE_PARAMS,
                        sortingType: SORTING_TYPE_BY_STATUS['today-open'],
                    };

                    await queryClient.prefetchQuery({
                        queryKey: timeSaleKeys.sectionProducts(
                            sectionNo,
                            timeSaleSearchParams,
                        ),
                        queryFn: async () => {
                            const { data: timeSaleData } =
                                await timeSale.getTimeSaleSectionProducts(
                                    sectionNo,
                                    {
                                        ...timeSaleSearchParams,
                                        pageNumber: 1,
                                    },
                                );

                            // Optimization: Trim time sale product data
                            if (timeSaleData?.products) {
                                timeSaleData.products = pipe(
                                    timeSaleData.products,
                                    take(12),
                                    map((product) => ({
                                        productNo: product.productNo,
                                        productName: product.productName,
                                        brandName: product.brandName ?? '',
                                        brandNo: product.brandNo ?? 0,
                                        salePrice: product.salePrice,
                                        immediateDiscountAmt:
                                            product.immediateDiscountAmt ?? 0,
                                        additionDiscountAmt:
                                            product.additionDiscountAmt ?? 0,
                                        imageUrlInfo: pipe(
                                            product.imageUrlInfo ?? [],
                                            map((img) => ({
                                                url: img.url ?? '',
                                            })),
                                            toArray,
                                        ),
                                        stickerInfos: pipe(
                                            product.stickerInfos ?? [],
                                            map((sticker) => ({
                                                type: sticker.type ?? '',
                                                label: sticker.label ?? '',
                                            })),
                                            toArray,
                                        ),
                                        likeCount: product.likeCount ?? 0,
                                        liked: product.liked ?? false,
                                        reviewRating: product.reviewRating ?? 0,
                                        totalReviewCount:
                                            product.totalReviewCount ?? 0,
                                    })),
                                    toArray,
                                ) as any;
                            }
                            return timeSaleData ?? null;
                        },
                    });
                }
            })(),
        ]);
    } catch (error) {
        console.error(
            `[Shop Page getServerSideProps] Prefetching failed for ${slug}:`,
            error,
        );
    }

    const dehydratedState = JSON.parse(JSON.stringify(dehydrate(queryClient)));

    return {
        props: {
            type,
            dehydratedState,
        },
    };
};
