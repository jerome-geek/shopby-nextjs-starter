import { SuspenseQuery } from '@suspensive/react-query';

import { event } from '@/api/display';
import FetchBoundary from '@/components/common/FetchBoundary';
import EventCard from '@/components/section/event/card';
import EventSectionSkeleton from '@/components/section/event/skeleton';
import { eventKeys } from '@/hooks/queryKeys';
import type { GetEventResponse } from '@/models/display/event';

const EventCardContent = ({ event }: { event: GetEventResponse }) => {
    if (!event) {
        return null;
    }

    return <EventCard event={event} />;
};

const Event = ({ index, eventNo }: { index?: number; eventNo?: number }) => {
    const eventKey = (index ? `SHOP_MAIN_${index}` : eventNo) || 0;

    if (!eventKey) {
        return null;
    }

    return (
        <FetchBoundary
            fallback={<EventSectionSkeleton />}
            errorFallback={<></>}
        >
            <SuspenseQuery
                queryKey={eventKeys.detail(eventKey)}
                queryFn={async () => {
                    const { data } = await event.getEvent(eventKey);

                    return data;
                }}
            >
                {({ data }) => {
                    return <EventCardContent event={data} />;
                }}
            </SuspenseQuery>
        </FetchBoundary>
    );
};

export default Event;
