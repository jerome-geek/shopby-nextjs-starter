import { useSuspenseQuery } from '@tanstack/react-query';

import {
    eventByIdOptions,
    type EventByIdParams,
} from '@/entities/event/queries';
import type { GetEventResponse } from '@/models/display/event';

const useEventById = <T = GetEventResponse>(params: EventByIdParams<T>) => {
    return useSuspenseQuery(eventByIdOptions(params));
};

export default useEventById;
