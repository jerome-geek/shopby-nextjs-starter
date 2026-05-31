import { useSuspenseQuery } from '@tanstack/react-query';

import {
    eventsByProductOptions,
    type EventsByProductParams,
} from '@/entities/event/queries';
import type { GetEventsByProductNoResponse } from '@/models/display/event';

const useEventsByProduct = <T = GetEventsByProductNoResponse>(
    params: EventsByProductParams<T>,
) => {
    return useSuspenseQuery(eventsByProductOptions(params));
};

export default useEventsByProduct;
