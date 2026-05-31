import { useSuspenseQuery } from '@tanstack/react-query';

import {
    eventListOptions,
    type EventListParams,
} from '@/entities/event/queries';
import type { GetEventsResponse } from '@/entities/display/model/event';

const useEventList = <T = GetEventsResponse>(args: EventListParams<T>) => {
    return useSuspenseQuery(eventListOptions(args));
};

export default useEventList;
