import { EventSectionBanner } from '@/features/event/section/components/event-section-banner';
import { EventSectionContent } from '@/features/event/section/components/event-section-content';
import ShopbyAsyncBoundary from '@/shared/boundary/shopby-async-boundary';

import * as styles from '@/components/section/event/index.css';
import {
    EventBannerSkeleton,
    EventContentSkeleton,
} from '@/components/section/event/skeleton';

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
        <div className={styles.container}>
            <ShopbyAsyncBoundary
                fallback={<EventBannerSkeleton />}
                errorFallback={<></>}
            >
                <EventSectionBanner eventKey={eventKey} />
            </ShopbyAsyncBoundary>

            <ShopbyAsyncBoundary
                fallback={<EventContentSkeleton />}
                errorFallback={<></>}
            >
                <EventSectionContent eventKey={eventKey} />
            </ShopbyAsyncBoundary>
        </div>
    );
};

export default EventSection;
