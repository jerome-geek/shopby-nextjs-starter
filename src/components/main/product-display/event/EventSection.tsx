import { map, pipe, take, toArray } from '@fxts/core';

import {
    getCachedEventById,
    getCachedEventProductDisplaySection,
} from '@/api/display/event.server';
import EventSectionItem from '@/components/main/product-display/event/EventItem';

interface EventSectionProps {
    sectionId: string;
}

const EventSection = async ({ sectionId }: EventSectionProps) => {
    try {
        const eventData = await getCachedEventById(sectionId);

        const firstSection = eventData.section?.[0];

        const eventProductData = await getCachedEventProductDisplaySection(
            eventData.eventNo,
            firstSection.sectionNo,
            {
                pageNumber: 1,
                pageSize: 4,
                order: 'ADMIN_SETTING',
                saleStatus: 'RESERVATION_AND_ONSALE' as const,
                includeStopProduct: true,
            },
        );

        const eventProducts = pipe(
            eventProductData.products,
            map((product) => ({
                ...product,
            })),
            take(4),
            toArray,
        );

        return (
            <EventSectionItem eventData={eventData} products={eventProducts} />
        );
    } catch (error) {
        console.error('EventSection 오류 발생', error);
        return null;
    }
};

export default EventSection;
