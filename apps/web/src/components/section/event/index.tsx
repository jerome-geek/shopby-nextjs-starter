import FetchBoundary from '@/components/common/FetchBoundary';
import EventCard from '@/components/section/event/card';
import EventSectionSkeleton from '@/components/section/event/skeleton';
import { useEventById } from '@/hooks/suspenseQuery/display/event';
import { GetEventResponse } from '@/models/display/event';

const EventCardContent = ({ event }: { event: GetEventResponse }) => {
    if (!event) {
        return null;
    }

    return <EventCard event={event} />;
};

const Event = ({ index }: { index: number }) => {
    const { data: eventByIdData } = useEventById({
        eventId: `SHOP_MAIN_${index}`,
    });

    return (
        <FetchBoundary fallback={<EventSectionSkeleton />}>
            <EventCardContent event={eventByIdData} />
        </FetchBoundary>
    );
};

export default Event;
