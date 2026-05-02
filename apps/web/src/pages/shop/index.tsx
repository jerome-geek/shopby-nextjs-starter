import dynamic from 'next/dynamic';

import { LazyRender } from '@/components/common';
import { HeroBanner } from '@/features/banner/components/hero-banner';
import IconBanner from '@/features/banner/components/icon-banner';
import * as styles from '@/pages/shop/index.css';
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
