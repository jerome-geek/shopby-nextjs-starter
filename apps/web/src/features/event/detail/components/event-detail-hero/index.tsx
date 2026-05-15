import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { bannerListOptions } from '@/entities/banner/queries';
import {
    extractBannerContentsByAccountIndex,
    normalizeImageUrl,
} from '@/shared/utils/shopby';
import * as styles from '@/features/event/detail/components/event-detail-hero/index.css';

import 'swiper/css';
import 'swiper/css/navigation';

interface EventDetailHeroProps {
    eventKey: string | number;
    label: string;
    promotionText?: string;
    pcImageUrl: string;
    mobileImageUrl: string;
}

export const EventDetailHero = ({
    eventKey,
    label,
    promotionText,
    pcImageUrl,
    mobileImageUrl,
}: EventDetailHeroProps) => {
    const { data: bannerData } = useQuery(
        bannerListOptions({ type: 'id', banners: [eventKey.toString()] }),
    );

    const banners = useMemo(
        () =>
            bannerData
                ? extractBannerContentsByAccountIndex(bannerData, 0)
                : [],
        [bannerData],
    );

    const hasThumbnail = pcImageUrl || mobileImageUrl;

    return (
        <div className={styles.container}>
            <div className={styles.topRow}>
                {banners.length > 0 && (
                    <div className={styles.bannerWrapper}>
                        <Swiper
                            modules={[Navigation]}
                            navigation
                            grabCursor
                            loop={banners.length > 1}
                            slidesPerView={1}
                            style={
                                {
                                    width: '100%',
                                    height: '100%',
                                    '--swiper-navigation-color': '#fff',
                                    '--swiper-navigation-size': '24px',
                                } as React.CSSProperties
                            }
                        >
                            {banners.map((banner, index) => (
                                <SwiperSlide key={banner.bannerNo || index}>
                                    <img
                                        src={
                                            normalizeImageUrl(
                                                banner.imageUrl,
                                            ) || ''
                                        }
                                        alt={banner.name || '배너 이미지'}
                                        className={styles.bannerImage}
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                )}

                <div className={styles.textContent}>
                    <h1 className={styles.title}>{label}</h1>
                    {promotionText && (
                        <p className={styles.description}>{promotionText}</p>
                    )}
                </div>
            </div>

            {hasThumbnail && (
                <div className={styles.thumbnailSection}>
                    {pcImageUrl && (
                        <img
                            src={pcImageUrl}
                            alt={label}
                            className={styles.thumbnailPc}
                        />
                    )}
                    {mobileImageUrl && (
                        <img
                            src={mobileImageUrl}
                            alt={label}
                            className={styles.thumbnailMobile}
                        />
                    )}
                </div>
            )}
        </div>
    );
};
