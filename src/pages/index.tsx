import dynamic from 'next/dynamic';
import Head from 'next/head';

import { LazyRender } from '@/components/common/LazyRender';
import { HeroBanner } from '@/components/hero-banner';
import * as styles from '@/styles/Home.css';

const TimeSale = dynamic(() => import('@/components/section/timeSale'), {
    ssr: false,
});
const Best = dynamic(() => import('@/components/section/best'), {
    ssr: false,
});
const RecipeSection = dynamic(() => import('@/components/section/recipe'), {
    ssr: false,
});

export default function Home() {
    return (
        <>
            <Head>
                <title>JollyPot</title>
                <meta
                    name="description"
                    content="Welcome to our online store"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className={`${styles.main}`}>
                {/* Full-width HeroBanner */}
                <HeroBanner />

                <LazyRender minHeight={300}>
                    <div className={styles.recipeGrid}>
                        <RecipeSection />
                        <RecipeSection />
                    </div>
                </LazyRender>

                {/* 라이프 타임특가 */}
                <LazyRender minHeight={400}>
                    <TimeSale
                        sectionId="TIMESALE-LIFE"
                        title="오늘만 특가"
                        buttonLabel="라이프 타임특가 더보기"
                    />
                </LazyRender>

                <LazyRender minHeight={300}>
                    <div className={styles.recipeGrid}>
                        <RecipeSection />
                        <RecipeSection />
                    </div>
                </LazyRender>

                {/* 키즈 타임특가 */}
                <LazyRender minHeight={400}>
                    <TimeSale
                        sectionId="TIMESALE-KIDS"
                        title="키즈 타임특가"
                        buttonLabel="키즈 타임특가 더보기"
                    />
                </LazyRender>

                <LazyRender minHeight={300}>
                    <div className={styles.recipeGrid}>
                        <RecipeSection />
                        <RecipeSection />
                    </div>
                </LazyRender>

                {/* 라이프 베스트 */}
                <LazyRender minHeight={500}>
                    <Best />
                </LazyRender>

                {/* <ProductSection /> */}
            </div>
        </>
    );
}
