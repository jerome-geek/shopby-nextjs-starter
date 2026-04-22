import { compact, filter, isEmpty, pipe, toArray } from '@fxts/core';
import { keepPreviousData } from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useMemo } from 'react';

import { LazyRender } from '@/components/common';
import { ObserverTarget } from '@/components/common/observer-target';
import ProductsSearch from '@/components/section/products/search';
import { CATEGORY_CODE, EVENT_DISPLAY_CATEGORY_NO } from '@/const/category';
import { useInfiniteEventList } from '@/hooks/infiniteQuery/display/event';
import { useCategoryAll } from '@/hooks/suspenseQuery/display/category';
import type { GetEventsV2Params } from '@/models/display/event';
import { ShopType } from '@/pages/shop/[slug]';

const Best = dynamic(() => import('@/components/section/best'), {
    ssr: false,
});
const Event = dynamic(() => import('@/components/section/event'), {
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

const SectionGroup = () => {
    const router = useRouter();
    const type = router.query.slug as ShopType;

    const searchParams: GetEventsV2Params = {
        page: {
            number: 1,
            size: 7,
        },
        order: {
            by: 'REGISTER_DATE',
            direction: 'DESC',
        },
        categoryNos: [
            EVENT_DISPLAY_CATEGORY_NO[type === 'kids' ? 'KIDS' : 'LIFE'],
        ],
    };

    const {
        data: infiniteEventListData,
        hasNextPage,
        fetchNextPage,
        isFetchingNextPage,
    } = useInfiniteEventList({
        searchParams,
        options: {
            placeholderData: keepPreviousData,
        },
    });

    const { data: categoryAllData } = useCategoryAll();

    const mainCategoryChildrenList = categoryAllData?.multiLevelCategories.find(
        (category) => category.managementCode === CATEGORY_CODE.MAIN,
    )?.children;

    const kidsCategoryNo = mainCategoryChildrenList?.find(
        (category) => category.managementCode === CATEGORY_CODE.KIDS,
    )?.categoryNo;

    const lifeCategoryNo = mainCategoryChildrenList?.find(
        (category) => category.managementCode === CATEGORY_CODE.LIFE,
    )?.categoryNo;

    const parsedCategoryNos = pipe(
        type === 'kids' ? [kidsCategoryNo] : [lifeCategoryNo],
        compact,
        toArray,
    );

    const categoryNos = isEmpty(parsedCategoryNos)
        ? undefined
        : parsedCategoryNos;

    const eventList = useMemo(
        () =>
            infiniteEventListData?.pages?.flatMap((page) => page.contents) ??
            [],
        [infiniteEventListData],
    );

    const eventNoList = useMemo(
        () => eventList?.map((event) => event.eventNo),
        [eventList],
    );

    const filteredEventNoList = useMemo(() => {
        return eventNoList.slice(7);
    }, [eventNoList]);

    const totalCount = useMemo(
        () => infiniteEventListData?.pages?.[0]?.totalCount ?? 0,
        [infiniteEventListData],
    );

    return (
        <>
            <Event eventNo={eventNoList?.[0]} />

            <LazyRender minHeight={500}>
                <Best type={type === 'kids' ? 'KIDS' : 'LIFE'} />
            </LazyRender>

            <LazyRender minHeight={400}>
                <Event eventNo={eventNoList?.[1]} />
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
                            by: 'RECENT_PRODUCT',
                            direction: 'DESC',
                        },
                        categoryNos,
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
                <Event eventNo={eventNoList?.[2]} />
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
                        categoryNos,
                    }}
                />
            </LazyRender>

            <LazyRender minHeight={400}>
                <Event eventNo={eventNoList?.[3]} />
            </LazyRender>

            <LazyRender minHeight={400}>
                <BestReview categoryNos={categoryNos} />
            </LazyRender>

            <LazyRender minHeight={400}>
                <Event eventNo={eventNoList?.[4]} />
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
                        categoryNos,
                    }}
                />
            </LazyRender>

            <LazyRender minHeight={400}>
                <Event eventNo={eventNoList?.[5]} />
            </LazyRender>

            <LazyRender minHeight={400}>
                <ProductDisplay type={type === 'kids' ? 'KIDS' : 'LIFE'} />
            </LazyRender>

            <LazyRender minHeight={400}>
                <Event eventNo={eventNoList?.[6]} />
            </LazyRender>

            <LazyRender minHeight={400}>
                <ProductsSearch
                    title='후기 많은 순 스와이프'
                    description='많은 구매자들이 인증한 후기 많은 상품'
                    searchParams={{
                        filter: {
                            soldout: true,
                        },
                        order: {
                            by: 'REVIEW',
                            direction: 'DESC',
                        },
                        categoryNos,
                    }}
                />
            </LazyRender>

            {filteredEventNoList.map((eventNo) => (
                <LazyRender minHeight={400} key={eventNo}>
                    <Event eventNo={eventNo} />
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
