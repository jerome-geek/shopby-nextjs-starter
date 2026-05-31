import { filter, flatMap, map, pipe, prop, sortBy, toArray } from '@fxts/core';
import dayjs from 'dayjs';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useMemo } from 'react';

import { LazyRender } from '@/shared/components/common';
import EventSection from '@/features/section/components/event';
import EventSectionSkeleton from '@/features/section/components/event/skeleton';
import ProductsSearch from '@/features/section/components/products/search';
import { useInfiniteEventList } from '@/hooks/infiniteQuery/display/event';
import type { GetEventsV2Params } from '@/models/display/event';
import { ShopType } from '@/pages/shop/[slug]';
import ShopbyAsyncBoundary from '@/shared/boundary/shopby-async-boundary';
import { ObserverTarget } from '@/shared/components/observer-target';

const Best = dynamic(() => import('@/features/section/components/best'), {
    ssr: false,
});
const BestReview = dynamic(
    () => import('@/features/section/components/products/best-review'),
    {
        ssr: false,
    },
);
const ProductDisplay = dynamic(
    () => import('@/features/section/components/products/display'),
    {
        ssr: false,
    },
);

const SectionGroup = ({
    eventSearchParams,
}: {
    eventSearchParams: GetEventsV2Params;
}) => {
    const router = useRouter();
    const type = router.query.slug as ShopType;

    const {
        data: infiniteEventListData,
        hasNextPage,
        fetchNextPage,
        isFetchingNextPage,
    } = useInfiniteEventList({
        searchParams: eventSearchParams,
    });

    const eventIdList = useMemo(() => {
        if (!infiniteEventListData) {
            return [];
        }

        try {
            return pipe(
                infiniteEventListData,
                prop('pages'),
                flatMap((a) => a.contents),
                map((b) => b.id),
                toArray,
            );
        } catch (error) {
            console.log(error);
            return [];
        }
    }, [infiniteEventListData]);

    const filteredEventIdList = useMemo(() => {
        return eventIdList.slice(7);
    }, [eventIdList]);

    const totalCount = useMemo(
        () => infiniteEventListData?.pages?.[0]?.totalCount ?? 0,
        [infiniteEventListData],
    );

    return (
        <>
            <LazyRender minHeight={500}>
                <ShopbyAsyncBoundary errorFallback={<></>}>
                    <Best type={type === 'kids' ? 'KIDS' : 'LIFE'} />
                </ShopbyAsyncBoundary>
            </LazyRender>

            <LazyRender minHeight={400}>
                <ShopbyAsyncBoundary
                    fallback={<EventSectionSkeleton />}
                    errorFallback={<></>}
                >
                    <EventSection eventKey={eventIdList?.[1]} />
                </ShopbyAsyncBoundary>
            </LazyRender>

            <LazyRender minHeight={400}>
                <ProductsSearch
                    title='숨은 꿀템 스와이프'
                    description='놓치면 후회할 보석같은 아이템'
                    searchParams={{
                        filter: {
                            minReviewRating: 4.8,
                            totalReviewCount: true,
                            soldout: true,
                        },
                        order: {
                            by: 'POPULAR',
                            direction: 'DESC',
                        },
                        pageSize: 30,
                    }}
                    filter={(items) => {
                        const filteredItems = pipe(
                            items,
                            filter((item) => item.totalReviewCount < 10),
                            toArray,
                        );

                        if (filteredItems.length <= 2) {
                            return [];
                        }

                        return filteredItems;
                    }}
                />
            </LazyRender>

            <LazyRender minHeight={400}>
                <ShopbyAsyncBoundary
                    fallback={<EventSectionSkeleton />}
                    errorFallback={<></>}
                >
                    <EventSection eventKey={eventIdList?.[2]} />
                </ShopbyAsyncBoundary>
            </LazyRender>

            <LazyRender minHeight={400}>
                <ProductsSearch
                    title='오늘 오픈 스와이프'
                    description='놓치면 후회할 보석같은 아이템'
                    searchParams={{
                        filter: {
                            soldout: true,
                        },
                        order: {
                            by: 'SALE_YMD',
                            direction: 'DESC',
                        },
                        pageSize: 30,
                    }}
                    filter={(items) => {
                        const filteredItems = pipe(
                            items,
                            filter((item) =>
                                dayjs(item.saleStartYmdt).isSame(
                                    dayjs(),
                                    'day',
                                ),
                            ),
                            toArray,
                        );

                        if (filteredItems.length <= 2) {
                            return [];
                        }

                        return filteredItems;
                    }}
                />
            </LazyRender>

            <LazyRender minHeight={400}>
                <ShopbyAsyncBoundary
                    fallback={<EventSectionSkeleton />}
                    errorFallback={<></>}
                >
                    <EventSection eventKey={eventIdList?.[3]} />
                </ShopbyAsyncBoundary>
            </LazyRender>

            <LazyRender minHeight={400}>
                <BestReview />
            </LazyRender>

            <LazyRender minHeight={400}>
                <ShopbyAsyncBoundary
                    fallback={<EventSectionSkeleton />}
                    errorFallback={<></>}
                >
                    <EventSection eventKey={eventIdList?.[4]} />
                </ShopbyAsyncBoundary>
            </LazyRender>

            <LazyRender minHeight={400}>
                <ProductsSearch
                    title='누적구매 많은 순 스와이프'
                    description='많은 구매자들이 인증한 누적구매 많은 상품'
                    searchParams={{
                        filter: {
                            soldout: true,
                        },
                        order: {
                            by: 'SALE_CNT',
                            direction: 'DESC',
                        },
                    }}
                />
            </LazyRender>

            <LazyRender minHeight={400}>
                <ShopbyAsyncBoundary
                    fallback={<EventSectionSkeleton />}
                    errorFallback={<></>}
                >
                    <EventSection eventKey={eventIdList?.[5]} />
                </ShopbyAsyncBoundary>
            </LazyRender>

            <LazyRender minHeight={400}>
                <ProductDisplay type={type === 'kids' ? 'KIDS' : 'LIFE'} />
            </LazyRender>

            <LazyRender minHeight={400}>
                <ShopbyAsyncBoundary
                    fallback={<EventSectionSkeleton />}
                    errorFallback={<></>}
                >
                    <EventSection eventKey={eventIdList?.[6]} />
                </ShopbyAsyncBoundary>
            </LazyRender>

            <LazyRender minHeight={400}>
                <ProductsSearch
                    title='후기 많은 순 스와이프'
                    description='많은 구매자들이 인증한 후기 많은 상품'
                    searchParams={{
                        filter: {
                            soldout: true,
                            totalReviewCount: true,
                        },
                        order: {
                            by: 'REVIEW',
                            direction: 'DESC',
                        },
                        pageSize: 30,
                    }}
                    filter={(items) => {
                        const sortedItems = pipe(
                            items,
                            sortBy((item) => -(item.totalReviewCount ?? 0)),
                            toArray,
                        );

                        return sortedItems;
                    }}
                />
            </LazyRender>

            {filteredEventIdList.map((eventKey) => (
                <LazyRender minHeight={400} key={eventKey}>
                    <ShopbyAsyncBoundary
                        fallback={<EventSectionSkeleton />}
                        errorFallback={<></>}
                    >
                        <EventSection eventKey={eventKey} />
                    </ShopbyAsyncBoundary>
                </LazyRender>
            ))}

            <ObserverTarget
                onIntersect={() => {
                    if (!isFetchingNextPage && hasNextPage) {
                        fetchNextPage();
                    }
                }}
                hasNextPage={hasNextPage || false}
            />
        </>
    );
};

export default SectionGroup;
