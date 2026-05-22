import { head, includes, isEmpty, pipe, prop, toArray } from '@fxts/core';
import Link from 'next/link';
import { useMemo } from 'react';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { NoResult } from '@/components/common/no-result';
import ProductCardRow from '@/components/product/card-row';
import * as styles from '@/components/section/event/card/index.css';
import { EventProductsSkeleton } from '@/components/section/event/skeleton';
import { PATHS } from '@/const/paths';
import { useProductsWithAdditionalDiscounts } from '@/entities/product/hooks/useProductsWithAdditionalDiscounts';
import { useEventProductSection } from '@/hooks/query/display/event';
import { useResponsive } from '@/hooks/utils';
import type { GetBannersResponse } from '@/models/display/banner';
import type { GetEventResponse } from '@/models/display/event';
import {
    extractBannerContentsByAccountIndex,
    normalizeImageUrl,
} from '@/shared/utils/shopby';

import 'swiper/css';
import 'swiper/css/navigation';

interface EventCardProps {
    event: GetEventResponse;
    bannerData?: GetBannersResponse;
}

const EventCard = ({ event, bannerData }: EventCardProps) => {
    const { isMobile } = useResponsive();

    const parseThumbnail = useMemo(() => {
        const pc = event.top.pc;
        const mobile = event.top.mobile;

        const getSrc = (value?: typeof pc) => {
            if (!value?.url) {
                return '';
            }

            if (value.type === 'FILE') {
                return value.url;
            }

            return extractThumbnailSrcFromHtml(value.url);
        };

        return {
            pc: getSrc(pc),
            mo: getSrc(mobile),
        };
    }, [event]);

    const banners = useMemo(
        () =>
            bannerData
                ? extractBannerContentsByAccountIndex(bannerData, 0)
                : [],
        [bannerData],
    );

    const firstSectionNo = head(event.section)?.sectionNo || 0;

    const {
        data: eventProductSectionData,
        isLoading: isEventProductSectionLoading,
    } = useEventProductSection({
        eventNo: event.eventNo,
        sectionNo: firstSectionNo,
        searchParams: {
            pageNumber: 1,
            pageSize: 2,
            order: 'ADMIN_SETTING',
            // TODO: 추후 판매 상태 수정 필요
            // saleStatus: 'RESERVATION_AND_ONSALE',
            // includeStopProduct: true,
        },
    });

    const products = useMemo(() => {
        if (!eventProductSectionData) {
            return [];
        }

        return pipe(eventProductSectionData, prop('products'), toArray);
    }, [eventProductSectionData]);

    const { productsWithDiscounts } =
        useProductsWithAdditionalDiscounts(products);

    const eventDetailHref = PATHS.EVENTS.DETAIL.replace(
        '[eventNoOrId]',
        event.id,
    );

    const isPrefetch = includes(event.id, [
        'SHOP_DISCOVERY_TOP',
        'SHOP_LIFE_TOP',
        'SHOP_KIDS_TOP',
    ]);

    const textRender = () => {
        return (
            <div className={styles.textWrapper}>
                <Link
                    href={PATHS.EVENTS.DETAIL.replace('[eventNo]', event.id)}
                    prefetch={false}
                >
                    <p className={styles.title}>{event.label}</p>
                </Link>

                <p className={styles.description}>{event.promotionText}</p>
            </div>
        );
    };

    return (
        <div className={styles.container}>
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
                            alt={'기획전 썸네일 이미지'}
                            className={styles.image}
                        />
                    </Link>
                )}

                {isMobile ? (
                    <div className={styles.fadeWrapper}>{textRender()}</div>
                ) : null}
            </div>
            <div className={styles.contentWrapper}>
                {isMobile ? null : textRender()}

                {isEventProductSectionLoading ? (
                    <EventProductsSkeleton />
                ) : isEmpty(productsWithDiscounts) ? (
                    <NoResult
                        text='진열된 상품이 없습니다.'
                        style={{
                            height: isMobile ? '268px' : '280px',
                        }}
                    />
                ) : (
                    <ul className={styles.productList}>
                        {productsWithDiscounts.map((product) => (
                            <li
                                key={product.productNo}
                                className={styles.productItem}
                            >
                                <ProductCardRow
                                    {...product}
                                    isTimeSaleEnabled={false}
                                />
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default EventCard;

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
