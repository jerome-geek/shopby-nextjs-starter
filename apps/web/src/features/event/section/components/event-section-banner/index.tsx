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

    const parseThumbnail = useMemo(() => {
        const pc = event.top.pc;
        const mobile = event.top.mobile;

        const getSrc = (value?: typeof pc) => {
            if (!value?.url) return '';
            if (value.type === 'FILE') return value.url;
            return extractThumbnailSrcFromHtml(value.url);
        };

        return { pc: getSrc(pc), mo: getSrc(mobile) };
    }, [event]);

    const eventDetailHref = PATHS.EVENTS.DETAIL.replace(
        '[eventNoOrId]',
        event.id,
    );
    const isPrefetch = includes(event.id, [
        'SHOP_DISCOVERY_TOP',
        'SHOP_LIFE_TOP',
        'SHOP_KIDS_TOP',
    ]);

    return (
        <div className={styles.imageWrapper}>
            {banners.length > 0 ? (
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
            ) : (
                <Link href={eventDetailHref} prefetch={isPrefetch}>
                    <img
                        src={
                            isMobile ? parseThumbnail.mo : parseThumbnail.pc
                        }
                        alt='기획전 썸네일 이미지'
                        className={styles.image}
                    />
                </Link>
            )}

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

const normalizeSrc = (src: string) => {
    if (src.startsWith('//')) {
        return `https:${src}`;
    }
    return src;
};

const extractThumbnailSrcFromHtml = (html: string) => {
    if (typeof window !== 'undefined' && typeof DOMParser !== 'undefined') {
        const doc = new DOMParser().parseFromString(html, 'text/html');
        const el = doc.querySelector('img#thumbnail');
        const src = el?.getAttribute('src') ?? '';
        return src ? normalizeSrc(src) : '';
    }

    const match = html.match(
        /<img\b[^>]*\bid\s*=\s*["']thumbnail["'][^>]*\bsrc\s*=\s*["']([^"']+)["'][^>]*>/i,
    );
    const src = match?.[1] ?? '';
    return src ? normalizeSrc(src) : '';
};
