import { keepPreviousData, useQuery } from '@tanstack/react-query';

import {
    eventsByProductOptions,
    type EventsByProductParams,
} from '@/entities/event/queries';
import type { GetEventsByProductNoResponse } from '@/models/display/event';

const useEventsByProduct = <T = GetEventsByProductNoResponse>({
    productNo,
    options,
}: EventsByProductParams<T>) => {
    return useQuery(
        eventsByProductOptions({
            productNo,
            options: {
                placeholderData: keepPreviousData,
                ...options,
            },
        }),
    );
};

export default useEventsByProduct;
