import { filter, flatMap, map, pipe, prop, sortBy, toArray } from '@fxts/core';
import dayjs from 'dayjs';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useMemo } from 'react';

import { LazyRender } from '@/components/common';
import { ObserverTarget } from '@/components/common/observer-target';
import ShopbyApiErrorBoundary from '@/components/error-boundary/shopby';
import EventSection from '@/components/section/event';
import ProductsSearch from '@/components/section/products/search';
import { useInfiniteEventList } from '@/hooks/infiniteQuery/display/event';
import type { GetEventsV2Params } from '@/models/display/event';
import { ShopType } from '@/pages/shop/[slug]';

const Best = dynamic(() => import('@/components/section/best'), {
    ssr: false,
});
const BestReview = dynamic(
    () => import('@/components/section/products/best-review'),
    {
        ssr: false,
    },
);
const ProductDisplay = dynamic(
    () => import('@/components/section/products/display'),
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
    console.log(
        '🚀 ~ SectionGroup ~ infiniteEventListData:',
        infiniteEventListData,
    );

    const eventNoList = useMemo(() => {
        if (!infiniteEventListData) {
            return [];
        }

        try {
            return pipe(
                infiniteEventListData,
                prop('pages'),
                flatMap((a) => a.contents),
                map((b) => b.eventNo),
                toArray,
            );
        } catch (error) {
            console.log(error);
            return [];
        }
    }, [infiniteEventListData]);

    const filteredEventNoList = useMemo(() => {
        return eventNoList.slice(7);
    }, [eventNoList]);

    const totalCount = useMemo(
        () => infiniteEventListData?.pages?.[0]?.totalCount ?? 0,
        [infiniteEventListData],
    );

    return (
        <>
            <EventSection eventNo={eventNoList?.[0]} />

            <LazyRender minHeight={500}>
                <ShopbyApiErrorBoundary errorFallback={<></>}>
                    <Best type={type === 'kids' ? 'KIDS' : 'LIFE'} />
                </ShopbyApiErrorBoundary>
            </LazyRender>

            <LazyRender minHeight={400}>
                <EventSection eventNo={eventNoList?.[1]} />
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
                <EventSection eventNo={eventNoList?.[2]} />
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
                <EventSection eventNo={eventNoList?.[3]} />
            </LazyRender>

            <LazyRender minHeight={400}>
                <BestReview />
            </LazyRender>

            <LazyRender minHeight={400}>
                <EventSection eventNo={eventNoList?.[4]} />
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
                <EventSection eventNo={eventNoList?.[5]} />
            </LazyRender>

            <LazyRender minHeight={400}>
                <ProductDisplay type={type === 'kids' ? 'KIDS' : 'LIFE'} />
            </LazyRender>

            <LazyRender minHeight={400}>
                <EventSection eventNo={eventNoList?.[6]} />
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

            {filteredEventNoList.map((eventNo) => (
                <LazyRender minHeight={400} key={eventNo}>
                    <EventSection eventNo={eventNo} />
                </LazyRender>
            ))}

            <ObserverTarget
                onIntersect={() => {
                    if (!isFetchingNextPage && hasNextPage) {
                        fetchNextPage();
                    }
                }}
                hasNextPage={hasNextPage || false}
                totalCount={totalCount}
            />
        </>
    );
};

export default SectionGroup;
