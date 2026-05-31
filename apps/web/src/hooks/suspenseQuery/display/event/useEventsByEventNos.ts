import { useSuspenseQuery } from '@tanstack/react-query';

import {
    eventsByEventNosOptions,
    type EventsByEventNosParams,
} from '@/entities/event/queries';
import type { SearchEventsByEventNosResponse } from '@/entities/display/model/event';

const useEventsByEventNos = <T = SearchEventsByEventNosResponse>(
    params: EventsByEventNosParams<T>,
) => {
    return useSuspenseQuery(eventsByEventNosOptions(params));
};

export default useEventsByEventNos;
