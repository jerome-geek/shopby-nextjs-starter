import { SuspenseQueries } from '@suspensive/react-query';

import EventCard from '@/components/section/event/card';
import { bannerListOptions } from '@/entities/banner/queries';
import { eventDetailOptions } from '@/entities/event/queries';

interface EventSectionProps {
    index?: number;
    eventNo?: number;
    eventKey?: string;
}

const EventSection = ({ eventKey }: EventSectionProps) => {
    if (!eventKey) {
        return null;
    }

    return (
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
    );
};

export default EventSection;
