import { keepPreviousData, useQuery } from '@tanstack/react-query';

import {
    eventByIdOptions,
    type EventByIdParams,
} from '@/entities/event/queries';
import type { GetEventResponse } from '@/entities/display/model/event';

const useEventById = <T = GetEventResponse>({
    eventId,
    params,
    options,
}: EventByIdParams<T>) => {
    return useQuery(
        eventByIdOptions({
            eventId,
            params,
            options: {
                placeholderData: keepPreviousData,
                ...options,
            },
        }),
    );
};

export default useEventById;
