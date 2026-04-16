import { head, isEmpty } from '@fxts/core';
import { useMemo } from 'react';

import { NoResult } from '@/components/common/no-result';
import ProductCardRow from '@/components/product/card-row';
import * as styles from '@/components/section/event/card/index.css';
import { EventProductsSkeleton } from '@/components/section/event/skeleton';
import { useEventProductSection } from '@/hooks/query/display/event';
import { useResponsive } from '@/hooks/utils';
import type { GetEventResponse } from '@/models/display/event';

const EventCard = ({ event }: { event: GetEventResponse }) => {
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

    const textRender = () => {
        return (
            <div className={styles.textWrapper}>
                <p className={styles.title}>{event.label}</p>
                <p className={styles.description}>{event.promotionText}</p>
            </div>
        );
    };

    return (
        <div className={styles.container}>
            <div className={styles.imageWrapper}>
                <img
                    src={isMobile ? parseThumbnail.mo : parseThumbnail.pc}
                    alt={'기획전 썸네일 이미지'}
                    className={styles.image}
                />

                {isMobile ? (
                    <div className={styles.fadeWrapper}>{textRender()}</div>
                ) : null}
            </div>
            <div className={styles.contentWrapper}>
                {isMobile ? null : textRender()}

                {isEventProductSectionLoading ? (
                    <EventProductsSkeleton />
                ) : isEmpty(eventProductSectionData?.products) ? (
                    <NoResult
                        text='진열된 상품이 없습니다.'
                        style={{
                            height: isMobile ? '268px' : '280px',
                        }}
                    />
                ) : (
                    <ul className={styles.productList}>
                        {eventProductSectionData?.products.map((product) => (
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
