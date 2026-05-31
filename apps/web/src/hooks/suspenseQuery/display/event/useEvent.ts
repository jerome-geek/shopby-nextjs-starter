import { useSuspenseQuery } from '@tanstack/react-query';
import { parseAsBoolean, useQueryState } from 'nuqs';

import {
    eventDetailOptions,
    type EventDetailParams,
} from '@/entities/event/queries';
import type { GetEventResponse } from '@/models/display/event';

const useEvent = <T = GetEventResponse>({
    eventKey,
    searchParams,
    options,
}: EventDetailParams<T>) => {
    const [preview] = useQueryState(
        'preview',
        parseAsBoolean.withDefault(false),
    );

    return useSuspenseQuery(
        eventDetailOptions({
            eventKey,
            searchParams: { ...searchParams, preview },
            options,
        }),
    );
};

export default useEvent;
