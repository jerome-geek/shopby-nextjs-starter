import { includes } from '@fxts/core';
import Link from 'next/link';
import { useMemo } from 'react';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { PATHS } from '@/const/paths';
import { useBannerList } from '@/hooks/suspenseQuery/display/banner';
import { useEvent } from '@/hooks/suspenseQuery/display/event';
import { useResponsive } from '@/hooks/utils';
import {
    extractBannerContentsByAccountIndex,
    normalizeImageUrl,
} from '@/shared/utils/shopby';

import * as styles from '@/features/event/section/components/event-section-banner/index.css';

import 'swiper/css';
import 'swiper/css/navigation';

interface EventSectionBannerProps {
    eventKey: string;
}

export const EventSectionBanner = ({ eventKey }: EventSectionBannerProps) => {
    const { data: event } = useEvent({ eventKey });
    const { data: bannersData } = useBannerList({
        type: 'id',
        banners: [eventKey.toString()],
    });
    const { isMobile } = useResponsive();

    const banners = useMemo(
        () => extractBannerContentsByAccountIndex(bannersData, 0),
        [bannersData],
    );

    const eventDetailHref = PATHS.EVENTS.DETAIL.replace(
        '[eventNoOrId]',
        event.id,
    );
    const isPrefetch = includes(event.id, [
        'SHOP_DISCOVERY_TOP',
        'SHOP_LIFE_TOP',
        'SHOP_KIDS_TOP',
    ]);

    if (banners.length === 0) return null;

    return (
        <div className={styles.imageWrapper}>
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
                        <Link
                            href={eventDetailHref}
                            prefetch={isPrefetch}
                            style={{
                                display: 'block',
                                width: '100%',
                                height: '100%',
                            }}
                        >
                            <img
                                src={
                                    normalizeImageUrl(
                                        banner.imageUrl || '',
                                    ) || ''
                                }
                                alt={banner.name || '배너 이미지'}
                                className={styles.image}
                            />
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>

            {isMobile ? (
                <div className={styles.fadeWrapper}>
                    <div className={styles.textWrapper}>
                        <Link
                            href={PATHS.EVENTS.DETAIL.replace(
                                '[eventNo]',
                                event.id,
                            )}
                            prefetch={false}
                        >
                            <p className={styles.title}>{event.label}</p>
                        </Link>
                        <p className={styles.description}>
                            {event.promotionText}
                        </p>
                    </div>
                </div>
            ) : null}
        </div>
    );
};

