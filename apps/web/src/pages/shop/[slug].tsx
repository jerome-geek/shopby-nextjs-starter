import type { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';

import { HeroBanner } from '@/components/banner/hero';
import * as styles from '@/styles/Home.css';
import SectionGroup from '@/components/section/group';
import IconBanner from '@/components/banner/icon';

const TimeSale = dynamic(() => import('@/components/section/timeSale'), {
    ssr: false,
});

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

            {/* 라이프 타임특가 */}
            <TimeSale
                sectionId={
                    type === SHOP_TYPES.LIFE ? 'TIMESALE-LIFE' : 'TIMESALE-KIDS'
                }
                title='오늘만 특가'
                buttonLabel={
                    type === SHOP_TYPES.LIFE
                        ? '라이프 타임특가 더보기'
                        : '키즈 타임특가 더보기'
                }
            />

            {/* 기획전 및 상품진열 그룹 */}
            <SectionGroup />
        </div>
    );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const slug = params?.slug as string | undefined;

    // 허용된 경로 목록
    const validPaths = ['life', 'kids'];

    // life, kids 외의 경로로 들어오거나 slug가 없을 경우 /shop으로 리다이렉트
    if (!slug || !validPaths.includes(slug)) {
        return {
            redirect: {
                destination: '/shop',
                permanent: false,
            },
        };
    }

    const type = slug === 'life' ? SHOP_TYPES.LIFE : SHOP_TYPES.KIDS;

    return {
        props: {
            type,
        },
    };
};
