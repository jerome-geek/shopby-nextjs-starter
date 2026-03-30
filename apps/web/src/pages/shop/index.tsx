import { LazyRender } from '@/components/common';
import { HeroBanner } from '@/components/banner/hero';
import Best from '@/components/section/best';
import TimeSale from '@/components/section/timeSale';
import * as styles from '@/styles/Home.css';

// 쇼핑몰 기본 홈은 발견
export default function ShopMain() {
    return (
        <div className={styles.main}>
            {/* Full-width HeroBanner */}
            <HeroBanner />

            {/* 라이프 타임특가 */}
            <LazyRender minHeight={400}>
                <TimeSale
                    sectionId='TIMESALE-LIFE'
                    title='오늘만 특가'
                    buttonLabel='라이프 타임특가 더보기'
                />
            </LazyRender>

            {/* 영상(기획전) */}

            {/* 키즈 타임특가 */}
            <LazyRender minHeight={400}>
                <TimeSale
                    sectionId='TIMESALE-KIDS'
                    title='오늘만 특가'
                    buttonLabel='키즈 타임특가 더보기'
                />
            </LazyRender>

            {/* 영상(기획전) */}

            {/* 라이프 베스트 */}
            <LazyRender minHeight={500}>
                <Best />
            </LazyRender>

            {/* 영상(기획전) */}

            {/* 키즈 베스트 */}
            <LazyRender minHeight={500}>
                <Best />
            </LazyRender>

            {/* 영상(기획전) */}
        </div>
    );
}
