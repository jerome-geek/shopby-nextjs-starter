import dynamic from 'next/dynamic';

import { HeroBanner } from '@/components/banner/hero';
import IconBanner from '@/components/banner/icon';
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
                <IconBanner type='SHOP' />
            </section>

            {/* 라이프 타임특가 */}
            <TimeSale title='라이프 타임특가' type='LIFE' />

            {/* 영상(기획전) */}
            <Event index={1} />

            {/* 키즈 타임특가 */}
            <LazyRender minHeight={400}>
                <TimeSale title='키즈 타임특가' type='KIDS' />
            </LazyRender>

            {/* 영상(기획전) */}
            <LazyRender minHeight={400}>
                <Event index={2} />
            </LazyRender>

            {/* 라이프 베스트 */}
            <LazyRender minHeight={500}>
                <Best type='LIFE' />
            </LazyRender>

            {/* 영상(기획전) */}
            <LazyRender minHeight={400}>
                <Event index={3} />
            </LazyRender>

            {/* 키즈 베스트 */}
            <LazyRender minHeight={500}>
                <Best type='KIDS' />
            </LazyRender>

            {/* 영상(기획전) */}
            <LazyRender minHeight={400}>
                <Event index={4} />
            </LazyRender>
        </div>
    );
}
