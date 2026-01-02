import { map, pipe, take, toArray } from '@fxts/core';

import { event } from '@/api/display';
import EventSectionItem from '@/components/main/product-display/event/EventItem';

interface EventSectionProps {
    sectionId: string;
}

const EventSection = async ({ sectionId }: EventSectionProps) => {
    try {
        const eventData = await event.getEventById(sectionId).json();

        const firstSection = eventData.section?.[0];

        const eventProductData = await event
            .getEventProductDisplaySection(
                eventData.eventNo,
                firstSection.sectionNo,
                {
                    pageNumber: 1,
                    pageSize: 4,
                    order: 'ADMIN_SETTING',
                    saleStatus: 'RESERVATION_AND_ONSALE' as const,
                    includeStopProduct: true,
                },
            )
            .json();

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
