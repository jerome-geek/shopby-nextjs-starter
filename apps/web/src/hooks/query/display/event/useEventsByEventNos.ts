import { useQuery } from '@tanstack/react-query';

import {
    eventsByEventNosOptions,
    type EventsByEventNosParams,
} from '@/entities/event/queries';
import type { SearchEventsByEventNosResponse } from '@/models/display/event';

const useEventsByEventNos = <T = SearchEventsByEventNosResponse>(
    params: EventsByEventNosParams<T>,
) => {
    return useQuery(eventsByEventNosOptions(params));
};

export default useEventsByEventNos;
