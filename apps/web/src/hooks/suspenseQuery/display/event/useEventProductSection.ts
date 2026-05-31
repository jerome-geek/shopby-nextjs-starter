import { useSuspenseQuery } from '@tanstack/react-query';

import {
    eventProductSectionOptions,
    type EventProductSectionParams,
} from '@/entities/event/queries';
import type { GetEventProductDisplaySectionResponse } from '@/models/display/event';

const useEventProductSection = <T = GetEventProductDisplaySectionResponse>(
    params: EventProductSectionParams<T>,
) => {
    return useSuspenseQuery(eventProductSectionOptions(params));
};

export default useEventProductSection;
