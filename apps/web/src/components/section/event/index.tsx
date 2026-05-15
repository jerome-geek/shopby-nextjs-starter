import { SuspenseQueries } from '@suspensive/react-query';

import EventCard from '@/components/section/event/card';
import EventSectionSkeleton from '@/components/section/event/skeleton';
import { bannerListOptions } from '@/entities/banner/queries';
import { eventDetailOptions } from '@/entities/event/queries';
import ShopbyAsyncBoundary from '@/shared/boundary/shopby-async-boundary';

interface EventSectionProps {
    index?: number;
    eventNo?: number;
}

const EventSection = ({ index, eventNo }: EventSectionProps) => {
    const eventKey = (index ? `SHOP_MAIN_${index}` : eventNo) || '';

    if (!eventKey) {
        return null;
    }

    return (
        <ShopbyAsyncBoundary
            fallback={<EventSectionSkeleton />}
            errorFallback={<></>}
        >
            <SuspenseQueries
                queries={[
                    eventDetailOptions({ eventKey }),
                    bannerListOptions({
                        type: 'id',
                        banners: [eventKey.toString()],
                        // options: {
                        //     select: (data) => {
                        //         return extractBannerContentsByAccountIndex(
                        //             data,
                        //             0,
                        //         );
                        //     },
                        // },
                    }),
                ]}
            >
                {([{ data: eventDetailData }, { data: bannersData }]) => {
                    return (
                        <EventCard
                            event={eventDetailData}
                            bannerData={bannersData}
                        />
                    );
                }}
            </SuspenseQueries>
        </ShopbyAsyncBoundary>
    );
};

export default EventSection;
