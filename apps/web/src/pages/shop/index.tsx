import dynamic from 'next/dynamic';

import { HeroBanner } from '@/components/banner/hero';
import IconBannerSection from '@/components/banner/icon-banner-section';
import { LazyRender } from '@/components/common';
import * as styles from '@/styles/Home.css';

const TimeSale = dynamic(() => import('@/components/section/timeSale'), {
    ssr: false,
});
const Best = dynamic(() => import('@/components/section/best'), {
    ssr: false,
});
const Event = dynamic(() => import('@/components/section/event'), {
    ssr: false,
});

// 쇼핑몰 기본 홈은 발견
export default function ShopMain() {
    return (
        <div className={styles.main}>
            {/* Full-width HeroBanner */}
            <section className={styles.heroBannerSection}>
                <HeroBanner type='SHOP' />
                <IconBannerSection type='SHOP' />
            </section>

            {/* 라이프 타임특가 */}
            <TimeSale
                sectionId='TIMESALE-LIFE'
                title='오늘만 특가'
                buttonLabel='라이프 타임특가 더보기'
            />

            {/* 영상(기획전) */}
            <Event index={1} />

            {/* 키즈 타임특가 */}
            <LazyRender minHeight={400}>
                <TimeSale
                    sectionId='TIMESALE-KIDS'
                    title='오늘만 특가'
                    buttonLabel='키즈 타임특가 더보기'
                />
            </LazyRender>

            {/* 영상(기획전) */}
            <LazyRender minHeight={400}>
                <Event index={2} />
            </LazyRender>

            {/* 라이프 베스트 */}
            <LazyRender minHeight={500}>
                <Best />
            </LazyRender>

            {/* 영상(기획전) */}
            <LazyRender minHeight={400}>
                <Event index={3} />
            </LazyRender>

            {/* 키즈 베스트 */}
            <LazyRender minHeight={500}>
                <Best />
            </LazyRender>

            {/* 영상(기획전) */}
            <LazyRender minHeight={400}>
                <Event index={4} />
            </LazyRender>
        </div>
    );
}
