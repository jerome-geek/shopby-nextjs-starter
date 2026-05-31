import { useQuery } from '@tanstack/react-query';

import {
    eventListOptions,
    type EventListParams,
} from '@/entities/event/queries';
import type { GetEventsResponse } from '@/entities/display/model/event';

const useEventList = <T = GetEventsResponse>(params: EventListParams<T>) => {
    return useQuery(eventListOptions(params));
};

export default useEventList;
