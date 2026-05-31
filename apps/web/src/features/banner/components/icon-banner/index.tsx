import Link from 'next/link';
import { useMemo } from 'react';
import { FreeMode } from 'swiper/modules';
import { Swiper, SwiperProps, SwiperSlide } from 'swiper/react';

import { BANNER_ID_PREFIX, type HeroBannerType } from '@/features/banner/components/hero-banner';
import * as styles from '@/features/banner/components/icon-banner/index.css';
import FetchBoundary from '@/shared/components/common/FetchBoundary';
import Skeleton from '@/shared/ui/skeleton';
import { useBannerList } from '@/hooks/suspenseQuery/display/banner';
import type { Banner } from '@/entities/display/model/banner';
import { getLandingUrl } from '@/utils/banner';
import { extractBannerContentsByAccountIndex } from '@/shared/utils/shopby';

import 'swiper/css';
import 'swiper/css/free-mode';

const IconBannerSkeleton = () => {
    const swiperSetting: SwiperProps = {
        modules: [FreeMode],
        freeMode: true,
        slidesPerView: 'auto',
        spaceBetween: 8,
        allowTouchMove: false,
    };

    return (
        <section className={styles.section} aria-busy='true'>
            <div className={styles.swiperContainer} aria-hidden='true'>
                <Swiper {...swiperSetting}>
                    {Array.from({ length: 6 }).map((_, i) => (
                        <SwiperSlide key={i} style={{ width: 'auto' }}>
                            <Skeleton
                                className={styles.skeletonBanner}
                                width={i % 2 === 0 ? 142 : 104}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};

const IconBannerContent = ({ type }: { type: HeroBannerType }) => {
    const { data: bannerListData } = useBannerList({
        banners: [`${BANNER_ID_PREFIX}-${type}`],
        options: {
            select: (data) => extractBannerContentsByAccountIndex(data, 1),
        },
    });

    const swiperSetting: SwiperProps = useMemo(
        () => ({
            modules: [FreeMode],
            freeMode: true,
            slidesPerView: 'auto',
            spaceBetween: 8,
        }),
        [],
    );

    const renderSwiper = (list: Banner[]) => {
        return (
            <Swiper {...swiperSetting}>
                {list.map((banner) => (
                    <SwiperSlide
                        key={banner.bannerNo}
                        style={{ width: 'auto' }}
                    >
                        <Link
                            href={getLandingUrl({
                                landingUrl: banner.landingUrl,
                                landingUrlType: banner.landingUrlType,
                            })}
                        >
                            <img
                                src={banner.imageUrl}
                                alt={banner.name}
                                className={styles.bannerImage}
                            />
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>
        );
    };

    if (bannerListData.length === 0) {
        return null;
    }

    return (
        <section className={styles.section} aria-label='아이콘 배너'>
            <div className={styles.swiperContainer}>
                {renderSwiper(bannerListData)}
            </div>
        </section>
    );
};

const IconBanner = ({ type }: { type: HeroBannerType }) => {
    return (
        <FetchBoundary fallback={<IconBannerSkeleton />} errorFallback={<></>}>
            <IconBannerContent type={type} />
        </FetchBoundary>
    );
};

export default IconBanner;
