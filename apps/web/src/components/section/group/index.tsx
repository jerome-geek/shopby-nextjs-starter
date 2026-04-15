import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { useMemo } from 'react';

import { LazyRender } from '@/components/common';
import { ShopType } from '@/pages/shop/[slug]';
import { useEventList } from '@/hooks/query/display/event';
import ProductsSearch from '../products/search';

const Best = dynamic(() => import('@/components/section/best'), {
    ssr: false,
});
const Event = dynamic(() => import('@/components/section/event'), {
    ssr: false,
});

const CATEGORY_NO = {
    kids: 1173127,
    life: 1173128,
};

const SectionGroup = () => {
    const router = useRouter();
    const type = router.query.slug as ShopType;

    const { data: eventListData } = useEventList({
        searchParams: {
            page: {
                number: 1,
                size: 7,
            },
            order: {
                by: 'REGISTER_DATE',
                direction: 'DESC',
            },
            categoryNos: [CATEGORY_NO[type]],
        },
    });

    const eventNoList = useMemo(
        () => eventListData?.contents?.map((event) => event.eventNo),
        [eventListData],
    );

    return (
        <>
            <Event eventNo={eventNoList?.[0]} />

            <LazyRender minHeight={500}>
                <Best />
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
                    }}
                />
            </LazyRender>

            <LazyRender minHeight={400}>
                <Event eventNo={eventNoList?.[2]} />
            </LazyRender>

            <LazyRender minHeight={400}>
                <ProductsSearch
                    title='오늘 오픈'
                    description='놓치면 후회할 보석같은 아이템'
                    searchParams={{
                        filter: {
                            soldout: true,
                        },
                        order: {
                            by: 'SALE_YMD',
                            direction: 'DESC',
                        },
                    }}
                />
            </LazyRender>

            <LazyRender minHeight={400}>
                <Event eventNo={eventNoList?.[3]} />
            </LazyRender>

            <LazyRender minHeight={400}>
                <ProductsSearch
                    title='후기 좋은 순'
                    description='실제 구매자들이 인정한 만족도 높은 상품'
                    searchParams={{
                        filter: {
                            soldout: true,
                        },
                        order: {
                            by: 'REVIEW',
                            direction: 'DESC',
                        },
                    }}
                />
            </LazyRender>

            <LazyRender minHeight={400}>
                <Event eventNo={eventNoList?.[4]} />
            </LazyRender>

            <LazyRender minHeight={400}>
                <ProductsSearch
                    title='누적구매 많은 순'
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
                <Event eventNo={eventNoList?.[5]} />
            </LazyRender>

            <LazyRender minHeight={400}>
                <Event eventNo={eventNoList?.[6]} />
            </LazyRender>
        </>
    );
};

export default SectionGroup;
